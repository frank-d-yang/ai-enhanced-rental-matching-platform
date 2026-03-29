export default function PropertyCard({ property, badgeClass, onViewDetail }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <img
        src={property.image ||
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"}
        alt={property.title}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{property.title}</h3>
            <p className="text-sm text-slate-500">
              {property.location || property.address || "Wollongong, NSW"}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${badgeClass(
              property.status
            )}`}
          >
            {property.status}
          </span>
        </div>

        <p className="mt-3 text-sm text-slate-600">
          {property.description || "No description available."}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(property.features || []).map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold">
              ${property.pricePerWeek || property.weeklyRent || 0}
            </span>
            <span className="text-sm text-slate-500"> / week</span>
          </div>
          <div className="text-sm font-medium">
            ⭐ {property.rating || "4.8"}
          </div>
        </div>

        <button
          onClick={() => onViewDetail(property.id)}
          className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          View Details
        </button>
      </div>
    </div>
  );
}