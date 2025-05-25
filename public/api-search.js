const API_KEY = '1630a2185631c7fa4da991db07da13cb'; 

/**
 * Получает список артистов по поисковому запросу.
 * @param {string} query - Поисковый запрос.
 * @param {number} [limit=6] - Максимальное количество результатов.
 * @returns {Promise<Array>} Массив артистов или пустой массив при ошибке.
 */
async function fetchArtists(query, limit = 6) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=${limit}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      alert('Ошибка при получении артистов. Проверьте соединение или попробуйте позже.');
      return [];
    }
    const data = await response.json();
    return data.results?.artistmatches?.artist || [];
  } catch (error) {
    console.error('Ошибка при получении артистов:', error);
    alert('Не удалось загрузить артистов. Попробуйте обновить страницу или повторить попытку позже.');
    return [];
  }
}

/**
 * Получает список альбомов по поисковому запросу.
 * @param {string} query - Поисковый запрос.
 * @param {number} [limit=6] - Максимальное количество результатов.
 * @returns {Promise<Array>} Массив альбомов или пустой массив при ошибке.
 */
async function fetchAlbums(query, limit = 6) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=${limit}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      alert('Ошибка при получении альбомов. Проверьте соединение или попробуйте позже.');
      return [];
    }
    const data = await response.json();
    return data.results?.albummatches?.album || [];
  } catch (error) {
    console.error('Ошибка при получении альбомов:', error);
    alert('Не удалось загрузить альбомы. Попробуйте обновить страницу или повторить попытку позже.');
    return [];
  }
}

/**
 * Получает список треков по поисковому запросу.
 * @param {string} query - Поисковый запрос.
 * @param {number} [limit=8] - Максимальное количество результатов.
 * @returns {Promise<Array>} Массив треков или пустой массив при ошибке.
 */
async function fetchTracks(query, limit = 8) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=${limit}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      alert('Ошибка при получении треков. Проверьте соединение или попробуйте позже.');
      return [];
    }
    const data = await response.json();
    return data.results?.trackmatches?.track || [];
  } catch (error) {
    console.error('Ошибка при получении треков:', error);
    alert('Не удалось загрузить треки. Попробуйте обновить страницу или повторить попытку позже.');
    return [];
  }
}
