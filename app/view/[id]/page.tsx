import { MediaItemType, MediaType, PersonType } from "@/types/global"

async function fetchMedia(
    id: string,
    media: MediaType,
): Promise<MediaItemType> {
    const res = await fetch(`https://api.themoviedb.org/3/${media}/${id}`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
    })

    return await res.json()
}

async function fetchCasts(id: string, media: MediaType): Promise<PersonType[]> {
    const res = await fetch(
        `https://api.themoviedb.org/3/${media}/${id}/credits`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
            },
        },
    )
    const data = await res.json()
    return data.cast
}

const backdropUrl = "http://image.tmdb.org/t/p/w1280"
const profileUrl = "http://image.tmdb.org/t/p/w185"

export default async function ViewMovie({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>
    searchParams: Promise<{ media?: string }>
}) {
    const { id } = await params
    const rawMedia = (await searchParams).media
    const media: MediaType = rawMedia === "tv" ? "tv" : "movie"
    const movie = await fetchMedia(id, media)
    const casts = await fetchCasts(id, media)
    const title = movie.title ?? movie.name ?? "Untitled"
    const date = movie.release_date ?? movie.first_air_date
    const year = date ? date.split("-")[0] : "N/A"

    return (
        <div>
            <h2 className="py-3 mb-4 border-b text-2xl font-bold">
                {title} ({year})
            </h2>
            {movie.backdrop_path ? (
                <img src={backdropUrl + movie.backdrop_path} alt={title} />
            ) : null}
            <p className="text-xl mt-3 mb-6">{movie.overview}</p>

            <h3 className="py-3 mb-4 border-b text-xl font-bold">Casts</h3>
            <div className="flex gap-3 flex-wrap">
                {casts.map((cast) => {
                    return (
                        <div
                            key={cast.id}
                            className="w-46 flex flex-col gap-1 text-center">
                            {cast.profile_path ? (
                                <img
                                    src={profileUrl + cast.profile_path}
                                    alt=""
                                />
                            ) : (
                                <div className="bg-gray-300 h-69"></div>
                            )}
                            <div className="font-bold">{cast.name}</div>
                            <span className="text-gray-600">
                                {cast.character}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
