
-- Create a table to store music submissions
CREATE TABLE public.music_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  song_name TEXT NOT NULL,
  spotify_link TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (optional - can be disabled for public submissions)
ALTER TABLE public.music_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert submissions (public form)
CREATE POLICY "Anyone can submit music" 
  ON public.music_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow anyone to view submissions (if needed later)
CREATE POLICY "Anyone can view submissions" 
  ON public.music_submissions 
  FOR SELECT 
  USING (true);
