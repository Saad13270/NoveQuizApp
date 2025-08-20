// jest.setup.js

// Mock Vite environment variables for Jest
global.import = global.import || {};
global.import.meta = {
  env: {
    VITE_API_URL: "http://localhost:5000", // mock backend URL
  },
};

