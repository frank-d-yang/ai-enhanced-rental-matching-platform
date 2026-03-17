package run.frank.rentalapi.vo;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class BookingVO {

    private Long id;

    private Long propertyId;

    private Long tenantId;

    private LocalDate startDate;

    private LocalDate endDate;

    private String status;

    private String message;

    private LocalDateTime createdAt;
}
