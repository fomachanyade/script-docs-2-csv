import fs = require("node:fs");
import XLSX = require("xlsx");

type CreateExcelFileArg = {
	csvContent: string;
	fileName: string;
	xlsxFolderPath: string;
};

export type CreateExcelFileReturn = {
	xlsxPath: string;
};

const PROGRAM_NAME = "BOT_SCRIPT2CSV";

export const createExcelFile = (
	arg: CreateExcelFileArg,
): CreateExcelFileReturn => {
	const { csvContent, fileName, xlsxFolderPath } = arg;

	const filePath = `${xlsxFolderPath}/${fileName}.xlsx`;

	// ディレクトリが存在するかチェックし、なければ作成する
	if (!fs.existsSync(xlsxFolderPath)) {
		fs.mkdirSync(xlsxFolderPath, { recursive: true });
		console.log(`Directory created at ${xlsxFolderPath}`);
	}
	try {
		console.log("start creating excel file. name:", fileName);
		const workbook = XLSX.read(csvContent, { type: "string" });
		workbook.Props = {
			Title: fileName,
			Subject: PROGRAM_NAME,
			Author: PROGRAM_NAME,
			CreatedDate: new Date(), // 作成日時
			ModifiedDate: new Date(), // 更新日時
			// AppVersion は単なる文字列として扱われる場合が多い
			// Excel 2013相当なら "15.0000", Excel 2016相当なら "16.0000" など
			AppVersion: "15.0000",
		};
		XLSX.writeFile(workbook, filePath, { bookType: "xlsx" });

		console.log(`Excel file created at ${filePath}`);
		return { xlsxPath: filePath };
	} catch (e) {
		console.error("Failed to create excel file. name:", fileName);
		console.error(e);
		throw e;
	}
};
