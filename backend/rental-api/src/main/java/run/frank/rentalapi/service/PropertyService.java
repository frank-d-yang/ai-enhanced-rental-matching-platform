package run.frank.rentalapi.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import run.frank.rentalapi.dto.PropertyQueryDto;
import run.frank.rentalapi.entity.Property;

public interface PropertyService extends IService<Property> {

    IPage<Property> searchProperties(Integer page, Integer size, String sortBy, String sortDirection, PropertyQueryDto propertyQueryDto);

    Property getPublishedPropertyById(Long id);

    void postProperty(Property property);

    void updateProperty(Long id, Property property);

    void deleteProperty(Long id);
}
