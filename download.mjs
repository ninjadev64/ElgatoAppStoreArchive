import { readFileSync, createWriteStream } from "fs";
import { get } from "https";

const data = JSON.parse(readFileSync("catalogue.json", "utf-8"));

for (const plugin of data) {
	if (!plugin.download) continue;
	const file = createWriteStream(`plugins/${plugin.id}.zip`);
	get(plugin.download, (res) => {
		res.pipe(file);
		file.on("finish", () => file.close);
	}).on("error", () => {
		console.error(`Failed to download plugin ${plugin.id} from ${plugin.download}`);
	});
}
