import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

interface ResourceCardProps {
    resource: { _id?: string; name: string; type: string; url: string };
    onDelete: (id?: string) => void;
    onEdit: (res: any) => void;
}

export default function ResourceCard({ resource, onDelete, onEdit }: ResourceCardProps) {
    const { isDark } = useContext(ThemeContext)!;

    return (
        <li className="border rounded-lg p-6 shadow-md bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-lg">
            <strong className="block text-xl font-semibold">{resource.name}</strong>
            <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">{resource.type}</span>
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all mt-2 block">
                {resource.url}
            </a>

            {resource.type.toLowerCase() === "image" && (
                <img src={resource.url} alt={resource.name} className="mt-4 w-full h-48 object-cover rounded-lg shadow-inner" />
            )}
            {resource.type.toLowerCase() === "audio" && (
                <audio controls className="mt-4 w-full">
                    <source src={resource.url} />
                </audio>
            )}
            {resource.type.toLowerCase() === "3d model" && (
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="block mt-4 text-sm text-gray-600 dark:text-gray-300">
                    Download/View 3D Model
                </a>
            )}

            <div className="mt-4 flex gap-2">
                <button
                    onClick={() => onEdit(resource)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(resource._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </div>
        </li>
    );
}
