
CREATE TABLE public.voice_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  log_type TEXT NOT NULL,
  name TEXT,
  area TEXT,
  details TEXT,
  action_taken TEXT,
  follow_up_needed BOOLEAN NOT NULL DEFAULT false,
  follow_up_date DATE,
  notes TEXT,
  transcript TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.voice_entries TO anon, authenticated;
GRANT ALL ON public.voice_entries TO service_role;
ALTER TABLE public.voice_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read voice entries (demo)" ON public.voice_entries FOR SELECT USING (true);
CREATE POLICY "Public insert voice entries (demo)" ON public.voice_entries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete voice entries (demo)" ON public.voice_entries FOR DELETE USING (true);

CREATE TABLE public.daily_reflections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_date date NOT NULL,
  entry_type text NOT NULL CHECK (entry_type IN ('morning','eod')),
  fields jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (entry_date, entry_type)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.daily_reflections TO anon, authenticated;
GRANT ALL ON public.daily_reflections TO service_role;
ALTER TABLE public.daily_reflections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read daily reflections (demo)" ON public.daily_reflections FOR SELECT USING (true);
CREATE POLICY "Public insert daily reflections (demo)" ON public.daily_reflections FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update daily reflections (demo)" ON public.daily_reflections FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete daily reflections (demo)" ON public.daily_reflections FOR DELETE USING (true);

CREATE TABLE public.long_term_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','paused','done')),
  target_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.long_term_goals TO anon, authenticated;
GRANT ALL ON public.long_term_goals TO service_role;
ALTER TABLE public.long_term_goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read goals (demo)" ON public.long_term_goals FOR SELECT USING (true);
CREATE POLICY "Public insert goals (demo)" ON public.long_term_goals FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update goals (demo)" ON public.long_term_goals FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete goals (demo)" ON public.long_term_goals FOR DELETE USING (true);

CREATE TABLE public.goal_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id uuid NOT NULL REFERENCES public.long_term_goals(id) ON DELETE CASCADE,
  update_type text NOT NULL DEFAULT 'progress' CHECK (update_type IN ('progress','action','milestone','blocker','note')),
  summary text NOT NULL,
  details text,
  transcript text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.goal_updates TO anon, authenticated;
GRANT ALL ON public.goal_updates TO service_role;
ALTER TABLE public.goal_updates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read goal updates (demo)" ON public.goal_updates FOR SELECT USING (true);
CREATE POLICY "Public insert goal updates (demo)" ON public.goal_updates FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update goal updates (demo)" ON public.goal_updates FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete goal updates (demo)" ON public.goal_updates FOR DELETE USING (true);

CREATE INDEX idx_goal_updates_goal_id ON public.goal_updates(goal_id, created_at DESC);

CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS trigger
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

CREATE TRIGGER trg_daily_reflections_updated BEFORE UPDATE ON public.daily_reflections
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_long_term_goals_updated BEFORE UPDATE ON public.long_term_goals
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
