import { beforeAll, describe, expect, it } from "vitest";
import { createExcelFile, CreateExcelFileReturn } from "./create_excel_file";
const fs = require("fs");
const XLSX = require("xlsx");

describe("createExcelFile", () => {
	const csvContent = "header1,header2\nvalue1,日本語";
	const fileName = new Date().toISOString();
	const currentPath = process.cwd();
	const xlsxFolderPath = `${currentPath}/tmp/test/create_excel_file`;

	let result: CreateExcelFileReturn;
	beforeAll(() => {
		result = createExcelFile({
			csvContent: csvContent,
			fileName: fileName,
			xlsxFolderPath: xlsxFolderPath,
		});
	});

	it("ファイル名が正しいか", () => {
		expect(result.xlsxPath).toBe(`${xlsxFolderPath}/${fileName}.xlsx`);
	});

	it("ファイルが存在するか", () => {
		expect(fs.existsSync(result.xlsxPath)).toBe(true);
	});

	it("ファイルの内容が正しいか", () => {
		const workbook = XLSX.readFile(result.xlsxPath);

		// 変換するシート名を指定（ここでは最初のシート）
		const sheetName = workbook.SheetNames[0];

		// 対象のシートを取得
		const worksheet = workbook.Sheets[sheetName];

		// シート内容を CSV 文字列に変換
		const parsedCsvOutput = XLSX.utils.sheet_to_csv(worksheet);
		console.log(parsedCsvOutput);
		expect(parsedCsvOutput).toBe(csvContent);
	});
});
