package run.frank.rentalapi.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import run.frank.rentalapi.entity.Booking;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface BookingMapper extends BaseMapper<Booking> {

    List<Booking> findBookingsByOwnerId(@Param("ownerId") Long ownerId);

    long countConflictingConfirmedBookings(Long propertyId, LocalDate startDate, LocalDate endDate);
}
