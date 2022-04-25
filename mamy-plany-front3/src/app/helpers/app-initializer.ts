import { AuthService } from "../services/auth.service";

export function appInitializer(authenticationService: AuthService) {
    return () => new Promise((resolve, reject) => {
        // attempt to refresh token on app start up to auto authenticate
        authenticationService.getUser()
            .subscribe((data) => resolve(data))
    });
}