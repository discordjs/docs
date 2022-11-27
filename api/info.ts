import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(request: VercelRequest, response: VercelResponse) {
	const url = request.query.package as string;
	try {
		const filePath = join(cwd(), url);
		const file = await readdir(filePath, 'utf8');
		response
			.setHeader('Content-Type', 'application/json')
			.setHeader('Cache-Control', 'public, max-age=604800, s-maxage=31536000')
			.send(file.filter((filename) => filename.endsWith('.api.json')).map((value) => value.slice(0, -9)));
	} catch {
		response.status(404).end();
	}
}
