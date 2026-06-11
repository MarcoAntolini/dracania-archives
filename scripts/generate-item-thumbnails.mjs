import { readdir, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

const itemsDir = path.join(process.cwd(), "public/images/db/items");
const thumbsDir = path.join(itemsDir, "thumbs");
const thumbSize = 30;

async function main() {
	await mkdir(thumbsDir, { recursive: true });

	const files = (await readdir(itemsDir)).filter((file) => file.endsWith(".png"));
	let generated = 0;

	for (const file of files) {
		const inputPath = path.join(itemsDir, file);
		const outputPath = path.join(thumbsDir, file);

		await sharp(inputPath).resize(thumbSize, thumbSize, { fit: "contain" }).png().toFile(outputPath);
		generated += 1;
	}

	console.log(`Generated ${generated} thumbnails in public/images/db/items/thumbs`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
