document.addEventListener("DOMContentLoaded", () => {
    const animacijaElement = document.querySelector(".animacija");
    //sigma
    setTimeout(() => {
        animacijaElement.style.borderRight = "none";
    }, 1700);
});

let login = document.querySelector('#login')
let signup = document.querySelector('#signup')
let signout = document.querySelector('#signout')
let ime = document.querySelector('#ime')

if (localStorage.getItem('ime') || sessionStorage.getItem('ime')) {
    ime.style.display = 'block'
    ime.innerText = localStorage.getItem('ime') ? localStorage.getItem('ime') : sessionStorage.getItem('ime')
} else {
    ime.style.display = 'none'
}

if (localStorage.getItem('lozinka') != null || sessionStorage.getItem('lozinka') != null) {
    login.style.display = 'none'
    signup.style.display = 'none'

    signout.style.display = 'block'

} else {
    login.style.display = 'block'
    signup.style.display = 'block'

    signout.style.display = 'none'
}

signout.addEventListener('click', () => {
    localStorage.clear()
    sessionStorage.clear()
    
    login.style.display = 'block'
    signup.style.display = 'block'

    signout.style.display = 'none'

    ime.style.display = 'none'
})
