package run.frank.rentalapi.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("property")
public class Property {

    @TableId(type = IdType.AUTO)
    private Long id;

    private Long ownerId;

    private String title;

    private String description;

    private String addressLine1;

    private String addressLine2;

    private String city;

    private String state;

    private String country;

    private String postcode;

    private String propertyType;

    private BigDecimal pricePerWeek;

    private Integer bedrooms;

    private BigDecimal bathrooms;

    private Integer parkingSpaces;

    private LocalDate availableFrom;

    private LocalDate availableTo;

    private String status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String image;

    private BigDecimal rating;

    private List<String> features;
}
