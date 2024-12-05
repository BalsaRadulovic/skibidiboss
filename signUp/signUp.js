let userField = document.querySelector("#korisnicko_ime");
let emailField = document.querySelector("#email");
let lozinkaField = document.querySelector("#lozinka");
let ponovljenaLozinkaField = document.querySelector("#ponovi_lozinku");
let registracijaDugme = document.querySelector("#registracija");
let ime_greska = document.querySelector("#ime_greska");
let email_greska = document.querySelector("#email_greska");
let sifra_greska = document.querySelector("#sifra_greska");
let pon_sifra_greska = document.querySelector("#ponovljena_sifra_greska");
let imeZauzeto = document.querySelector("#korisnickoImePostoji");
import {firebaseConfig,app,database,dobijPodatke,noviKorisnik,noviChat,novaPoruka,proveraLogin} from "../databasejs/database.js"

function provjeriFormu() {
    const usernamePattern = /^[a-z0-9]{3,10}$/;
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const passPattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let user=userField.value;
    let email=emailField.value;
    let password=lozinkaField.value;
    let ponovljenPassword=ponovljenaLozinkaField.value;
    let greska=false;
    if (!user.match(usernamePattern)) {
        ime_greska.classList.add("greska");
        greska=true;
    } else {ime_greska.classList.remove("greska");}
    if (!email.match(emailPattern)) {
        email_greska.classList.add("greska");
        greska=true;
    } else {email_greska.classList.remove("greska");}
    if (!password.match(passPattern)) {
        sifra_greska.classList.add("greska");
        greska=true;
    } else {sifra_greska.classList.remove("greska");}
    if (ponovljenPassword !== password) {
        pon_sifra_greska.classList.add("greska");
        greska=true;
    } else {pon_sifra_greska.classList.remove("greska");}
    if (greska) {return false;}
    if (!noviKorisnik(user,password,email)) {
        imeZauzeto.classList.add("greska")
        return false
    }

    return true
}

registracijaDugme.addEventListener("click", (e) => {
    if (provjeriFormu()) {
        window.location.href = '../logIn/logIn.html'
    }
});
