// Set live date
document.getElementById("currentDate").innerText = new Date().toLocaleDateString();

// Signature upload and preview
document.getElementById("signatureUpload").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.getElementById("signaturePreview");
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Save as PDF
function saveAsPDF() {
  const element = document.getElementById("pdf-content");
  const opt = {
    margin: 0,
    filename: 'diet_chart.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] }
  };
  html2pdf().set(opt).from(element).save();
}

// Share PDF (can be adjusted to use Web Share API)
function sharePDF() {
  alert("PDF sharing will be implemented based on your platform/browser support.");
}

// Clear All
function clearAll() {
  document.querySelectorAll("input[type='text']").forEach(input => input.value = "");
  document.getElementById("signatureUpload").value = "";
  document.getElementById("signaturePreview").src = "";
}
