const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

function drawBox(doc, x, y, w, h) {
  doc.rect(x, y, w, h).stroke();
}

function drawLabel(doc, x, y, text, fontSize = 8) {
  doc.font("Helvetica-Bold").fontSize(fontSize).text(text, x + 4, y + 4, { continued: false });
}

function drawLabelWithBoxes(doc, x, y, labelWidth, totalWidth, boxCount, boxGap = 4, labelText = "", values = []) {
  drawBox(doc, x, y, labelWidth, 24);
  if (labelText) drawLabel(doc, x, y, labelText, 8);

  const boxesAreaWidth = totalWidth - labelWidth;
  const boxWidth = Math.floor((boxesAreaWidth - (boxGap * (boxCount - 1))) / boxCount);

  let bx = x + labelWidth;
  for (let i = 0; i < boxCount; i++) {
    drawBox(doc, bx, y, boxWidth, 24);
    const val = values[i] ?? "";
    if (val !== "") doc.font("Helvetica").fontSize(10).text(String(val), bx + 4, y + 5);
    bx += boxWidth + boxGap;
  }
}

function drawNBoxes(doc, x, y, boxCount, boxSize = 18, gap = 4) {
  let bx = x;
  for (let i = 0; i < boxCount; i++) {
    drawBox(doc, bx, y, boxSize, boxSize);
    bx += boxSize + gap;
  }
}

function drawTableRow(doc, x, y, colWidths, texts = [], rowHeight = 20) {
  let cx = x;
  for (let i = 0; i < colWidths.length; i++) {
    drawBox(doc, cx, y, colWidths[i], rowHeight);
    const t = texts[i];
    if (t !== undefined && t !== null) {
      doc.font("Helvetica").fontSize(10).text(String(t), cx + 4, y + 4, { width: colWidths[i] - 8 });
    }
    cx += colWidths[i];
  }
}

