import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ntaljfisluebkhmbwfdj.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50YWxqZmlzbHVlYmtobWJ3ZmRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU3ODQzNzYsImV4cCI6MjEwMTM2MDM3Nn0.XbzCBY2glnWtx9ZneI5NOa8jl2CkO84r5uQcee94T-U"

export const supabase = createClient(supabaseUrl, supabaseKey)
