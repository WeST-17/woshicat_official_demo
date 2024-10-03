'use client';
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

interface NavLinkProps {
  closeMenu: () => void;
}

const links = [
  { name: 'Home', href: '/' },
  { 
    name: 'Shop Collections', 
    href: '/collections', 
    subLinks: [
      { name: 'Metro Daydreams', href: '/collections/metro-daydreams'},
    ]
  },
  { name: 'Lookbook', 
    href: '/lookbook',
    subLinks: [
      {name: 'Metro Daydreams', href: '/lookbook/metro-daydreams'}
    ],
  },
  { 
    name: 'Brand', 
    href: '/brand/about',
    subLinks: [
      { name: 'About', href: '/brand/about'},
      { name: 'FAQ', href: '/brand/faq'},
    ]
  },
  { name: "Yoyo & Friends", href: '/yoyo-friends' },
];


interface NavLinkProps {
  closeMenu: () => void;
}

function removeAfterFirstSlash(url: string) {
  const parts = url.split('/');
  return parts.slice(0, 2).join('/'); // Keep only the first part
}

const NavLinks: React.FC<NavLinkProps> = ({ closeMenu }) => {
  const pathname = usePathname();
  const parentPath = removeAfterFirstSlash(pathname);

  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const handleMouseEnter = (name: string) => {
    setDropdownOpen(name);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(null);
  };

  return (
    <Suspense fallback={<div className="flex justify-self-center self-center h-[100vh]">Loading...</div>}>
      {links.map((link) => (
        <div
          key={link.name}
          onMouseEnter={() => link.subLinks && handleMouseEnter(link.name)}
          onMouseLeave={handleMouseLeave}
          className="relative group"
        >
          <Link
            onClick={closeMenu}
            href={link.href}
            passHref={true}
            className={clsx(
              'flex h-[32px] max-md:w-full w-fit items-center justify-start text-end p-2 rounded-sm text-sm hover:text-stone-900 transition duration-150 ease-in-out',
              {
                'text-black': parentPath === link.href,
                'text-stone-400': parentPath !== link.href,
              }
            )}
          >
            <p className="block">{link.name}</p>
          </Link>

          {/* Always render dropdown */}
          <div
            className={clsx(
              "absolute w-40 text-sm md:right-0 right-4/5 bg-white z-10 text-end transition-opacity duration-300 ease-in-out",
              {
                'opacity-100 visible': dropdownOpen === link.name,
                'opacity-0 invisible': dropdownOpen !== link.name,
              }
            )}
          >
            {link.subLinks?.map((subLink) => (
              <Link
                key={subLink.name}
                href={subLink.href}
                passHref={true}
                className={clsx(
                  'block px-2 py-2 text-stone-400 hover:text-black transition duration-150',
                  
                )}
                onClick={closeMenu}
              >
                {subLink.name}
              </Link>
            ))}
          </div>
        </div>
      ))}

    </Suspense>
  );
};

export default NavLinks;