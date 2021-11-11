import {reqGet, reqPost} from '@/api/repuest/api-request';


class UserApi {
  getInfo(params = {}) {
    return reqGet('/api/get/userInfo', params);
  }

  Login(data) {
    return reqPost('/api/user/login', data);
  }

  LogOut(data) {
    return reqPost('/api/user/logout', data);

  }
}


export default new UserApi();