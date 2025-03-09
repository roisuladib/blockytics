export function objectToParams(obj: Record<string, string | number | boolean | null | undefined>) {
   const filteredObj = Object.fromEntries(
      Object.entries(obj).filter(
         ([_, value]) =>
            value !== undefined && value !== null && !(typeof value === 'string' && value === ''),
      ),
   );

   const params = new URLSearchParams(filteredObj as Record<string, string>).toString();

   return params ? `?${params}` : '';
}
