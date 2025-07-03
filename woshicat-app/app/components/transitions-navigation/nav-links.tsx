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
          className="relative group"
        >
          <Link
            onClick={closeMenu}
            href={link.href}
            passHref={true}
            className={clsx(
              'flex h-[32px] w-full items-center justify-start text-end p-2 rounded-sm text-sm hover:text-stone-900 transition duration-150 ease-in-out',
              {
                'text-black': parentPath === link.href,
                'text-stone-400': parentPath !== link.href,
              }
            )}
          >
            <p className="block max-md:text-lg">{link.name}</p>
          </Link>

          {/* Always render dropdown */}
          <div
            className={clsx(
              "absolute w-48 text-sm md:right-0 right-4/5 bg-white z-10 text-end transition-opacity duration-300 ease-in-out",
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
                <p className="block max-md:text-lg">{subLink.name}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}

    </Suspense>
  );
};

export default NavLinks;