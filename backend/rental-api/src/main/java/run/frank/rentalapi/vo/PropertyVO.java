package run.frank.rentalapi.vo;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class PropertyVO {
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

    private List<String> images;

    private BigDecimal rating;

    private List<String> features;
}
