const {
  storeResumeInDb,
  findResumeDataByEmail,
} = require("../services/resume.service");

const getResumeJSON = async (req, res) => {
  const { email } = req.query;

  const resumeData = await findResumeDataByEmail(email);
  res.send(resumeData);
};

const postResumeJSON = async (req, res) => {
  const { resumeData } = req.body;
  const resumeJSON = JSON.parse(resumeData);
  const dbObject = {
    email: resumeJSON.basics.email,
    resumeData: resumeJSON,
  };

  const dbMsg = await storeResumeInDb(dbObject);
  console.log(dbMsg);
  res.send(dbMsg.msg);
};

module.exports = {
  postResumeJSON,
  getResumeJSON,
};
