package run.frank.rentalapi.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import run.frank.rentalapi.service.FileStorageService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private static final String UPLOAD_DIR = "uploads/property";

    @Override
    public String savePropertyImage(MultipartFile file) {
        validateFile(file);

        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalFilename = file.getOriginalFilename();
            String extension = getExtension(originalFilename);

            validateImageType(extension);

            String newFileName = UUID.randomUUID() + extension;

            Path targetPath = uploadPath.resolve(newFileName);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/property/" + newFileName;
        }catch (IOException e) {
            throw new RuntimeException("Failed to save file.", e);
        }
    }

    private void validateImageType(String extension) {
        if (!extension.equals(".jpg") &&
                !extension.equals(".jpeg") &&
                !extension.equals(".png")) {
            throw new RuntimeException("Only JPG and PNG images are allowed.");
        }
    }

    private String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "";
        }

        return filename.substring(filename.lastIndexOf("."));
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File must not be empty.");
        }
    }
}
