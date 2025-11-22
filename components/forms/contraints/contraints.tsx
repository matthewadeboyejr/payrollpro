export const signinConstraints = {
  email: {
    presence: true,
  },
  password: {
    presence: true,
  },
};
export const signupConstraints = {
  firstName: {
    presence: true,
  },
  lastName: {
    presence: true,
  },
  email: {
    presence: true,
  },
  phoneNumber: {
    presence: true,
  },
};

export const addNewEmployeeConstraints = {
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
  departmentId: {
    presence: true,
  },
  positionId: {
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
  emergencyContactPhone: {
    presence: true,
  },
};

export const editEmployeeConstraints = {
  email: {
    presence: true,
  },
  phone: {
    presence: true,
  },
  departmentId: {
    presence: true,
  },
  positionId: {
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
  ratePerHour: {
    presence: true,
  },
  status: {
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

export const setPasswordConstraints = {
  password: {
    presence: true,
    length: {
      minimum: 8,
      message: "must be at least 8 characters long",
    },
  },
  confirmPassword: {
    presence: true,
    equality: {
      attribute: "password",
      message: "must match the password field",
    },
  },
};

export const forgetPasswordConstraints = {
  email: {
    presence: true,
    email: true,
  },
};

export const addNewUserConstraints = {
  firstName: {
    presence: true,
  },
  lastName: {
    presence: true,
  },
  email: {
    presence: true,
  },
  phoneNumber: {
    presence: true,
  },
};

export const editUserConstraints = {
  firstName: {
    presence: true,
  },
  lastName: {
    presence: true,
  },
  roleIds: {
    presence: true,
  },
  phoneNumber: {
    presence: true,
  },
  email: {
    presence: true,
  },
};

export const addLeaveRequestConstraints = {
  leaveType: {
    presence: true,
  },
  startDate: {
    presence: true,
  },
  endDate: {
    presence: true,
  },
  reason: {
    presence: true,
  },
};
export const rejectLeaveRequestConstraints = {
  // Comment is optional for rejection
};
