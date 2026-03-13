package run.frank.rentalapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import run.frank.rentalapi.entity.Property;
import run.frank.rentalapi.service.PropertyService;

import java.util.List;

@RestController
@RequestMapping("/properties")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.findAll();
    }

    @PostMapping
    public String createProperty(@RequestBody Property property) {
        propertyService.postProperty(property);
        return "Property created";
    }
}
