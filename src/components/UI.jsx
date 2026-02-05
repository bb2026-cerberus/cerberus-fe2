import React from "react";
import { Check } from "lucide-react";

export const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl bg-white shadow-card border border-ink-100 overflow-hidden ${className}`}>
    {children}
  </div>
);

export const IconButton = ({ label, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="h-10 w-10 rounded-full bg-white border border-ink-100 shadow-sm flex items-center justify-center active:scale-[0.98]"
  >
    {children}
  </button>
);

export const Chip = ({ tone = "gray", children }) => {
  const map = {
    red: "bg-red-50 text-red-500",
    blue: "bg-brand-50 text-brand-600",
    gray: "bg-ink-100 text-ink-500",
    orange: "bg-orange-50 text-orange-500",
  };
  return (
    <span className={`inline-flex items-center px-2 py-[3px] rounded-full text-[11px] font-semibold ${map[tone]}`}>
      {children}
    </span>
  );
};

export const CircleCheck = ({ checked, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="h-7 w-7 rounded-full flex items-center justify-center active:scale-[0.98]"
    aria-label={checked ? "완료됨" : "미완료"}
  >
    {checked ? (
      <div className="h-7 w-7 rounded-full bg-ink-100 flex items-center justify-center">
        <Check className="h-4 w-4 text-ink-700" />
      </div>
    ) : (
      <div className="h-7 w-7 rounded-full border border-ink-300" />
    )}
  </button>
);

export const DatePill = ({ children }) => (
  <span className="inline-flex items-center px-2 py-1 rounded-full bg-ink-100 text-ink-500 text-[11px]">
    {children}
  </span>
);

export const PrimaryPill = ({ children }) => (
  <span className="inline-flex items-center px-2 py-1 rounded-full bg-brand-600 text-white text-[11px] font-semibold">
    {children}
  </span>
);

export const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-[420px] bg-white rounded-t-3xl p-4 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[15px] font-bold text-ink-900">{title}</p>
          <button className="text-ink-500 text-sm px-2 py-1" onClick={onClose}>닫기</button>
        </div>
        {children}
      </div>
    </div>
  );
};
