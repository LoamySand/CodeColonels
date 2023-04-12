exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.rootBoard = (req, res) => {
  res.status(200).send("Root Content.");
};
exports.providerBoard = (req, res) => {
  res.status(200).send("Provider Content.");
};
