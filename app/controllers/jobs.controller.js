const jwtDecode = require("jwt-decode");
const models = require("../models");
const httpStatusConfig = require("../config/httpStatus.config");
const { generateUUID } = require("../helpers/uuid");

const Jobs = models.jobs;

exports.create = (req, res) => {
  if (
    !req.body.title ||
    !req.body.title ||
    !req.body.skills ||
    !req.body.timeline ||
    !req.body.description
  ) {
    return res.status(httpStatusConfig.BAD_REQUEST).send({ message: "Incomplete body" });
  }

  const jobs = new Jobs({
    jobId: generateUUID(),
    title: req.body.title,
    skills: req.body.skills,
    timeline: req.body.timeline,
    description: req.body.description,
    category: req.body.category,
    createdBy: req.body.createdBy,
  });

  jobs
    .save(jobs)
    .then(() => {
      res.status(httpStatusConfig.CREATED).send(null);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while creating history",
      });
    });
};

exports.findAll = (req, res) => {
  // let token = req.headers["x-access-token"];
  // const id = jwtDecode(token);

  Jobs.find()
    .then((data) => {
      if (!data) {
        return res.status(200).send("No Watch History");
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while creating history",
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;
  Jobs.findOne({ jobId: id })
    .then((data) => {
      console.log(data);
      res.status(httpStatusConfig.OK).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete",
      });
    });
}


exports.update = (req, res) => {
  const id = req.body.jobId;
  Jobs.findOneAndUpdate({ jobId: id }, req.body)
    .then(() => {
      res.status(httpStatusConfig.OK).send(null);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
}

exports.delete = (req, res) => {
  const id = req.body.jobId;
  Jobs.findOneAndDelete({ jobId: id })
    .then(() => {
      res.status(httpStatusConfig.OK).send(null);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
