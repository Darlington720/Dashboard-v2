import apiClient from "./client";

const getVisitorsToday = () => apiClient.get(`/visitorData`);
// const addStudent = (student) => apiClient.post("/studentReg", student);
// const signOutStudent = (studentNo) =>
//   apiClient.post(`/studentSignout/${studentNo}`);

// const addCustomer = (customer) => apiClient.post("/customers", customer);
// const deleteInvoice = (invoice) => apiClient.post("/delInvoice", invoice);
// const updateCustomer = (customer) =>
//   apiClient.post("/updateCustomer", customer);

const apiCalls = {
  getVisitorsToday,
};

export default apiCalls;
