const scanButton = document.getElementById("scanButton");
const statusDiv = document.getElementById("status");
const logDiv = document.getElementById("log");

// Fungsi untuk mencatat pesan ke layar
function updateLog(message) {
    logDiv.innerHTML += `<p>> ${message}</p>`;
}

scanButton.addEventListener("click", async () => {
    // 1. Cek apakah browser mendukung NFC
    if ("NDEFReader" in window) {
        try {
            const ndef = new NDEFReader();
            
            // 2. Mulai proses pemindaian
            await ndef.scan();
            statusDiv.innerText = "Status: Mencari KTP... Tempelkan di belakang HP.";
            updateLog("NFC Aktif. Silakan tempelkan KTP-el Anda.");

            // 3. Event saat kartu terdeteksi
            ndef.onreading = event => {
                const serialNumber = event.serialNumber;
                updateLog(`KTP Terdeteksi!`);
                updateLog(`Serial Number (UID): ${serialNumber}`);
                
                // Catatan: Membaca data spesifik KTP-el memerlukan kunci deskripsi
                // Di sini kita hanya mendapatkan ID unik chip.
            };

            ndef.onreadingerror = () => {
                updateLog("Gagal membaca data. Coba lagi.");
            };

        } catch (error) {
            updateLog("Error: " + error);
        }
    } else {
        updateLog("Maaf, Browser ini tidak mendukung Web NFC. Gunakan Chrome di Android.");
    }
});