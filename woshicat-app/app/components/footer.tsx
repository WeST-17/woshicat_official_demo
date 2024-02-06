import Link from "next/link";

const Footer = () => {
    return (
        <footer className="col-span-8 grid grid-flow-col grid-rows-3 grid-cols-8 self-end items-end justify-center min-h-[300px] bg-stone-50 text-base text-stone-700 p-2 mt-16">
            <div className="text-start w-full self-end row-start-3 row-span-1 col-span-8">
                &copy; Wo Shi Cat, 2024
            </div>
        </footer>
    )
}

export default Footer;