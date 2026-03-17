package run.frank.rentalapi.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateBookingRequest {

    private Long propertyId;

    private LocalDate startDate;

    private LocalDate endDate;

    private String message;

}
