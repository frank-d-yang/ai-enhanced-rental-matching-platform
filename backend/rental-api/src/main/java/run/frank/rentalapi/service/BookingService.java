package run.frank.rentalapi.service;

import com.baomidou.mybatisplus.extension.service.IService;
import run.frank.rentalapi.dto.CreateBookingRequest;
import run.frank.rentalapi.dto.UpdateBookingStatusRequest;
import run.frank.rentalapi.entity.Booking;
import run.frank.rentalapi.vo.BookingVO;

import java.util.List;

public interface BookingService extends IService<Booking> {
    List<Booking> findAll();

    BookingVO createBooking(CreateBookingRequest bookingRequest);

    List<BookingVO> getMyBookings();

    List<BookingVO> getOwnerBookings();

    void updateBookingStatus(Long bookingId, UpdateBookingStatusRequest request);
}
