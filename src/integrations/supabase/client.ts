
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://taoosbosxdjalsnrwqln.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhb29zYm9zeGRqYWxzbnJ3cWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNTU5OTAsImV4cCI6MjA2MzYzMTk5MH0.UvsKWOn-9l-MEzCrtTWsHNmBU68_QO3VV4nQQJ6Q1Z8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
