// api/send-email.js
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Pastikan metode yang digunakan adalah POST
  if (req.method !== 'POST') {
    res.status(405).send('Metode tidak diizinkan');
    return;
  }

  // Menerima data dari request body
  const { recipient, subject, message, sender } = req.body;

  // Daftar akun email anonim dan passwordnya
  const passwords = {
    'emailsender@rafzhost.xyz': 'rafzhostxyz1',
    'anonymous@rafzhost.xyz': 'rafzhostxyz2',
    'rafzmailer@rafzhost.xyz': 'rafzhostxyz3',
    'rafflieaditya123@gmail.com': 'sungaitabuk',
    // Pastikan untuk menambahkan semua 10 akun anonim dan passwordnya di sini
  };

  // Pastikan pengirim yang dipilih valid
  if (!passwords[sender]) {
    res.status(400).send('Akun pengirim tidak valid.');
    return;
  }

  // Konfigurasi nodemailer dengan server SMTP Rafzhost
  let transporter = nodemailer.createTransport({
    host: 'mail.rafzhost.xyz', // Host SMTP dari Rafzhost
    port: 465,
    secure: true, // Gunakan SSL
    auth: {
      user: sender, // Username adalah email pengirim yang dipilih dari formulir
      pass: passwords[sender] // Password yang sesuai dengan email pengirim
    }
  });

  // Konfigurasi email
  let mailOptions = {
    from: `"${sender}" <${sender}>`,
    to: recipient,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email berhasil dikirim!');
  } catch (error) {
    console.error(error);
    // Tampilkan pesan error yang lebih detail
    res.status(500).send(`Gagal mengirim email. Error: ${error.message}`);
  }
};
