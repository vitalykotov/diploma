import React, { useEffect, useState } from "react";
import { fetchTopArtists, fetchArtistTags, Artist } from "../api/GeneralApi";

const ArtistsSection: React.FC = () => {
  const [artists, setArtists] = useState<(Artist & { tags: string[] })[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await fetchTopArtists(12);
      const tagsArr = await Promise.all(data.map(a => fetchArtistTags(a.name)));
      if (mounted) {
        setArtists(data.map((a, i) => ({
          ...a,
          tags: tagsArr[i]
        })));
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <section>
      <h2 className="section-title">Hot right now</h2>
      <div className="artists">
        {artists.map((artist, i) => {
          const imgObj = artist.image.find(img => img.size === "extralarge") || { '#text': '' };
          const imgSrc = imgObj['#text'] || "https://via.placeholder.com/140";
          return (
            <div className="artist" key={artist.name + i}>
              <img src={imgSrc} alt={artist.name} />
              <div className="artist-name">{artist.name}</div>
              <div className="artist-tags">{artist.tags.join(" · ")}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ArtistsSection;
