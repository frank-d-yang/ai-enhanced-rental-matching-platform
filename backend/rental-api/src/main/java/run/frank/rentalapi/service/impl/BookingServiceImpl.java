package run.frank.rentalapi.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import run.frank.rentalapi.dto.CreateBookingRequest;
import run.frank.rentalapi.dto.UpdateBookingStatusRequest;
import run.frank.rentalapi.entity.Booking;
import run.frank.rentalapi.entity.Property;
import run.frank.rentalapi.enums.BookingStatus;
import run.frank.rentalapi.mapper.BookingMapper;
import run.frank.rentalapi.mapper.PropertyMapper;
import run.frank.rentalapi.security.SecurityUtils;
import run.frank.rentalapi.service.BookingService;
import run.frank.rentalapi.vo.BookingVO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingServiceImpl extends ServiceImpl<BookingMapper, Booking> implements BookingService {

    @Autowired
    private BookingMapper bookingMapper;

    @Autowired
    private PropertyMapper propertyMapper;

    @Override
    public List<Booking> findAll() {
        return bookingMapper.selectList(null);
    }

    @Override
    public BookingVO createBooking(CreateBookingRequest request) {
        if (request.getPropertyId() == null) {
            throw new IllegalArgumentException("Property id cannot be null");
        }
        if (request.getStartDate() == null || request.getEndDate() == null) {
            throw new IllegalArgumentException("Start date and end date cannot be null");
        }
        if (!request.getEndDate().isAfter(request.getStartDate())) {
            throw new IllegalArgumentException("End date must be after start date");
        }
        if (request.getStartDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Start date cannot be in the past");
        }

        Property property = propertyMapper.selectById(request.getPropertyId());
        if (property == null) {
            throw new IllegalArgumentException("Property not found");
        }

        Long currentUserId = SecurityUtils.getCurrentUserId();
        if (currentUserId.equals(property.getOwnerId())) {
            throw new IllegalArgumentException("You cannot book your own property");
        }

        Booking booking = new Booking();
        booking.setPropertyId(request.getPropertyId());
        booking.setTenantId(currentUserId);
        booking.setStartDate(request.getStartDate());
        booking.setEndDate(request.getEndDate());
        booking.setStatus(BookingStatus.PENDING.name());
        booking.setMessage(request.getMessage());
        booking.setCreatedAt(LocalDateTime.now());
        booking.setUpdatedAt(LocalDateTime.now());

        bookingMapper.insert(booking);
        return toVO(booking);
    }

    @Override
    public List<BookingVO> getMyBookings() {
        Long currentUserId = SecurityUtils.getCurrentUserId();
        LambdaQueryWrapper<Booking> queryWrapper = new LambdaQueryWrapper<Booking>().eq(Booking::getTenantId, currentUserId)
                .orderByDesc(Booking::getCreatedAt);

        return this.list(queryWrapper).stream()
                .map(this::toVO)
                .toList();
    }

    @Override
    public List<BookingVO> getOwnerBookings() {
        Long currentUserId = SecurityUtils.getCurrentUserId();
        return bookingMapper.findBookingsByOwnerId(currentUserId).stream()
                .map(this::toVO)
                .toList();
    }

    @Override
    public void updateBookingStatus(Long bookingId, UpdateBookingStatusRequest request) {
        Long currentUserId = SecurityUtils.getCurrentUserId();

        if (request == null || request.getStatus() == null) {
            throw new IllegalArgumentException("Status can not be null");
        }

        Booking booking = bookingMapper.selectById(bookingId);
        if (booking == null) {
            throw new IllegalArgumentException("Booking not found");
        }

        Property property = propertyMapper.selectById(booking.getPropertyId());
        if (property == null) {
            throw new IllegalArgumentException("Property not found");
        }

        if (!currentUserId.equals(property.getOwnerId())) {
            throw new IllegalArgumentException("You are not allowed to update this booking");
        }

        if (!BookingStatus.PENDING.name().equals(booking.getStatus())) {
            throw new IllegalArgumentException("Only pending booking can be processed");
        }

        BookingStatus targetStatus = request.getStatus();
        if (targetStatus != BookingStatus.CONFIRMED && targetStatus != BookingStatus.REJECTED) {
            throw new IllegalArgumentException("Only CONFIRMED or REJECTED is allowed");
        }

        if (targetStatus == BookingStatus.CONFIRMED) {
            long conflictCount = bookingMapper.countConflictingConfirmedBookings(booking.getPropertyId(),
                    booking.getStartDate(),
                    booking.getEndDate());

            if (conflictCount > 0) {
                throw new IllegalArgumentException("This booking conflicts with an existing confirmed booking");
            }

            booking.setStatus(targetStatus.name());
            booking.setUpdatedAt(LocalDateTime.now());
            bookingMapper.updateById(booking);
        }


    }

    private BookingVO toVO(Booking booking) {
        BookingVO vo = new BookingVO();
        vo.setId(booking.getId());
        vo.setPropertyId(booking.getPropertyId());
        vo.setTenantId(booking.getTenantId());
        vo.setStartDate(booking.getStartDate());
        vo.setEndDate(booking.getEndDate());
        vo.setStatus(booking.getStatus());
        vo.setMessage(booking.getMessage());
        vo.setCreatedAt(booking.getCreatedAt());
        return vo;
    }
}
