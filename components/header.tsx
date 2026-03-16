import { Clapperboard, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Header() {
    return (
        <header className="p-4 border-b flex justify-between items-center">
            <h1 className="text-3xl font-bold flex flex-row items-center gap-2">
                <Clapperboard />
                Movie App
            </h1>

            <form className="flex gap-2">
                <Input placeholder="Search..." />
                <Button type="submit">
                    <Search />
                </Button>
            </form>
        </header>
    )
}
