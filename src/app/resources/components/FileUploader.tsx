"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
    onFileSelected: (file: File, type: string, previewUrl: string | null) => void;
}

export default function FileUploader({ onFileSelected }: Props) {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (!acceptedFiles.length) return;

            const file = acceptedFiles[0];
            const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
            let type = "other";

            if (["obj", "glb"].includes(ext)) type = "3D Model";
            else if (file.type.startsWith("image/")) type = "image";
            else if (file.type.startsWith("audio/")) type = "audio";

            const preview =
                file.type.startsWith("image/") ? URL.createObjectURL(file) : null;

            onFileSelected(file, type, preview);
        },
        [onFileSelected]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [],
            "audio/*": []
        },
        multiple: false
    });

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded p-6 text-center cursor-pointer transition ${isDragActive
                    ? "bg-indigo-50 dark:bg-indigo-900"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
        >
            <input {...getInputProps()} />
            {isDragActive
                ? "Drop the file here..."
                : "Drag & drop a file or click to select"}
        </div>
    );
}
