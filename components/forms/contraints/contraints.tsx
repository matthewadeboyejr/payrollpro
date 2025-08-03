export const signinConstraints = {
  email: {
    presence: true,
  },
  password: {
    presence: true,
  },
};
export const signupConstraints = {
  name: {
    presence: true,
  },
  email: {
    presence: true,
  },
  password: {
    presence: true,
  },
  confirmPassword: {
    presence: true,
  },
};

export const addNewEmployeeConstraints = {
  employeeId: {
    presence: true,
  },
  firstName: {
    presence: true,
  },
  lastName: {
    presence: true,
  },
  email: {
    presence: true,
  },
  phone: {
    presence: true,
  },
  department: {
    presence: true,
  },
  position: {
    presence: true,
  },
  annualSalary: {
    presence: true,
  },
  startDate: {
    presence: true,
  },
  address: {
    presence: true,
  },
  emergencyContactName: {
    presence: true,
  },
};

export const hmrcSubmissionConstraints = {
  submissionType: {
    presence: true,
  },
  taxPeriod: {
    presence: true,
  },
};
