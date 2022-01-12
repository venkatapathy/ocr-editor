import { PageImage } from "./types";

export async function loadImageUtil(blob: Blob): Promise<PageImage | null> {
	const img = await createImageBitmap(blob);

	return {
		curWidth: img.width,
		curHeight: img.height,
		urlObject: URL.createObjectURL(blob),
		orgWidth: img.width,
		orgHeight: img.height,
	};
}
