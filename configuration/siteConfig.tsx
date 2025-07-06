// enviroments
const environment = {
  production: {
    API_BASE_URL: "",
  },
  development: {
    API_BASE_URL: "http://localhost:3000/api/v1",
  },
};

const currentEnvironment = "production";

export default environment[currentEnvironment];
