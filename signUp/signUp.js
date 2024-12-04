let ime = document.querySelector("#korisnicko_ime");
let email = document.querySelector("#email");
let lozinka = document.querySelector("#lozinka");
let ponovljenaLozinka = document.querySelector("#ponovi_lozinku");
let registracijaDugme = document.querySelector("#registracija");
let ime_greska = document.querySelector("#ime_greska");
let email_greska = document.querySelector("#email_greska");
let sifra_greska = document.querySelector("#sifra_greska");
let pon_sifra_greska = document.querySelector("#ponovljena_sifra_greska");

function provjeriFormu() {
    const usernamePattern = /^(?=.*[a-z]{2,3}$)/;
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const passPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!ime.value.match(usernamePattern)) {
        ime_greska.classList.add("greska");
    }
    if (!email.value.match(emailPattern)) {
        email_greska.classList.add("greska");
    }
    if (!lozinka.value.match(passPattern)) {
        sifra_greska.classList.add("greska");
    }
    if (ponovljenaLozinka.value !== lozinka.value) {
        pon_sifra_greska.classList.add("greska");
    }
    if (ime.value.match(usernamePattern)) {
        ime_greska.classList.remove("greska");
    }
    if (email.value.match(emailPattern)) {
        email_greska.classList.remove("greska");
    }
    if (lozinka.value.match(passPattern)) {
        sifra_greska.classList.remove("greska");
    }
    if (ponovljenaLozinka.value === lozinka.value) {
        pon_sifra_greska.classList.remove("greska");
    }
}

registracijaDugme.addEventListener("click", (e) => {
    provjeriFormu();
});
