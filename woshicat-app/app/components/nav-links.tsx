'use client';
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

const links = [
  { name: 'Home', href: '/'},
  { name: 'New Arrivals', href: '/new-arrivals'},
  { name: 'Best Sellers', href: '/best-sellers'},
  { name: 'Apparel', href: 'apparel'}
]

export default function NavLinks() {
    const pathname = usePathname();

    return (
      <>
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            passHref={true}
            className={clsx(
              'flex h-[48px] w-full items-center justify-end text-end p-4 rounded-sm bg-gray-50 text-2xl mt-1 hover:bg-stone-300 transition duration-500 ease-in-out',
              {
                'text-stone-700 bg-stone-200': pathname === link.href,
                'bg-stone-50': pathname != link.href
              },
            )}
          >
            <p className="block">{link.name}</p>
          </Link>
          )
        )}
      </>
    )
};
