'use client';
import { usePathname } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import { getCollectionNamesHelper } from "@/app/server_actions/action";
import { DarkMode } from "../toggles/Dark_Mode/darkModeContext";

interface NavLinkProps {
  closeMenu?: () => void;
}

const removeAfterFirstSlash = (url: string) => {
  const parts = url.split('/');
  return parts.slice(0, 2).join('/'); // Keep only the first part
}

const NavLinks: React.FC<NavLinkProps> = ({ closeMenu }) => {
  const pathname = usePathname();
  const parentPath = removeAfterFirstSlash(pathname);
  const { darkMode } = DarkMode();

  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [collections, setCollections] = useState<{ name: string; href: string; }[]>([]);

  const handleMouseEnter = (name: string) => {
    setDropdownOpen(name);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(null);
  };

  useEffect(() => {
    const getCollectionLinks = async () => {
      const collectionNames = await getCollectionNamesHelper();
      const collections = collectionNames.map((info: any) => {
        return {
          name: info.title,
          href: `/collections/${info.handle}`
        }
      })
      setCollections(collections.reverse());
    }
    getCollectionLinks();
    return () => {
      console.log("component unmounted")
    };
  }, [])

  const links = [
    { name: 'Home', href: '/' },
    { 
      name: 'Shop', 
      href: '/collections', 
      subLinks: collections
    },
    { name: 'Lookbook', 
      href: '/lookbook',
    },
    { 
      name: 'About', 
      href: '/about',
      subLinks: [
        { name: 'FAQ', href: '/about/faq' },
      ]
    },
    { name: "Yoyo & Friends", href: '/yoyo-friends' },
  ];

  return (
    <Suspense fallback={<div className="flex justify-self-center self-center h-screen">Loading...</div>}>
      {links.map((link) => (
        <div
          key={link.name}
          className="relative h-12 mx-0.5 lg:h-full flex justify-center items-center bg-transparent"
        >
          <Link
            onClick={closeMenu}
            href={link.href}
            passHref={true}
            onMouseEnter={() => link.subLinks && handleMouseEnter(link.name)}
            onMouseLeave={handleMouseLeave}
            className={clsx(
              `flex h-full w-3/4 lg:w-32 items-center justify-center text-center transition duration-450 ease-in-out relative hover:text-red-800 px-2 max-lg:rounded-lg ${darkMode ? 'dark-text' : 'light-text'}`,
              {
                'text-red-800': parentPath === link.href,
                'text-black/60': parentPath !== link.href,
              }
            )}
          >
            <p className="block max-lg:text-lg text-base">{link.name}</p>
          </Link>

          {/* Always render dropdown */}
          <div
            className={clsx(
              `absolute right-0 lg:left-0 w-48 top-full text-sm z-10 text-end transition-opacity duration-450 ease-in-out rounded-md ${darkMode ? "bg-stone-900/95 dark-text" : "bg-white/95 light-text"}`,
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
                onMouseEnter={() => link.subLinks && handleMouseEnter(link.name)}
                onMouseLeave={handleMouseLeave}
                className={clsx(
                  'block p-3 text-black/70 hover:text-red-800 transition duration-450 rounded-lg',
                  
                )}
                onClick={closeMenu}
              >
                <p className="flex justify-end items-center text-base lg:text-sm">{subLink.name}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}

    </Suspense>
  );
};

export default NavLinks;