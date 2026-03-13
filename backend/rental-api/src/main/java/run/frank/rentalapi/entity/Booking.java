package run.frank.rentalapi.entity;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class Booking {

    private Integer id;

    private Integer tenantId;

    private Integer propertyId;

    private LocalDate startDate;

    private LocalDate endDate;

    private String status;

    private LocalDateTime createdAt;
}
