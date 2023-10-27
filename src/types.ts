export interface IComment {
	user: string;
	time_ago: string;
	content: string;
	comments: IComment[];
}

export interface IStory {
	id: string;
	points: string;
	url: string;
	title: string;
	domain: string;
	type: string;
	time_ago: string;
	user: string;
	comments_count: number;
	comments: IComment[];
}

export interface IUser {
	error: string;
	id: string;
	created: string;
	karma: number;
	about: string;
}

export interface IExposureLog {
    id: string;
    site_id: string;
    obs_id: string;
    instrument: string;
    day_obs: number;
    seq_num: number;
    message_text: string;
    level: number;
    tags: string[];
    urls: string[];
    user_id: string;
    user_agent: string;
    is_human: boolean;
    is_valid: boolean;
    exposure_flag: string;
    date_added: string;
    date_invalidated: string | null,
    parent_id: string | null,
}

export interface INarrativeLog {
	id: string;
	site_id: string;
	message_text: string;
	level: number;
	tags: string[];
	urls: string[];
	time_lost: number;
	date_begin: string;
	user_id: string;
	user_agent: string;
	is_human: boolean;
	is_valid: boolean;
	date_added: string;
	date_invalidated: string | null;
	parent_id: string | null;
	systems: string[];
	subsystems: string[];
	cscs: string[];
	date_end: string;
	components: string | null;
	primary_software_components: string | null;
	primary_hardware_components: string | null;
}

export interface ILogEntry {
	date_added: string | null;
	day_obs: number | null; 
	flag: string;
	instrument: string | null;
	is_human: boolean;
	message_text: string;
	obs_id: string | null;
	seq_num: number | null;
	user_id: string;
}