import React from "react";

export function FieldInput({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="input-shine rounded-md px-3 py-2 text-sm w-full" />
    </div>
  );
}

export function FieldTextarea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="block text-[11px] text-[#5C6573] mb-1.5 font-medium uppercase tracking-wider">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className="input-shine rounded-md px-3 py-2 text-sm w-full resize-none" />
    </div>
  );
}

