package run.frank.rentalapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import run.frank.rentalapi.entity.PropertyImage;
import run.frank.rentalapi.service.PropertyImageService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PropertyImageController {

    @Autowired
    private PropertyImageService propertyImageService;

    @PostMapping("/properties/{propertyId}/images")
    public String uploadPropertyImage(@PathVariable Long propertyId,
                                      @RequestParam MultipartFile file) {
        return propertyImageService.uploadPropertyImage(propertyId, file);
    }

    @GetMapping("/properties/{propertyId}/images")
    public List<PropertyImage> getPropertyImages(@PathVariable Long propertyId) {
        return propertyImageService.getPropertyImages(propertyId);
    }

    @DeleteMapping("/property-images/{imageId}")
    public String deleteImage(@PathVariable Long imageId) {
        propertyImageService.deleteImage(imageId);
        return "image is deleted";
    }

}
