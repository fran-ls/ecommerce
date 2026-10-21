import { convertToCamelCase } from "./convertToCamelCase";
import { snakeCase } from "./convertToSnakeCase";

export const normalizeToJS = <T>(data: Record<string, any>): T => {
   const item: any = {}

   for (const [k, v] of Object.entries(data)) {
      const f = convertToCamelCase(k, '_');
      item[f] = v;
   }

   return item;
}

export const normalizeToDB = <T>(data: Record<string, any>, fields: readonly string[]): T => {
   const item: any = {}

   for (const [k, v] of Object.entries(data)) {
      const f = snakeCase(k);
      if (fields.includes(f)) item[f] = v;
   }

   return item;
}