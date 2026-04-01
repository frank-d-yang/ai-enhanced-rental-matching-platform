export default function OwnerDashboardPage({
                                               ownerSummary,
                                               recentRequests,
                                               badgeClass,
                                           }) {
    const summaryCards = [
        {
            key: "properties",
            label: "Properties",
            value: ownerSummary?.properties ?? 0,
            icon: "🏠",
            trend: "+1 this week",
            trendClass: "text-blue-600",
        },
        {
            key: "pending",
            label: "Pending Requests",
            value: ownerSummary?.pendingRequests ?? 0,
            icon: "⏳",
            trend: "Needs attention",
            trendClass: "text-yellow-600",
        },
        {
            key: "confirmed",
            label: "Confirmed Bookings",
            value: ownerSummary?.confirmedBookings ?? 0,
            icon: "✅",
            trend: "+2 this week",
            trendClass: "text-green-600",
        },
        {
            key: "rejected",
            label: "Rejected Requests",
            value: ownerSummary?.rejectedRequests ?? 0,
            icon: "⚠️",
            trend: "Review reasons",
            trendClass: "text-rose-600",
        },
    ];

    return (
        <div className="space-y-8">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {summaryCards.map((item) => (
                    <div
                        key={item.key}
                        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="text-4xl font-bold text-slate-900">
                                    {item.value}
                                </div>
                                <div className="mt-2 text-sm text-slate-500">{item.label}</div>
                            </div>

                            <div className="rounded-2xl bg-slate-100 px-3 py-2 text-xl">
                                {item.icon}
                            </div>
                        </div>

                        <div className={`mt-4 text-xs font-semibold ${item.trendClass}`}>
                            {item.trend}
                        </div>
                    </div>
                ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
                <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-lg">
                    <div className="text-sm text-slate-300">Weekly Earnings</div>
                    <div className="mt-2 text-4xl font-bold">$1,240</div>
                    <div className="mt-2 text-sm text-slate-300">
                        +12% compared with last week
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="rounded-2xl bg-white/10 p-4">
                            <div className="text-xs text-slate-300">Occupancy</div>
                            <div className="mt-1 text-2xl font-semibold">87%</div>
                        </div>

                        <div className="rounded-2xl bg-white/10 p-4">
                            <div className="text-xs text-slate-300">Avg. Response Time</div>
                            <div className="mt-1 text-2xl font-semibold">2h</div>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div>
                        <h3 className="text-xl font-bold">Priority Actions</h3>
                        <p className="text-sm text-slate-500">
                            What needs your attention today.
                        </p>
                    </div>

                    <div className="mt-5 space-y-3">
                        <div className="rounded-2xl bg-yellow-50 p-4">
                            <div className="text-sm font-semibold text-yellow-800">
                                {ownerSummary?.pendingRequests ?? 0} pending requests
                            </div>
                            <div className="mt-1 text-xs text-yellow-700">
                                Review booking requests before end of day.
                            </div>
                        </div>

                        <div className="rounded-2xl bg-blue-50 p-4">
                            <div className="text-sm font-semibold text-blue-800">
                                1 property needs update
                            </div>
                            <div className="mt-1 text-xs text-blue-700">
                                Refresh listing photos and availability.
                            </div>
                        </div>

                        <button className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white">
                            Review Booking Requests
                        </button>
                    </div>
                </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Recent Booking Requests</h2>
                        <p className="text-sm text-slate-500">
                            Quick overview of the latest tenant activity.
                        </p>
                    </div>

                    <button className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
                        View All Requests
                    </button>
                </div>

                <div className="space-y-4">
                    {(recentRequests || []).length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                            No recent booking requests.
                        </div>
                    ) : (
                        recentRequests.map((request) => (
                            <div
                                key={request.id}
                                className="rounded-2xl border border-slate-200 p-5 transition hover:shadow-sm"
                            >
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                    <div>
                                        <div className="font-semibold text-slate-900">
                                            Property #{request.propertyId}
                                        </div>

                                        <div className="mt-1 text-sm text-slate-500">
                                            {request.startDate} → {request.endDate}
                                        </div>

                                        <div className="mt-1 text-sm text-slate-500">
                                            Tenant: {request.tenantName || "Tenant"}
                                        </div>

                                        <div className="mt-3 text-sm text-slate-600">
                                            {request.message || "No message provided."}
                                        </div>
                                    </div>

                                    <span
                                        className={`h-fit rounded-full px-3 py-1 text-xs font-medium ${badgeClass(
                                            request.status
                                        )}`}
                                    >
                    {request.status}
                  </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}