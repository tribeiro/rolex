const story = (path: string) => `https://node-hnapi.herokuapp.com/${path}`;
const user = (path: string) => `https://hacker-news.firebaseio.com/v0/${path}.json`;
const exposure_log = () => `http://summit-lsp.lsst.codes/exposurelog/messages?order_by=-date_added&limit=10`;
const narrative_log = () => `http://summit-lsp.lsst.codes/narrativelog/messages?order_by=-date_added&limit=10`;

export default async function fetchAPI(path: string) {
	const url = path.startsWith('user') ? user(path) : story(path);
	const headers = { 'User-Agent': 'chrome' };

	try {
		let response = await fetch(url, { headers });
		let text = await response.text();
		try {
			if (text === null) {
				return { error: 'Not found' };
			}
			return JSON.parse(text);
		} catch (e) {
			console.error(`Received from API: ${text}`);
			console.error(e);
			return { error: e };
		}
	} catch (error) {
		return { error };
	}
}

export async function fetchExposureLog() {
	const headers = { 'User-Agent': 'chrome' };

	try {
		let response = await fetch(exposure_log(), { headers });
		let text = await response.text();
		try {
			if (text === null) {
				// return { error: 'Not found' };
				return [] as string[];
			}
			return JSON.parse(text);
		} catch (e) {
			console.error(`Received from API: ${text}`);
			console.error(e);
			// return { error: e };
			return [] as string[];
		}
	} catch (error) {
		// return { error };
		return [] as string[];
	}
}

export async function fetchNarrativeLog() {
	const headers = { 'User-Agent': 'chrome' };

	try {
		let response = await fetch(narrative_log(), { headers });
		let text = await response.text();
		try {
			if (text === null) {
				// return { error: 'Not found' };
				return [] as string[];
			}
			return JSON.parse(text);
		} catch (e) {
			console.error(`Received from API: ${text}`);
			console.error(e);
			// return { error: e };
			return [] as string[];
		}
	} catch (error) {
		return [] as string[];
		// return { error };
	}
}
