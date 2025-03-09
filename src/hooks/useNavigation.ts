import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useNavigation() {
   const router = useRouter();
   const params = useParams();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   return {
      router,
      params,
      pathname,
      searchParams,
   };
}
