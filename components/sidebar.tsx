import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Play } from "lucide-react"

type GenreType = { id: string; name: string }

async function fetchGenre(media: "movie" | "tv"): Promise<GenreType[]> {
    const res = await fetch(
        `https://api.themoviedb.org/3/genre/${media}/list`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
            },
        },
    )

    const data = await res.json()
    return data.genres
}

export default async function Sidebar() {
    const [movieGenres, tvGenres] = await Promise.all([
        fetchGenre("movie"),
        fetchGenre("tv"),
    ])

    return (
        <nav className="w-50 p-4 border-r flex flex-col shrink-0 gap-1">
            <Button variant="outline" asChild>
                <Link href="/?media=movie" className="justify-start py-5">
                    <Play />
                    All Movies
                </Link>
            </Button>
            <Button variant="outline" asChild>
                <Link href="/?media=tv" className="justify-start py-5">
                    <Play />
                    All Series
                </Link>
            </Button>

            <h3 className="mt-4 mb-1 text-xl font-bold">Movie Genres</h3>
            {movieGenres.map((genre) => {
                return (
                    <Button key={`movie-${genre.id}`} variant="outline" asChild>
                        <Link
                            href={`/genre/${genre.name}/${genre.id}?media=movie`}
                            className="justify-start py-5">
                            <Play />
                            {genre.name}
                        </Link>
                    </Button>
                )
            })}

            <h3 className="mt-4 mb-1 text-xl font-bold">Series Genres</h3>
            {tvGenres.map((genre) => {
                return (
                    <Button key={`tv-${genre.id}`} variant="outline" asChild>
                        <Link
                            href={`/genre/${genre.name}/${genre.id}?media=tv`}
                            className="justify-start py-5">
                            <Play />
                            {genre.name}
                        </Link>
                    </Button>
                )
            })}
        </nav>
    )
}
