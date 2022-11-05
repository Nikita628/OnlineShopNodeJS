import { IOrderNoSqlDbModel } from "../database/contracts/order";
import { IInvoiceService } from "./contracts/invoice-service";
import PDFDoc from "pdfkit";
import fs from "fs";
import path from "path";

export class InvoiceService implements IInvoiceService {
  async generate(order: IOrderNoSqlDbModel): Promise<void> {
    const doc = new PDFDoc();

    const invoiceName = order._id.toString();

    doc.pipe(
      fs.createWriteStream(path.join("files", "invoices", `${invoiceName}.pdf`))
    );

    doc.text(`
    Invoice
    -----------------------

    order ID: ${order._id.toString()}
    
    name: ${order.user.name}

    `);

    doc.end();
  }
}
