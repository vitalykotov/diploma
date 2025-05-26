import React, { useEffect, useState, FormEvent } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { fetchArtists, fetchAlbums, fetchTracks, Artist, Album, Track } from "../api/GeneralApi";
import SearchTabs from "./SearchTabs";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function formatDuration(sec: string | undefined): string {
  if (!sec) return '';
  const s = parseInt(sec, 10);
  if (isNaN(s)) return '';
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${m}:${ss.toString().padStart(2, '0')}`;
}

const SearchPage: React.FC = () => {
  const query = useQuery().get("q") || "";
  const [tab, setTab] = useState("top");
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    (async () => {
      const [a, b, c] = await Promise.all([
        fetchArtists(query),
        fetchAlbums(query),
        fetchTracks(query),
      ]);
      setArtists(a);
      setAlbums(b);
      setTracks(c);
      setLoading(false);
    })();
  }, [query]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const val = (form.q as HTMLInputElement).value.trim();
    if (val) {
      history.push(`/search?q=${encodeURIComponent(val)}`);
    }
  };

  return (
    <main className="main-content">
      <form className="search-form" id="searchForm" onSubmit={handleSearch} autoComplete="off">
        <input
          type="search"
          name="q"
          className="search-input"
          placeholder="Search for music, artists, albums..."
          defaultValue={query}
          required
        />
        <button type="submit" className="search-button" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="7" stroke="#e3000f" strokeWidth="2" />
            <line x1="14.5" y1="14.5" x2="19" y2="19" stroke="#e3000f" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </form>

      <h1 className="main-title">
        Search results for “<span id="search-query">{query}</span>”
      </h1>

      <SearchTabs activeTab={tab} onChange={setTab} />

      {(tab === "top" || tab === "artists") && (
        <section id="artists-section" className="search-section active">
          <h2>Artists</h2>
          <div id="artists-list" className="card-grid">
            {loading ? "Loading..." : artists.length === 0 ? <div>No artists found.</div> : artists.map((artist, i) => {
              const img = (artist.image && artist.image[2] && artist.image[2]['#text']) || 'https://placehold.co/64x64';
              return (
                <div className="artist-card" key={artist.name + i}>
                  <img src={img} alt={artist.name} />
                  <div className="artist-name">{artist.name}</div>
                  <div className="artist-listeners">{artist.listeners ? artist.listeners + ' listeners' : ''}</div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {(tab === "top" || tab === "albums") && (
        <section id="albums-section" className="search-section active">
          <h2>Albums</h2>
          <div id="albums-list" className="card-grid">
            {loading ? "Loading..." : albums.length === 0 ? <div>No albums found.</div> : albums.map((album, i) => {
              const img = (album.image && album.image[2] && album.image[2]['#text']) || 'https://placehold.co/64x64';
              return (
                <div className="album-card" key={album.name + i}>
                  <img src={img} alt={album.name} />
                  <div className="album-name">{album.name}</div>
                  <div className="album-artist">{album.artist || ''}</div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {(tab === "top" || tab === "tracks") && (
        <section id="tracks-section" className="search-section active">
          <h2>Tracks</h2>
          <div id="tracks-list" className="track-list">
            {loading ? "Loading..." : tracks.length === 0 ? <div>No tracks found.</div> : tracks.map((track, i) => {
              const img = (track.image && track.image[1] && track.image[1]['#text']) || 'https://placehold.co/38x38';
              const artistName = typeof track.artist === "string" ? track.artist : track.artist.name;
              return (
                <div className="track-row" key={track.name + i}>
                  <span className="track-play">&#9654;</span>
                  <img src={img} className="track-img" alt="" />
                  <span className="track-title">{track.name}</span>
                  <span className="track-artist">{artistName}</span>
                  <span className="track-duration">{formatDuration(track.duration)}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
};

export default SearchPage;
