package run.frank.rentalapi.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import run.frank.rentalapi.entity.Booking;

import java.util.List;

@Mapper
public interface BookingMapper {

    @Select("""
        SELECT id, tenant_id, property_id, start_date, end_date, status, created_at
        FROM booking
    """)
    List<Booking> findAll();

    @Insert("""
        INSERT INTO booking (tenant_id, property_id, start_date, end_date, status)
        VALUES (#{tenantId}, #{propertyId}, #{startDate}, #{endDate}, #{status})
    """)
    int insert(Booking booking);
}
