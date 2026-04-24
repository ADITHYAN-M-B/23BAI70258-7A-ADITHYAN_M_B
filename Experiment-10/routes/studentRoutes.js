const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// CREATE
router.post("/", async (req, res) => {
  const data = await Student.create(req.body);
  res.json(data);
});

// READ ALL
router.get("/", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

// READ SINGLE
router.get("/:id", async (req, res) => {
  const data = await Student.findById(req.params.id);
  res.json(data);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const data = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Record Deleted Successfully" });
});

module.exports = router;