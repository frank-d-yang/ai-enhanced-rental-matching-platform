package run.frank.rentalapi.service;

import run.frank.rentalapi.entity.Booking;

import java.util.List;

public interface BookingService {
    List<Booking> findAll();

    void createBooking(Booking booking);
}
