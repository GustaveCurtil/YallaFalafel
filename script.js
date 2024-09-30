let boodschapWeergave = document.querySelector('aside');

let dagWeergave = document.querySelector('#dag');
let zomerdagenWeergave = document.querySelector('#zomerdagen');
let geldWeergave = document.querySelector('#geld');
let reputatieWeergave = document.querySelector('#reputatie');
let falafelsWeergave = document.querySelector('#falafels');
let locatieWeergave = document.querySelector('#locatie');
let aankoopprijsWeergave = document.querySelector('#aankoopprijs');
let verkoopprijsWeergave = document.querySelector('#verkoopprijs');

let dag;
let zomerdagen;
let geld;
let reputatie;
let falafels;
let locatie;

let spel;
let score;
let bewoners;
let klanten;
let boodschap;

let aankoopprijs;
let verkoopprijs;

function startSpel() {
    dag = 0;
    zomerdagen = 10;
    geld = 40;
    reputatie = 100;
    falafels = 0;
    locatie = 'Baudelo';

    spel = true;
    score = 0;
    bewoners = 10;
    klanten = 10;
    boodschap = "Welkom Ibrahim!"

    aankoopprijs = 4;
    verkoopprijs = 5;

    weergaveUpdaten()
}

let locaties = document.querySelectorAll('#locaties button');
console.log(locaties)

function weergaveUpdaten() {
    boodschapWeergave.innerHTML = boodschap
    dagWeergave.innerHTML = dag;
    zomerdagenWeergave.innerHTML = zomerdagen;
    geldWeergave.innerHTML = geld;
    reputatieWeergave.innerHTML = reputatie;
    falafelsWeergave.innerHTML = falafels;
    locatieWeergave.innerHTML = locatie + ": " + bewoners + " klanten + " + (reputatie - 100) + "% = " + klanten;
    aankoopprijsWeergave.innerHTML = aankoopprijs;
    verkoopprijsWeergave.innerHTML = verkoopprijs;

    locaties.forEach(locatieKnop => {
        if (locatieKnop.innerHTML == locatie) {
            locatieKnop.classList.add("actief");
        } else {
            locatieKnop.classList.remove("actief");
        }
    });
}


function koopFalafel() {
    if (spel) {
        if (geld >= aankoopprijs) {
            falafels += Math.floor(geld / aankoopprijs);
            geld = geld % aankoopprijs;
        } else {
            boodschap = "shit, geen geld genoeg";
        }

        weergaveUpdaten();
    }
}

function kiesLocatie(naam) {
    if (spel) {
        locatie = naam;
        if (naam === 'Baudelo') {
            bewoners = 10;
        } else if (naam === 'De Kouter') {
            bewoners = 20;
        } else {
            boodschap = 'error met locatie kiezen';
        }

        klanten = Math.floor((bewoners * reputatie) / 100);

        weergaveUpdaten();
    }
}

function startDag() {
    if (spel) {
        dag += 1;
        let teleurgestelden = 0;
        let omzet = 0;
        
        if (falafels >= klanten) {
            console.log('genoeg falafel voor iedereen');
            falafels -= klanten;
            omzet = klanten * verkoopprijs;
            reputatie += Math.floor(klanten / 10);
            score += klanten;
        } else {
            teleurgestelden = klanten - falafels;
            omzet = falafels * verkoopprijs;
            falafels = 0;
            reputatie -= Math.floor(teleurgestelden / 4);
            score += falafels;
        }

        geld += omzet;

        boodschap = "DAG " + dag + ": Je hebt " + (klanten - teleurgestelden) + " klanten bediend (omzet: " + omzet + " geld)";

        kiesLocatie(locatie); 
        checkGameStatus();
        weergaveUpdaten();
    } else {
        console.log('STOP!')
    }
}

function checkGameStatus() {
    if (dag === zomerdagen) {
        spel = false;
        boodschap = 'Je hebt ' + zomerdagen + ' zomerdagen overleefd met een score van ' + score + ' verkochte falafels!';
    } else if (reputatie < 0) {
        boodschap = 'GAME OVER: geen reputatie = geen klanten';
        spel = false;
    } else if (geld === 0 && falafels === 0) {
        boodschap = 'GAME OVER: geen geld en falafels makker';
        spel = false;
    } 


}