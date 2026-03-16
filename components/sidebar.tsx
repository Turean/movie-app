import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Play } from "lucide-react"

async function fetchGenre(): Promise<{ id: string; name: string }[]> {
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
    })

    const data = await res.json()
    return data.genres
}

export default async function Sidebar() {
    const genres = await fetchGenre()
    return (
        <nav className="w-50 p-4 border-r flex flex-col shrink-0 gap-1">
            <Button variant="outline" asChild>
                <Link href={"/"} className="justify-start py-5">
                    <Play />
                    All Movie
                </Link>
            </Button>

            {genres.map((genre) => {
                return (
                    <Button key={genre.id} variant="outline" asChild>
                        <Link
                            href={`/genre/${genre.name}/${genre.id}`}
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
