package run.frank.rentalapi.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import run.frank.rentalapi.entity.Booking;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface BookingMapper extends BaseMapper<Booking> {

    @Select("""
        SELECT b.*
        FROM booking b
        JOIN property p ON b.property_id = p.id
        WHERE p.owner_id = #{ownerId}
    """)
    List<Booking> findBookingsByPropertyOwnerId(@Param("ownerId") Long ownerId);

    long countConflictingConfirmedBookings(Long propertyId, LocalDate startDate, LocalDate endDate);
}
