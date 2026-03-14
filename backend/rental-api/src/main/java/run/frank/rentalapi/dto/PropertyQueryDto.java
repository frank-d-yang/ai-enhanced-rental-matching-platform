package run.frank.rentalapi.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PropertyQueryDto {

    private String city;
    private String state;
    private String postcode;

    private String propertyType;

    private BigDecimal minPricePerWeek;
    private BigDecimal maxPricePerWeek;

    private Integer minBedrooms;
    private Integer maxBedrooms;

    private BigDecimal minBathrooms;
    private BigDecimal maxBathrooms;

    private Integer minParkingSpaces;

    private String keyword;
}
