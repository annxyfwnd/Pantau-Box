const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Storage } = require('@google-cloud/storage');

const app = express();
const upload = multer({ dest: 'uploads/' });

const keyFilename = path.join(__dirname, 'key', 'pantau-box.json');
const storage = new Storage({
  keyFilename: keyFilename,
  projectId: 'pantau-box'
});

const bucketName = 'bucket-upload-pb';
const bucket = storage.bucket(bucketName);

app.post('/upload', upload.single('photo'), async (req, res) => {
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
    return res.status(500).json({ error: true, message: 'Internal server error' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
