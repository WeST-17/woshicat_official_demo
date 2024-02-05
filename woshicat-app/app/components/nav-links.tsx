import { useNavigation } from "./useNavigation";
import clsx from "clsx";
import Link from "next/link";

interface NavLinkProps {
  closeMenu: () => void;
}

const links = [
  { name: 'Home', href: '/'},
  { name: 'Apparel', href: 'apparel'}
]

const NavLinks: React.FC<NavLinkProps> = ({ closeMenu }) => {
    const nav = useNavigation();

    return (
      <>
        {links.map((link) => (
          <Link
            onClick={closeMenu}
            key={link.name}
            href={link.href}
            passHref={true}
            className={clsx(
              'flex h-[48px] w-full items-center justify-end text-end p-4 rounded-sm bg-gray-50 text-2xl mt-1 hover:bg-stone-300 transition duration-500 ease-in-out',
              {
                'text-stone-700 bg-stone-200': nav.pathname === link.href,
                'bg-stone-50': nav.pathname != link.href
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

export default NavLinks;