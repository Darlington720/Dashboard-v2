const getDetailsForStudent = (student) => ({
  type: "STUDENT_DETAILS",
  payload: student,
});

const editConstraint = (constraint) => ({
  type: "EDIT_CONSTRAINT",
  payload: constraint,
});

const actions = {
  getDetailsForStudent,
  editConstraint,
};

export default actions;
