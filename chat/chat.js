import {firebaseConfig,app,database,dobijPodatke,noviKorisnik,noviChat,novaPoruka,proveraLogin} from "../databasejs/database.js"
//////////////////////////////////////////////////////////// slanje poruka u bazu podataka
let dugme=document.querySelector("#dugme")
let unos=document.querySelector("#input")
const iframe = document.getElementById('ekran');//chat
const chatLista=document.getElementById('listaChatova')//lista chatova
let ekranMali;
let iframeDoc;
let chatListaDoc;
let chatListaEkran;
iframe.onload = function() {
    iframeDoc=iframe.contentWindow.document;
    ekranMali=iframe.contentWindow.document.body;
};

chatLista.onload = function() {
    chatListaDoc=chatLista.contentWindow.document;
    chatListaEkran=chatLista.contentWindow.document.body;
}
let trenutnaVisina=0;
let brojUcitanihPoruka=0;
let openChat=1;//treba local storage
let sender=localStorage.getItem('ime')

const chatovi=await dobijPodatke("chatovi")
for (let i=1;i<=Object.keys(chatovi).length;i++) {
    const konkretanChat=await dobijPodatke("chatovi/"+i)
    const ucesnici=await dobijPodatke("chatovi/"+i+"/ucesnici")
    let length;
    if (ucesnici.length==null) {
        length=0;
    } else {length=ucesnici.length;}
    for (let j=0;j<length;j++) {
        if (ucesnici[j]==sender) {generisiChat(konkretanChat.naziv,i)}
    }
}
function generisiChat (naziv, id) {
    const chatBubble=document.createElement("div");
    chatBubble.textContent=naziv;
    chatBubble.classList.add("p")
    chatBubble.id=id
    chatListaEkran.appendChild(chatBubble)
    chatBubble.addEventListener("click", () => {
        localStorage.setItem("openChat",chatBubble.id)
        openChat=chatBubble.id
        console.log(openChat)
        reload(0);
    })
}


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
      const textPoruke=document.createElement("div"); textPoruke.textContent=poruke[i].sadrzaj;
      if (poruke[i].sender==sender) {textPoruke.classList.add("textporukeposlate");} else {textPoruke.classList.add("textporukeprimljene");}
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
window.onload = async function() {
    console.log("refresh treba da radi")
    await reload(1);
    setInterval(uslovnoGenerisanje,1000)
}
