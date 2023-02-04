import axiosClient from "./axiosClient";

const authApi = {
  //エンドポイントを指定する。
  register: (params) => axiosClient.post("auth/register", params),
  login: (params) => axiosClient.post("auth/login", params),
  verifyToken: () => axiosClient.post("auth/verify-token"),
};

export default authApi;
