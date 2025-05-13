"use client";

import { Upload } from "lucide-react";
import { FormLabel } from "@/components/ui/form";
import { useState, useRef } from "react";

export default function FileUploader({
  onFileChange,
}: {
  onFileChange?: (file: File | null) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handler untuk mengklik seluruh area upload
  const handleAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handler untuk drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  // Handler untuk drop dan file change
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  // Process file
  const handleFile = (file: File) => {
    // Validasi tipe file
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    if (!validTypes.includes(file.type)) {
      alert("Hanya file PNG, JPG, atau GIF yang diijinkan!");
      return;
    }

    // Validasi ukuran file (10MB = 10 * 1024 * 1024 bytes)
    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran file maksimal 10MB!");
      return;
    }

    // Set nama file untuk tampilan
    setFileName(file.name);

    // Callback untuk parent component
    if (onFileChange) {
      onFileChange(file);
    }
  };

  // Handler untuk menghapus file
  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Mencegah trigger click area
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onFileChange) {
      onFileChange(null);
    }
  };

  return (
    <div>
      <FormLabel>Foto Barang (Opsional)</FormLabel>
      <div
        className={`mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10 cursor-pointer transition-colors duration-200 ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-input hover:border-primary/50 hover:bg-muted/50"
        }`}
        onClick={handleAreaClick}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <Upload
            className={`mx-auto h-12 w-12 ${
              isDragging ? "text-primary" : "text-muted-foreground"
            }`}
          />

          <div className="mt-4 flex text-sm leading-6 text-muted-foreground items-center justify-center">
            {fileName ? (
              <>
                <span className="font-medium text-primary">{fileName}</span>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="ml-2 text-xs text-red-500 hover:text-red-700"
                >
                  Hapus
                </button>
              </>
            ) : (
              <>
                <span className="relative rounded-sm px-1 bg-background font-semibold text-primary focus-within:outline-none">
                  Upload file
                </span>
                <p className="p-1">atau drag and drop</p>
              </>
            )}
            <input
              ref={fileInputRef}
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={handleFileChange}
              accept=".png,.jpg,.jpeg,.gif"
            />
          </div>

          {!fileName && (
            <p className="text-xs leading-5 text-muted-foreground mt-1">
              PNG, JPG, GIF up to 10MB
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
