// src/app/components/Hero.tsx
export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">Manage Your Media Library</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-90">
          Upload, browse and share images, audio files and 3D models in one place.
        </p>
      </div>
    </section>
  );
}
