import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:3000/api/auth/';
class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'posts');
  }
}
export default new UserService();