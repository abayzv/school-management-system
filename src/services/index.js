import axios from "axios";

// API ROOT URL
const RootPath = "http://localhost:8000";

const Get = (path) => {
  const promise = new Promise((resolve, reject) => {
    axios.get(`${RootPath}/api/${path}`).then(
      (result) => {
        resolve(result.data.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
  return promise;
};

const Post = (path, data) => {
  const promise = new Promise((resolve, reject) => {
    axios.post(`${RootPath}/api/${path}`, data).then(
      (result) => {
        resolve(result.data.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
  return promise;
};

const Delete = (path, id) => {
  const promise = new Promise((resolve, reject) => {
    axios.delete(`${RootPath}/api/${path}/${id}`).then(
      (result) => {
        resolve(result.data.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
  return promise;
};

const Put = (path, id, data) => {
  const promise = new Promise((resolve, reject) => {
    axios.put(`${RootPath}/api/${path}/${id}`, data).then(
      (result) => {
        resolve(result.data.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
  return promise;
};

// Student Api
const getStudent = () => Get("student");
const getStudentDetail = (id) => Get(`student/${id}`);
const saveStudent = (data) => Post("student", data);
const updateStudent = (id, data) => Put("student", id, data);

// Class Master Api
const getClassroom = () => Get("classroom");
const deleteClassroom = (id) => Delete("classroom", id);
const saveClassRoom = (data) => Post("classroom", data);
const updateClassRoom = (id, data) => Put("classroom", id, data);

// Class Section Api
const getSection = () => Get("section");
const deleteSection = (id) => Delete("section", id);
const saveSection = (data) => Post("section", data);
const updateSection = (id, data) => Put("section", id, data);

// Class Group API
const getClassGroup = () => Get("classgroup");
const deleteClassGroup = (id) => Delete("classgroup", id);
const saveClassGroup = (data) => Post("classgroup", data);
const updateClassGroup = (id, data) => Put("classgroup", id, data);
const getStudentAssign = () => Get("searchstudent");

// Fee Group API
const getFeeGroup = () => Get("feegroup");
const deleteFeeGroup = (id) => Delete("feegroup", id);
const saveFeeGroup = (data) => Post("feegroup", data);
const updateFeeGroup = (id, data) => Put("feegroup", id, data);

// Fee Type API
const getFeeType = () => Get("feetype");
const deleteFeeType = (id) => Delete("feetype", id);
const saveFeeType = (data) => Post("feetype", data);
const updateFeeType = (id, data) => Put("feetype", id, data);

// Fee Master API
const getFeeMaster = () => Get("feemaster");
const saveFeeMaster = (data) => Post("feemaster", data);

// Get Student Fee
const getStudentFee = (id) => Get(`colectdata/${id}`);

// Fee Transaction API
const getFeeTransaction = (id) => Get(`feetransaction/${id}`);
const getTransaction = () => Get(`feetransaction`);

const API = {
  getStudent,
  saveStudent,
  updateStudent,
  getClassroom,
  getSection,
  deleteClassroom,
  saveClassRoom,
  updateClassRoom,
  deleteSection,
  saveSection,
  updateSection,
  getStudentAssign,
  getClassGroup,
  deleteClassGroup,
  saveClassGroup,
  updateClassGroup,
  getFeeGroup,
  deleteFeeGroup,
  saveFeeGroup,
  updateFeeGroup,
  getFeeType,
  deleteFeeType,
  saveFeeType,
  updateFeeType,
  getFeeMaster,
  saveFeeMaster,
  getStudentDetail,
  getStudentFee,
  getFeeTransaction,
  getTransaction,
};

export default API;
