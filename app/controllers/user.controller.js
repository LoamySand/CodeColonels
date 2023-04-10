exports.allAccess = (req, res) => {
  res.sendStatus("Public Content.");
};

exports.providerBoard = (req, res) => {
  res.sendStatus("Provider Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.rootBoard = (req, res) => {
  res.status(200).send("Root Content.");
};
