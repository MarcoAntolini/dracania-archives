import { itemImagePath } from "@/lib/site-config";
import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

async function readImage(relativePath: string) {
	const filePath = path.join(process.cwd(), "public", relativePath.replace(/^\//, ""));
	return readFile(filePath);
}

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const imageName = searchParams.get("imageName");

	if (!imageName || !/^[a-zA-Z0-9_-]+$/.test(imageName)) {
		return NextResponse.json({ error: "Valid image name is required" }, { status: 400 });
	}

	const thumbPath = itemImagePath(imageName, "thumb").replace(/^\//, "");
	const fullPath = itemImagePath(imageName, "full").replace(/^\//, "");

	try {
		const imageBuffer = await readImage(thumbPath);
		return new Response(imageBuffer, {
			headers: {
				"Content-Type": "image/png",
				"Cache-Control": "public, max-age=31536000, immutable",
			},
		});
	} catch {
		try {
			const imageBuffer = await readImage(fullPath);
			return new Response(imageBuffer, {
				headers: {
					"Content-Type": "image/png",
					"Cache-Control": "public, max-age=31536000, immutable",
				},
			});
		} catch {
			return NextResponse.json({ error: "Image not found" }, { status: 404 });
		}
	}
}
