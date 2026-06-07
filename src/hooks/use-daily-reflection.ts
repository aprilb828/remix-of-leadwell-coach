import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ReflectionType = "morning" | "eod";

export function todayISO() {
  const d = new Date();
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}

type Fields = Record<string, string>;

export function useDailyReflection(type: ReflectionType) {
  const date = todayISO();
  const qc = useQueryClient();
  const queryKey = ["daily_reflection", type, date];

  const { data } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("daily_reflections")
        .select("fields")
        .eq("entry_date", date)
        .eq("entry_type", type)
        .maybeSingle();
      if (error) throw error;
      return (data?.fields as Fields | undefined) ?? {};
    },
  });

  const [local, setLocal] = useState<Fields>({});
  const hydrated = useRef(false);
  useEffect(() => {
    if (data && !hydrated.current) {
      setLocal(data);
      hydrated.current = true;
    }
  }, [data]);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const persist = (next: Fields) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      const { error } = await supabase
        .from("daily_reflections")
        .upsert(
          { entry_date: date, entry_type: type, fields: next },
          { onConflict: "entry_date,entry_type" },
        );
      if (!error) {
        qc.invalidateQueries({ queryKey: ["daily_reflections_history"] });
      }
    }, 700);
  };

  const setField = (key: string, value: string) => {
    setLocal((prev) => {
      const next = { ...prev, [key]: value };
      persist(next);
      return next;
    });
  };

  const reset = async () => {
    setLocal({});
    if (timerRef.current) clearTimeout(timerRef.current);
    await supabase
      .from("daily_reflections")
      .upsert(
        { entry_date: date, entry_type: type, fields: {} },
        { onConflict: "entry_date,entry_type" },
      );
    qc.invalidateQueries({ queryKey });
    qc.invalidateQueries({ queryKey: ["daily_reflections_history"] });
  };

  return { fields: local, setField, reset, date };
}
