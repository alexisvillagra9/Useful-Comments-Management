const Target_pages = require("../models/target-pages");

const targetPagesCtrl = {};

targetPagesCtrl.getTargetPages = async (req, res) => {
  const target = await Target_pages.find({});
  res.json(target);
};

targetPagesCtrl.InsertTargetPages = async (req, res) => {
  const target = req.body;
  let status = {};

  // await Target_pages.create(target, function (err, res) {
  //   if (err != null) {
  //     status = { status: -1 };
  //   } else {
  //     status = { status: 1 };
  //   }
  // });
  let newPage =  await Target_pages.create(target);

  res.json(newPage);
};

targetPagesCtrl.deleteTargetPages = async (req, res) => {
  const target = req.body;
  var status = {};

  await Target_pages.deleteOne(target, function (err, res) {
    if (err != null) {
      status = { status: -1 };
    } else {
      status = { status: 1 };
    }
  });

  res.json(status);
};

targetPagesCtrl.UpdateTargetPages = async (req, res) => {
  const _id = req.body._id;
  const target = {
    target_date_in: req.body.target_date_in,
    target_link: req.body.target_link,
    target_desc: req.body.target_desc,
  };
  var status = {};

  await Target_pages.findOneAndUpdate(target._id, { $set: target }, function (
    err,
    res
  ) {
    if (err != null) {
      status = { status: -1 };
    } else {
      status = { status: 1 };
    }
  });

  res.json(status);
};

module.exports = targetPagesCtrl;
