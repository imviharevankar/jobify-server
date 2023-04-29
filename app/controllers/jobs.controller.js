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
    id: generateUUID(),
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

  History.find({ uid: id?._id })
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

exports.delete = (req, res) => {
  const id = req.params.id;
  console.log(id);
  History.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Movie not found" });
      } else {
        res.send({ id });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
