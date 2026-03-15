package run.frank.rentalapi.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    String savePropertyImage(MultipartFile file);
}
