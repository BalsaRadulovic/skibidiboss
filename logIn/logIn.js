let ime = document.querySelector('#korisnicko_ime')
let lozinka = document.querySelector('#lozinka')
let dugmeRegistracija = document.querySelector('#registracija')
import {firebaseConfig,app,database,dobijPodatke,noviKorisnik,noviChat,novaPoruka,proveraLogin} from "../databasejs/database.js"

dugmeRegistracija.addEventListener('click', async () => {
    let stanje=await proveraLogin(ime.value,lozinka.value)
    if(stanje) {
        console.log("uspeo login")
    }
})
