import PropertyCard from "../../components/PropertyCard.jsx";

export default function HomePage({
  properties,
  badgeClass,
  setSelectedPropertyId,
  setActivePage,
}) {
  return (
      <div className="space-y-8">
          {/* Hero */}
          <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div
                  className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-700 p-8 text-white shadow-lg">
                  <div className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                      MVP Home Page
                  </div>

                  <h2 className="text-4xl font-bold leading-tight">
                      Find a place near campus, request a booking, and manage everything in one platform.
                  </h2>

                  <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-300">
                      This section represents your main landing page. Users can browse property cards first,
                      then go to detail pages and submit a booking request.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                      <button className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow">
                          Browse Properties
                      </button>
                      <button className="rounded-2xl border border-white/40 px-5 py-3 text-sm font-semibold text-white">
                          Try AI Matching
                      </button>
                  </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-2 flex items-start justify-between">
                      <div>
                          <div className="text-2xl font-bold text-slate-900">AI Match Preview</div>
                          <p className="text-sm text-slate-500">Future feature mock</p>
                      </div>

                      <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
        Coming later
      </span>
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-200 p-4">
                      <div className="font-semibold text-slate-900">
                          Recommended for UOW students
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                          Based on your budget, preferred location, and stay duration, the system
                          recommends listings close to campus and public transport.
                      </p>
                  </div>

                  <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                      “Looking for a quiet studio near UOW under $400/week for 3 months.”
                  </div>

                  <button
                      className="mt-4 w-full rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow">
                      Generate AI Recommendations
                  </button>
              </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="grid gap-4 md:grid-cols-4">

                  <div>
                      <div className="mb-2 text-xs font-medium text-slate-500">Location</div>
                      <div className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
                          Wollongong
                      </div>
                  </div>

                  <div>
                      <div className="mb-2 text-xs font-medium text-slate-500">Budget</div>
                      <div className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
                          $250 - $450
                      </div>
                  </div>

                  <div>
                      <div className="mb-2 text-xs font-medium text-slate-500">Stay Duration</div>
                      <div className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
                          3 months
                      </div>
                  </div>

                  <div className="flex items-end">
                      <button className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
                          Search
                      </button>
                  </div>

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