async function generateDealSlipPDF(deal) {
  const dir = path.join(process.cwd(), "dealSlip");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, `deal-slip-${deal.id}-${Date.now()}.pdf`);

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 36 });
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right; 
      const leftX = doc.page.margins.left;
      let y = 30;

      doc.font("Helvetica-Bold").fontSize(18).text("DEAL SLIP", leftX, y, { align: "center" });
      y += 28;

      const topLabelW = 120;
      const topCellW = 120;
      const gap = 12;

      const topBoxX = leftX + pageWidth - (topLabelW + topCellW) - gap;
      drawTableRow(doc, topBoxX, y, [topLabelW, topCellW], ["DEAL DATE", (deal.created_at ? new Date(deal.created_at).toISOString().split("T")[0] : "")], 22);
      y += 22 + 6;
      drawTableRow(doc, topBoxX, y, [topLabelW, topCellW], ["DEAL NUMBER", deal.deal_number || ""], 22);
      y += 22 + 6;
      drawTableRow(doc, topBoxX, y, [topLabelW, topCellW], ["NEW CUSTOMER", deal.customer?.customer_type === "new" ? "YES" : ""], 22);
      y += 22 + 6;
      drawTableRow(doc, topBoxX, y, [topLabelW, topCellW], ["EXISTING CUSTOMER", deal.customer?.customer_type === "existing" ? "YES" : ""], 22);

      y = Math.max(y, 120);
      y += 8;

      doc.fontSize(14).font("Helvetica-Bold").text(deal.deal_type === "sell" ? "WE SELL" : "WE BUY", leftX + 0, y);
      y += 20;

      const totalWidth = pageWidth;
      const labelWidth = 120;

      drawLabelWithBoxes(doc, leftX, y, labelWidth, totalWidth, 7, 4, "USD SELLING", []);
      y += 28;

      drawLabelWithBoxes(doc, leftX, y, labelWidth, totalWidth, 4, 4, "RATE", []);
      y += 28;

      drawLabelWithBoxes(doc, leftX, y, labelWidth, totalWidth, 4, 8, "TZS AMOUNT TO BE PAID", []);
      y += 34;

      drawBox(doc, leftX, y, 120, 20); doc.font("Helvetica-Bold").fontSize(9).text("BEN NAME", leftX + 4, y + 4);
      drawBox(doc, leftX + 120 + 8, y, pageWidth - 120 - 8, 20);
      y += 26;

      drawBox(doc, leftX, y, 120, 20); doc.font("Helvetica-Bold").fontSize(9).text("BEN BANK NAME", leftX + 4, y + 4);
      drawBox(doc, leftX + 120 + 8, y, pageWidth - 120 - 8, 20);
      y += 26;
      drawBox(doc, leftX, y, 120, 22); doc.font("Helvetica-Bold").fontSize(9).text("BEN ACC NUMBER", leftX + 4, y + 4);
      const accBoxesX = leftX + 120 + 8;
      drawNBoxes(doc, accBoxesX, y, 16, 16, 4);
      y += 26;

      drawBox(doc, leftX, y, 260, 22); doc.font("Helvetica-Bold").fontSize(9).text("RECEIVED THE FUND", leftX + 4, y + 4);
      drawBox(doc, leftX + 270, y, 36, 22); doc.font("Helvetica").fontSize(9).text("YES", leftX + 274, y + 4);
      drawBox(doc, leftX + 314, y, 36, 22); doc.font("Helvetica").fontSize(9).text("NO", leftX + 318, y + 4);
      y += 28;

      doc.font("Helvetica-Bold").fontSize(11).text("RECEIVED AMOUNT OF THE PROCEEDS (DETAILS IN BANK / CASH)", leftX, y);
      y += 18;

      const recvLabelW = 220;
      const amtCols = 4;
      const amtColW = Math.floor((pageWidth - recvLabelW) / amtCols);
      const recvBanks = [
        { label: "CASH" },
        { label: `NMB     ${deal.payments?.[0]?.systemBank?.account_number ?? "20110091079"} - A/C TSH` },
        { label: `CRDB    0150000KEJX00 - A/C TSH` },
        { label: `DTB     0320867001 - A/C TSH` },
        { label: `EXIM    0010061397 - A/C TSH` },
        { label: "TOTAL" },
      ];

      recvBanks.forEach((row) => {
        const colWidths = [recvLabelW, amtColW, amtColW, amtColW, amtColW];
        drawTableRow(doc, leftX, y, colWidths, [row.label, "", "", "", ""], 20);
        y += 22;
      });

      y += 6;

      doc.font("Helvetica-Bold").fontSize(11).text("DEBITED ACCOUNT DETAILS FOR PAYMENT MADE", leftX, y);
      y += 18;

      const debBanks = [
        { label: "CASH" },
        { label: `NMB     20110091080 - A/C USD` },
        { label: `CRDB    0250000KEJX00 - A/C USD` },
        { label: `DTB     0320867002 - A/C USD` },
        { label: `EXIM    0010061396 - A/C USD` },
        { label: "TOTAL" },
      ];

      debBanks.forEach((row) => {
        const colWidths = [recvLabelW, amtColW, amtColW, amtColW, amtColW];
        drawTableRow(doc, leftX, y, colWidths, [row.label, "", "", "", ""], 20);
        y += 22;
      });

      y += 12;

      const sigColWidths = [120, (pageWidth - 120 - 180), 180];
      sigColWidths[1] = Math.max(120, pageWidth - sigColWidths[0] - sigColWidths[2]);

      drawTableRow(doc, leftX, y, sigColWidths, ["MAKER", "NAME", "SIGNATURE"], 24);
      y += 26;
      drawTableRow(doc, leftX, y, sigColWidths, ["CHECKER", "", ""], 50);
      y += 52;
      drawTableRow(doc, leftX, y, sigColWidths, ["AUTHORISER", "", ""], 50);
      y += 56;

      doc.addPage();

      let y2 = 40;
      const leftX2 = doc.page.margins.left;
      const pageWidth2 =
        doc.page.width - doc.page.margins.left - doc.page.margins.right;

      const detailsW = pageWidth2 * 0.55;
      const tickW = pageWidth2 * 0.15;
      const mdSigW = pageWidth2 - detailsW - tickW;
      const rowH = 26;

      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .text(
          "ANY SPECIAL AUTHORISATION FROM MANAGEMENT – APPROVAL ONLY FROM MD ALLOWED",
          leftX2,
          y2
        );

      y2 += 40; 

      drawTableRow(
        doc,
        leftX2,
        y2,
        [detailsW, tickW, mdSigW],
        ["DETAILS", " ", "MD SIGNATURE"],
        rowH
      );
      y2 += rowH + 2;

      drawTableRow(
        doc,
        leftX2,
        y2,
        [detailsW, tickW, mdSigW],
        ["TO PAY BEFORE RECEIPT", "", ""],
        rowH
      );
      y2 += rowH + 2;

      drawTableRow(
        doc,
        leftX2,
        y2,
        [detailsW, tickW, mdSigW],
        ["DEAL AFTER OFFICE HOURS", "", ""],
        rowH
      );
      y2 += rowH + 2;

      drawBox(doc, leftX2, y2, detailsW, rowH * 2);
      doc.font("Helvetica").fontSize(10);
      doc.text(
        "PAYMENT ERROR, TO PAY AGAIN",
        leftX2 + 4,
        y2 + 4
      );
      doc.text("BEFORE SUCH REFUND", leftX2 + 4, y2 + 14);

      drawBox(doc, leftX2 + detailsW, y2, tickW, rowH * 2);
      drawBox(
        doc,
        leftX2 + detailsW + tickW,
        y2,
        mdSigW,
        rowH * 2
      );

      y2 += rowH * 2 + 2;

      drawTableRow(
        doc,
        leftX2,
        y2,
        [detailsW, tickW, mdSigW],
        ["TO PAY THIRD PARTY ACCOUNT", "", ""],
        rowH
      );

      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", (e) => reject(e));
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = generateDealSlipPDF;
