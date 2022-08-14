import apiClient from "./client";

const addConstraint = (constraint) =>
  apiClient.post("/addConstraint", constraint);

const updateConstraint = (constraint) =>
  apiClient.post("/updateConstraint", constraint);

const getContraints = () => apiClient.get("/constraints");

const apiCalls = {
  addConstraint,
  getContraints,
  updateConstraint,
};

export default apiCalls;
