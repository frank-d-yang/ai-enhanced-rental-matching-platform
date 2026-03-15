package run.frank.rentalapi.service;

import com.baomidou.mybatisplus.extension.service.IService;
import org.springframework.web.multipart.MultipartFile;
import run.frank.rentalapi.entity.PropertyImage;

import java.util.List;

public interface PropertyImageService extends IService<PropertyImage> {
    String uploadPropertyImage(Long propertyId, MultipartFile file);

    List<PropertyImage> getPropertyImages(Long propertyId);

    void deleteImage(Long imageId);
}
