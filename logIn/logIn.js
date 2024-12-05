let ime = document.querySelector('#korisnicko_ime')
let lozinka = document.querySelector('#lozinka')
let dugmeRegistracija = document.querySelector('#registracija')
let ostaniUlogovan = document.querySelector('#ostaniUlogovan')
import {firebaseConfig,app,database,dobijPodatke,noviKorisnik,noviChat,novaPoruka,proveraLogin} from "../databasejs/database.js"

dugmeRegistracija.addEventListener('click', async () => {
    let stanje = await proveraLogin(ime.value, lozinka.value)
    if(stanje) {
        
        if (ostaniUlogovan.checked) {
            localStorage.setItem('ime', ime.value)
            localStorage.setItem('lozinka', lozinka.value)
        } else {
            sessionStorage.setItem('ime', ime.value)
            sessionStorage.setItem('lozinka', lozinka.value)
        }
    } else {
        alert('user ne postoji!')
    }

    window.location.href = '../index/index.html'
})
