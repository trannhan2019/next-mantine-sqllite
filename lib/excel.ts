import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";
// import { ThongTinBHXHResponse } from "@/types/thong-tin-bhxh";

interface dataExcel {
  id: number;
  ten: string;
  phong: string;
}
interface dataExcelWithTemplate {
  "Họ và tên": string;
  "Phòng/Đơn vị": string;
}

export const xuatThongTinBHXH = async (dataExcel: dataExcel) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Báo cáo lương BHXH");
  worksheet.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Họ và Tên", key: "ten", width: 30 },
    { header: "Phòng", key: "phong", width: 30 },
  ];
  worksheet.addRow(dataExcel);
  // Xuất workbook ra buffer
  const buffer = await workbook.xlsx.writeBuffer();
  // Chuyển buffer sang base64 để gửi về client
  const base64 = Buffer.from(buffer).toString("base64");
  return `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64}`;
};

export const xuatThongTinBHXHWithTemplate = async (
  dataExcel: dataExcelWithTemplate
) => {
  const workbook = new ExcelJS.Workbook();
  // Đọc template từ thư mục public hoặc thư mục server
  const filePath = path.join(process.cwd(), "public/report_bhxh.xlsx");
  const buffer = fs.readFileSync(filePath);

  await workbook.xlsx.load(buffer.buffer); // Nạp nội dung template

  const worksheet = workbook.getWorksheet("Sheet1"); // hoặc tên khác phù hợp
  const startRow = 3;
  const entries = Object.entries(dataExcel);

  if (!worksheet) throw new Error("Không tìm thấy worksheet 'Sheet1'");

  entries.forEach(([key, value], index) => {
    const row = worksheet.getRow(startRow + index);
    row.getCell(1).value = key; // Cột A: tên thuộc tính
    row.getCell(2).value = value; // Cột B: giá trị
    row.commit();
  });
  // Xuất workbook ra buffer
  const bufferExcel = await workbook.xlsx.writeBuffer();
  // Chuyển buffer sang base64 để gửi về client
  const base64 = Buffer.from(bufferExcel).toString("base64");
  return `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64}`;
};
