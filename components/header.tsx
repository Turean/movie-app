import { Clapperboard, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

const handleSearch = async function (form: FormData) {
    "use server"

    const q = (form.get("q") as string | null)?.trim() ?? ""
    const mediaParam = form.get("media")
    const media = mediaParam === "tv" ? "tv" : "movie"

    if (!q) {
        redirect(`/?media=${media}`)
    }

    redirect(`/search?q=${encodeURIComponent(q)}&media=${media}`)
}

export default function Header() {
    return (
        <header className="p-4 border-b flex justify-between items-center">
            <h1 className="text-3xl font-bold flex flex-row items-center gap-2">
                <Clapperboard />
                Movie App
            </h1>

            <form className="flex gap-2" action={handleSearch}>
                <Input placeholder="Search..." name="q" />
                <select
                    name="media"
                    defaultValue="movie"
                    className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm">
                    <option value="movie">Movies</option>
                    <option value="tv">Series</option>
                </select>
                <Button type="submit">
                    <Search />
                </Button>
            </form>
        </header>
    )
}
