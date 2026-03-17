import Movie from "@/components/movie"
import { Button } from "@/components/ui/button"
import type { MediaItemType, MediaType } from "@/types/global"
import Link from "next/link"

async function fetchPopular(media: MediaType): Promise<MediaItemType[]> {
    const res = await fetch(`https://api.themoviedb.org/3/${media}/popular`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
    })

    const data = await res.json()
    return data.results
}

async function fetchTopRated(media: MediaType): Promise<MediaItemType[]> {
    const res = await fetch(`https://api.themoviedb.org/3/${media}/top_rated`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
    })

    const data = await res.json()
    return data.results
}

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ media?: string }>
}) {
    const rawMedia = (await searchParams).media
    const media: MediaType = rawMedia === "tv" ? "tv" : "movie"

    const popular = await fetchPopular(media)
    const top = await fetchTopRated(media)
    const mediaLabel = media === "tv" ? "Series" : "Movies"

    return (
        <div>
            <div className="mb-4 flex gap-2">
                <Button
                    variant={media === "movie" ? "default" : "outline"}
                    asChild>
                    <Link href="/?media=movie">Movies</Link>
                </Button>
                <Button
                    variant={media === "tv" ? "default" : "outline"}
                    asChild>
                    <Link href="/?media=tv">Series</Link>
                </Button>
            </div>

            <h2 className="py-3 mb-4 border-b text-2xl font-bold">
                Popular {mediaLabel}
            </h2>
            <div className="flex flex-row flex-wrap gap-4">
                {popular.map((movie) => (
                    <Movie key={movie.id} movie={movie} media={media} />
                ))}
            </div>

            <h2 className="mt-6 py-3 mb-4 border-b text-2xl font-bold">
                Top Rated {mediaLabel}
            </h2>
            <div className="flex flex-row flex-wrap gap-4">
                {top.map((movie) => (
                    <Movie key={movie.id} movie={movie} media={media} />
                ))}
            </div>
        </div>
    )
}
