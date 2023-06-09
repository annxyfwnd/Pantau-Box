const express = require('express');
const router = express.Router();
// Auth library
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Upload library
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Storage } = require('@google-cloud/storage');

const db = require('../lib/db');
const upload = multer({ dest: process.env.TMP_UPLOAD_FOLDER });

const bucketName = process.env.STORAGE_BUCKET_NAME;
const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: require(process.env.STORAGE_KEY_LOCATION)
});
const bucket = storage.bucket(bucketName);

router.get('/healthcheck', (req, res) => {
    return res.status(200).json({ message: db.state });
});

router.post('/login', upload.any(), (req, res) => {
    const { nik } = req.body;

    // Cek apakah NIK memiliki panjang 16 karakter
    if (nik.length !== 16) {
        return res.status(400).json({ message: 'Invalid NIK' });
    }

    // Query ke database untuk mendapatkan data pengguna berdasarkan NIK
    const query = 'SELECT * FROM data_ktp WHERE nik = ?';
    db.query(query, [nik], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Cek apakah NIK ditemukan di database
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verifikasi sukses, kirim pesan "verifikasi sukses" bersama dengan token JWT
        try {
            const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
            const token = jwt.sign({ nik }, JWT_SECRET_KEY, { expiresIn: '1h' });
            res.json({ nik: req.body.nik, message: 'Verifikasi Sukses', token });
        } catch (e) {
            return res.status(404).json({ message: e.message });
        }
    });
});

router.post('/upload', upload.single('photo'), async (req, res) => {
    const { nik } = req.body; // Mengambil nilai NIK dari req.body
    const photoPath = req.file.path;
  
    // Mendapatkan ekstensi file foto yang diunggah
    const fileExtension = path.extname(req.file.originalname);
  
    // Membuat nama file baru berdasarkan NIK dan ekstensi file
    const newFileName = `${nik}${fileExtension}`;
  
    // Membuat path baru untuk foto dengan nama file baru
    const newPhotoPath = path.join(path.dirname(photoPath), newFileName);
  
    // Rename/mengganti nama file foto yang diunggah
    fs.renameSync(photoPath, newPhotoPath);
  
    try {
      // Upload gambar ke Google Cloud Storage
      await bucket.upload(newPhotoPath, {
        destination: newFileName,
        public: true, // Membuat gambar dapat diakses secara publik
        metadata: {
          contentType: req.file.mimetype
        }
      });
  
      // Hapus file lokal yang sudah diunggah
      fs.unlinkSync(newPhotoPath);
  
      // Dapatkan URL gambar yang diunggah
      const imageUrl = `https://storage.googleapis.com/${bucketName}/${newFileName}`;
  
      console.log('Photo uploaded!');
      return res.status(200).json({ error: false, message: 'Photo uploaded successfully', imageUrl });
    } catch (error) {
      console.error('Error uploading photo:', error);
      return res.status(500).json({ error: true, message: error.message });
    }
});

router.put('/vote/:id',upload.any(), (req, res) => {
    const { id } = req.params;
    let { option } = req.body;
  
    // Cek apakah ID valid (16 karakter)
    if (id.length !== 16) {
      res.status(400).json({ error: 'NIK tidak valid.' });
      return;
    }
  
    // Periksa apakah pengguna sudah melakukan voting sebelumnya
    db.query('SELECT * FROM data_ktp WHERE nik = ?', [id], (err, result) => {
      if (err) {
        console.error('Terjadi kesalahan:', err.message);
        res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan.' });
      } else {
        if (result.length === 0) {
          res.status(404).json({ error: 'NIK tidak ditemukan.' });
        } else {
          const voteData = result[0];
  
          // Periksa apakah pengguna sudah melakukan voting sebelumnya
          if (voteData.voted) {
            res.status(400).json({ error: 'Anda telah melakukan voting sebelumnya.' });
          } else {
            // Periksa apakah pilihan voting valid
            if (!['1', '2'].includes(option)) {
              res.status(400).json({ error: 'Pilihan voting tidak valid.' });
              return;
            }
  
            // Ubah tipe data option menjadi number
            option = parseInt(option);
  
            // Update data voting di MySQL dengan hasil pemilihan pengguna
            db.query('UPDATE data_ktp SET voted = ?, selected_option = ? WHERE nik = ?', [true, option, id], (err, result) => {
              if (err) {
                console.error('Terjadi kesalahan:', err.message);
                res.status(500).json({ error: 'Terjadi kesalahan saat memproses pemilihan.' });
              } else {
                res.status(200).json({ success: true });
              }
            });
          }
        }
      }
    });
  });


module.exports = router;