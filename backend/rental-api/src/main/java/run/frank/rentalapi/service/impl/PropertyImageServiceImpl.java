package run.frank.rentalapi.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import run.frank.rentalapi.entity.Property;
import run.frank.rentalapi.entity.PropertyImage;
import run.frank.rentalapi.exception.BusinessException;
import run.frank.rentalapi.mapper.PropertyImageMapper;
import run.frank.rentalapi.service.FileStorageService;
import run.frank.rentalapi.service.PropertyImageService;
import run.frank.rentalapi.service.PropertyService;

import java.io.File;
import java.util.List;

@Service
public class PropertyImageServiceImpl extends ServiceImpl<PropertyImageMapper, PropertyImage> implements PropertyImageService {

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private PropertyService propertyService;

    @Override
    public String uploadPropertyImage(Long propertyId, MultipartFile file) {
        // Check if propertyId exist
        Property property = propertyService.getById(propertyId);
        if (property == null) {
            throw new BusinessException("Property does not exist");
        }

        // Store image in server first
        String imageUrl = fileStorageService.savePropertyImage(file);

        // Check if cover already exists
        LambdaQueryWrapper<PropertyImage> coverQuery = new LambdaQueryWrapper<PropertyImage>().eq(PropertyImage::getPropertyId, propertyId)
                .eq(PropertyImage::getIsCover, true);

        PropertyImage coverImage = this.getOne(coverQuery);
        boolean isCover = (coverImage == null);

        // Get latest sort order
        LambdaQueryWrapper<PropertyImage> sortQuery = new LambdaQueryWrapper<PropertyImage>()
                .eq(PropertyImage::getPropertyId, propertyId)
                .orderByDesc(PropertyImage::getSortOrder)
                .last("limit 1");

        PropertyImage lastImage = this.getOne(sortQuery);

        int sortOrder = 0;
        if (lastImage != null) {
            sortOrder = lastImage.getSortOrder() + 1;
        }

        // Store image url in DB
        PropertyImage propertyImage = new PropertyImage();
        propertyImage.setImageUrl(imageUrl);
        propertyImage.setPropertyId(propertyId);
        propertyImage.setIsCover(isCover);
        propertyImage.setSortOrder(sortOrder);

        this.save(propertyImage);
        return imageUrl;
    }

    @Override
    public List<PropertyImage> getPropertyImages(Long propertyId) {
        LambdaQueryWrapper<PropertyImage> queryWrapper = new LambdaQueryWrapper<PropertyImage>().eq(PropertyImage::getPropertyId, propertyId)
                .orderByAsc(PropertyImage::getSortOrder);

        return this.list(queryWrapper);
    }

    @Override
    public void deleteImage(Long imageId) {
        PropertyImage propertyImage = this.getById(imageId);

        if (propertyImage == null) {
            throw new BusinessException("Image not found");
        }

        String imageUrl = propertyImage.getImageUrl();
        String filePath = imageUrl.replace("/uploads/", "uploads/");

        File file = new File(filePath);
        if (file.exists()) {
            file.delete();
        }

        this.removeById(imageId);

        if (Boolean.TRUE.equals(propertyImage.getIsCover())) {
            LambdaQueryWrapper<PropertyImage> queryWrapper = new LambdaQueryWrapper<PropertyImage>()
                    .eq(PropertyImage::getPropertyId, propertyImage.getPropertyId())
                    .orderByAsc(PropertyImage::getSortOrder)
                    .last("limit 1");

            PropertyImage nextImage = this.getOne(queryWrapper);

            if (nextImage != null) {
                nextImage.setIsCover(true);
                this.updateById(nextImage);
            }
        }
    }
}
