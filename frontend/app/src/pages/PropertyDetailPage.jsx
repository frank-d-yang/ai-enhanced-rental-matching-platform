export default function PropertyDetailPage({
  selectedProperty,
  bookingForm,
  setBookingForm,
}) {

    const displayImage =
        selectedProperty.image ||
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="space-y-6">
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <img
            src={displayImage}
            alt={selectedProperty.title}
            className="h-[380px] w-full object-cover"
          />
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-bold">{selectedProperty.title}</h2>
          <p className="mt-2 text-sm text-slate-500">
            {selectedProperty.location}
          </p>

          <p className="mt-6 text-sm leading-7 text-slate-600">
            {selectedProperty.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {(selectedProperty.features||[]).map((feature) => (
              <span
                key={feature}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </section>

      <aside className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="text-2xl font-bold">${selectedProperty.price ?? selectedProperty.pricePerWeek}</div>
        <div className="text-sm text-slate-500">per week</div>

        <div className="mt-6 space-y-4">
          <input
            type="date"
            value={bookingForm.startDate}
            onChange={(e) =>
              setBookingForm((prev) => ({
                ...prev,
                startDate: e.target.value,
              }))
            }
            className="w-full rounded-2xl border px-3 py-2 text-sm"
          />

          <input
            type="date"
            value={bookingForm.endDate}
            onChange={(e) =>
              setBookingForm((prev) => ({
                ...prev,
                endDate: e.target.value,
              }))
            }
            className="w-full rounded-2xl border px-3 py-2 text-sm"
          />

          <textarea
            rows={4}
            value={bookingForm.message}
            onChange={(e) =>
              setBookingForm((prev) => ({
                ...prev,
                message: e.target.value,
              }))
            }
            className="w-full rounded-2xl border px-3 py-3 text-sm"
          />

          <button className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white">
            Request Booking
          </button>
        </div>
      </aside>
    </div>
  );
}