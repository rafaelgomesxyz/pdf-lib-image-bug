const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

(async () => {
	let pdf;
	let embeddedImage;
	let pages;

	pdf = await PDFDocument.load(fs.readFileSync('./document.pdf'));
	embeddedImage = await pdf.embedJpg(fs.readFileSync('./image1.jpg'));
	pages = pdf.getPages();
	pages[0].drawImage(embeddedImage, {
		x: 0,
		y: 0,
	});
	fs.writeFileSync('./document-1.pdf', await pdf.save());

	pdf = await PDFDocument.load(fs.readFileSync('./document-1.pdf'));
	embeddedImage = await pdf.embedJpg(fs.readFileSync('./image2.jpg'));
	pages = pdf.getPages();
	pages[0].drawImage(embeddedImage, {
		x: 315,
		y: 0,
	});
	fs.writeFileSync('./document-2.pdf', await pdf.save());
})();
