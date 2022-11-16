import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4444/user/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'role', { headers: authHeader() });
  }

}

export default new UserService();