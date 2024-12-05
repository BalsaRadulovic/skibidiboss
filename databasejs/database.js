////////////////////////////////////////////////////////////////////////////////////////////
export const firebaseConfig = {                                                                  //
    apiKey: "AIzaSyCuFUq9L026A1EptIzpIE21Ptl7DsYz5fo",                                    //
    authDomain: "sigmaboss-226b5.firebaseapp.com",                                        //
    projectId: "sigmaboss-226b5",                                                         //
    storageBucket: "sigmaboss-226b5.firebasestorage.app",                                 //
    messagingSenderId: "921640413660",                                                    //
    appId: "1:921640413660:web:2b87c9ae0740bf34d7c719",                                   //
    databaseURL: "https://sigmaboss-226b5-default-rtdb.europe-west1.firebasedatabase.app" //
};                                                                                        //
export const app = firebase.initializeApp(firebaseConfig);                                       //
export const database = firebase.database();                                                     //
                                                                                          //
/*ovde ide config za bazu podataka koju cemo koristiti*/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
//Object.keys(obj).length za broj propertija u objektu
//LOCAL STORAGE ZA IME I CURRENT CHAT, PROVERITI DA LI JE MOGUC BREACH I AKO JESTE, NAPRAVITI PREVENCIJU
export async function dobijPodatke(lokacija) {
    const temp=await database.ref(lokacija).get()
    .then(snapshot => {
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return {};
    }
  })
  .catch(error => {
    console.error(error);
  });
    return temp;
}
export async function noviKorisnik(username,password,email) { 
    const nalozi=Object.values(await dobijPodatke("korisnici"))
    const length=Object.keys(nalozi).length
    let imeZauzeto=false;
    for (let i=0;i<length;i++) {
        if (nalozi[i].user==username) {imeZauzeto=true;}
    }
    if (!imeZauzeto) {
        const korisnik = {
            user:username,
            password:password,
            email:email,
            ID:length+1,
            chatovi:[]
        }
        database.ref('korisnici/'+(length+1)).update(korisnik);
        return true;
    } else {return false;}
    
}
export async function noviChat(ucesnici,naziv) {
    const chatovi=await dobijPodatke("chatovi") //ne znam da li ovo omogucava breach
    const brChatova=Object.keys(chatovi).length
        const chat= {
            naziv:naziv,
            ID:brChatova+1,
            ucesnici:ucesnici,
            brojPoruka:0,
            poruke:[]
        }
    const broj=brChatova+1;
    database.ref("chatovi/"+broj).update(chat);
    const korisnici=Object.values(await dobijPodatke("korisnici"))
    for (let i=0;i<korisnici.length;i++) {
        for (let j=0;j<ucesnici.length;j++) {
            if (ucesnici[j]==korisnici[i].user) {
                const konkretanKorisnik=korisnici[i];
                database.ref("korisnici/"+konkretanKorisnik).update({[konkretanKorisnik.chatovi.length+1]:ID})
            }
        }
    }
}
export async function novaPoruka(sadrzaj,sender,openChat) {
    const poruka= {
        sadrzaj:sadrzaj,
        sender:sender
    }
    const chat=await dobijPodatke("chatovi/"+openChat)
    let brPor;
    if (chat.brojPoruka==null) {brPor=0;} else {brPor=chat.brojPoruka}
    database.ref("chatovi/"+openChat+"/poruke").update({[brPor]:poruka})
    database.ref("chatovi/"+openChat).update({brojPoruka:brPor+1})
}
export async function proveraLogin(user,pass) {
    const nalozi=Object.values(await dobijPodatke("korisnici")) //ne znam da li ovo omogucava breach
    const length=Object.keys(nalozi).length
    for (let i=0;i<length;i++) {
        if (nalozi[i].user==user && nalozi[i].password==pass) {return true;}
    }
    return false;
}
