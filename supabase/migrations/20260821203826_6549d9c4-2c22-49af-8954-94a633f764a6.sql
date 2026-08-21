ALTER TABLE public.voice_entries ADD COLUMN IF NOT EXISTS device_id text;
ALTER TABLE public.daily_reflections ADD COLUMN IF NOT EXISTS device_id text;
ALTER TABLE public.long_term_goals ADD COLUMN IF NOT EXISTS device_id text;
ALTER TABLE public.goal_updates ADD COLUMN IF NOT EXISTS device_id text;

CREATE INDEX IF NOT EXISTS idx_voice_entries_device ON public.voice_entries(device_id);
CREATE INDEX IF NOT EXISTS idx_daily_reflections_device ON public.daily_reflections(device_id);
CREATE INDEX IF NOT EXISTS idx_long_term_goals_device ON public.long_term_goals(device_id);
CREATE INDEX IF NOT EXISTS idx_goal_updates_device ON public.goal_updates(device_id);

ALTER TABLE public.daily_reflections DROP CONSTRAINT IF EXISTS daily_reflections_entry_date_entry_type_key;
CREATE UNIQUE INDEX IF NOT EXISTS daily_reflections_device_date_type_key ON public.daily_reflections(device_id, entry_date, entry_type);