import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yeavrdjpakjxpdelxmob.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllYXZyZGpwYWtqeHBkZWx4bW9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzMDc0NjIsImV4cCI6MjA0NTg4MzQ2Mn0.AVvZLHbLP_6W0CdLICYhY6g-VCvxCSx2Qa0MUsaJvto';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
