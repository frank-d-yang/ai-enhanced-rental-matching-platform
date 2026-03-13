package run.frank.rentalapi.service;

import run.frank.rentalapi.entity.Property;

import java.util.List;

public interface PropertyService {
    List<Property> findAll();

    void postProperty(Property property);
}
