package run.frank.rentalapi.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import run.frank.rentalapi.entity.Booking;

import java.util.List;

@Mapper
public interface BookingMapper extends BaseMapper<Booking> {

}
