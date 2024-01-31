import axios from 'axios';

let axiosOptions = {
  baseURL:'http://localhost:4000/api/'
};



var instance = axios.create(axiosOptions);

instance.interceptors.request.use(function (config) {
  let userSession = JSON.parse(sessionStorage.getItem('userSession'));

  if(userSession){
    config.headers = {
      'Authorization': `Bearer ${userSession.jwt}`
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});


instance.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    return Promise.reject(error.response.data);
  });

export default instance;