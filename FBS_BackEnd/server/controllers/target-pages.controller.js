const Target_pages = require("../models/target-pages");

const targetPagesCtrl = {};

targetPagesCtrl.getTargetPages = async (req, res) => {
  const target = await Target_pages.find({});
  res.json(target);
};

targetPagesCtrl.InsertTargetPages = async (req, res) => {
  const target = req.body;
  var status = {};

  await Target_pages.create(target, function(err, res) {
    if (err != null) {
      status = { status: -1 };
    } else {
      status = { status: 1 };
    }
  });

  res.json(status);
};

targetPagesCtrl.deleteTargetPages = async (req, res) => {
  const target = req.body;
  var status = {};

  await Target_pages.deleteOne(target, function(err, res) {
    if (err != null) {
      status = { status: -1 };
    } else {
      status = { status: 1 };
    }
  });

  res.json(status);
};

module.exports = targetPagesCtrl;
