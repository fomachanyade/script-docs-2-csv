#!/usr/bin/env node
const XLSX = require('xlsx');
const { program } = require('commander');
const fs = require('fs');

program
  .version('0.1.0')
  .description('My CLI Tool')
  .option('-n, --name <name>', '挨拶する名前を指定')
  .action((options) => {
    const csvContent = fs.readFileSync('./samples/output/001_sample.csv', 'utf8');
    const workbook = XLSX.read(csvContent, { type: 'string' });
    workbook.Props = {
        Title: "TEST",
        Subject: "TEST SUBJECT",
        Author: "TEST AUTHOR",
        Creator: "TEST CREATOR",         // SheetJSではAuthorとCreatorは別扱い
        LastModifiedBy: "TEST Name",
        CreatedDate: new Date(),      // 作成日時
        ModifiedDate: new Date(),     // 更新日時
        // AppVersion は単なる文字列として扱われる場合が多い
        // Excel 2013相当なら "15.0000", Excel 2016相当なら "16.0000" など
        AppVersion: "15.0000",
    };
    XLSX.writeFile(workbook, 'output_with_meta.xlsx', { bookType: 'xlsx',  });
  });

program.parse(process.argv);