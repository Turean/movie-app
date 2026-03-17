import { Button } from "@/components/ui/button"
import type { MediaItemType, MediaType } from "@/types/global"
import Movie from "@/components/movie"
import Link from "next/link"

async function fetchMovies(
    id: string,
    media: MediaType,
): Promise<MediaItemType[]> {
    const res = await fetch(
        `https://api.themoviedb.org/3/discover/${media}?with_genres=${id}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
            },
        },
    )

    const data = await res.json()
    return data.results
}

export default async function Genre({
    params,
    searchParams,
}: {
    params: Promise<{ name: string; id: string }>
    searchParams: Promise<{ media?: string }>
}) {
    const { name, id } = await params
    const rawMedia = (await searchParams).media
    const media: MediaType = rawMedia === "tv" ? "tv" : "movie"
    const movies = await fetchMovies(id, media)
    const mediaLabel = media === "tv" ? "Series" : "Movies"

    return (
        <div>
            <div className="mb-4 flex gap-2">
                <Button
                    variant={media === "movie" ? "default" : "outline"}
                    asChild>
                    <Link href={`/genre/${name}/${id}?media=movie`}>
                        Movies
                    </Link>
                </Button>
                <Button
                    variant={media === "tv" ? "default" : "outline"}
                    asChild>
                    <Link href={`/genre/${name}/${id}?media=tv`}>Series</Link>
                </Button>
            </div>

            <h2 className="py-3 mb-4 border-b text-2xl font-bold">
                {name} {mediaLabel}
            </h2>
            <div className="flex flex-row flex-wrap gap-4">
                {movies.map((movie) => (
                    <Movie key={movie.id} movie={movie} media={media} />
                ))}
            </div>
        </div>
    )
}
