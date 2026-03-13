package run.frank.rentalapi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import run.frank.rentalapi.entity.Booking;
import run.frank.rentalapi.mapper.BookingMapper;
import run.frank.rentalapi.service.BookingService;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingMapper bookingMapper;

    @Override
    public List<Booking> findAll() {
        return bookingMapper.selectList(null);
    }

    @Override
    public void createBooking(Booking booking) {
        if (booking.getStatus() == null || booking.getStatus().isBlank()) {
            booking.setStatus("PENDING");
        }

        bookingMapper.insert(booking);
    }
}
