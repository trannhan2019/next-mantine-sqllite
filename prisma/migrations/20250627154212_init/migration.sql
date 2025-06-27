-- CreateTable
CREATE TABLE "Phong" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ten" TEXT NOT NULL,
    "tenVietTat" TEXT NOT NULL,
    "soThuTu" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "ChucVu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ten" TEXT NOT NULL,
    "tenVietTat" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NhanVien" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ten" TEXT NOT NULL,
    "phongId" INTEGER NOT NULL,
    "chucVuId" INTEGER NOT NULL,
    "soThuTu" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "NhanVien_phongId_fkey" FOREIGN KEY ("phongId") REFERENCES "Phong" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "NhanVien_chucVuId_fkey" FOREIGN KEY ("chucVuId") REFERENCES "ChucVu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MucLuongToiThieuVung" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mucLuong" INTEGER NOT NULL,
    "thoiGianApdung" DATETIME NOT NULL,
    "canCuPhapLy" TEXT
);

-- CreateTable
CREATE TABLE "HeSoPhuCap" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chucDanh" TEXT NOT NULL,
    "heSo" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "HeSoTrachNhiem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chucDanh" TEXT NOT NULL,
    "heSo" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "NgachLuong" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "maNgach" TEXT NOT NULL,
    "chucDanh" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BacNgachLuong" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bac" TEXT NOT NULL,
    "heSo" REAL NOT NULL,
    "thoiGianNangBac" INTEGER NOT NULL,
    "ngachId" INTEGER NOT NULL,
    CONSTRAINT "BacNgachLuong_ngachId_fkey" FOREIGN KEY ("ngachId") REFERENCES "NgachLuong" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "NgachLuong_maNgach_key" ON "NgachLuong"("maNgach");
