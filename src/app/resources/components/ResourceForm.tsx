import { useState, useContext } from "react";
import FileUploader from "./FileUploader";
import { ThemeContext } from "@/context/ThemeContext";

interface ResourceFormProps {
    onSaved: () => void;
    editing?: { _id?: string; name: string; type: string; url: string };
}

export default function ResourceForm({ onSaved, editing }: ResourceFormProps) {
    const [name, setName] = useState(editing?.name || "");
    const [type, setType] = useState(editing?.type || "");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { isDark } = useContext(ThemeContext)!;

    const handleFileSelected = (file: File, detectedType: string, previewUrl: string | null) => {
        setFile(file);
        if (!type) setType(detectedType);
        setPreview(previewUrl);
    };

    const handleSubmit = async () => {
        if (!type || (!file && !editing)) {
            alert("Type and file are required");
            return;
        }

        setLoading(true);
        try {
            let fileUrl = "";
            const fileName = name || (file ? file.name : "Unnamed");

            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");

                const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
                const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
                    method: "POST",
                    body: formData,
                });
                const data = await res.json();
                fileUrl = data.secure_url;
            }

            const body = { name: fileName, type, url: fileUrl };

            if (editing?._id) {
                await fetch(`/api/resources/${editing._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
            } else {
                await fetch("/api/resources", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
            }

            setName("");
            setType("");
            setFile(null);
            setPreview(null);
            onSaved();
        } catch (error) {
            console.error(error);
            alert("Failed to save resource");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 mb-8 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <input
                type="text"
                placeholder="Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`border p-2 rounded ${isDark ? 'bg-gray-800' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />

            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={`border p-2 rounded ${isDark ? 'bg-gray-800' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
                <option value="">Select Type</option>
                <option value="image">Image</option>
                <option value="audio">Audio</option>
                <option value="3D Model">3D Model</option>
            </select>

            <FileUploader onFileSelected={handleFileSelected} />

            {preview && type === "image" && (
                <img src={preview} alt="Preview" className="mt-2 w-full max-h-40 object-cover rounded shadow-inner" />
            )}

            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition ${loading ? 'opacity-50' : ''}`}
            >
                {loading ? "Saving..." : editing ? "Update Resource" : "Add Resource"}
            </button>
        </div>
    );
}
