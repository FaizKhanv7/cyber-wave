import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://mhytytmqdjmquaqdgkdq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oeXR5dG1xZGptcXVhcWRna2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4Njc2MzQsImV4cCI6MjA5NDQ0MzYzNH0.Go4DjYL5g3TmOwLfF-WDSdjP57S9Ne9wFub5hVk5m-M'
);
