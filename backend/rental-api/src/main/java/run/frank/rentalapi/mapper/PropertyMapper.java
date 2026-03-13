package run.frank.rentalapi.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import run.frank.rentalapi.entity.Property;

import java.util.List;

@Mapper
public interface PropertyMapper {
    @Select("""
        SELECT id, title, description, price, location, owner_id, created_at
        FROM property
    """)
    List<Property> findAll();

    @Insert("""
        INSERT INTO property (title, description, price, location, owner_id)
        VALUES (#{title}, #{description}, #{price}, #{location}, #{ownerId})
    """)
    int insert(Property property);
}
