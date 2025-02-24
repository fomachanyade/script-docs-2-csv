import fs from "node:fs";
import { describe, expect, it } from "vitest";
import config from "./config.json";
import { buildChapterTitle, parseDocsText } from "./parse_docs_text";

const simpleText = `
                1
                主人公だれだ
                敵私だ
                主人公お前だったのか
            `;
const simpleTextPrefix = ["主人公", "敵"];

const multipleChapterText = `
            1
            主人公だれだ
            2
            敵私だ
            3
            主人公お前だったのか
        `;
const multipleChapterTextPrefix = ["主人公", "敵"];

describe("parse_docs_test", () => {
	describe("章が一つの場合", () => {
		it("章わけの個数が正しくなされている", () => {
			const result = parseDocsText({
				scriptStartPrefix: simpleTextPrefix,
				docsText: simpleText,
			});

			expect(result.chapters.length).equal(1);
		});
		it("章の配列が正しい", () => {
			const result = parseDocsText({
				scriptStartPrefix: simpleTextPrefix,
				docsText: simpleText,
			});
			const resultChapterTiles = result.chapters.map(
				(chapter) => chapter.title,
			);
			expect(resultChapterTiles).toEqual(["001_1"]);
		});

		it("章の内容が正しい", () => {
			const result = parseDocsText({
				scriptStartPrefix: simpleTextPrefix,
				docsText: simpleText,
			});
			expect(result.chapters[0].content).toEqual([
				["主人公", "だれだ"],
				["敵", "私だ"],
				["主人公", "お前だったのか"],
			]);
		});
	});

	describe("章が複数の場合", () => {
		it("章わけの個数が正しくなされている", () => {
			const result = parseDocsText({
				scriptStartPrefix: multipleChapterTextPrefix,
				docsText: multipleChapterText,
			});

			expect(result.chapters.length).equal(3);
		});
		it("章の配列が正しい", () => {
			const result = parseDocsText({
				scriptStartPrefix: multipleChapterTextPrefix,
				docsText: multipleChapterText,
			});
			const resultChapterTiles = result.chapters.map(
				(chapter) => chapter.title,
			);
			expect(resultChapterTiles).toEqual(["001_1", "002_2", "003_3"]);
		});

		it("章の内容が正しい", () => {
			const result = parseDocsText({
				scriptStartPrefix: simpleTextPrefix,
				docsText: multipleChapterText,
			});
			expect(result.chapters[0].content).toEqual([["主人公", "だれだ"]]);
			expect(result.chapters[1].content).toEqual([["敵", "私だ"]]);
			expect(result.chapters[2].content).toEqual([
				["主人公", "お前だったのか"],
			]);
		});
	});

	it("実際のファイルで出力", () => {
		const currentPath = process.cwd();
		const testFilePath = `${currentPath}/tmp/test/parse_docs_text/test_docs.txt`;

		const file = fs.readFileSync(testFilePath, "utf8");
		const prefix = config.speakers;
		const result = parseDocsText({
			scriptStartPrefix: prefix,
			docsText: file,
		});

		console.log(result);
	});
});

describe("buildChapterTitle", () => {
	it("章のタイトルが正しい", () => {
		const result = buildChapterTitle(0, "主人公");
		expect(result).toBe("001_主人公");
	});
});
