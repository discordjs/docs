import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(request: VercelRequest, response: VercelResponse) {
	const url = request.query.url as string;
	try {
		const filePath = join(cwd(), url);
		const file = await readFile(filePath, 'utf8');
		response
			.setHeader('Content-Type', 'application/json')
			.setHeader('Cache-Control', 'max-age=604800, s-maxage=31536000')
			.send(file);
	} catch {
		response.status(404).end();
	}
}
