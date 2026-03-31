export async function createBooking(data) {
    const response = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to create booking");
    }

    return response.json();
}

export async function getMyBookings() {
    const response = await fetch("http://localhost:8080/api/bookings/my");

    if (!response.ok) {
        throw new Error("Failed to fetch my bookings");
    }

    return response.json();
}

export async function getOwnerBookings() {
    const response = await fetch("http://localhost:8080/api/bookings/owner");

    if (!response.ok) {
        throw new Error("Failed to fetch owner bookings");
    }

    return response.json();
}

export async function updateBookingStatus(bookingId, status) {
    const response = await fetch (
        `http://localhost:8080/api/bookings/${bookingId}/status`,
        {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({status}),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update booking status");
    }

    return response.text();
}



