const API_KEY = '1630a2185631c7fa4da991db07da13cb';
const API_ROOT = 'https://ws.audioscrobbler.com/2.0/';

async function fetchJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export interface Image {
  size: string;
  '#text': string;
}

export interface Artist {
  name: string;
  image: Image[];
  listeners?: string;
  tags?: string[];
}

export interface Track {
  name: string;
  artist: { name: string } | string;
  image?: Image[];
  duration?: string;
  tags?: string[];
}

export interface Album {
  name: string;
  artist?: string;
  image: Image[];
}

export async function fetchTopArtists(limit = 12): Promise<Artist[]> {
  const url = `${API_ROOT}?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=${limit}`;
  const data = await fetchJSON<{ artists: { artist: Artist[] } }>(url);
  return data?.artists.artist || [];
}

export async function fetchTopTracks(limit = 18): Promise<Track[]> {
  const url = `${API_ROOT}?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=${limit}`;
  const data = await fetchJSON<{ tracks: { track: Track[] } }>(url);
  return data?.tracks.track || [];
}

export async function fetchArtistTags(artistName: string): Promise<string[]> {
  const url = `${API_ROOT}?method=artist.gettoptags&artist=${encodeURIComponent(artistName)}&api_key=${API_KEY}&format=json`;
  const data = await fetchJSON<{ toptags: { tag: { name: string }[] } }>(url);
  if (!data?.toptags?.tag) return [];
  return data.toptags.tag.slice(0, 3).map(t => t.name);
}

export async function fetchTrackTags(artistName: string, trackName: string): Promise<string[]> {
  const url = `${API_ROOT}?method=track.gettoptags&artist=${encodeURIComponent(artistName)}&track=${encodeURIComponent(trackName)}&api_key=${API_KEY}&format=json`;
  const data = await fetchJSON<{ toptags: { tag: { name: string }[] } }>(url);
  if (!data?.toptags?.tag) return [];
  return data.toptags.tag.slice(0, 3).map(t => t.name);
}

export async function fetchArtists(query: string, limit = 6): Promise<Artist[]> {
  const url = `${API_ROOT}?method=artist.search&artist=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=${limit}`;
  const data = await fetchJSON<{ results: { artistmatches: { artist: Artist[] } } }>(url);
  return data?.results.artistmatches.artist || [];
}

export async function fetchAlbums(query: string, limit = 6): Promise<Album[]> {
  const url = `${API_ROOT}?method=album.search&album=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=${limit}`;
  const data = await fetchJSON<{ results: { albummatches: { album: Album[] } } }>(url);
  return data?.results.albummatches.album || [];
}

export async function fetchTracks(query: string, limit = 8): Promise<Track[]> {
  const url = `${API_ROOT}?method=track.search&track=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=${limit}`;
  const data = await fetchJSON<{ results: { trackmatches: { track: Track[] } } }>(url);
  return data?.results.trackmatches.track || [];
}
