import fs from "node:fs";
import { describe, expect, it } from "vitest";

import { buildAoaData } from "./build_aoa_data";
import config from "./config.json";
import { convertAoaToCsv } from "./convert_aoa_to_csv";
import { createExcelFile } from "./create_excel_file";
import { parseDocsText } from "./parse_docs_text";

const multipleTextPrefix = ["主人公", "敵"];

const multipleChapterText = `
            1
            主人公だれだ
            2
            敵私だ
            3
            主人公お前だったのか
        `;

describe("parseDocsText -> buildAoaData", () => {
	describe("章が複数の場合", () => {
		const { chapters } = parseDocsText({
			scriptStartPrefix: multipleTextPrefix,
			docsText: multipleChapterText,
		});
		const { chapterAoaList } = buildAoaData({ chapters });

		it("章の数が正しい", () => {
			expect(chapterAoaList.length).equal(3);
		});
        it("章のタイトルが正しい", () => {
            expect(chapterAoaList[0].title).equal("001_1");
            expect(chapterAoaList[1].title).equal("002_2");
            expect(chapterAoaList[2].title).equal("003_3");
        });

        it("章の内容が正しい", () => {
            const firstChapterAoa = chapterAoaList[0].aoa;
            expect(firstChapterAoa.length).equal(2);
            expect(firstChapterAoa[1][1]).equal("主人公");
            expect(firstChapterAoa[1][2]).equal("だれだ");
           
            const secondChapterAoa = chapterAoaList[1].aoa;
            expect(secondChapterAoa.length).equal(2);
            expect(secondChapterAoa[1][1]).equal("敵");
            expect(secondChapterAoa[1][2]).equal("私だ");

            const thirdChapterAoa = chapterAoaList[2].aoa;
            expect(thirdChapterAoa.length).equal(2);
            expect(thirdChapterAoa[1][1]).equal("主人公");
            expect(thirdChapterAoa[1][2]).equal("お前だったのか");
        });
	});

    it("実際のファイルで実行", () => {
        const currentPath = process.cwd();
		const testFilePath = `${currentPath}/tmp/test/parse_docs_text/test_docs.txt`;

		const file = fs.readFileSync(testFilePath, "utf8");
		const prefix = config.speakers;
		const {chapters} = parseDocsText({
			scriptStartPrefix: prefix,
			docsText: file,
		});

        const {chapterAoaList} = buildAoaData({chapters});

        console.log(JSON.stringify(chapterAoaList, null, 2));
    

    });
});

describe("全てを結合", () => {
    it("実際のファイルで実行", () => {
        const currentPath = process.cwd();
        const testFilePath = `${currentPath}/tmp/test/parse_docs_text/test_docs.txt`;

        const file = fs.readFileSync(testFilePath, "utf8");
        const prefix = config.speakers;
        const {chapters} = parseDocsText({
            scriptStartPrefix: prefix,
            docsText: file,
        });

        const {chapterAoaList} = buildAoaData({chapters});

        const chapterCsvList = chapterAoaList.map((chapterAoa) => {
            const csvContent = convertAoaToCsv({aoa: chapterAoa.aoa});
            return {
                fileName: chapterAoa.title,
                csvContent,
            }
        });

        const xlsxFolderPath = `${currentPath}/tmp/test/integrate_test/all`;

        const result = Promise.all(chapterCsvList.map( (chapterCsv) => {
            const { xlsxPath } = createExcelFile({
                csvContent: chapterCsv.csvContent,
                fileName: chapterCsv.fileName,
                xlsxFolderPath,
            });
            return xlsxPath;
        }));
        console.log(JSON.stringify(result, null, 2));
    

    });
});
