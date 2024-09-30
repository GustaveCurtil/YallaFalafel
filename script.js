let dagWeergave = document.querySelector('#dag');
let zomerdagenWeergave = document.querySelector('#zomerdagen');
let geldWeergave = document.querySelector('#geld');
let reputatieWeergave = document.querySelector('#reputatie');
let falafelsWeergave = document.querySelector('#falafels');
let locatieWeergave = document.querySelector('#locatie');

let dag;
let zomerdagen;
let geld;
let reputatie;
let falafels;
let locatie;

let spel;
let score;
let klanten;

function startSpel() {
    dag = 0;
    zomerdagen = 10;
    geld = 10;
    reputatie = 100;
    falafels = 0;
    locatie = 'Baudelo'

    spel = true;
    score = 0;
    klanten = 10;

    weergaveUpdaten()
}

let locaties = document.querySelectorAll('#locaties button');
console.log(locaties)

function weergaveUpdaten() {
        dagWeergave.innerHTML = dag;
        zomerdagenWeergave.innerHTML = zomerdagen;
        geldWeergave.innerHTML = geld;
        reputatieWeergave.innerHTML = reputatie;
        falafelsWeergave.innerHTML = falafels;
        locatieWeergave.innerHTML = locatie + ": " + klanten + " klanten + " + (reputatie - 100) + "% = " + klanten + ")";

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
        if (geld > 0) {
            falafels += 1;
            geld -= 1;
        } else {
            console.log('shit, geen geld genoeg')
        }

        weergaveUpdaten();
    }
}

function kiesLocatie(naam) {
    if (spel) {

        locatie = naam;
        if (naam === 'Baudelo') {
            klanten = Math.floor(10 * (reputatie / 100));
        } else if (naam === 'De Kouter') {
            klanten = Math.floor(20 * (reputatie / 100));
        } else {
            console.log('error met locatie kiezen');
        }

        weergaveUpdaten();
    }
}

function startDag() {
    if (spel) {
        dag += 1;
        console.log('aantal klanten: ' + klanten)
        
        if (falafels >= klanten) {
            console.log('genoeg falafel voor iedereen');
            falafels -= klanten;
            geld += klanten * 2;
            reputatie += Math.floor(klanten / 10);
            score += klanten;
        } else {
            let teleurgestelden = klanten - falafels;
            geld += falafels * 2;
            falafels = 0;
            reputatie -= Math.floor(teleurgestelden / 4);
            score += falafels;
        }
    
        checkGameStatus();
        weergaveUpdaten();
    } else {
        console.log('STOP!')
    }
}

function checkGameStatus() {
    if (dag === zomerdagen) {
        spel = false;
        console.log('YOU WIN: je hebt ' + zomerdagen + ' zomerdagen overleefd met een score van ' + score + ' verkochte falafels!');
    } else if (reputatie < 0) {
        console.log('GAME OVER: geen reputatie');
        spel = false;
    } else if (geld === 0 && falafels === 0) {
        console.log('GAME OVER: geen geld en falafels makker');
        spel = false;
    } 


}