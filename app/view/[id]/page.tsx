import {
    MediaItemType,
    MediaType,
    PersonType,
    SeasonDetailsType,
} from "@/types/global"
import Link from "next/link"

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

async function fetchSeasonEpisodes(
    id: string,
    seasonNumber: number,
): Promise<SeasonDetailsType> {
    const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
            },
        },
    )

    return await res.json()
}

const backdropUrl = "http://image.tmdb.org/t/p/w1280"
const profileUrl = "http://image.tmdb.org/t/p/w185"

export default async function ViewMovie({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>
    searchParams: Promise<{ media?: string; season?: string }>
}) {
    const { id } = await params
    const { media: rawMedia, season: rawSeason } = await searchParams
    const media: MediaType = rawMedia === "tv" ? "tv" : "movie"
    const movie = await fetchMedia(id, media)
    const casts = await fetchCasts(id, media)
    const title = movie.title ?? movie.name ?? "Untitled"
    const date = movie.release_date ?? movie.first_air_date
    const year = date ? date.split("-")[0] : "N/A"
    const seasons = media === "tv" ? (movie.seasons ?? []) : []
    const parsedSeason = Number.parseInt(rawSeason ?? "", 10)
    const defaultSeason = seasons.find((season) => season.season_number > 0)
    const selectedSeasonNumber = Number.isNaN(parsedSeason)
        ? defaultSeason?.season_number
        : parsedSeason

    const selectedSeason = seasons.find(
        (season) => season.season_number === selectedSeasonNumber,
    )

    const seasonDetails =
        media === "tv" && selectedSeason
            ? await fetchSeasonEpisodes(id, selectedSeason.season_number)
            : null

    return (
        <div>
            <h2 className="py-3 mb-4 border-b text-2xl font-bold">
                {title} ({year})
            </h2>
            {movie.backdrop_path ? (
                <img src={backdropUrl + movie.backdrop_path} alt={title} />
            ) : null}
            <p className="text-xl mt-3 mb-6">{movie.overview}</p>

            {media === "tv" ? (
                <>
                    <h3 className="py-3 mb-4 border-b text-xl font-bold">
                        Seasons
                    </h3>
                    <div className="mb-6 flex flex-wrap gap-2">
                        {seasons.map((season) => (
                            <Link
                                key={season.id}
                                href={`/view/${id}?media=tv&season=${season.season_number}`}
                                className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                                    selectedSeason?.season_number ===
                                    season.season_number
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-background hover:bg-muted"
                                }`}>
                                {season.name} ({season.episode_count})
                            </Link>
                        ))}
                    </div>

                    <h3 className="py-3 mb-4 border-b text-xl font-bold">
                        {seasonDetails
                            ? `Episodes - ${seasonDetails.name}`
                            : "Episodes"}
                    </h3>

                    {seasonDetails ? (
                        <div className="mb-8 flex flex-col gap-3">
                            {seasonDetails.episodes.map((episode) => (
                                <div
                                    key={episode.id}
                                    className="rounded-lg border p-3">
                                    <div className="mb-1 font-bold">
                                        E{episode.episode_number}:{" "}
                                        {episode.name}
                                    </div>
                                    <div className="mb-2 text-sm text-gray-600">
                                        {episode.air_date ?? "Unknown air date"}
                                        {episode.runtime
                                            ? ` - ${episode.runtime} min`
                                            : ""}
                                    </div>
                                    <p className="text-sm">
                                        {episode.overview || "No overview."}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="mb-8 text-sm text-gray-600">
                            Select a season to view episodes.
                        </p>
                    )}
                </>
            ) : null}

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
