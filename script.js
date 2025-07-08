// Set Live Date
document.getElementById("currentDate").innerText = new Date().toLocaleDateString();

// Clear Form Fields
function clearForm() {
  const inputs = document.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    if (input.type === "file") input.value = "";
    else input.value = "";
  });

  // Clear signature preview
  const preview = document.getElementById("signature-preview");
  preview.src = "";
  preview.style.display = "none";
}

// Generate PDF and download/share
function generatePDF() {
  const element = document.body;

  html2pdf()
    .set({
      margin: 10,
      filename: 'prescription.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    })
    .from(element)
    .save();
}

// Show signature preview
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
