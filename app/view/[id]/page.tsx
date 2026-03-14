import { MovieType } from "@/types/global"

async function fetchMovie(id: string): Promise<MovieType> {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
    })

    return await res.json()
}

const backdropUrl = "http://image.tmdb.org/t/p/w1280"

export default async function ViewMovie({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const movie = await fetchMovie(id)

    return (
        <div>
            <h2 className="py-3 mb-4 border-b text-2xl font-bold">
                {movie.title} ({movie.release_date.split("-")[0]})
            </h2>
            <img src={backdropUrl + movie.backdrop_path} alt="" />
            <p className="text-xl mt-3 mb-6">{movie.overview}</p>
        </div>
    )
}
