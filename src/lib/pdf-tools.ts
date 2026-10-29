// URL of the separately hosted PDFTools Pro app (e.g. https://pdf.worldofthedevelopers.com).
// Read at build time; while unset, the /pdf-tools page shows "launching soon" instead of a dead link.
export const PDF_TOOLS_URL = process.env.PDF_TOOLS_URL?.replace(/\/+$/, "") || undefined;

export interface PdfTool {
  title: string;
  description: string;
}

export const PDF_TOOLS: PdfTool[] = [
  { title: "Merge PDF", description: "Combine several PDFs into one, in the order you choose." },
  { title: "Split & extract pages", description: "Split by page, every N pages, or custom ranges — or pull out just the pages you need." },
  { title: "Organize pages", description: "Delete, reorder, duplicate, and rotate pages with visual thumbnails." },
  { title: "Compress PDF", description: "Shrink file size with presets and see the real size saved." },
  { title: "Convert to and from images", description: "Turn JPG and PNG into PDF, or export PDF pages as JPG and PNG." },
  { title: "Office to PDF", description: "Convert Word, Excel, and PowerPoint files to PDF." },
  { title: "Edit PDF", description: "Add text, shapes, highlights, drawings, and images to your pages." },
  { title: "Fill PDF forms", description: "Fill text fields, check boxes, radio groups, and drop-downs, with optional flattening." },
  { title: "Sign PDF", description: "Draw or upload a visual signature. This is not a certificate-based digital signature." },
  { title: "Redact PDF", description: "Permanently remove marked areas, not just cover them with a box." },
  { title: "Protect & unlock", description: "Add AES-256 password protection, or remove a password you already know." },
  { title: "Page numbers & watermarks", description: "Add page numbers and text watermarks." },
  { title: "View PDF privately", description: "Open and search a PDF entirely in your browser — nothing is uploaded." },
];
