package run.frank.rentalapi.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import run.frank.rentalapi.entity.Booking;
import run.frank.rentalapi.mapper.BookingMapper;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingMapper bookingMapper;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingMapper.findAll();
    }

    @PostMapping
    public String createBooking(@RequestBody Booking booking) {
        if (booking.getStatus() == null || booking.getStatus().isBlank()) {
            booking.setStatus("PENDING");
        }

        bookingMapper.insert(booking);
        return "booking created";
    }
}
