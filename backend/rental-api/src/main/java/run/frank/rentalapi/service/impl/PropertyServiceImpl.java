package run.frank.rentalapi.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import run.frank.rentalapi.dto.PropertyQueryDto;
import run.frank.rentalapi.entity.Property;
import run.frank.rentalapi.entity.PropertyImage;
import run.frank.rentalapi.exception.BusinessException;
import run.frank.rentalapi.mapper.PropertyImageMapper;
import run.frank.rentalapi.mapper.PropertyMapper;
import run.frank.rentalapi.security.LoginUser;
import run.frank.rentalapi.security.SecurityUtils;
import run.frank.rentalapi.service.PropertyService;
import run.frank.rentalapi.vo.PropertyVO;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PropertyServiceImpl extends ServiceImpl<PropertyMapper, Property> implements PropertyService {

    @Autowired
    private PropertyMapper propertyMapper;

    @Autowired
    private PropertyImageMapper propertyImageMapper;

    @Override
    public IPage<Property> searchProperties(Integer page, Integer size, String sortBy, String sortDirection, PropertyQueryDto queryDto) {
        Page<Property> pageRequest = new Page<>(page, size);

        boolean useLocation =
                queryDto.getLatitude() != null && queryDto.getLongitude() != null;

        if (useLocation) {
            return propertyMapper.searchPropertiesByLocation(
                    pageRequest,
                    queryDto
            );
        }

        LambdaQueryWrapper<Property> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Property::getStatus, "PUBLISHED");

        queryWrapper.eq(queryDto.getCity() != null && !queryDto.getCity().isBlank(), Property::getCity, queryDto.getCity());
        queryWrapper.eq(queryDto.getState() != null && !queryDto.getState().isBlank(), Property::getState, queryDto.getState());
        queryWrapper.eq(queryDto.getPostcode()!= null && !queryDto.getPostcode().isBlank(), Property::getPostcode, queryDto.getPostcode());

        queryWrapper.eq(queryDto.getPropertyType() != null && !queryDto.getPropertyType().isBlank(), Property::getPropertyType, queryDto.getPropertyType());

        queryWrapper.ge(queryDto.getMinPricePerWeek() != null, Property::getPricePerWeek, queryDto.getMinPricePerWeek());
        queryWrapper.le(queryDto.getMaxPricePerWeek() != null, Property::getPricePerWeek, queryDto.getMaxPricePerWeek());

        queryWrapper.ge(queryDto.getMinBedrooms() != null, Property::getBedrooms, queryDto.getMinBedrooms());
        queryWrapper.le(queryDto.getMaxBedrooms() != null, Property::getBedrooms, queryDto.getMaxBedrooms());

        queryWrapper.ge(queryDto.getMinBathrooms() != null, Property::getBathrooms, queryDto.getMinBathrooms());
        queryWrapper.le(queryDto.getMaxBathrooms() != null, Property::getBathrooms, queryDto.getMaxBathrooms());

        queryWrapper.ge(queryDto.getMinParkingSpaces() != null, Property::getParkingSpaces, queryDto.getMinParkingSpaces());

        if(queryDto.getKeyword() != null && !queryDto.getKeyword().isBlank()) {
            queryWrapper.and(wrapper -> wrapper
                    .like(Property::getTitle, queryDto.getKeyword())
                    .or()
                    .like(Property::getDescription, queryDto.getKeyword())
                    .or()
                    .like(Property::getAddressLine1, queryDto.getKeyword())
            );
        }

        applySorting(queryWrapper, sortBy, sortDirection);

        return this.page(pageRequest, queryWrapper);
    }

    @Override
    public PropertyVO getPublishedPropertyById(Long id) {
        LambdaQueryWrapper<Property> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Property::getId, id)
                .eq(Property::getStatus, "PUBLISHED");

        Property property = this.getOne(queryWrapper);

        LambdaQueryWrapper<PropertyImage> imageQueryWrapper = new LambdaQueryWrapper<>();
        imageQueryWrapper.eq(PropertyImage::getPropertyId, id)
                .orderByAsc(PropertyImage::getSortOrder);

        List<PropertyImage> images = propertyImageMapper.selectList(imageQueryWrapper);

        PropertyVO vo = new PropertyVO();
        BeanUtils.copyProperties(property, vo);

        vo.setImages(
                images.stream()
                        .map(PropertyImage::getImageUrl)
                        .toList()
        );

        return vo;
    }

    private void applySorting(LambdaQueryWrapper<Property> queryWrapper, String sortBy, String sortDirection) {
        boolean isAsc = "ASC".equalsIgnoreCase(sortDirection);

        switch (sortBy) {
            case "pricePerWeek":
                queryWrapper.orderBy(true, isAsc, Property::getPricePerWeek);
                break;
            case "bedrooms":
                queryWrapper.orderBy(true, isAsc, Property::getBedrooms);
                break;
            case "bathrooms":
                queryWrapper.orderBy(true, isAsc, Property::getBathrooms);
                break;
            case "availableFrom":
                queryWrapper.orderBy(true, isAsc, Property::getAvailableFrom);
                break;
            case "createdAt":
                queryWrapper.orderBy(true, isAsc, Property::getCreatedAt);
                break;
            default:
                queryWrapper.orderByDesc(Property::getCreatedAt);
                break;
        }
    }

    @Override
    public void postProperty(Property property) {
        property.setOwnerId(SecurityUtils.getCurrentUserId());
        propertyMapper.insert(property);
    }

    @Override
    public void updateProperty(Long id, Property property) {
        Property existingProperty = this.getById(id);

        if (existingProperty == null) {
            throw new BusinessException("Property does not exist");
        }

        Long currentUserId = SecurityUtils.getCurrentUserId();
        Long ownerId = existingProperty.getOwnerId();

        if (!currentUserId.equals(ownerId)) {
            throw new BusinessException("You are not allowed to update this property");
        }

        property.setId(existingProperty.getId());
        property.setOwnerId(existingProperty.getOwnerId());
        property.setCreatedAt(existingProperty.getCreatedAt());
        property.setUpdatedAt(LocalDateTime.now());

        this.updateById(property);
    }

    @Override
    public void deleteProperty(Long id) {
        Property property = this.getById(id);
        if (property == null) {
            throw new BusinessException("Property does not exist");
        }

        Long currentUserId = SecurityUtils.getCurrentUserId();
        if (!currentUserId.equals(property.getOwnerId())) {
            throw new BusinessException("You are not allowed to delete this property");
        }

        this.removeById(id);
    }
}
