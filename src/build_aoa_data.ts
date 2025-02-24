import type { Chapter, ChapterAoaData } from "./type";

type StringArrayToAoaArgs = {
	rows: string[][];
};

export const stringArrayToAoa = (arg: StringArrayToAoaArgs): string[][] => {
	const { rows } = arg;

	const result: string[][] = [];

	const headers = ["#", "name", "comment"];
	result.push(headers);

	for (let i = 0; i < rows.length; i++) {
		const line = rows[i];
		const id = (i + 1).toString();
		const row = [id, line[0], line[1]];
		result.push(row);
	}

	return result;
};

type BuildAoaDataArgs = {
	chapters: Chapter[];
};

type BuildAoaDataReturn = {
	chapterAoaList: ChapterAoaData[];
};

export const buildAoaData = (args: BuildAoaDataArgs): BuildAoaDataReturn => {
	const { chapters } = args;

	const chapterAoaList = chapters.map((chapter: Chapter) => {
		return {
			title: chapter.title,
			aoa: stringArrayToAoa({ rows: chapter.content }),
		};
	});

	return {
		chapterAoaList,
	};
};
