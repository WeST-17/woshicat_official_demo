'use client';
import { usePathname } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import { getCollectionNamesHelper } from "@/app/server_actions/action";

interface NavLinkProps {
  closeMenu: () => void;
}


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
      // collections.push({
      //   name: 'Shop All',
      //   href: '/collections'
      // })
      setCollections(collections);
    }
    getCollectionLinks();
  }, [])

  const links = [
    { name: 'Home', href: '/' },
    { 
      name: 'Shop Collections', 
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
    <Suspense fallback={<div className="flex justify-self-center self-center h-[100vh]">Loading...</div>}>
      {links.map((link) => (
        <div
          key={link.name}
          onMouseEnter={() => link.subLinks && handleMouseEnter(link.name)}
          onMouseLeave={handleMouseLeave}
          className="relative h-16 lg:h-full flex justify-center items-center"
        >
          <Link
            onClick={closeMenu}
            href={link.href}
            passHref={true}
            className={clsx(
              'flex h-full w-3/4 lg:w-36 items-center justify-center text-end hover:text-white transition duration-450 ease-in-out relative hover:bg-red-900/85 px-2',
              {
                'text-white bg-red-900/70': parentPath === link.href,
                'text-black/50': parentPath !== link.href,
              }
            )}
          >
            <p className="block max-lg:text-lg text-base">{link.name}</p>
          </Link>

          {/* Always render dropdown */}
          <div
            className={clsx(
              "absolute lg:left-0 lg:w-64 w-3/4 top-full text-sm bg-white z-10 text-end transition-opacity duration-450 ease-in-out",
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
                  'block p-3 text-black/70 hover:text-white hover:bg-red-900/85 transition duration-450',
                  
                )}
                onClick={closeMenu}
              >
                <p className="flex justify-center items-center text-base lg:text-sm">{subLink.name}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}

    </Suspense>
  );
};

export default NavLinks;