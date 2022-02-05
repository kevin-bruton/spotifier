import { Buffer } from 'buffer';
import { SearchQuery } from '../models/interfaces'

export {
  getSearchResults,
  getSearchResultsViaUrl
}

let token: string;
const baseUrl = 'https://api.spotify.com/v1/';
const SEARCH_RESULTS_LIMIT = 10;

async function getAuthToken (): Promise<string> {
  const url: string = 'https://accounts.spotify.com/api/token'
  const credentials: string = `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`;
  const headers: HeadersInit = {
    'Authorization': `Basic ${Buffer.from(credentials).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  const body: URLSearchParams = new URLSearchParams({ grant_type: 'client_credentials' })
  const resp: Response = await fetch(url, { headers, method: 'POST', body })
  const tokenData: { access_token: string, expires_in: number, token_type: string }
    = await resp.json();
  return tokenData.access_token
}

async function getSearchResults ({ genQuery, advQuery, mediaTypes }: SearchQuery, offset: number = 0): Promise<any> {
  token = token || await getAuthToken();
  const queryItemToStr = (key: string, val: string) => 
    val ? `+${key}:${encodeURI(val)}` : '';
  const queryStr = Object.keys(advQuery).reduce((qStr, key) =>
    `${qStr}${queryItemToStr(key, advQuery[key])}`,
    encodeURI(genQuery)
  );
  const url: URL = new URL(`${baseUrl}search`);
  const types = Array.from(mediaTypes);
  url.search = '?'
    + `query=${queryStr[0] === '+' ? queryStr.substring(1) : queryStr}`
    + `&type=${types.join(',')}`
    + `&limit=${SEARCH_RESULTS_LIMIT}`
    + `&offset=${offset}`;
  const headers: HeadersInit = { Authorization: `Bearer ${token}` };
  const resp = await fetch(url.toString(), { headers });
  const json = await resp.json();
  return json;
}

async function getSearchResultsViaUrl (url: string) {
  token = token || await getAuthToken();
  const headers: HeadersInit = { Authorization: `Bearer ${token}` };
  const resp = await fetch(url, { headers });
  const json = await resp.json();
  return json;
}
