package run.frank.rentalapi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import run.frank.rentalapi.entity.Property;
import run.frank.rentalapi.mapper.PropertyMapper;
import run.frank.rentalapi.service.PropertyService;

import java.util.List;

@Service
public class PropertyServiceImpl implements PropertyService {

    @Autowired
    private PropertyMapper propertyMapper;

    @Override
    public List<Property> findAll() {
        return propertyMapper.selectList(null);
    }

    @Override
    public void postProperty(Property property) {
        propertyMapper.insert(property);
    }
}
