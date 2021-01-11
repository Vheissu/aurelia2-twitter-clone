import { HttpClient, json } from '@aurelia/fetch-client';

import config from '../config/config.json';

export interface IJwtResponse {
    token: string;
    user_email: string;
    user_nicename: string;
    user_display_name: string;
}

export class ApiService {
    private http: HttpClient = new HttpClient();

    constructor() {
        this.http.configure(config => {
            config.withInterceptor({
                async request(request: Request) {
                    const token = localStorage.getItem('jwtToken');

                    if (token) {
                        request.headers.append('Authorization', 'Bearer ' + token);
                    }

                    return request;
                }
            });

            return config;
        });
    }

    async login(username: string, password: string): Promise<void> {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const request = await this.http.fetch(`${config.apiUrl}jwt-auth/v1/token`, {
            method: 'POST',
            mode: 'cors',
            body: formData
        });

        try {
            const response = await request.json() as IJwtResponse;
            
            localStorage.setItem('jwtToken', response.token);
        } catch (e) {
            localStorage.removeItem('jwtToken');
        }
    }

    logout() {
        localStorage.removeItem('jwtToken');
    }
}