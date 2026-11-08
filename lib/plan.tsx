"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type PlanItem = { id: string; title: string; kind: string; image?: string };

type Ctx = {
  items: PlanItem[];
  liked: string[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (i: PlanItem | PlanItem[]) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  toggleLike: (id: string) => void;
  isLiked: (id: string) => boolean;
  clear: () => void;
  toast: string | null;
};

const PlanCtx = createContext<Ctx | null>(null);
const KEY = "srr-plan-v1";

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<PlanItem[]>([]);
  const [liked, setLiked] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "{}");
      if (Array.isArray(s.items)) setItems(s.items);
      if (Array.isArray(s.liked)) setLiked(s.liked);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ items, liked }));
    } catch {}
  }, [items, liked]);

  const flash = useCallback((m: string) => {
    setToast(m);
    window.clearTimeout((flash as any)._t);
    (flash as any)._t = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const add = useCallback(
    (i: PlanItem | PlanItem[]) => {
      const arr = Array.isArray(i) ? i : [i];
      setItems((prev) => {
        const next = [...prev];
        arr.forEach((x) => !next.some((p) => p.id === x.id) && next.push(x));
        return next;
      });
      flash(arr.length > 1 ? `${arr.length} items added to your plan` : `Added “${arr[0].title}” to your plan`);
    },
    [flash]
  );

  const value = useMemo<Ctx>(
    () => ({
      items,
      liked,
      open,
      setOpen,
      add,
      remove: (id) => setItems((p) => p.filter((x) => x.id !== id)),
      has: (id) => items.some((x) => x.id === id),
      toggleLike: (id) => setLiked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])),
      isLiked: (id) => liked.includes(id),
      clear: () => setItems([]),
      toast,
    }),
    [items, liked, open, add, toast]
  );
  return <PlanCtx.Provider value={value}>{children}</PlanCtx.Provider>;
}

export const usePlan = () => {
  const c = useContext(PlanCtx);
  if (!c) throw new Error("usePlan outside provider");
  return c;
};
