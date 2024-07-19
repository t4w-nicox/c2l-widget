function toggleTheme () {
    const themeToggleButton = document.getElementById('btn-theme-toggle');
    
    themeToggleButton.addEventListener('click', () =>{
        //Verifie si le thème est déja Dark
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
        } else {
            document.body.classList.add('dark-theme');
        }
    })
}

function initDownloadButtons() {
    let buttons = document.querySelectorAll('.btn-dld');

    if (buttons) {
        buttons.forEach((button) => {
            let btnLink = button.querySelector('.btn-dld__link');
            let btnToggle = button.querySelector('.btn-dld__toggle');
            let btnCollapse = button.querySelector('.btn-dld__collapse');

            btnToggle.addEventListener('click', (e) => {
                e.preventDefault();
                btnLink.classList.toggle('is-active');
                btnToggle.classList.toggle('is-active');
                btnCollapse.classList.toggle('is-active');
            })
        });
    }
}


window.onload = () => {
    initDownloadButtons();
    toggleTheme();
  };

