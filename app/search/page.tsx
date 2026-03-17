import Movie from "@/components/movie"
import { Button } from "@/components/ui/button"
import type { MediaItemType, MediaType } from "@/types/global"
import Link from "next/link"

async function fetchMovies(
    q: string,
    media: MediaType,
): Promise<MediaItemType[]> {
    const res = await fetch(
        `https://api.themoviedb.org/3/search/${media}?query=${encodeURIComponent(q)}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
            },
        },
    )
    const data = await res.json()
    return data.results
}

export default async function Search({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; media?: string }>
}) {
    const { q = "", media: mediaParam } = await searchParams
    const media: MediaType = mediaParam === "tv" ? "tv" : "movie"
    const movies = q ? await fetchMovies(q, media) : []
    const mediaLabel = media === "tv" ? "Series" : "Movies"

    return (
        <div>
            <div className="mb-4 flex gap-2">
                <Button
                    variant={media === "movie" ? "default" : "outline"}
                    asChild>
                    <Link
                        href={`/search?q=${encodeURIComponent(q)}&media=movie`}>
                        Movies
                    </Link>
                </Button>
                <Button
                    variant={media === "tv" ? "default" : "outline"}
                    asChild>
                    <Link href={`/search?q=${encodeURIComponent(q)}&media=tv`}>
                        Series
                    </Link>
                </Button>
            </div>

            <h2 className="py-3 mb-4 border-b text-2xl font-bold">
                Search {mediaLabel}
            </h2>
            <div className="flex flex-row flex-wrap gap-4">
                {movies.map((movie) => (
                    <Movie key={movie.id} movie={movie} media={media} />
                ))}
            </div>
        </div>
    )
}
