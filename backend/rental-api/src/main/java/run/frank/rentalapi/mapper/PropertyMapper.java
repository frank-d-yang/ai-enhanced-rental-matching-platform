package run.frank.rentalapi.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import run.frank.rentalapi.dto.PropertyQueryDto;
import run.frank.rentalapi.entity.Property;

import java.util.List;

@Mapper
public interface PropertyMapper extends BaseMapper<Property> {

    IPage<Property> searchPropertiesByLocation(Page<Property> pageRequest, @Param("query") PropertyQueryDto queryDto);
}
