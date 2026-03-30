import { useEffect, useMemo, useState } from "react";
import HomePage from "./pages/HomePage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import { getProperties } from "./api/propertyApi";

export default function AiRentalPlatformMock() {
  const [activePage, setActivePage] = useState("home");
  const [selectedPropertyId, setSelectedPropertyId] = useState(1);
  const [bookingForm, setBookingForm] = useState({
    startDate: "2026-03-25",
    endDate: "2026-06-25",
    message: "Hi, I am a UOW student looking for a quiet place near campus."
  });

  const properties_mock = [
    // {
    //   id: 1,
    //   title: "Modern Studio Near UOW",
    //   location: "Wollongong, NSW",
    //   price: 380,
    //   rating: 4.8,
    //   image:
    //     "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    //   description:
    //     "Bright studio apartment within walking distance to UOW and Wollongong station. Perfect for students looking for convenience and privacy.",
    //   status: "Available",
    //   type: "Studio",
    //   stay: "3+ months",
    //   features: ["5 min to UOW", "Fully furnished", "Bills included"]
    // },
    {
      id: 1,
      title: "Cozy Shared House in Gwynneville",
      location: "Gwynneville, NSW",
      price: 290,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      description:
        "Student-friendly shared house with spacious kitchen, shared lounge, and free parking. Great value for long stays.",
      status: "Available",
      type: "Shared House",
      stay: "Flexible",
      features: ["Parking", "Shared kitchen", "Close to bus stop"]
    },
    {
      id: 3,
      title: "CBD Apartment with Ocean View",
      location: "Wollongong CBD, NSW",
      price: 520,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      description:
        "Premium one-bedroom apartment close to restaurants, beach, and transport. Ideal for professionals or premium student living.",
      status: "Booked",
      type: "1 Bedroom",
      stay: "1+ month",
      features: ["Ocean view", "Modern kitchen", "CBD location"]
    }
  ];

  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const myBookings = [
    {
      id: 101,
      property: "Modern Studio Near UOW",
      dates: "2026-03-25 → 2026-06-25",
      status: "PENDING",
      message:
        "I am a UOW student and looking for a quiet place near campus.",
      price: "$380 / week"
    },
    {
      id: 102,
      property: "CBD Apartment with Ocean View",
      dates: "2026-04-01 → 2026-05-01",
      status: "CONFIRMED",
      message: "Short-term stay for one month.",
      price: "$520 / week"
    }
  ];

  const ownerRequests = [
    {
      id: 201,
      tenant: "Frank Ding",
      property: "Cozy Shared House in Gwynneville",
      dates: "2026-03-28 → 2026-07-15",
      status: "PENDING",
      note: "Needs stable internet for study and remote interviews."
    },
    {
      id: 202,
      tenant: "Alice Chen",
      property: "Modern Studio Near UOW",
      dates: "2026-04-10 → 2026-05-10",
      status: "PENDING",
      note: "Looking for a one-month stay near campus."
    }
  ];

  const pageTitle = {
    home: "Property Listings",
    detail: "Property Detail",
    myBookings: "My Bookings",
    owner: "Owner Dashboard"
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties(1, 10);
        setProperties([...(data.records || []), ...properties_mock]);
        setTotal(data.total || 0);
        console.log("properties page data:", data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    fetchProperties();
    }, []);

  const selectedProperty = useMemo(
    () =>
      properties.find((property) => property.id === selectedPropertyId) ||
      properties[0],
    [properties, selectedPropertyId]
  );

  const badgeClass = (status) => {
    switch (status) {
      case "CONFIRMED":
      case "Available":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "REJECTED":
      case "Booked":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const navItems = [
    { key: "home", label: "Properties" },
    { key: "detail", label: "Property Detail" },
    { key: "myBookings", label: "My Bookings" },
    { key: "owner", label: "Owner Dashboard" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-xl font-bold">AI Rental Platform</div>
            <div className="text-sm text-slate-500">Frontend MVP Mock</div>
          </div>

          <nav className="hidden gap-2 rounded-2xl bg-slate-100 p-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActivePage(item.key)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  activePage === item.key
                    ? "bg-white text-slate-900 shadow"
                    : "text-slate-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow">
            Login
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Preview header (restored) */}
        <section className="mb-10 border-b pb-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-sm font-medium text-violet-600">Current Preview</div>
              <h1 className="text-3xl font-bold">{pageTitle[activePage]}</h1>
              <p className="mt-1 text-sm text-slate-500">
                This upgraded mock simulates multiple core pages for your React MVP so you can feel the user flow before coding.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-slate-100 px-4 py-3">
                <div className="text-xs text-slate-500">Frontend Stack</div>
                <div className="text-sm font-semibold">React + TS + Vite</div>
              </div>

              <div className="rounded-2xl bg-slate-100 px-4 py-3">
                <div className="text-xs text-slate-500">Design Goal</div>
                <div className="text-sm font-semibold">Simple MVP First</div>
              </div>

              <div className="rounded-2xl bg-slate-100 px-4 py-3">
                <div className="text-xs text-slate-500">This Week</div>
                <div className="text-sm font-semibold">Frontend + Deploy</div>
              </div>
            </div>
          </div>
        </section>
        

        {activePage === "home" && (
           <HomePage
              properties={properties}
              badgeClass={badgeClass}
              setSelectedPropertyId={setSelectedPropertyId}
              setActivePage={setActivePage}
          />
        )}

        {activePage === "detail" && (
          <PropertyDetailPage
            selectedProperty={selectedProperty}
            bookingForm={bookingForm}
            setBookingForm={setBookingForm}
          />
        )}

        {activePage === "myBookings" && (
          <div className="space-y-4">
            {myBookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl border border-slate-200 p-5"
              >
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{booking.property}</div>
                    <div className="text-sm text-slate-500">
                      {booking.dates}
                    </div>
                    <div className="mt-2 text-sm text-slate-600">
                      {booking.message}
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${badgeClass(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activePage === "owner" && (
          <div className="space-y-4">
            {ownerRequests.map((request) => (
              <div
                key={request.id}
                className="rounded-2xl border border-slate-200 p-5"
              >
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{request.property}</div>
                    <div className="text-sm text-slate-500">
                      Tenant: {request.tenant}
                    </div>
                    <div className="text-sm text-slate-500">
                      {request.dates}
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${badgeClass(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>
                </div>

                <div className="mt-4 flex gap-3">
                  <button className="rounded-2xl bg-green-600 px-4 py-2 text-sm font-medium text-white">
                    Confirm
                  </button>
                  <button className="rounded-2xl bg-rose-600 px-4 py-2 text-sm font-medium text-white">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
