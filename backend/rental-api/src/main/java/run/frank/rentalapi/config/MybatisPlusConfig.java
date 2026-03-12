package run.frank.rentalapi.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("run.frank.rentalapi.mapper")
public class MybatisPlusConfig {

}
