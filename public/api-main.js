const API_KEY = '1630a2185631c7fa4da991db07da13cb';
const API_ROOT = 'https://ws.audioscrobbler.com/2.0/';

/**
 * Получает топ-артистов с Last.fm.
 * @param {number} [limit=12] - Количество артистов в выдаче.
 * @returns {Promise<Array>} Массив артистов или пустой массив при ошибке.
 */
async function fetchTopArtists(limit = 12) {
  const url = `${API_ROOT}?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=${limit}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      alert('Ошибка при загрузке топ-артистов. Попробуйте позже.');
      return [];
    }
    const data = await response.json();
    return data.artists?.artist || [];
  } catch (error) {
    console.error('Ошибка при запросе топ-артистов:', error);
    alert('Не удалось загрузить топ-артистов. Проверьте соединение или попробуйте позже.');
    return [];
  }
}

/**
 * Получает топ-треки с Last.fm.
 * @param {number} [limit=18] - Количество треков в выдаче.
 * @returns {Promise<Array>} Массив треков или пустой массив при ошибке.
 */
async function fetchTopTracks(limit = 18) {
  const url = `${API_ROOT}?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=${limit}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      alert('Ошибка при загрузке топ-треков. Попробуйте позже.');
      return [];
    }
    const data = await response.json();
    return data.tracks?.track || [];
  } catch (error) {
    console.error('Ошибка при запросе топ-треков:', error);
    alert('Не удалось загрузить топ-треки. Проверьте соединение или попробуйте позже.');
    return [];
  }
}

/**
 * Получает топ-теги (жанры) для артиста.
 * @param {string} artistName - Имя артиста.
 * @returns {Promise<Array>} Массив названий тегов (до 3) или пустой массив при ошибке.
 */
async function fetchArtistTags(artistName) {
  const url = `${API_ROOT}?method=artist.gettoptags&artist=${encodeURIComponent(artistName)}&api_key=${API_KEY}&format=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    if (!data.toptags || !data.toptags.tag) return [];
    return data.toptags.tag.slice(0, 3).map(t => t.name);
  } catch (error) {
    console.error('Ошибка при получении тегов артиста:', error);
    return [];
  }
}

/**
 * Получает топ-теги (жанры) для трека.
 * @param {string} artistName - Имя артиста.
 * @param {string} trackName - Название трека.
 * @returns {Promise<Array>} Массив названий тегов (до 3) или пустой массив при ошибке.
 */
async function fetchTrackTags(artistName, trackName) {
  const url = `${API_ROOT}?method=track.gettoptags&artist=${encodeURIComponent(artistName)}&track=${encodeURIComponent(trackName)}&api_key=${API_KEY}&format=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    if (!data.toptags || !data.toptags.tag) return [];
    return data.toptags.tag.slice(0, 3).map(t => t.name);
  } catch (error) {
    console.error('Ошибка при получении тегов трека:', error);
    return [];
  }
}
