(() => {
    const themeKey = 'siteTheme';

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
        document.querySelectorAll('[data-theme-toggle]').forEach(button => {
            button.setAttribute('aria-pressed', String(isDark));
        });
        document.dispatchEvent(new Event('themechange'));
    }

    let savedTheme = 'light';
    try {
        savedTheme = localStorage.getItem(themeKey);
    } catch (error) {
        console.warn('Theme preference could not be loaded.', error);
    }
    // Apply before the page renders to avoid flashing the wrong theme.
    applyTheme(savedTheme);

    document.addEventListener('DOMContentLoaded', () => {
        applyTheme(document.documentElement.dataset.theme);
        document.querySelectorAll('[data-theme-toggle]').forEach(button => {
            button.addEventListener('click', () => {
                const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
                applyTheme(theme);
                try {
                    localStorage.setItem(themeKey, theme);
                } catch (error) {
                    console.warn('Theme preference could not be saved.', error);
                }
            });
        });
    });

    // The storage event updates other tabs on the same site.
    window.addEventListener('storage', event => {
        if (event.storageArea === localStorage && (event.key === themeKey || event.key === null)) {
            applyTheme(event.newValue);
        }
    });
})();
