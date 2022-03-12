import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://onfgtupupwuytnnfhpke.supabase.co';
const SUPABASE_PUBLIC_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZmd0dXB1cHd1eXRubmZocGtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDY5MzcwMTksImV4cCI6MTk2MjUxMzAxOX0.YBNUwyO_U6iqauczC8lcNTvmbhRoKZwbx4RQV7h1__s';

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);

export default supabase;
