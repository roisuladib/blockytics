export function isBodyAllowed(method?: string) {
   return !!method && !['GET', 'HEAD'].includes(method);
}
