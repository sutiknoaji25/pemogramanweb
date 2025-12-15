
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Mengambil elemen tempat animasi teks akan ditampilkan
        const typingElement = document.querySelector('.text-animation span');

        if (typingElement) {
            // Periksa apakah Typed sudah tersedia (diasumsikan sudah dimuat di HTML)
            if (typeof Typed !== 'undefined') {
                new Typed(typingElement, {
                    strings: ["Pengembang Frontend", "Desainer UI/UX", "Full Stack Developer"], // Array teks yang akan dianimasikan
                    typeSpeed: 100, // Kecepatan mengetik
                    backSpeed: 50,  // Kecepatan menghapus
                    backDelay: 1500, // Jeda sebelum mulai menghapus
                    loop: true,     // Ulangi terus menerus
                    showCursor: true, // Tampilkan kursor
                });
            } else {
                console.error("Typed.js library is not loaded. Skipping typing animation.");
                // Jika Typed.js tidak dimuat, pastikan teks tetap terlihat
                typingElement.textContent = "Pengembang Web Profesional"; 
            }
        }
    } catch (error) {
        console.error("Error initializing Typed.js:", error);
    }
});


// 2. Toggle Navbar (Untuk Menu Mobile)
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    // Mengganti ikon dari hamburger menjadi X dan sebaliknya (boxicons)
    menuIcon.classList.toggle('bx-x');
    // Menampilkan/menyembunyikan menu navigasi
    navbar.classList.toggle('active');
};

// 3. Scroll Spy dan Sticky Header
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar a'); 
let header = document.querySelector('.header');

window.onscroll = () => {
    // A. Fungsi Scroll Spy
    sections.forEach(sec => {
        let top = window.scrollY;
        // Penyesuaian offset agar link aktif sedikit lebih awal
        let offset = sec.offsetTop - 150; 
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            // Menghapus kelas 'active' dari semua link
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            // Menambahkan kelas 'active' ke link yang sesuai dengan section yang dilihat
            // Menggunakan template literal untuk selector yang lebih aman
            document.querySelector(`.navbar a[href*='${id}']`).classList.add('active');
        }
    });

    // B. Fungsi Sticky Header
    // Menambahkan kelas 'sticky' jika scrolling melewati 100px
    header.classList.toggle('sticky', window.scrollY > 100);

    // C. Menutup menu navbar ketika scrolling (Hanya berlaku untuk mode mobile)
    // Menghapus kelas yang mengaktifkan menu mobile
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// 4. Pengiriman Formulir Kontak (Opsional: Tambahkan logika AJAX atau pesan status)
// Di sini Anda bisa menambahkan logika untuk mencegah pengiriman formulir default
// dan menampilkan pesan sukses/gagal.
const contactForm = document.querySelector('.contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Anda dapat menambahkan logika pengiriman data ke server di sini.
        console.log('Form submitted (AJAX simulation)');

        // Contoh: Menampilkan pesan sukses menggunakan SweetAlert2 atau modal kustom 
        // karena alert() dilarang.
        const successMessage = document.createElement('p');
        successMessage.textContent = "Pesan berhasil dikirim! Kami akan segera menghubungi Anda.";
        successMessage.style.cssText = "color: var(--main-color); font-size: 1.8rem; margin-top: 2rem; text-align: center;";
        contactForm.append(successMessage);
        
        // Bersihkan formulir setelah 3 detik
        setTimeout(() => {
            contactForm.reset();
            successMessage.remove();
        }, 3000);
    });
}