// Set current date
document.getElementById("currentDate").innerText = new Date().toLocaleDateString('en-GB');

// Signature preview
document.getElementById("signatureUpload").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("signaturePreview").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Save as PDF
function saveAsPDF() {
  window.scrollTo(0, 0);
  const buttons = document.querySelector('.buttons');
  const thankyou = document.querySelector('.thankyou');
  buttons.style.display = 'none';
  if (thankyou) thankyou.style.display = 'none';

  const element = document.getElementById("pdf-content");
  const opt = {
    margin: [0, 0],
    filename: 'diet_chart.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] }
  };

  html2pdf().set(opt).from(element).save().then(() => {
    buttons.style.display = 'flex';
    if (thankyou) thankyou.style.display = 'block';
  });
}

// Share PDF
async function sharePDF() {
  window.scrollTo(0, 0);

  const element = document.getElementById("pdf-content");
  const opt = {
    margin: [0, 0],
    filename: 'diet_chart.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] }
  };

  const blob = await html2pdf().set(opt).from(element).outputPdf('blob');
  const file = new File([blob], "diet_chart.pdf", { type: "application/pdf" });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: "Diet Chart",
      text: "Here is the patient's diet chart."
    });
  } else {
    alert("Sharing not supported on this browser.");
  }
}

// Clear All Inputs
function clearAll() {
  document.querySelectorAll("input[type='text']").forEach(input => input.value = "");
  document.getElementById("signatureUpload").value = "";
  document.getElementById("signaturePreview").src = "";
}