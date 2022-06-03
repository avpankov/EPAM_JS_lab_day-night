export function setModule() {
    let btn = document.createElement('button');
    btn.setAttribute('id', 'theme');
    btn.innerText = 'Change theme';
    document.body.appendChild(btn);

    let name = prompt('Enter your name');
    let lightTheme = true;

    theme.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        lightTheme = !lightTheme;
        localStorage.setItem(name, lightTheme);
    })

    if (localStorage.hasOwnProperty(name)) {
        if (localStorage.getItem(name) === 'false') {
            document.body.classList.add('dark-theme');
        }
    }

    if (document.body.classList.contains('dark-theme')) {
        lightTheme = false;
        console.log('Changed to dark theme');
    }
}