import { useEffect, useMemo, useState } from "react";
import HomePage from "./pages/tenant/HomePage.jsx";
import PropertyDetailPage from "./pages/tenant/PropertyDetailPage.jsx";
import { getProperties } from "./api/propertyApi";
import {getMyBookings, getOwnerBookings, updateBookingStatus} from "./api/bookingApi.js";
import MyBookingsPage from "./pages/tenant/MyBookingsPage.jsx";
import BookingRequestsPage from "./pages/owner/BookingRequestsPage.jsx";
import OwnerDashboardPage from "./pages/owner/OwnerDashboardPage.jsx";
import OwnerPropertiesPage from "./pages/owner/OwnerPropertiesPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Header from "./components/Header.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

export default function AiRentalPlatformMock() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState("home");
  const [selectedPropertyId, setSelectedPropertyId] = useState(1);

  const [bookingForm, setBookingForm] = useState({
    startDate: "2026-03-25",
    endDate: "2026-06-25",
    message: "Hi, I am a UOW student looking for a quiet place near campus."
  });

  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [ownerProperties, setOwnerProperties] = useState([]);
  const [myBookings, setMyBookings] = useState([])
  const [bookingRequests, setBookingRequests] = useState([]);

  const pageTitle = {
    home: "Property Listings",
    detail: "Property Detail",
    myBookings: "My Bookings",
    bookingRequests: "Booking Requests",
    ownerDashboard: "Owner Dashboard",
    ownerProperties: "Owner Properties"
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Fail to parse user from localStorage:", error);
        console.log(storedUser);
      }

    }
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties(1, 10);
        setProperties([...(data.records || [])]);
        setTotal(data.total || 0);
        console.log("properties page data:", data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    fetchProperties();
    }, []);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const data = await getMyBookings();
        setMyBookings(data || []);
        console.log("my bookings:", data);
      } catch (error) {
        console.error("Failed to fetch my bookings:", error);
      }
    };

    if (activePage === "myBookings") {
      fetchMyBookings();
    }
  }, [activePage]);

  const fetchBookingRequests = async () => {
    try {
      const data = await getOwnerBookings();
      setBookingRequests(data || []);
      console.log("owner bookings:", data);
    } catch(error) {
      console.error("Failed to fetch owner bookings:", error);
    }
  };

  useEffect(() => {
    if (activePage === "owner") {
      fetchBookingRequests();
    }
  }, [activePage]);

  const selectedProperty = useMemo(
    () =>
      properties.find((property) => property.id === selectedPropertyId) ||
      properties[0],
    [properties, selectedPropertyId]
  );

  const badgeClass = (status) => {
    switch (status) {
      case "CONFIRMED":
      case "AVAILABLE":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "REJECTED":
      case "BOOKED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const ownerSummary = {
    properties: 3,
    pendingRequests: 2,
    confirmedBookings: 5,
    rejectedRequests: 1,
  };

  const recentRequests = bookingRequests.slice(0, 3);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setActivePage("home");
  }

  const ROLES = {
    GUEST: "GUEST",
    TENANT: "TENANT",
    OWNER: "OWNER"
  }

  const currentRole = user?.role || ROLES.GUEST;

  const navItems = [
    { key: "home", label: "Properties", roles: [ROLES.GUEST, ROLES.TENANT]},
    { key: "detail", label: "Property Detail", roles: [ROLES.GUEST, ROLES.TENANT]},
    { key: "myBookings", label: "My Bookings", roles: [ROLES.TENANT]},

    { key: "ownerDashboard", label: "Owner Dashboard", roles: [ROLES.OWNER]},
    { key: "ownerProperties", label: "Owner Properties", roles: [ROLES.OWNER]},
    { key: "bookingRequests", label: "Booking Requests", roles: [ROLES.OWNER]}
  ];

  const visibleNavItems = navItems.filter((item) =>
    item.roles.includes(currentRole)
  )


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header
          user={user}
          visibleNavItems={visibleNavItems}
          activePage={activePage}
          setActivePage={setActivePage}
          handleLogout={handleLogout}
      />

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Preview header (restored) */}
        <section className="mb-10 border-b pb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-sm font-medium text-violet-600">Current Preview</div>
              <h1 className="text-3xl font-bold">{pageTitle[activePage]}</h1>
              <p className="mt-1 text-sm text-slate-500">
                Tenant view focuses on discovering properties, creating bookings, and tracking booking status.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-slate-100 px-4 py-3">
                <div className="text-xs text-slate-500">Frontend Style</div>
                <div className="text-sm font-semibold">Current UI System</div>
              </div>

              <div className="rounded-2xl bg-slate-100 px-4 py-3">
                <div className="text-xs text-slate-500">View Mode</div>
                <div className="text-sm font-semibold">TENANT</div>
              </div>

              <div className="rounded-2xl bg-slate-100 px-4 py-3">
                <div className="text-xs text-slate-500">Design Goal</div>
                <div className="text-sm font-semibold">Role-based UX</div>
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
            setActivePage={setActivePage}
          />
        )}

        {activePage === "myBookings" && user?.role === ROLES.TENANT && (
            <MyBookingsPage
                myBookings={myBookings}
                badgeClass={badgeClass}
            />
        )}

        {activePage === "ownerDashboard" && user?.role === ROLES.OWNER && (
            <OwnerDashboardPage
                ownerSummary={ownerSummary}
                recentRequests={bookingRequests}
                badgeClass={badgeClass}
            />
        )}

        {activePage === "ownerProperties" && user?.role === ROLES.OWNER && (
            <OwnerPropertiesPage
                ownerProperties={ownerProperties}
                badgeClass={badgeClass}
                setSelectedPropertyId={setSelectedPropertyId}
                setActivePage={setActivePage}
            />
        )}

        {activePage === "bookingRequests" && user?.role === ROLES.OWNER && (
            <BookingRequestsPage
                bookingRequests={bookingRequests}
                badgeClass={badgeClass}
            />
        )}

        {activePage === "login" && !user && (
            <LoginPage setUser={setUser} setActivePage={setActivePage}/>
        )}

        {activePage === "register" && !user && (
         <RegisterPage setActivePage={setActivePage}/>
        )}
      </main>
    </div>
  );
}
