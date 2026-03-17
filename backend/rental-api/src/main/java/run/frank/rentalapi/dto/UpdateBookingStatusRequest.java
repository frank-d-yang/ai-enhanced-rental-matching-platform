package run.frank.rentalapi.dto;

import lombok.Data;
import run.frank.rentalapi.enums.BookingStatus;

@Data
public class UpdateBookingStatusRequest {

    private BookingStatus status;
}
