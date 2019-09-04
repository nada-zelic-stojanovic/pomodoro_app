import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://tomato-by-tsukuyomi.firebaseio.com/'
});

export default instance;