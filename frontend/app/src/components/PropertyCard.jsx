export default function PropertyCard({ property, badgeClass, onViewDetail }) {
  const imageUrl =
      property.image ||
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";

  const location = property.location || property.address || "Wollongong, NSW";
  const price = property.price || property.pricePerWeek || property.weeklyRent || 0;
  const rating = property.rating || "4.8";

  return (
      <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
        <div className="relative overflow-hidden">
          <img
              src={imageUrl}
              alt={property.title}
              className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
            Featured Listing
          </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-2xl font-bold leading-tight text-slate-900">
                {property.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{location}</p>
            </div>

            <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(
                    property.status
                )}`}
            >
            {property.status}
          </span>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            {property.description || "No description available."}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {(property.features || []).map((feature) => (
                <span
                    key={feature}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                >
              {feature}
            </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold text-slate-900">
              ${price}
            </span>
              <span className="text-sm text-slate-500">/ week</span>
            </div>

            <div className="flex items-center gap-1 text-sm font-medium text-slate-700">
              <span className="text-amber-500">⭐</span>
              <span>{rating}</span>
            </div>
          </div>

          <button
              onClick={() => onViewDetail(property.id)}
              className="mt-4 w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
          >
            View Details
          </button>
        </div>
      </div>
  );
}