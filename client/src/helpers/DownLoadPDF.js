import html2pdf from "html2pdf.js";

const downloadPDF = (elementId, fileName = "document.pdf") => {
  const element = document.getElementById(elementId);

  if (!element) {
    alert("Unable to download invoice. Please try again.");
    return;
  };

  const options = {
    margin: [0, 0, 0, 0],
    filename: fileName,
    image: {
      type: "jpeg",
      quality: 1,
    },
    html2canvas: {
      scale: 4,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
    },
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
      compress: false,
    },
  };

  html2pdf().set(options).from(element).save();
};

export default downloadPDF;
