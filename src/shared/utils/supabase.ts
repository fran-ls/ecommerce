
import { createClient } from '@supabase/supabase-js';
import envs from '../../config/envs';

const supabaseUrl = envs.SUPABASE_URL;
const supabaseKey = envs.SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
