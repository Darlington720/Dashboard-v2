import apiClient from "./client";

const getStudent = (studentNo) => apiClient.get(`/student/${studentNo}`);
const addStudent = (student) => apiClient.post("/studentReg", student);
const signOutStudent = (studentNo) =>
  apiClient.post(`/studentSignout/${studentNo}`);
const loginStudent = (studentInfo) => apiClient.post("/api/login", studentInfo);
const getMyStudents = (userId) => apiClient.get(`/myStudents/${userId}`);
const getAllStudents = () => apiClient.get("/studentsToday");
const getForSpecificStudent = (studentNo) =>
  apiClient.get(`/allstudentdetails/${studentNo}`);

const getForSpecificStudentCustomReport = (student) =>
  apiClient.post(`/allstudentdetails/`, student);

const getCustomReports = (data) => apiClient.post("/getCustomReports", data);

// const addCustomer = (customer) => apiClient.post("/customers", customer);
const deleteInvoice = (invoice) => apiClient.post("/delInvoice", invoice);
// const updateCustomer = (customer) =>
//   apiClient.post("/updateCustomer", customer);

const apiCalls = {
  getAllStudents,
  getForSpecificStudent,
  getCustomReports,
  getForSpecificStudentCustomReport,
};

export default apiCalls;
