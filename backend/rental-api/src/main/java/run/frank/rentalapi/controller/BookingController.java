package run.frank.rentalapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import run.frank.rentalapi.entity.Booking;
import run.frank.rentalapi.service.BookingService;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.findAll();
    }

    @PostMapping
    public String createBooking(@RequestBody Booking booking) {
        bookingService.createBooking(booking);
        return "booking created";
    }
}
