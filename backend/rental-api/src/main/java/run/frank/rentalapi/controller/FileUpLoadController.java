package run.frank.rentalapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import run.frank.rentalapi.service.FileStorageService;

@RestController
@RequestMapping("/api/upload")
public class FileUpLoadController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping
    public String upload(@RequestParam MultipartFile file) {
        return fileStorageService.savePropertyImage(file);
    }
}
