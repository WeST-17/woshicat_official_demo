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
          className={`w-full relative h-15 mx-0.5 lg:h-full flex justify-center items-center`}
        >
          <Link
            onClick={closeMenu}
            href={link.href}
            passHref={true}
            onMouseEnter={() => link.subLinks && handleMouseEnter(link.name)}
            onMouseLeave={handleMouseLeave}
            className={clsx(
              `flex h-full w-3/4 max-lg:mx-auto lg:w-32 items-center justify-center text-center transition duration-450 ease-in-out relative px-2 max-lg:rounded-lg ${parentPath === link.href ? 'text-red-800' : `${darkMode  ? 'dark-text' : 'light-text'} opacity-80`}`
            )}
          >
            <p className="block max-lg:text-lg text-base">{link.name}</p>
          </Link>

          {/* Always render dropdown */}
          <div
            className={clsx(
              `absolute right-0 w-2/4 lg:w-48 top-full text-sm z-10 text-end opacity-0 transition-all duration-350 rounded-[8px] ${darkMode ? "bg-stone-600/95 dark-text" : "bg-stone-200/95 light-text"} ${dropdownOpen === link.name ? 'opacity-100 menu-text visible' : 'invisible'}`
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
                  'block p-3 text-black/70 hover:text-red-800 transition duration-350 rounded-lg',
                  
                )}
                onClick={closeMenu}
              >
                <p className="flex justify-start w-full text-start items-center text-sm">{subLink.name}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}

    </Suspense>
  );
};

export default NavLinks;