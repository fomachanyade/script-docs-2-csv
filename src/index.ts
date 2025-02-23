#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import XLSX from 'xlsx';

import { createExcelFile } from './create_excel_file';

program
  .version('0.0.1')
  .description('Create CSV and Excel file from TXT file')
  .action(() => {
    const csvContent = fs.readFileSync('./samples/output/csv/001_sample.csv', 'utf8');
    const workbook = XLSX.read(csvContent, { type: 'string' });
    workbook.Props = {
        Title: "TEST",
        Subject: "TEST SUBJECT",
        Author: "TEST AUTHOR",
        CreatedDate: new Date(),      // 作成日時
        ModifiedDate: new Date(),     // 更新日時
        // AppVersion は単なる文字列として扱われる場合が多い
        // Excel 2013相当なら "15.0000", Excel 2016相当なら "16.0000" など
        AppVersion: "15.0000",
    };
    XLSX.writeFile(workbook, './tmp/output_with_meta.xlsx', { bookType: 'xlsx',  });

    const {xlsxPath} = createExcelFile({
        csvContent: csvContent,
        fileName: "001_sample",
        xlsxFolderPath: './tmp'
    })
  });

program.parse(process.argv);