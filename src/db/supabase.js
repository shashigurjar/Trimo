import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = "https://dxdjwbihvlstzmhvulgw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4ZGp3YmlodmxzdHptaHZ1bGd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MjA3MDEsImV4cCI6MjA2OTk5NjcwMX0.hhb3UB1IXSKaxTtswp5upLWY_-E7OymZEyUqP3VIK8c";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;