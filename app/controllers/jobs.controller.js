const jwtDecode = require("jwt-decode");
const models = require("../models");
const httpStatusConfig = require("../config/httpStatus.config");
const { generateUUID } = require("../helpers/uuid");

const Jobs = models.jobs;

exports.create = (req, res) => {
  const { title, skills, description, timeline, location } = req.body;
  if (!title || !skills || !description || !timeline || !location || !createdBy) {
    return res.status(httpStatusConfig.BAD_REQUEST).send({ message: "Incomplete body" });
  }

  const jobs = new Jobs({
    jobId: generateUUID(),
    title,
    skills,
    timeline,
    description,
    category,
    createdBy,
    location,
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

exports.filter = (req, res) => {
  Jobs.find({
    skills: { $in: req.body.skills },
    location: req.body.location,
  })
    .then((data) => {
      res.status(httpStatusConfig.OK).send(data);
    })
    .catch((err) => res.status(500).send({ message: "error" }));
}
