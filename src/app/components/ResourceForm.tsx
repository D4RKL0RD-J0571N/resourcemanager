"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

interface ResourceFormProps {
  onSubmit: (data: { name: string; type: string; file?: File }) => void;
  loading: boolean;
  initialData?: { name: string; type: string };
  onCancel?: () => void; // Add cancel callback for edit mode
}

export default function ResourceForm({ onSubmit, loading, initialData, onCancel }: ResourceFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [type, setType] = useState(initialData?.type || "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Update form when initialData changes (edit mode)
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setType(initialData.type);
    }
  }, [initialData]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const selected = acceptedFiles[0];
    setFile(selected);

    if (selected.type.startsWith("image/") || selected.type.startsWith("audio/") || selected.type.startsWith("video/")) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 
      "image/*": [], 
      "audio/*": [], 
      "video/*": [],
      ".obj": [], 
      ".glb": [],
      ".gltf": []
    },
    multiple: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, type, file: file || undefined });
    
    // Only reset if not in edit mode
    if (!initialData) {
      setName("");
      setType("");
      setFile(null);
      setPreview(null);
    }
  };

  const handleCancel = () => {
    setName("");
    setType("");
    setFile(null);
    setPreview(null);
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Resource Name
          </label>
          <input
            type="text"
            placeholder="e.g., Mountain Landscape"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Resource Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all"
          >
            <option value="">Select a type</option>
            <option value="image">🖼️ Image</option>
            <option value="video">🎬 Video</option>
            <option value="audio">🎵 Audio</option>
            <option value="3D Model">📦 3D Model</option>
          </select>
        </div>
      </div>

      {/* Dropzone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Upload File {initialData && <span className="text-xs text-gray-500">(optional - leave empty to keep current file)</span>}
        </label>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragActive 
              ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20" 
              : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50"
          }`}
        >
          <input {...getInputProps()} />
          
          {file ? (
            <div className="space-y-2">
              <svg className="w-12 h-12 mx-auto text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-gray-700 dark:text-gray-200 font-medium">{file.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Click or drag to replace</p>
            </div>
          ) : (
            <div className="space-y-2">
              <svg className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-gray-600 dark:text-gray-300 font-medium">Drag & drop your file here</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">or click to browse</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Supports: Images, Videos, Audio, 3D Models
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Preview */}
      {preview && type === "image" && (
        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <img src={preview} alt="Preview" className="w-full max-h-64 object-cover" />
        </div>
      )}
      {preview && type === "video" && (
        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <video src={preview} controls className="w-full max-h-64">
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {preview && type === "audio" && (
        <audio controls className="w-full rounded-lg h-10">
          <source src={preview} />
        </audio>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        {initialData && (
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 px-4 py-3.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-all duration-200"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`${initialData ? 'flex-1' : 'w-full'} bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : initialData ? (
            "Update Resource"
          ) : (
            "Save Resource"
          )}
        </button>
      </div>
    </form>
  );
}