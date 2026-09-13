(() => {
  const storageKey = 'progenius-theme';
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const choices = document.querySelectorAll('[data-theme-choice]');
  const applyTheme = choice => {
    const selected = ['light', 'dark', 'system'].includes(choice) ? choice : 'system';
    const resolved = selected === 'system' ? (systemTheme.matches ? 'dark' : 'light') : selected;
    document.documentElement.dataset.theme = selected;
    document.documentElement.dataset.resolvedTheme = resolved;
    document.documentElement.style.colorScheme = resolved;
    themeColor?.setAttribute('content', resolved === 'dark' ? '#001b0d' : '#fafbf8');
    choices.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.themeChoice === selected)));
  };
  choices.forEach(button => button.addEventListener('click', () => {
    localStorage.setItem(storageKey, button.dataset.themeChoice);
    applyTheme(button.dataset.themeChoice);
  }));
  systemTheme.addEventListener('change', () => {
    if ((localStorage.getItem(storageKey) || 'system') === 'system') applyTheme('system');
  });
  applyTheme(localStorage.getItem(storageKey) || 'system');
})();
