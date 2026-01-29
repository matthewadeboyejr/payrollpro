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
  weeklyHours: {
    presence: true,
  },
  workingDaysPerWeek: {
    presence: true,
  },
  gradeLevelId: {
    presence: true,
  },
  salaryBandId: {
    presence: true,
  },
  employmentTypeId: {
    presence: true,
  },
  /*  customSalary: {
    presence: true,
  }, */
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
export const addNewSalaryBandConstraints = {
  code: {
    presence: true,
  },
  gradeLevelId: {
    presence: true,
  },
  step: {
    presence: true,
  },

  payType: {
    presence: true,
  },
  currency: {
    presence: true,
  },
  minSalary: {
    presence: true,
  },
  midPoint: {
    presence: true,
  },
  maxSalary: {
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
  isHalfDay: {
    presence: true,
  },
  // timeDesignation is conditionally validated in the validateForm function
};
export const rejectLeaveRequestConstraints = {
  // Comment is optional for rejection
};

export const addShiftConstraints = {
  name: {
    presence: true,
  },
  departmentId: {
    presence: true,
  },
  ratePerHour: {
    presence: true,
  },
  startTime: {
    presence: true,
  },
  endTime: {
    presence: true,
  },
  isOvernight: {
    presence: true,
  },
  description: {
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
export const addRotaConstraints = {
  workDate: {
    presence: true,
  },
  employeeId: {
    presence: false, // optional
  },
  shiftId: {
    presence: true,
  },
};

export const claimRotaConstraints = {
  employeeId: {
    presence: true,
  },
};


