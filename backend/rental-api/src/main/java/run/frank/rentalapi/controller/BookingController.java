package run.frank.rentalapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import run.frank.rentalapi.dto.CreateBookingRequest;
import run.frank.rentalapi.dto.UpdateBookingStatusRequest;
import run.frank.rentalapi.entity.Booking;
import run.frank.rentalapi.service.BookingService;
import run.frank.rentalapi.vo.BookingVO;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.findAll();
    }

    @PostMapping
    public BookingVO createBooking(@RequestBody CreateBookingRequest bookingRequest) {
        return bookingService.createBooking(bookingRequest);
    }

    @GetMapping("/my")
    public List<BookingVO> getMyBookings() {
        return bookingService.getMyBookings();
    }

    @GetMapping("/owner")
    public List<BookingVO> getOwnerBookings() {
        return bookingService.getOwnerBookings();
    }

    @PutMapping("/{bookingId}/status")
    public String updateBookingStatus(@PathVariable Long bookingId,
                                      @RequestBody UpdateBookingStatusRequest request) {
        bookingService.updateBookingStatus(bookingId, request);
        return "Booking status updated successfully!";
    }
}
