package run.frank.rentalapi.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("booking")
public class Booking {

    @TableId(type = IdType.AUTO)
    private Long id;

    private Long tenantId;

    private Long propertyId;

    private LocalDate startDate;

    private LocalDate endDate;

    private String status;

    private String message;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
