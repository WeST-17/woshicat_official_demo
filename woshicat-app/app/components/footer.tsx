import Link from "next/link";

const Footer = () => {
    return (
        <footer className="col-span-8 grid grid-flow-col grid-rows-3 grid-cols-8 self-end items-end justify-center min-h-full bg-stone-50 text-base text-stone-700 p-2 mt-4">
            <div className="col-span-8 flex gap-4 justify-end text-lg">
                <Link href={'/privacy'}>Privacy Policy</Link>
                <Link href={'/terms_of_service'}>Terms of Service</Link>
                <Link href={'/faq'}>FAQ</Link>
                <Link href={'/contact_us'}>Contact Us</Link>
            </div>
            <div className="text-end w-full self-end justify-end row-start-3 row-span-1 col-start-6 col-end-9">
                &copy; Wo Shi Cat, 2024
            </div>
        </footer>
    )
}

export default Footer;