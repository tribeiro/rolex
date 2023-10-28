const story = (path: string) => `https://node-hnapi.herokuapp.com/${path}`;
const user = (path: string) => `https://hacker-news.firebaseio.com/v0/${path}.json`;
const exposure_log = (startDate: string, endDate: string) => `http://summit-lsp.lsst.codes/exposurelog/messages?order_by=-date_added&min_date_added=${startDate}&max_date_added=${endDate}`;
const narrative_log = (startDate: string, endDate: string) => `http://summit-lsp.lsst.codes/narrativelog/messages?order_by=-date_added&min_date_added=${startDate}&max_date_added=${endDate}`;

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

export async function fetchExposureLog(startDate: string, endDate: string) {
	const headers = { 'User-Agent': 'chrome' };

	try {
		let response = await fetch(exposure_log(startDate, endDate), { headers });
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

export async function fetchNarrativeLog(startDate: string, endDate: string) {
	const headers = { 'User-Agent': 'chrome' };

	try {
		let response = await fetch(narrative_log(startDate, endDate), { headers });
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
