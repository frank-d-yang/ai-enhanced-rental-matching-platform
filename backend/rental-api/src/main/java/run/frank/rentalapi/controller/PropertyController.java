package run.frank.rentalapi.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import run.frank.rentalapi.dto.PropertyQueryDto;
import run.frank.rentalapi.entity.Property;
import run.frank.rentalapi.service.PropertyService;


@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @GetMapping
    public IPage<Property> searchProperties(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection,
            PropertyQueryDto propertyQueryDto) {

        return propertyService.searchProperties(page, size, sortBy, sortDirection, propertyQueryDto);
    }

    @GetMapping("/{id}")
    public Property getPropertyById(@PathVariable Long id) {
        return propertyService.getPublishedPropertyById(id);
    }

    @PostMapping
    public String createProperty(@RequestBody Property property) {
        propertyService.postProperty(property);
        return "Property created";
    }

    @PutMapping("/{id}")
    public String updateProperty(@PathVariable Long id, @RequestBody Property property) {
        propertyService.updateProperty(id, property);
        return "Property updated";
    }

    @DeleteMapping("/{id}")
    public String deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return "Property deleted";
    }

}
