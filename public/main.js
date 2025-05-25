/**
 * Рендерит список топ-артистов с тегами в контейнер с классом .artists.
 * Загружает данные с API и отображает их на странице.
 */
async function renderArtists() {
  const artistsContainer = document.querySelector('.artists');
  if (!artistsContainer) {
    console.error('Контейнер для артистов не найден');
    return;
  }
  artistsContainer.innerHTML = '';

  try {
    const artists = await fetchTopArtists(12);

    // Асинхронно получаем теги для каждого артиста
    const tagsArr = await Promise.all(
      artists.map(artist => fetchArtistTags(artist.name))
    );

    artists.forEach((artist, i) => {
      const imgObj = artist.image.find(img => img.size === 'extralarge') || {};
      const imgSrc = imgObj['#text'] || 'https://via.placeholder.com/140';
      const tags = tagsArr[i].join(' · ');
      const div = document.createElement('div');
      div.className = 'artist';
      div.innerHTML = `
        <img src="${imgSrc}" alt="${artist.name}" />
        <div class="artist-name">${artist.name}</div>
        <div class="artist-tags">${tags}</div>
      `;
      artistsContainer.appendChild(div);
    });
  } catch (error) {
    console.error('Ошибка при загрузке артистов:', error);
    artistsContainer.textContent = 'Ошибка загрузки артистов';
  }
}

/**
 * Рендерит список топ-треков с тегами в контейнер с классом .tracks.
 * Делит треки на 3 колонки и отображает их на странице.
 */
async function renderTracks() {
  const tracksContainer = document.querySelector('.tracks');
  if (!tracksContainer) {
    console.error('Контейнер для треков не найден');
    return;
  }
  tracksContainer.innerHTML = '';

  try {
    const tracks = await fetchTopTracks(18);

    // Разбиваем треки на 3 колонки по 6 треков
    const columns = [[], [], []];
    tracks.forEach((track, index) => {
      columns[Math.floor(index / 6)].push(track);
    });

    for (let col = 0; col < 3; col++) {
      const colDiv = document.createElement('div');
      colDiv.className = 'track-col';

      // Асинхронно получаем теги для каждого трека в колонке
      const tagsArr = await Promise.all(
        columns[col].map(track => fetchTrackTags(track.artist.name, track.name))
      );

      columns[col].forEach((track, i) => {
        const imgObj = track.image ? track.image.find(img => img.size === 'medium') : {};
        const imgSrc = imgObj && imgObj['#text'] ? imgObj['#text'] : 'https://via.placeholder.com/48';
        const tags = tagsArr[i].join(' · ');
        const trackDiv = document.createElement('div');
        trackDiv.className = 'track';
        trackDiv.innerHTML = `
          <img src="${imgSrc}" alt="${track.name}" />
          <div>
            <div class="track-title">${track.name}</div>
            <div class="track-artist">${track.artist.name}</div>
            <div class="track-tags">${tags}</div>
          </div>
        `;
        colDiv.appendChild(trackDiv);
      });

      tracksContainer.appendChild(colDiv);
    }
  } catch (error) {
    console.error('Ошибка при загрузке треков:', error);
    tracksContainer.textContent = 'Ошибка загрузки треков';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderArtists();
  renderTracks();
});
