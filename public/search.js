/**
 * Основной скрипт для работы с вкладками и динамическим поиском на странице.
 * Обрабатывает переключение вкладок и отображение результатов поиска без перезагрузки страницы.
 * Поддерживает обновление URL и навигацию назад/вперед в браузере.
 */
document.addEventListener('DOMContentLoaded', () => {
  /** 
   * Вкладки и секции для переключения
   */
  const tabs = document.querySelectorAll('.search-tabs .tab');
  const sections = {
    top: [
      document.getElementById('artists-section'),
      document.getElementById('albums-section'),
      document.getElementById('tracks-section')
    ],
    artists: [document.getElementById('artists-section')],
    albums: [document.getElementById('albums-section')],
    tracks: [document.getElementById('tracks-section')]
  };

  /**
   * Показывает указанную вкладку и соответствующие секции,
   * скрывая остальные и обновляя активное состояние вкладок.
   * @param {string} tabName - Имя вкладки ('top', 'artists', 'albums', 'tracks').
   */
  function showTab(tabName) {
    tabs.forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.search-section').forEach(sec => sec.classList.remove('active'));

    const activeTab = document.querySelector(`.tab[data-tab="${tabName}"]`);
    if (activeTab) activeTab.classList.add('active');

    if (sections[tabName]) {
      sections[tabName].forEach(sec => {
        if (sec) sec.classList.add('active');
      });
    }
  }


    /** 
     * Инициализация: показываем вкладку "Top Results"
     */

  showTab('top');

  /** 
    * Обработчики кликов по вкладкам
    */

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      showTab(this.getAttribute('data-tab'));
    });
  });

  /**
   * Элементы формы поиска и вывода запроса 
   */ 
  const searchForm = document.getElementById('searchForm');
  const searchInput = searchForm.querySelector('input[name="q"]');
  const searchQueryElement = document.getElementById('search-query');

  /**
   * Асинхронно получает и отображает результаты поиска по артистам, альбомам и трекам.
   * @param {string} query - Текст поискового запроса.
   */
  async function renderResults(query) {
    searchQueryElement.textContent = query;

    try {
  
      const artists = await fetchArtists(query);
      const albums = await fetchAlbums(query);
      const tracks = await fetchTracks(query);

      
      const artistsList = document.getElementById('artists-list');
      artistsList.innerHTML = artists.length ? '' : '<div>No artists found.</div>';
      artists.forEach(artist => {
        const img = (artist.image && artist.image[2] && artist.image[2]['#text']) || 'https://placehold.co/64x64';
        const card = document.createElement('div');
        card.className = 'artist-card';
        card.innerHTML = `
          <img src="${img}" alt="${artist.name}">
          <div class="artist-name">${artist.name}</div>
          <div class="artist-listeners">${artist.listeners ? artist.listeners + ' listeners' : ''}</div>
        `;
        artistsList.appendChild(card);
      });

      
      const albumsList = document.getElementById('albums-list');
      albumsList.innerHTML = albums.length ? '' : '<div>No albums found.</div>';
      albums.forEach(album => {
        const img = (album.image && album.image[2] && album.image[2]['#text']) || 'https://placehold.co/64x64';
        const card = document.createElement('div');
        card.className = 'album-card';
        card.innerHTML = `
          <img src="${img}" alt="${album.name}">
          <div class="album-name">${album.name}</div>
          <div class="album-artist">${album.artist || ''}</div>
        `;
        albumsList.appendChild(card);
      });

     
      const tracksList = document.getElementById('tracks-list');
      tracksList.innerHTML = tracks.length ? '' : '<div>No tracks found.</div>';
      tracks.forEach(track => {
        const img = (track.image && track.image[1] && track.image[1]['#text']) || 'https://placehold.co/38x38';
        const row = document.createElement('div');
        row.className = 'track-row';
        row.innerHTML = `
          <span class="track-play">&#9654;</span>
          <img src="${img}" class="track-img" alt="">
          <span class="track-title">${track.name}</span>
          <span class="track-artist">${track.artist}</span>
          <span class="track-duration">${track.duration ? formatDuration(track.duration) : ''}</span>
        `;
        tracksList.appendChild(row);
      });
    } catch (error) {
      console.error('Ошибка при загрузке результатов поиска:', error);
      alert('Произошла ошибка при загрузке результатов поиска. Пожалуйста, попробуйте позже.');
    }
  }

  /**
   * Обработка отправки формы — динамический поиск без перезагрузки страницы 
   */ 
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newQuery = searchInput.value.trim();
    if (!newQuery) return;

    /** 
     * Обновляем URL без перезагрузки страницы
     */ 
    window.history.pushState({}, '', `?q=${encodeURIComponent(newQuery)}`);

    await renderResults(newQuery);
  });


  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get('q') || '';
  if (initialQuery) {
    searchInput.value = initialQuery;
    renderResults(initialQuery);
  }


  window.addEventListener('popstate', async () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q') || '';
    searchInput.value = query;
    await renderResults(query);
  });
});

/**
 * Форматирует длительность трека в формате М:СС.
 * @param {number|string} sec - Длительность в секундах.
 * @returns {string} Форматированная строка.
 */
function formatDuration(sec) {
  sec = parseInt(sec, 10);
  if (!sec || isNaN(sec)) return '';
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
