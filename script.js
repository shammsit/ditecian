document.getElementById("currentDate").innerText = new Date().toLocaleDateString();

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

function saveAsPDF() {
  const element = document.getElementById("pdf-content");
  const opt = {
    margin: 5,
    filename: 'diet_chart.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 3, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] }
  };
  html2pdf().set(opt).from(element).save();
}

async function sharePDF() {
  const element = document.getElementById("pdf-content");
  const opt = {
    margin: 5,
    filename: 'diet_chart.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 3, useCORS: true },
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
    alert("Sharing not supported on this device/browser.");
  }
}

function clearAll() {
  document.querySelectorAll("input[type='text']").forEach(input => input.value = "");
  document.getElementById("signatureUpload").value = "";
  document.getElementById("signaturePreview").src = "";
}
