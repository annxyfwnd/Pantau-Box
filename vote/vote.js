const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Konfigurasi koneksi MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pantau-box'
});

// Menghubungkan ke MySQL
connection.connect((err) => {
  if (err) {
    console.error('Terjadi kesalahan:', err.message);
  } else {
    console.log('Terhubung ke MySQL.');
  }
});

app.put('/api/vote/:id', (req, res) => {
  const { id } = req.params;
  let { option } = req.body;

  // Cek apakah ID valid (16 karakter)
  if (id.length !== 16) {
    res.status(400).json({ error: 'ID tidak valid.' });
    return;
  }

  // Periksa apakah pengguna sudah melakukan voting sebelumnya
  connection.query('SELECT * FROM voting WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Terjadi kesalahan:', err.message);
      res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan.' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: 'ID tidak ditemukan.' });
      } else {
        const voteData = result[0];

        // Periksa apakah pengguna sudah melakukan voting sebelumnya
        if (voteData.voted) {
          res.status(400).json({ error: 'Anda telah melakukan voting sebelumnya.' });
        } else {
          // Periksa apakah pilihan voting valid
          if (!['1', '2', '3', '4'].includes(option)) {
            res.status(400).json({ error: 'Pilihan voting tidak valid.' });
            return;
          }

          // Ubah tipe data option menjadi number
          option = parseInt(option);

          // Update data voting di MySQL dengan hasil pemilihan pengguna
          connection.query('UPDATE voting SET voted = ?, selected_option = ? WHERE id = ?', [true, option, id], (err, result) => {
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

// Jalankan server pada port 3000
app.listen(3000, () => {
  console.log('Server berjalan pada port 3000');
});
