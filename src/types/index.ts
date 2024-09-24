import type { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
   size?: number;
};

export type Children = {
   children: React.ReactNode;
};

export type ClassName = {
   className?: string;
};

export type IsLoading = {
   isLoading?: boolean;
};

export type Params<T extends object> = {
   params: T;
};

export type SearchParams<T extends object> = {
   searchParams?: T;
};

export interface DataPagination<T> {
   items: T[];
   next_page_params: NextPageParams;
}

export interface NextPageParams {
   block_number: number;
   items_count: number;
}
