import { usePathname } from "next/navigation";
import { Suspense } from "react";
import clsx from "clsx";
import Link from "next/link";

interface NavLinkProps {
  closeMenu: () => void;
}

const links = [
  { name: 'Home', href: '/'},
  { name: 'Collections', href:'/collections'},
  { name: 'Brand', href:'/brand'},
  { name: "Yoyo's Story", href:'/yoyo_story'},
]

const NavLinks: React.FC<NavLinkProps> = ({ closeMenu }) => {
    const pathname = usePathname();

    return (
      <Suspense fallback={<div className="flex justify-self-center self-center h-[100vh]">Loading...</div>}>
        {links.map((link) => (
          <Link
            onClick={closeMenu}
            key={link.name}
            href={link.href}
            passHref={true}
            className={clsx(
              'flex h-[32px] w-full items-center justify-center text-end p-4 rounded-sm text-md hover:text-stone-900 transition duration-500 ease-in-out',
              {
                'text-stone-800': pathname === link.href,
                'text-stone-400': pathname != link.href
              },
            )}
          >
            <p className="block">{link.name}</p>
          </Link>
          )
        )}
      </Suspense>
    )
};

export default NavLinks;