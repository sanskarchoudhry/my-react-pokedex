export default function Loading() {
  return (
    <section className="container mx-auto p-4">
      {/* Search Bar Skeleton */}
      <div className="flex gap-6 mb-4 mt-8 animate-pulse">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-10 w-48 bg-gray-200 rounded"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-10 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-100 p-4 border-b border-gray-200 flex justify-between">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-6 w-20 bg-gray-300 rounded animate-pulse" />
          ))}
        </div>
        
        {/* Rows */}
        <div className="divide-y divide-gray-100">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="p-4 flex justify-between items-center animate-pulse">
              {/* Avatar + Name */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-gray-200 rounded-full" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
              {/* Stats placeholders */}
              <div className="h-4 w-12 bg-gray-200 rounded" />
              <div className="h-4 w-12 bg-gray-200 rounded" />
              <div className="h-4 w-12 bg-gray-200 rounded" />
              <div className="h-4 w-12 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}