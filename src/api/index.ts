import axios from 'axios';

export default axios.create({
    baseURL: 'https://kaamelott.kyane.fr/api/v1',
    timeout: 5000,
});