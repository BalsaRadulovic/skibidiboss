import {firebaseConfig,app,database,dobijPodatke,noviKorisnik,noviChat,novaPoruka,proveraLogin} from "../databasejs/database.js"
//////////////////////////////////////////////////////////// slanje poruka u bazu podataka
let dugme=document.querySelector("#dugme")
let unos=document.querySelector("#input")
const iframe = document.getElementById('ekran');
let ekranMali;
let iframeDoc;
iframe.onload = function() {
    iframeDoc=iframe.contentWindow.document
    ekranMali=iframe.contentWindow.document.body
};
let trenutnaVisina=0;
let brojUcitanihPoruka=0;
let openChat=1;//treba local storage
let sender=localStorage.getItem('ime')


let poslednjaPorukaID;
const intervalPoruka=20;
let ukupanBrojPoruka;
dugme.addEventListener("click",async () => {
    if (unos.value!="" && sender!="") {
        await novaPoruka(unos.value,sender,openChat)
        await reload(0)
        iframe.contentWindow.scrollTo(0,ekranMali.scrollHeight)
    }
})

function removeSve() {
    const elementsToDelete = iframeDoc.querySelectorAll('.poruka');
    elementsToDelete.forEach(element => {
        element.remove();
    });
}
async function reload(uslov) {
    const poruke=await dobijPodatke("chatovi/"+openChat+"/poruke")//poruke iz tog chata u arrayu
    ukupanBrojPoruka=Object.keys(poruke).length
    poslednjaPorukaID=ukupanBrojPoruka-1;
    let daLiMozeNastaviti=true;
    let start=0;
    for (let i=ukupanBrojPoruka-1;daLiMozeNastaviti;i--) {
        daLiMozeNastaviti=i-1>=0 && (i-1>=ukupanBrojPoruka-brojUcitanihPoruka-intervalPoruka-1 || poruke[i]==poruke[i-1]);
        start=i;
    }
    removeSve()
    for (let i=start;i<ukupanBrojPoruka;i++) {
      const celaPoruka=document.createElement("div");
      const textPoruke=document.createElement("div"); textPoruke.textContent=poruke[i].sadrzaj; textPoruke.classList.add("textporuke");
      const imeSendera=document.createElement("div"); imeSendera.textContent=poruke[i].sender; imeSendera.classList.add("sender");
      if (i==start || poruke[i].sender!=poruke[i-1].sender) {celaPoruka.appendChild(imeSendera)}
      celaPoruka.appendChild(textPoruke); celaPoruka.classList.add("poruka")
      ekranMali.appendChild(celaPoruka);
    }
    iframe.contentWindow.scrollTo(0, ekranMali.scrollHeight-trenutnaVisina*uslov)
    trenutnaVisina=ekranMali.scrollHeight;
    brojUcitanihPoruka=ukupanBrojPoruka-start;
}
async function uslovnoGenerisanje() {
    const poruke=await dobijPodatke("chatovi/"+openChat+"/poruke")//poruke iz tog chata u arrayu
    let novPoslednjiID=Object.keys(poruke).length-1
    if (poslednjaPorukaID<novPoslednjiID) {reload(0)} else
    if ((brojUcitanihPoruka<ukupanBrojPoruka && iframeDoc.documentElement.scrollTop==0)) {reload(1)}
}
await reload(1);
setInterval(uslovnoGenerisanje,1000)