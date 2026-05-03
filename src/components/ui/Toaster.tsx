"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

let toastQueue: Toast[] = [];
let listeners: Array<(toasts: Toast[]) => void> = [];

export function toast(type: "success" | "error", message: string) {
  const id = Math.random().toString(36).slice(2);
  toastQueue = [...toastQueue, { id, type, message }];
  listeners.forEach((l) => l(toastQueue));
  setTimeout(() => {
    toastQueue = toastQueue.filter((t) => t.id !== id);
    listeners.forEach((l) => l(toastQueue));
  }, 5000);
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handler = (t: Toast[]) => setToasts([...t]);
    listeners.push(handler);
    return () => {
      listeners = listeners.filter((l) => l !== handler);
    };
  }, []);

  const remove = (id: string) => {
    toastQueue = toastQueue.filter((t) => t.id !== id);
    listeners.forEach((l) => l(toastQueue));
  };

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border animate-fade-up"
          style={{
            background: t.type === "success" ? "#161616" : "#1A0808",
            borderColor: t.type === "success" ? "rgba(212,175,55,0.3)" : "rgba(220,38,38,0.3)",
          }}
        >
          {t.type === "success" ? (
            <CheckCircle className="text-[#D4AF37] shrink-0" size={20} />
          ) : (
            <XCircle className="text-red-400 shrink-0" size={20} />
          )}
          <span className="text-sm text-white">{t.message}</span>
          <button
            onClick={() => remove(t.id)}
            className="ml-2 text-gray-500 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
