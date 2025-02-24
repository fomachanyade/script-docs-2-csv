import { describe, expect, it } from "vitest";
import { stringArrayToAoa } from "./build_aoa_data";

describe("stringArrayToAoa", () => {
	describe("空の場合", () => {
		const result = stringArrayToAoa({
			rows: [],
		});
		it("ヘッダー行が作成されている", () => {
			expect(result.length).equal(1);
		});
		it("ヘッダーの内容が正しい", () => {
			expect(result[0][0]).equal("#");
			expect(result[0][1]).equal("name");
			expect(result[0][2]).equal("comment");
		});
	});

	describe("複数の場合", () => {
		const result = stringArrayToAoa({
			rows: [
				["主人公", "誰だ"],
				["敵", "私だ"],
				["主人公", "お前だったのか"],
			],
		});

		it("返却される行数が正しい", () => {
			expect(result.length).equal(4);
		});
		it("セリフの値が正しい", () => {
			const firstLine = result[1];
			expect(firstLine[1]).equal("主人公");
			expect(firstLine[2]).equal("誰だ");

			const lastLine = result[3];
			expect(lastLine[1]).equal("主人公");
			expect(lastLine[2]).equal("お前だったのか");
		});
		it("連番が正しく振られている", () => {
			expect(result[1][0]).equal(String(1));
			expect(result[2][0]).equal(String(2));
			expect(result[3][0]).equal(String(3));
		});
	});
});
