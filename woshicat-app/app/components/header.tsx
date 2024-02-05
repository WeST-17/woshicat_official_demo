import Link from "next/link";
import Navigation from "./navbar";

export default function Header() {
    return (
        <header className="sticky top-0 flex self-start justify-end items-center col-span-8 h-[120px] bg-stone-50 text-base text-stone-700 p-2 z-[1000]">
            <div className="border-test p-4 me-auto text-4xl">
            {/* Logo Placeholder */}
            WS
            </div>
            <Navigation />
      </header>
    )
}