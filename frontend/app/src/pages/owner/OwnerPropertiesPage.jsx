export default function OwnerPropertiesPage({
                                                ownerProperties,
                                                badgeClass,
                                                setSelectedPropertyId,
                                                setActivePage,
                                            }) {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-sm text-slate-500">Total Properties</div>
                    <div className="mt-2 text-3xl font-bold text-slate-900">
                        {ownerProperties.length}
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-sm text-slate-500">Published</div>
                    <div className="mt-2 text-3xl font-bold text-green-600">
                        {
                            ownerProperties.filter(
                                (property) => property.status === "PUBLISHED"
                            ).length
                        }
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-sm text-slate-500">Booked / Unavailable</div>
                    <div className="mt-2 text-3xl font-bold text-slate-900">
                        {
                            ownerProperties.filter(
                                (property) => property.status !== "PUBLISHED"
                            ).length
                        }
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {ownerProperties.map((property) => (
                    <div
                        key={property.id}
                        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="relative overflow-hidden">
                            <img
                                src={
                                    property.image ||
                                    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
                                }
                                alt={property.title}
                                className="h-56 w-full object-cover transition duration-500 hover:scale-105"
                            />

                            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
                  Owner Listing
                </span>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="text-2xl font-bold leading-tight text-slate-900">
                                        {property.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {property.location || property.address || "Wollongong, NSW"}
                                    </p>
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

                            <div className="mt-5 flex items-baseline gap-2">
                <span className="text-xl font-semibold text-slate-900">
                  $
                    {property.price ||
                        property.pricePerWeek ||
                        property.weeklyRent ||
                        0}
                </span>
                                <span className="text-sm text-slate-500">/ week</span>
                            </div>

                            <div className="mt-5 flex gap-3">
                                <button
                                    onClick={() => {
                                        setSelectedPropertyId?.(property.id);
                                        setActivePage?.("detail");
                                    }}
                                    className="flex-1 rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => setActivePage?.("bookingRequests")}
                                    className="flex-1 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                                >
                                    View Requests
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}