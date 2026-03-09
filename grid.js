const grid = document.querySelector('.grid-overlay-component')

if (localStorage.getItem('gridOverlayVisible') === 'true') {
  grid?.classList.add('is-visible')
}

document.addEventListener('keydown', function (e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
    e.preventDefault()
    grid?.classList.toggle('is-visible')

    const isVisible = grid?.classList.contains('is-visible')
    localStorage.setItem('gridOverlayVisible', isVisible)
  }
})