import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseClient = createClient('https://jenobpzdaweffhnznneu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Implbm9icHpkYXdlZmZobnpubmV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwMzM0NDksImV4cCI6MjAzMDYwOTQ0OX0.-rcaiXiWfx7VuubPE0gwHSptpUVJ39zLyIWEeiOzq7w')


export default supabaseClient