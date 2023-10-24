export function toggleDarkMode(): void {
  const currentTheme = localStorage.getItem('theme')

  if (currentTheme === 'dark') {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  } else {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }
}
