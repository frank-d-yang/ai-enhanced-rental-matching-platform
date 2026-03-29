import PropertyCard from "../components/PropertyCard";

export default function HomePage({
  properties,
  badgeClass,
  setSelectedPropertyId,
  setActivePage,
}) {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 p-8 text-white shadow-lg">
            <h2 className="text-4xl font-bold leading-tight">
              Find a place near campus, request a booking, and manage everything in one platform.
            </h2>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="text-lg font-semibold">AI Match Preview</div>
          <p className="text-sm text-slate-500">
            Future feature mock
          </p>
        </div>
      </section>

      {/* Listings */}
      <section>
        <h2 className="text-2xl font-bold">Property Listings</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              badgeClass={badgeClass}
              onViewDetail={(id) => {
                setSelectedPropertyId(id);
                setActivePage("detail");
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}