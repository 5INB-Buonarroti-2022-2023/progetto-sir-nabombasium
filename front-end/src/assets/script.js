const checkbox = document.getElementById('visited-checkbox');

checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
        sessionStorage.setItem('visited', 'true'); // Salva lo stato come "true" nella sessionStorage
    } else {
        sessionStorage.removeItem('visited'); // Rimuove lo stato dalla sessionStorage
    }
});

// Verifica lo stato nella sessionStorage al caricamento della pagina
if (sessionStorage.getItem('visited') === 'true') {
    checkbox.checked = true;
}
