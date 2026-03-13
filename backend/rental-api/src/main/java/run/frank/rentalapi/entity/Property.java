package run.frank.rentalapi.entity;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class Property {

    private Integer id;

    private String title;

    private String description;

    private BigDecimal price;

    private String location;

    private Integer ownerId;

    private LocalDateTime createdAt;
}
