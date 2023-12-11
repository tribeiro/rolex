const story = (path: string) => `https://node-hnapi.herokuapp.com/${path}`;
const user = (path: string) => `https://hacker-news.firebaseio.com/v0/${path}.json`;
const exposure_log = (startDate: string, endDate: string) => `http://summit-lsp.lsst.codes/exposurelog/messages?order_by=-date_added&min_date_added=${startDate}&max_date_added=${endDate}&limit=10000`;
const narrative_log = (startDate: string, endDate: string) => `http://summit-lsp.lsst.codes/narrativelog/messages?order_by=-date_added&min_date_added=${startDate}&max_date_added=${endDate}&limit=100000`;
const narrative_log_id = (id: string) => `http://summit-lsp.lsst.codes/narrativelog/messages/${id}`;

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

export async function fetchNarrativeLogFromId(id: string | undefined) {
	const headers = { 'User-Agent': 'chrome' };

	if (id === undefined) {
		return [] as string[];
	} else {
		try {
			let response = await fetch(narrative_log_id(id), { headers });
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
}

export function jiraMarkdownToHtml(markdown: string, options = { codeFriendly: true, parseLines: true }) {
	if (!markdown) return '';
  
	const { codeFriendly, parseLines } = options;
	let html = markdown;
  
	// Parse text formats
	if (!codeFriendly) {
	  html = html.replace(/\*(.*)\*/g, (match, p1) => {
		return `<strong>${p1}</strong>`;
	  });
	  html = html.replace(/_(.*)_/g, (match, p1) => {
		return `<em>${p1}</em>`;
	  });
	  html = html.replace(/\+(.*)\+/g, (match, p1) => {
		return `<u>${p1}</u>`;
	  });
	  html = html.replace(/-(.*)-/g, (match, p1) => {
		return `<s>${p1}</s>`;
	  });
	}
  
	// Parse headings
	html = html.replace(/h1\.\s(.*)/g, (match, p1) => {
	  return `<h1>${p1}</h1>`;
	});
	html = html.replace(/h2\.\s(.*)/g, (match, p1) => {
	  return `<h2>${p1}</h2>`;
	});
	html = html.replace(/h3\.\s(.*)/g, (match, p1) => {
	  return `<h3>${p1}</h3>`;
	});
	html = html.replace(/h4\.\s(.*)/g, (match, p1) => {
	  return `<h4>${p1}</h4>`;
	});
	html = html.replace(/h5\.\s(.*)/g, (match, p1) => {
	  return `<h5>${p1}</h5>`;
	});
	html = html.replace(/h6\.\s(.*)/g, (match, p1) => {
	  return `<h6>${p1}</h6>`;
	});
  
	// Parse links
	html = html.replace(/\[(.*?)\|(.*?)\]/g, (match, p1, p2) => {
	  return `<a href="${p2}" rel="noopener noreferrer" target="_blank">${p1}</a>`;
	});
  
	// Parse code blocks
	html = html.replace(/\{code\}(.*)\{code\}/g, (match, p1) => {
	  return `<code>${p1}</code>`;
	});
  
	// Parse full lines
	if (parseLines) {
	  html = html.replace(/^(\s*)(.*)\r\n/gm, (match, p1, p2) => {
		return `<p>${[...p1].map((e) => '&nbsp;').join('')}${p2}</p>`;
	  });
	}
  
	return html;
  }