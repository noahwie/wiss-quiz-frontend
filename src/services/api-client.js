import axios from 'axios';

// Base URL für Springboot Backend
const API_BASE_URL = 'http://localhost:8080/api';

// Axios Instance mit Basis-konfiguration
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
//wird automatisch vor jedem request ausgeführt
apiClient.interceptors.request.use(
    (config) => {
        // Token aus local storage holen
        const token = localStorage.getItem('authToken');

        // wenn Token exisitiert, zum Authorization Header hinzufügen
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Token wird mitgeschickt');
        }

        return config;
    },
    (error) => {
        console.error('request Interceptor Error:', error);
        return Promise.reject(error);
    }
);

// Response Interceptor
// Wird Automatisch nach jeder Response ausgefühhrt
apiClient.interceptors.response.use(
    (response) => {
        // Success response einfach durchreichen
        return response;
    },
    (error) => {
        // error response behandeln
        if (error.response) {
            const status = error.response.status;

            // 401 Unauthorized (Token ungültig oder abgelaufen)
            if (status === 401) {
                console.log('token ungültig - Logout erforderlich');

                // Token aus LocalStorage Löschen
                localStorage.removeItem('authToken');

                //zu Login Page redirecten (wird später mit react router gemacht)
                window.location.href = '/login';
            }

            // 403 = forbidden (keine berechtigung)
            if (status === 403) {
                console.log('keine berechtigung für diese AKtion');
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;