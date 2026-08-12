"use client";

import React, { useState, useRef, useCallback } from "react";
import { UploadCloud, X, Loader2, ImagePlus } from "lucide-react";

interface MultiFileUploadProps {
  label?: string;
  urls: string[];
  onChange: (urls: string[]) => void;
  accept?: string;
}

export function MultiFileUpload({ label = "Galerie d'images", urls = [], onChange, accept = "image/*" }: MultiFileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);

    const newUrls: string[] = [];

    for (const file of files) {
      try {
        const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
          method: "POST",
          body: file,
        });

        if (response.ok) {
          const blob = await response.json();
          newUrls.push(blob.url);
        }
      } catch (error) {
        console.error("Erreur pour le fichier", file.name, error);
      }
    }

    if (newUrls.length > 0) {
      onChange([...urls, ...newUrls]);
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeUrl = useCallback((indexToRemove: number) => {
    onChange(urls.filter((_, index) => index !== indexToRemove));
  }, [urls, onChange]);

  return (
    <div className="w-full">
      <label className="block text-[13px] font-medium text-[#003366] mb-2">{label}</label>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
        {urls.map((url, index) => (
          <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square bg-gray-50">
            {url.match(/\.(mp4|webm|ogg)$/i) ? (
              <video src={url} className="w-full h-full object-cover" muted />
            ) : (
              <img src={url} alt={`Aperçu ${index + 1}`} className="w-full h-full object-cover" />
            )}
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={() => removeUrl(index)}
                className="p-2 bg-white rounded-full text-red-500 hover:scale-110 transition-transform"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-[#003366]/30 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer bg-[#003366]/5 hover:bg-[#003366]/10 transition-colors"
        >
          {isUploading ? (
            <Loader2 className="w-6 h-6 text-[#003366] animate-spin" />
          ) : (
            <div className="flex flex-col items-center text-[#003366]">
              <ImagePlus className="w-6 h-6 mb-1" />
              <span className="text-[11px] font-medium">Ajouter</span>
            </div>
          )}
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFilesChange}
        accept={accept}
        multiple
        className="hidden"
        disabled={isUploading}
      />
    </div>
  );
}
