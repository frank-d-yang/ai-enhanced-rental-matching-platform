package run.frank.rentalapi.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import run.frank.rentalapi.entity.User;

import java.util.List;

@Mapper
public interface UserMapper extends BaseMapper<User> {

    List<User> findAll();
}
