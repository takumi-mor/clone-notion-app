import axiosClient from "./axiosClient";

const memoApi = {
  create: () => axiosClient.post("memo"),
  getAll: () => axiosClient.post("memo"),
};

export default memoApi;