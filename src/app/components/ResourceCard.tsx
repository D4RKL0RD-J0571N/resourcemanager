interface Resource {
  _id?: string;
  name: string;
  type: string;
  url: string;
}

interface ResourceCardProps {
  resource: Resource;
  onEdit: (r: Resource) => void;
  onDelete: (id?: string) => void;
}

export default function ResourceCard({ resource, onEdit, onDelete }: ResourceCardProps) {
  const getTypeColor = (type: string) => {
    switch(type.toLowerCase()) {
      case "image": return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
      case "audio": return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "video": return "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300";
      case "3d model": return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600">
      {/* Preview Section */}
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
        {resource.type.toLowerCase() === "image" ? (
          <img
            src={resource.url}
            alt={resource.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : resource.type.toLowerCase() === "video" ? (
          <video
            src={resource.url}
            className="w-full h-full object-cover"
            controls
            preload="metadata"
          />
        ) : resource.type.toLowerCase() === "audio" ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
            {resource.type}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-2 truncate">
          {resource.name}
        </h3>
        
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline truncate block mb-4"
        >
          View resource →
        </a>

        {/* Audio Player */}
        {resource.type.toLowerCase() === "audio" && (
          <audio controls className="w-full mb-4 h-10">
            <source src={resource.url} />
          </audio>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(resource)}
            className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium text-sm transition-colors duration-200"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(resource._id)}
            className="flex-1 px-4 py-2.5 bg-red-50 dark:bg-red-900 hover:bg-red-100 dark:hover:bg-red-800 text-red-600 dark:text-red-200 rounded-lg font-medium text-sm transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
