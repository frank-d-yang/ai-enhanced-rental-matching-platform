import {useEffect, useMemo, useState} from "react";
import {getOwnerBookings, updateBookingStatus} from "../../api/bookingApi.js";

export default function BookingRequestsPage({ badgeClass }) {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const data = await getOwnerBookings();
            setRequests(data);
        } catch (error) {
            console.error("Failed to fetch requests:", error);
        }
    }

    useEffect(() => {
        fetchRequests()
    }, []);

    const [activeTab, setActiveTab] = useState("ALL");

    const filteredRequests = useMemo(() => {
        if (activeTab === "ALL") return requests;
        return requests.filter((request) => request.status === activeTab);
    }, [activeTab, requests]);

    const pendingCount = requests.filter((item) => item.status === "PENDING").length;
    const confirmedCount = requests.filter((item) => item.status === "CONFIRMED").length;
    const rejectedCount = requests.filter((item) => item.status === "REJECTED").length;

    const tabs = [
        { key: "ALL", label: `All (${requests.length})` },
        { key: "PENDING", label: `Pending (${pendingCount})` },
        { key: "CONFIRMED", label: `Confirmed (${confirmedCount})` },
        { key: "REJECTED", label: `Rejected (${rejectedCount})` },
    ];

    const handleAction = async (id, nextStatus) => {
        try {
            await updateBookingStatus(id, nextStatus);
            fetchRequests();
        } catch (error) {
            console.error("Failed to update booking:", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-sm text-slate-500">Pending Requests</div>
                    <div className="mt-2 text-3xl font-bold text-yellow-600">{pendingCount}</div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-sm text-slate-500">Confirmed</div>
                    <div className="mt-2 text-3xl font-bold text-green-600">{confirmedCount}</div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-sm text-slate-500">Rejected</div>
                    <div className="mt-2 text-3xl font-bold text-rose-600">{rejectedCount}</div>
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
                                : "border border-slate-200 bg-white text-slate-600"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredRequests.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
                        No booking requests found in this status.
                    </div>
                ) : (
                    filteredRequests.map((request) => (
                        <div
                            key={request.id}
                            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                        >
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                                            Request #{request.id}
                                        </div>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${badgeClass(
                                                request.status
                                            )}`}
                                        >
                      {request.status}
                    </span>
                                    </div>

                                    <div className="mt-4 text-xl font-bold text-slate-900">
                                        Property #{request.propertyId}
                                    </div>

                                    <div className="mt-1 text-sm text-slate-500">
                                        {request.startDate} → {request.endDate}
                                    </div>

                                    <div className="mt-1 text-sm text-slate-500">
                                        Tenant: {request.tenantName || "Tenant"}
                                    </div>

                                    <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                                        {request.message || "No message provided."}
                                    </div>
                                </div>

                                <div className="w-full rounded-2xl bg-slate-50 p-4 lg:w-72">
                                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Review Panel
                                    </div>

                                    <div className="mt-3 space-y-3 text-sm text-slate-600">
                                        <div className="flex items-center justify-between">
                                            <span>Decision Window</span>
                                            <span className="font-medium text-slate-900">24h</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span>Priority</span>
                                            <span className="font-medium text-slate-900">
                        {request.status === "PENDING" ? "High" : "Normal"}
                      </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span>Applicant Type</span>
                                            <span className="font-medium text-slate-900">Student</span>
                                        </div>
                                    </div>

                                    {request.status === "PENDING" && (
                                        <div className="mt-4 flex gap-3">
                                            <button
                                                onClick={() => handleAction(request.id, "REJECTED")}
                                                className="flex-1 rounded-2xl border border-rose-300 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                                            >
                                                Reject
                                            </button>

                                            <button
                                                onClick={() => handleAction(request.id, "CONFIRMED")}
                                                className="flex-1 rounded-2xl bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}