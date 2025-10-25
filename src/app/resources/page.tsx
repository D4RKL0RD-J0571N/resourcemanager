// src/app/page.tsx (or wherever you keep your page component)
"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ResourceForm from "./components/ResourceForm";
import ResourceList from "./components/ResourceList";

export default function ResourcesPage() {
  const [editing, setEditing] = useState<null | any>(null);
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------------------------
  // Load all resources
  // --------------------------------------------------------------------
  const fetchResources = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/resources");
      const data = await res.json();
      setResources(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // --------------------------------------------------------------------
  // Delete – refresh after success
  // --------------------------------------------------------------------
  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Delete this resource?")) return;
    await fetch(`/api/resources/${id}`, { method: "DELETE" });
    fetchResources();          // <‑‑ important
  };

  const handleEdit = (res: any) => setEditing(res);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <Hero />

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <ResourceForm onSaved={fetchResources} editing={editing ?? undefined} />

        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
            Your Resources
          </h2>

          <ResourceList
            resources={resources}
            loading={loading}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </section>
      </main>
    </div>
  );
}
