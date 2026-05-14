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
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState(1);

  const [bookingForm, setBookingForm] = useState({
    startDate: "2026-03-25",
    endDate: "2026-06-25",
    message: "Hi, I am a UOW student looking for a quiet place near campus."
  });

  const [properties, setProperties] = useState([]);

  const [searchParams, setSearchParams] = useState({
    location: "Wollongong",
    minPrice: "250",
    maxPrice: "450",
    latitude: "",
    longitude: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProperties = async(page = 1, params= searchParams) => {
    try {
      const data = await getProperties(page, 6, params);

      console.log("params: " , params);

      setProperties([...(data.records || [])]);
      setTotalPages(data.pages || 0);
      setCurrentPage(page)

      console.log(
          "properties page data:", data
      )
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties(currentPage);
  }, []);

  const handleEnableLocation = () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          console.log("User location:", lat, lng);

          const locationParams = {
            ...searchParams,
            latitude: lat,
            longitude: lng,
          };

          console.log(locationParams)

          fetchProperties(1, locationParams);
        },
        (error) => {
          console.error("Failed to get location:", error);
        }
    );
  };

  const [ownerProperties, setOwnerProperties] = useState([]);
  const [myBookings, setMyBookings] = useState([])
  const [bookingRequests, setBookingRequests] = useState([]);

  const avgPrice =
      properties.length > 0
          ? Math.round(
              properties.reduce((sum, item) => sum + Number(item.pricePerWeek || 0), 0) /
              properties.length
          )
          : 0;

  const ROLES = {
    GUEST: "GUEST",
    TENANT: "TENANT",
    OWNER: "OWNER"
  }

  const currentRole = user?.role || ROLES.GUEST;

  const ownerSummary = {
    properties: 3,
    pendingRequests: 2,
    confirmedBookings: 5,
    rejectedRequests: 1,
  };

  const recentRequests = bookingRequests.slice(0, 3);

  const pageMetaMap = {
    home: {
      description: "Browse available properties and find your next rental.",
      stats: [
      ],
    },

    detail: {
      description: "View property details and submit a booking request.",
      stats: [
        { label: "Property", value: selectedProperty?.title || "-" },
        {
          label: "Price",
          value: selectedProperty?.pricePerWeek
              ? `$${selectedProperty.pricePerWeek}/week`
              : "-",
        },
        { label: "Status", value: selectedProperty?.status || "-" },
      ],
    },

    myBookings: {
      description: "Track and manage your booking requests.",
      stats: [
        { label: "Bookings", value: myBookings.length },
        {
          label: "Pending",
          value: myBookings.filter((item) => item.status === "PENDING").length,
        },
        { label: "Role", value: currentRole },
      ],
    },

    bookingRequests: {
      description: "Review and respond to tenant booking requests.",
      stats: [
        { label: "Requests", value: bookingRequests.length },
        {
          label: "Pending",
          value: bookingRequests.filter((item) => item.status === "PENDING").length,
        },
        { label: "Role", value: currentRole },
      ],
    },

    ownerDashboard: {
      description: "Manage your properties and booking activity.",
      stats: [
        { label: "Properties", value: ownerSummary.properties },
        { label: "Pending", value: ownerSummary.pendingRequests },
        { label: "Confirmed", value: ownerSummary.confirmedBookings },
      ],
    },

    ownerProperties: {
      description: "View and manage your listed properties.",
      stats: [
        { label: "Properties", value: ownerProperties.length },
        {
          label: "Published",
          value: ownerProperties.filter((item) => item.status === "PUBLISHED").length,
        },
        { label: "Role", value: currentRole },
      ],
    },

    login: {
      description: "Sign in to continue using the platform.",
      stats: [
        { label: "Access", value: "Public" },
        { label: "Page", value: "Login" },
        { label: "Mode", value: "Guest" },
      ],
    },

    register: {
      description: "Create an account to start renting or listing properties.",
      stats: [
        { label: "Access", value: "Public" },
        { label: "Page", value: "Register" },
        { label: "Mode", value: "Guest" },
      ],
    },
  };

  const currentPageMeta = pageMetaMap[activePage];

  const pageTitle = {
    home: "Browse Rentals",
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setActivePage("home");
  }

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
              <h1 className="text-3xl font-bold">{pageTitle[activePage]}</h1>
              <p className="mt-1 text-sm text-slate-500">
                {currentPageMeta?.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {currentPageMeta?.stats.map((item, index) => (
                  <div key={index} className="rounded-2xl bg-slate-100 px-4 py-3">
                    <div className="text-xs text-slate-500">{item.label}</div>
                    <div className="text-sm font-semibold">{item.value}</div>
                  </div>
              ))}
            </div>
          </div>
        </section>


        {activePage === "home" && (
            <HomePage
                properties={properties}
                badgeClass={badgeClass}
                setSelectedProperty={setSelectedProperty}
                setSelectedPropertyId={setSelectedPropertyId}
                setActivePage={setActivePage}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                onSearch={fetchProperties}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={fetchProperties}
                onEnableLocation={handleEnableLocation}
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
