package run.frank.rentalapi.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("property_image")
public class PropertyImage {

    @TableId(type = IdType.AUTO)
    private Long id;

    private Long propertyId;

    private String imageUrl;

    private Boolean isCover;

    private Integer sortOrder;

    private LocalDateTime createdAt;

}
