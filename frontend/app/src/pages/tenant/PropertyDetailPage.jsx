import { useState } from "react";
import {createBooking} from "../../api/bookingApi.js";

export default function PropertyDetailPage({
  selectedProperty,
  bookingForm,
                                               setBookingForm,
                                               setActivePage
}) {

    const fallbackImage =
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";

    const images =
        selectedProperty.images && selectedProperty.images.length > 0
            ? selectedProperty.images
            : [selectedProperty.image || fallbackImage];

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    const displayImage = images[selectedImageIndex];

    const handleBookingSubmit = async () => {
        try {
            if (!bookingForm.startDate || !bookingForm.endDate) {
                alert("Please select startDate and endDate.");
                return;
            }

            if (bookingForm.startDate >= bookingForm.endDate) {
                alert("EndDate must be later than startDate.");
                return;
            }

            const payload = {
                propertyId: selectedProperty.id,
                startDate: bookingForm.startDate,
                endDate: bookingForm.endDate,
                message: bookingForm.message
            };

            console.log("booking payload:", payload);

            await createBooking(payload);

            alert("Booking request submitted successfully!");

            setBookingForm({
                startDate: "",
                endDate: "",
                message: ""
            });

            setActivePage("myBookings");
        } catch (error) {
            console.error("Failed to create booking:", error);
            alert("Failed to submit booking request");
        }
    }

  return (
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6">
              <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm">
                      <img
                          src={displayImage}
                          alt={selectedProperty.title}
                          className="h-[420px] w-full object-cover"
                      />

                      <button
                          onClick={() => setIsFavorite((prev) => !prev)}
                          className={`absolute right-6 top-6 rounded-full px-5 py-2 text-sm font-medium shadow-md ${
                              isFavorite
                                  ? "bg-slate-900 text-white"
                                  : "bg-white text-slate-900"
                          }`}
                      >
                          {isFavorite ? "♥ Saved" : "♡ Save"}
                      </button>
                  </div>

                  <div className="flex gap-4 overflow-x-auto">
                      {images.map((image, index) => (
                          <button
                              key={index}
                              onClick={() => setSelectedImageIndex(index)}
                              className={`overflow-hidden rounded-2xl border-2 ${
                                  selectedImageIndex === index
                                      ? "border-slate-900"
                                      : "border-transparent"
                              }`}
                          >
                              <img
                                  src={image}
                                  alt={`${selectedProperty.title} ${index + 1}`}
                                  className="h-24 w-36 object-cover"
                              />
                          </button>
                      ))}
                  </div>
              </div>


              {/* 描述区域 */}
              <div className="rounded-3xl bg-white p-6 shadow-sm">

                  <div className="flex items-center justify-between gap-4">
                      <h2 className="text-3xl font-bold">
                          {selectedProperty.title}
                      </h2>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                      {selectedProperty.location}
                  </p>

                  <p className="mt-6 text-sm leading-7 text-slate-600">
                      {selectedProperty.description}
                  </p>

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

                  <button
                      onClick={handleBookingSubmit}
                      className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white">
                      Request Booking
                  </button>
              </div>
          </aside>
      </div>
  );
}