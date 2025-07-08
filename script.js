// Set current date
document.getElementById("currentDate").innerText = new Date().toLocaleDateString();

// PDF Generation
function generatePDF() {
  const element = document.getElementById("pdf-content");
  const opt = {
    margin: 0,
    filename: 'prescription.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] }
  };
  html2pdf().set(opt).from(element).save();
}

// Clear all fields
function clearForm() {
  document.querySelectorAll("input[type='text'], textarea").forEach(el => el.value = '');
  document.getElementById("signature-upload").value = '';
  const img = document.getElementById("signature-preview");
  img.src = '';
  img.style.display = "none";
}

// Handle signature upload
document.getElementById("signature-upload").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.getElementById("signature-preview");
      img.src = e.target.result;
      img.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});
