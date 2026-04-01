import { useMemo, useState } from "react";

export default function MyBookingsPage({ myBookings, badgeClass }) {
    const [activeTab, setActiveTab] = useState("ALL");

    const filteredBookings = useMemo(() => {
        if (activeTab === "ALL") return myBookings;
        return myBookings.filter((booking) => booking.status === activeTab);
    }, [activeTab, myBookings]);

    const totalCount = myBookings.length;
    const pendingCount = myBookings.filter((b) => b.status === "PENDING").length;
    const confirmedCount = myBookings.filter((b) => b.status === "CONFIRMED").length;
    const rejectedCount = myBookings.filter((b) => b.status === "REJECTED").length;

    const tabs = [
        { key: "ALL", label: `All (${totalCount})` },
        { key: "PENDING", label: `Pending (${pendingCount})` },
        { key: "CONFIRMED", label: `Confirmed (${confirmedCount})` },
        { key: "REJECTED", label: `Rejected (${rejectedCount})` },
    ];

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-sm text-slate-500">Total Bookings</div>
                    <div className="mt-2 text-3xl font-bold text-slate-900">{totalCount}</div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-sm text-slate-500">Pending</div>
                    <div className="mt-2 text-3xl font-bold text-yellow-600">{pendingCount}</div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-sm text-slate-500">Resolved</div>
                    <div className="mt-2 text-3xl font-bold text-slate-900">
                        {confirmedCount + rejectedCount}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-3">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                            activeTab === tab.key
                                ? "bg-slate-900 text-white"
                                : "bg-white text-slate-600 border border-slate-200"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredBookings.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
                        No bookings found in this status.
                    </div>
                ) : (
                    filteredBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                        >
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                                            Booking #{booking.id}
                                        </div>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${badgeClass(
                                                booking.status
                                            )}`}
                                        >
                      {booking.status}
                    </span>
                                    </div>

                                    <div className="mt-4 text-xl font-bold text-slate-900">
                                        Property #{booking.propertyId}
                                    </div>

                                    <div className="mt-1 text-sm text-slate-500">
                                        {booking.startDate} → {booking.endDate}
                                    </div>

                                    <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                                        {booking.message || "No message provided."}
                                    </div>
                                </div>

                                <div className="w-full rounded-2xl bg-slate-50 p-4 lg:w-72">
                                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Booking Summary
                                    </div>

                                    <div className="mt-3 space-y-3 text-sm text-slate-600">
                                        <div className="flex items-center justify-between">
                                            <span>Stay Type</span>
                                            <span className="font-medium text-slate-900">Long Stay</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span>Applicant</span>
                                            <span className="font-medium text-slate-900">Tenant</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span>Last Update</span>
                                            <span className="font-medium text-slate-900">Today</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}