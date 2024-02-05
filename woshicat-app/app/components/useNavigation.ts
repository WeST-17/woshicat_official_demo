'use client'
import { usePathname, useSearchParams } from 'next/navigation';

export function useNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return {
    pathname,
    searchParams,
    url: `${pathname}`,
  };
}
