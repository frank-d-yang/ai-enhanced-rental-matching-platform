import PropertyCard from "../../components/PropertyCard.jsx";
import {useEffect, useState} from "react";

export default function HomePage({
                                     properties,
                                     badgeClass,
                                     setSelectedPropertyId,
                                     setActivePage,
                                     searchParams,
                                     setSearchParams,
                                     onSearch,
                                     currentPage,
                                     totalPages,
                                     onPageChange,
                                 }) {

    return (
        <div className="space-y-8">
            {/* Hero */}
            <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <div
                    className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-700 p-8 text-white shadow-lg">

                    <h2 className="text-4xl font-bold leading-tight">
                        Find your next rental faster, request a booking, and manage everything in one platform.
                    </h2>

                    <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-300">
                        This section represents your main landing page. Users can browse property cards first,
                        then go to detail pages and submit a booking request.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <button className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow">
                            Browse Properties
                        </button>
                        <button
                            className="rounded-2xl border border-white/40 px-5 py-3 text-sm font-semibold text-white">
                            Try AI Matching
                        </button>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-2 flex items-start justify-between">
                        <div>
                            <div className="text-2xl font-bold text-slate-900">AI Match Preview</div>
                        </div>
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
                        <input
                            value={searchParams.location}
                            onChange={(e) =>
                                setSearchParams({
                                    ...searchParams,
                                    location: e.target.value
                                })
                            }
                            placeholder="Wollongong"
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400"

                        />
                    </div>

                    <div>
                        <div className="mb-2 text-xs font-medium text-slate-500">Min Price</div>
                        <input
                            type="number"
                            value={searchParams.minPrice}
                            onChange={(e) =>
                                setSearchParams({
                                    ...searchParams,
                                    minPrice: e.target.value
                                })
                            }
                            placeholder="250"
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400"
                        />
                    </div>

                    <div>
                        <div className="mb-2 text-xs font-medium text-slate-500">Max Price</div>
                        <input
                            type="number"
                            value={searchParams.maxPrice}
                            onChange={(e) =>
                                setSearchParams({
                                    ...searchParams,
                                    maxPrice: e.target.value
                                })
                            }
                            placeholder="450"
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400"
                        />
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={() => onSearch(1)}
                            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
                            Search
                        </button>
                    </div>

                </div>
            </section>

            {/* Listings */}
            <section>
                <h2 className="text-2xl font-bold">Available Properties</h2>

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

                {/* Pagination */}
                <div className="mt-10 flex items-center justify-center gap-4">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                        className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white disabled:opacity-40"
                    >
                        Previous
                    </button>

                    <div className="text-sm font-semibold text-slate-700">
                        Page {currentPage} of {totalPages}
                    </div>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                        className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            </section>
        </div>
    );
}