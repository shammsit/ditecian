document.getElementById("currentDate").innerText = new Date().toLocaleDateString('en-GB');

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
    margin: 0,
    filename: 'diet_chart.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all'] }
  };
  html2pdf().set(opt).from(element).save();
}

async function sharePDF() {
  const element = document.getElementById("pdf-content");
  const opt = {
    margin: 0,
    filename: 'diet_chart.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all'] }
  };

  const blob = await html2pdf().set(opt).from(element).outputPdf('blob');

  if (navigator.canShare && navigator.canShare({ files: [new File([blob], "diet_chart.pdf", { type: "application/pdf" })] })) {
    const file = new File([blob], "diet_chart.pdf", { type: "application/pdf" });
    navigator.share({
      files: [file],
      title: "Diet Chart",
      text: "Here is the patient's diet chart."
    });
  } else {
    alert("Sharing not supported on this browser.");
  }
}

function clearAll() {
  document.querySelectorAll("input[type='text']").forEach(input => input.value = "");
  document.getElementById("signatureUpload").value = "";
  document.getElementById("signaturePreview").src = "";
}
