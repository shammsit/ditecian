// Live Date
document.getElementById("currentDate").innerText = new Date().toLocaleDateString();

// Signature Pad Setup
const canvas = document.getElementById('signature-pad');
const signaturePad = new SignaturePad(canvas);

function clearSignature() {
  signaturePad.clear();
}

// Placeholders for next steps
function generatePDF() {
  alert("PDF generation will be added in next step!");
}

function clearForm() {
  alert("Form clear functionality coming soon!");
}
