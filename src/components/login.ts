import { ApiService } from '../services/api';

export class Login {
    private username = '';
    private password = '';

    constructor(private api: ApiService) {

    }

    async login() {
        await this.api.login(this.username, this.password);
    }
}