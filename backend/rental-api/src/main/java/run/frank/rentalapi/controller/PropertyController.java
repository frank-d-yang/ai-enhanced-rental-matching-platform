package run.frank.rentalapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import run.frank.rentalapi.entity.Property;
import run.frank.rentalapi.mapper.PropertyMapper;

import java.util.List;

@RestController
@RequestMapping("/properties")
public class PropertyController {

    @Autowired
    private PropertyMapper propertyMapper;

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyMapper.findAll();
    }

    @PostMapping
    public String createProperty(@RequestBody Property property) {
        propertyMapper.insert(property);
        return "Property created";
    }
}
