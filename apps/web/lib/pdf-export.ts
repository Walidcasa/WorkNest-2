export async function exportToPDF(elementId: string, filename: string) {
  const { default: jsPDF } = await import('jspdf')
  const { default: html2canvas } = await import('html2canvas')

  const element = document.getElementById(elementId)
  if (!element) return

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
  })

  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width

  // Add logo + title
  pdf.setFontSize(18)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(129, 140, 248)
  pdf.text('WorkNest', 14, 14)
  pdf.setFontSize(10)
  pdf.setTextColor(100, 100, 100)
  pdf.text(`Exported: ${new Date().toLocaleDateString()}`, 14, 20)
  pdf.text(filename, 14, 26)

  // Add content
  const contentY = 32
  const maxHeight = pdf.internal.pageSize.getHeight() - contentY - 10
  if (pdfHeight <= maxHeight) {
    pdf.addImage(imgData, 'PNG', 0, contentY, pdfWidth, pdfHeight)
  } else {
    let yPos = contentY
    let remainingHeight = pdfHeight
    let sourceY = 0
    while (remainingHeight > 0) {
      const pageHeight = Math.min(maxHeight, remainingHeight)
      const pageCanvas = document.createElement('canvas')
      const scale = canvas.width / pdfWidth
      pageCanvas.width = canvas.width
      pageCanvas.height = pageHeight * scale
      const ctx = pageCanvas.getContext('2d')!
      ctx.drawImage(canvas, 0, sourceY * scale, canvas.width, pageCanvas.height, 0, 0, canvas.width, pageCanvas.height)
      const pageImg = pageCanvas.toDataURL('image/png')
      if (yPos > contentY) { pdf.addPage(); yPos = 10 }
      pdf.addImage(pageImg, 'PNG', 0, yPos, pdfWidth, pageHeight)
      remainingHeight -= pageHeight
      sourceY += pageHeight
    }
  }

  pdf.save(`${filename.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`)
}
