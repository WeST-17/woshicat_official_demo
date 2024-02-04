import Link from "next/link";

export default function Footer() {
    return (
        <div className="col-span-8 grid grid-flow-col grid-rows-3 grid-cols-8 flex self-end items-end justify-center h-[300px] w-full bg-stone-100 text-base text-stone-700 p-2">
            <div className="text-start w-full self-end row-start-3 row-span-1 col-span-8">
                &copy; Wo Shi Cat, 2024
            </div>
        
        </div>
    )
}