// src/app/components/ResourceList.tsx
"use client";

import ResourceCard from "./ResourceCard";

interface Resource {
  _id?: string;
  name: string;
  type: string;
  url: string;
}

export interface ResourceListProps {
  resources: Resource[];
  loading: boolean;
  onDelete: (id?: string) => Promise<void>;   // async
  onEdit: (res: Resource) => void;
}

export default function ResourceList({
  resources,
  loading,
  onDelete,
  onEdit,
}: ResourceListProps) {
  if (loading)
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-48"
          />
        ))}
      </div>
    );

  if (resources.length === 0)
    return (
      <p className="text-center text-gray-500 mt-8">
        No resources yet – start by adding one!
      </p>
    );

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {resources.map((r) => (
        <ResourceCard
          key={r._id}
          resource={r}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
