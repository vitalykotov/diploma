import React, { useEffect, useState } from "react";
import { fetchTopTracks, fetchTrackTags, Track } from "../api/GeneralApi";

const TracksSection: React.FC = () => {
  const [columns, setColumns] = useState<(Track & { tags: string[] })[][]>([[], [], []]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const tracks = await fetchTopTracks(18);
      const cols: Track[][] = [[], [], []];
      tracks.forEach((track, i) => cols[Math.floor(i / 6)].push(track));
      const tagsArrs = await Promise.all(
        cols.map(col => Promise.all(col.map(track => fetchTrackTags(
          typeof track.artist === "string" ? track.artist : track.artist.name,
          track.name
        ))))
      );
      if (mounted) {
        setColumns(cols.map((col, idx) =>
          col.map((track, i) => ({ ...track, tags: tagsArrs[idx][i] }))
        ));
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <section>
      <h2 className="section-title">Popular tracks</h2>
      <div className="tracks">
        {columns.map((col, colIdx) => (
          <div className="track-col" key={colIdx}>
            {col.map((track, i) => {
              const imgObj = track.image?.find(img => img.size === "medium") || { '#text': '' };
              const imgSrc = imgObj['#text'] || "https://via.placeholder.com/48";
              const artistName = typeof track.artist === "string" ? track.artist : track.artist.name;
              return (
                <div className="track" key={track.name + i}>
                  <img src={imgSrc} alt={track.name} />
                  <div>
                    <div className="track-title">{track.name}</div>
                    <div className="track-artist">{artistName}</div>
                    <div className="track-tags">{track.tags.join(" · ")}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TracksSection;
