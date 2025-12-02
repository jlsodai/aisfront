import Link from "next/link"

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                <svg
                    className="h-5 w-5 text-accent-foreground"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                </svg>
            </div>
            <span className="text-xl font-semibold text-foreground">AI Safety Connect</span>
        </Link>
    )
}