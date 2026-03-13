package run.frank.rentalapi.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {

    public static LoginUser getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getPrincipal() == null) {
            return null;
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof LoginUser loginUser) {
            return loginUser;
        }

        return null;
    }

    public static Long getCurrentUserId() {
        LoginUser loginUser = getCurrentUser();
        return loginUser != null ? loginUser.getUserId() : null;
    }

    public static String getCurrentUsername() {
        LoginUser loginUser = getCurrentUser();
        return loginUser != null ? loginUser.getUsername() : null;
    }

    public static String getCurrentUserRole() {
        LoginUser loginUser = getCurrentUser();
        return loginUser != null ? loginUser.getRole() : null;
    }
}
