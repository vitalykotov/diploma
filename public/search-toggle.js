/**
 * Обрабатывает открытие и закрытие формы поиска.
 * При клике на кнопку открытия показывает форму и фокусирует поле ввода.
 * При клике вне формы или нажатии Escape скрывает форму.
 * Отправка формы не блокируется, чтобы позволить переход по умолчанию.
 */
document.addEventListener('DOMContentLoaded', function() {
  const searchToggle = document.querySelector('.search-toggle');
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.querySelector('.search-input');

  if (!searchToggle || !searchForm || !searchInput) {
    console.error('Не найдены необходимые элементы поиска в DOM.');
    return;
  }

  /**
   * Показывает форму поиска и устанавливает фокус в поле ввода.
   * @param {Event} e - Событие клика.
   */
  function openSearchForm(e) {
    e.stopPropagation();
    searchForm.classList.add('active');
    searchInput.focus();
  }

  /**
   * Скрывает форму поиска.
   */
  function closeSearchForm() {
    searchForm.classList.remove('active');
  }

  /**
   * Обрабатывает клик вне формы поиска для её закрытия.
   * @param {Event} e - Событие клика.
   */
  function handleDocumentClick(e) {
    if (!searchForm.contains(e.target) && !searchToggle.contains(e.target)) {
      closeSearchForm();
    }
  }

  /**
   * Обрабатывает нажатие клавиш в поле поиска.
   * Закрывает форму при нажатии клавиши Escape.
   * @param {KeyboardEvent} e - Событие нажатия клавиши.
   */
  function handleInputKeydown(e) {
    if (e.key === 'Escape') {
      closeSearchForm();
      searchInput.blur();
    }
  }

  /**
   * 
   * Добавляем обработчики событий 
   */ 
  searchToggle.addEventListener('click', openSearchForm);
  document.addEventListener('click', handleDocumentClick);
  searchInput.addEventListener('keydown', handleInputKeydown);
});
