#!/usr/bin/env node
import { program } from "commander";
import fs = require("node:fs");

import { createExcelFile } from "./create_excel_file";

program
	.version("0.0.1")
	.description("Create CSV and Excel file from TXT file")
	.action(() => {
		const csvContent = fs.readFileSync(
			"./samples/output/csv/001_sample.csv",
			"utf8",
		);
		const { xlsxPath } = createExcelFile({
			csvContent: csvContent,
			fileName: "001_sample",
			xlsxFolderPath: "./tmp",
		});
	});

program.parse(process.argv);
