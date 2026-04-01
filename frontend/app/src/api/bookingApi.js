import {request} from "./request.js";

export async function createBooking(data) {
    return request("/api/bookings", {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export async function getMyBookings() {
    return request("/api/bookings/my")
}

export async function getOwnerBookings() {
   return request("/api/bookings/owner")
}

export async function updateBookingStatus(bookingId, status) {
   return request(`/api/bookings/${bookingId}/status`, {
       method: "PUT",
       body: JSON.stringify({status})
   })
}



