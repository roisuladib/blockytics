import { FILE_EXTENSION, isBrowser } from '^lib';

export const replaceQuotes = (value: string | undefined) => value?.replaceAll("'", '"');

export function getEnvValue(envName: keyof IProcessEnv) {
   const envs = process.env ?? {};

   if (isBrowser() && envs.NEXT_PUBLIC_APP_INSTANCE === 'pw') {
      const storageValue = localStorage.getItem(envName);

      if (typeof storageValue === 'string') {
         return storageValue;
      }
   }

   return replaceQuotes(envs[envName]);
}

export function parseEnvJson<DataType>(env?: string): DataType | null {
   try {
      return JSON.parse(env || 'null');
   } catch {
      return null;
   }
}

export function getExternalAssetFilePath(envName: keyof IProcessEnv) {
   const parsedValue = getEnvValue(envName);

   if (!parsedValue) return;

   return buildExternalAssetFilePath(envName, parsedValue);
}

export function buildExternalAssetFilePath(name: keyof IProcessEnv, value: string) {
   try {
      const fileName = name
         .replace(/^NEXT_PUBLIC_/, '')
         .replace(/_URL$/, '')
         .toLowerCase();

      const fileExtension = getAssetFileExtension(value);

      if (!fileExtension) {
         throw new Error('Cannot get file path');
      }

      return `/assets/configs/${fileName}.${fileExtension}`;
   } catch {
      return;
   }
}

function getAssetFileExtension(value: string) {
   try {
      const url = new URL(value);

      return url.pathname.match(FILE_EXTENSION)?.[1];
   } catch {
      return parseEnvJson(value) ? 'json' : undefined;
   }
}
