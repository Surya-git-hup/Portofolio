const form = document.getElementById('my-form');

if (form) {

  form.addEventListener('submit', async (e) => {

    e.preventDefault();

    // TOKEN BOT TELEGRAM
    const token = "8269216719:AAHpsQlUEWwByhi_GbaS__RkePPG2hnbrig";

    // CHAT ID TELEGRAM
    const chat_id = "7452746520";

    // Ambil data form
    const nama = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const pesan = document.getElementById('pesan').value.trim();

    // Validasi form
    if (!nama || !email || !pesan) {

      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Semua field wajib diisi.'
      });

      return;
    }

    // Format pesan Telegram
    const teks = `
📩 PESAN BARU WEBSITE
👤 Nama: ${nama}
📧 Email: ${email}
📝 Pesan: ${pesan}
`;

    // Loading Alert
    Swal.fire({
      title: 'Mengirim Pesan...',
      text: 'Mohon tunggu sebentar',
      background: 'rgba(11, 30, 58, 0.85)',
      color: '#fff',
      backdrop: `
        rgba(0,0,0,0.7)
        blur(8px)`,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
          Swal.showLoading();
      }
    });
    
    Swal.close();

    try {

      // Kirim ke Telegram
      const response = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id: chat_id,
            text: teks
          })
        }
      );

      const data = await response.json();

      // Jika berhasil
      if (data.ok) {

        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Pesan berhasil dikirim ke Telegram.',
          background: 'rgba(15, 23, 42, 0.85)',
          color: '#fff',
          confirmButtonColor: '#38BDF8',
          backdrop: `
            rgba(0,0,0,0.6)
            blur(5px)`
      });

        form.reset();

      } 
      
      else {

        Swal.fire({
          icon: 'error',
          title: 'Telegram Error',
          text: data.description
        });

      }

    } 
    
    catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Koneksi Gagal',
        text: 'Tidak dapat terhubung ke server.',
        background: 'rgba(15, 23, 42, 0.85)',
        color: '#FFFFFF',
        confirmButtonColor: '#EF4444',
        backdrop: `
          rgba(0,0,0,0.6)
          blur(6px)`
       });

      console.error(error);

    }

  });

}