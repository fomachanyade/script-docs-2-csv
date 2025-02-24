import type { Chapter } from "./type";

export const buildChapterTitle = (num: number, line: string) => {
	const chapterPrefix = (num + 1).toString().padStart(3, "0");
	return `${chapterPrefix}_${line}`;
};

type ParseDocsTextArgs = {
	scriptStartPrefix: string[];
	docsText: string;
};

type ParseDocsTextReturn = {
	chapters: Chapter[];
};

export const parseDocsText = (arg: ParseDocsTextArgs): ParseDocsTextReturn => {
	const { scriptStartPrefix, docsText } = arg;

	const chapters: Chapter[] = [];

	const lines = docsText.split("\n").map((line) => line.trim());

	let currentChapter: Chapter | null = null;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		if (!line) continue;

		const matchedPrefix = scriptStartPrefix.find((prefix) =>
			line.startsWith(prefix),
		);
		if (!matchedPrefix) {
			currentChapter = {
				title: buildChapterTitle(chapters.length, line),
				content: [],
			};
			chapters.push(currentChapter);
		} else {
			if (currentChapter) {
				const lineArray = line.split(matchedPrefix);
				const lineContent = [matchedPrefix, lineArray[1]];
				currentChapter.content.push(lineContent);
			}
		}
	}
	return { chapters };
};
