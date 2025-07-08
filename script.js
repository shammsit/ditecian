// Set Live Date
document.getElementById("currentDate").innerText = new Date().toLocaleDateString();

// Clear Form Fields
function clearForm() {
  const inputs = document.querySelectorAll("input, textarea");
  inputs.forEach((input) => input.value = "");
  
  // Clear uploaded signature
  document.getElementById("signature-upload").value = "";
}

// Generate PDF and Download (or Share)
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
