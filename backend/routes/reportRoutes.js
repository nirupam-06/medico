// backend/routes/reportRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Report = require('../models/Report');
const Patients = require('../models/Patients');
const logger = require('../utils/logger');
const router = express.Router();

// ------------------- Multer Configuration -------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /pdf|jpg|jpeg|png/;
    const valid = allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype);
    valid ? cb(null, true) : cb(new Error('Only PDF and image files are allowed.'));
  },
});

// ------------------- POST: Upload Report -------------------
router.post('/by-uid/:uid', upload.single('file'), async (req, res) => {
  const { uid } = req.params;
  const { name } = req.body;
  const file = req.file;

  if (!file || !name) return res.status(400).json({ message: 'File and name are required' });

  try {
    const patient = await Patients.findOne({ uid });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    const report = new Report({
      patientId: patient._id,
      name,
      filePath: file.path,
      fileName: file.originalname,
      fileType: file.mimetype,
    });

    await report.save();
    logger.info(`Report uploaded for UID: ${uid}`);
    res.status(201).json(report);
  } catch (err) {
    logger.error(`Error uploading report: ${err.message}`);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ------------------- PUT: Update Report -------------------
router.put('/by-uid/:uid/:id', upload.single('file'), async (req, res) => {
  const { uid, id } = req.params;
  const { name } = req.body;
  const file = req.file;

  try {
    const patient = await Patients.findOne({ uid });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    const updateData = {};
    if (name) updateData.name = name;
    if (file) {
      updateData.filePath = file.path;
      updateData.fileName = file.originalname;
      updateData.fileType = file.mimetype;
    }

    const updated = await Report.findOneAndUpdate(
      { _id: id, patientId: patient._id },
      updateData,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Report not found' });
    logger.info(`Report updated for UID: ${uid}`);
    res.json(updated);
  } catch (err) {
    logger.error(`Error updating report: ${err.message}`);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ------------------- DELETE: Delete Report -------------------
router.delete('/by-uid/:uid/:id', async (req, res) => {
  const { uid, id } = req.params;
  try {
    const patient = await Patients.findOne({ uid });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    const report = await Report.findOneAndDelete({ _id: id, patientId: patient._id });
    if (!report) return res.status(404).json({ message: 'Report not found' });

    if (fs.existsSync(report.filePath)) fs.unlinkSync(report.filePath);
    logger.info(`Report deleted for UID: ${uid}`);
    res.json({ message: 'Report deleted successfully' });
  } catch (err) {
    logger.error(`Error deleting report: ${err.message}`);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ------------------- GET: Get All Reports -------------------
router.get('/by-uid/:uid', async (req, res) => {
  const { uid } = req.params;
  try {
    const patient = await Patients.findOne({ uid });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    const reports = await Report.find({ patientId: patient._id });
    res.json(reports);
  } catch (err) {
    logger.error(`Error fetching reports: ${err.message}`);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ------------------- GET: Serve Report File -------------------
router.get('/file/:fileName', (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, '../uploads', fileName);

  if (!fs.existsSync(filePath)) {
    logger.warn(`File not found: ${filePath}`);
    return res.status(404).json({ message: 'File not found' });
  }

  res.sendFile(filePath, (err) => {
    if (err) {
      logger.error(`Error sending file: ${err.message}`);
      res.status(500).json({ message: 'Error sending file' });
    }
  });
});

module.exports = router;
