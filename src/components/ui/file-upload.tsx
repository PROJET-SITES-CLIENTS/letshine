"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";

interface FileUploadProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
}

export function FileUpload({ label = "Fichier", value, onChange, accept = "image/*,video/*,application/pdf" }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'upload");
      }

      const blob = await response.json();
      onChange(blob.url);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'upload du fichier. Vérifiez votre configuration Vercel Blob.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="w-full">
      <label className="block text-[13px] font-medium text-[#003366] mb-1">{label}</label>
      
      {value ? (
        <div className="relative w-full border border-gray-200 rounded-lg p-2 bg-gray-50">
          <div className="flex items-center gap-3">
            {value.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) ? (
              <img src={value} alt="Aperçu" className="w-16 h-16 object-cover rounded shadow-sm" />
            ) : value.match(/\.(mp4|webm|ogg)$/i) ? (
              <video src={value} className="w-16 h-16 object-cover rounded shadow-sm" muted />
            ) : (
              <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded text-xs text-gray-500 text-center break-all p-1">Doc</div>
            )}
            <div className="flex-1 text-sm text-gray-600 truncate mr-8">
              {value}
            </div>
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2 right-2 p-1.5 bg-white border border-gray-200 rounded-full text-red-500 hover:bg-red-50 transition-colors shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-[#003366]/20 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer bg-white hover:bg-[#003366]/5 hover:border-[#003366]/40 transition-colors group relative"
        >
          {isUploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="w-8 h-8 text-[#003366] animate-spin mb-2" />
              <span className="text-sm font-medium text-[#003366]">Envoi en cours...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#003366]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-5 h-5 text-[#003366]" />
              </div>
              <span className="text-sm font-medium text-[#003366]">Cliquez pour importer un fichier</span>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={accept}
            className="hidden"
            disabled={isUploading}
          />
        </div>
      )}
    </div>
  );
}
