import { MediaItemType, MediaType } from "@/types/global"
import Link from "next/link"

const posterUrl = "http://image.tmdb.org/t/p/w185"

export default function Movie({
    movie,
    media,
}: {
    movie: MediaItemType
    media: MediaType
}) {
    const title = movie.title ?? movie.name ?? "Untitled"
    const date = movie.release_date ?? movie.first_air_date
    const year = date ? date.split("-")[0] : "N/A"

    return (
        <div className="w-46 flex flex-col gap-1 text-center">
            <Link href={`/view/${movie.id}?media=${media}`}>
                {movie.poster_path ? (
                    <img
                        className="hover:scale-105 transition-all"
                        src={posterUrl + movie.poster_path}
                        alt={title}
                    />
                ) : (
                    <div className="bg-gray-300 h-69"></div>
                )}
            </Link>
            <div className="font-bold">
                <Link href={`/view/${movie.id}?media=${media}`}>{title}</Link>
            </div>
            <span>{year}</span>
        </div>
    )
}
