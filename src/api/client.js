import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://10.7.0.22:9000/",
});

export default apiClient;
