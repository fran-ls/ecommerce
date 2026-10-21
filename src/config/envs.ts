interface AdminUser {
   email: string;
   password: string;
}

interface Envs {
   SUPABASE_URL: string;
   SUPABASE_PUBLISHABLE_DEFAULT_KEY: string;
   ADMIN_USER: AdminUser;
}

const ENV: any = { ...import.meta.env }

const jsonKeys = [
   'VITE_ADMIN_USER',
]

const envVarKeys = [
   'VITE_SUPABASE_URL',
   'VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY',
   ...jsonKeys
]

const envs: any = {}
const prefix = 'VITE_';

for (let key of envVarKeys) {
   const k = key.startsWith(prefix) ? key.replace(prefix, '') : key;

   if (jsonKeys.includes(key)) {
      envs[k] = JSON.parse(ENV[key]);
   }
   else {
      envs[k] = ENV[key];
   }
}

export default envs as Envs;