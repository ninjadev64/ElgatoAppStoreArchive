import { readFileSync, writeFileSync } from "fs";

const raw = JSON.parse(readFileSync("catalogue_raw.json"));
const entries = raw.entries;

let output = [];

for (const entry of entries) {
	output.push({
		id: entry.identifier,
		name: entry.name,
		author: entry.author.name,
		link: entry.website,
		version: (entry.published_versions[0] ?? {}).version_number,
		download: (entry.published_versions[0] ?? {}).direct_download_link
	});
}

writeFileSync("catalogue.json", JSON.stringify(output, null, 4) + "\n");
