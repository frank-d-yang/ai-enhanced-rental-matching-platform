package run.frank.rentalapi.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import run.frank.rentalapi.entity.User;

import java.util.List;

@Mapper
public interface UserMapper {

    @Select("SELECT id, name, email, password, role, created_at FROM app_user")
    List<User> findAll();

    @Select("SELECT id, name, email, password, role, created_at FROM app_user WHERE email = #{email}")
    User findByEmail(String email);

    @Insert("""
        INSERT INTO app_user (name, email, password, role)
        VALUES (#{name}, #{email}, #{password}, #{role})
    """)
    int insertUser(User user);
}
