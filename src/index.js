const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User');
const ParkFind = require('./models/ParkFind');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const parking1 = {
    "id": "IPB-PARKING-ESTIG",
    "type": "ParkingGroup",
    "category": ["offstreet", "adjacentSpaces", "onlyWithPermit"],
    "allowedVehicleType": "bike",                                    // Especifica o TIPO de veículo que pode estacionar nesse grupo
    "chargeType": ["free"],                                         // Especifica o PREÇO do estacionamento para as vagas desse local                                                  
    "refParkingSite": "IPB-PARKING",                                 // Especifica a qual LOCAL pertence esse Parking Group
                                                                    // Parking site to which this zone belongs to. A group cannot be orphan. A group cannot have subgroups.                         
    "description": "Two parking spots reserved for disabled people",
    "totalSpotNumber": 5,
    "availableSpotNumber": 5,
    "location": {
        "type": "Polygon",
        "coordinates": [
            [
                [-3.80356167695194, 43.46296641666926],
                [-3.803161973253841, 43.46301091092682],
                [-3.803147082548618, 43.462879859445884],
                [-3.803536474744068, 43.462838666196674],
                [-3.80356167695194, 43.46296641666926]
            ]
        ]
    },
    "requiredPermit": "disabledPermit",
    "permitActiveHours": "" /* Always permit is needed */
}

const parking1_spots = [
    {
        "id": "IPB-PARKING-ESTIG-SPOT1",
        "type": "ParkingSpot",
        "name": "SPOT1",
        "location": {
            "type": "Point",
            "coordinates": [-3.80356167695194, 43.46296641666926]
        },
        "status": "free",                                           // Variavel que mostra se o spot está ou não ocupado
        "category": ["offstreet"],
        "refParkingSite": "IPB-PARKING",                            // "value": "BLOCO-C-BIKE-1"
        "refParkingGroup": "IPB-PARKING-ESTIG",
    },
    {
        "id": "IPB-PARKING-ESTIG-SPOT2",
        "type": "ParkingSpot",
        "name": "SPOT2",
        "location": {
            "type": "Point",
            "coordinates": [-3.80356167695194, 43.46296641666926]
        },
        "status": "free",                                           // Variavel que mostra se o spot está ou não ocupado
        "category": ["offstreet"],
        "refParkingSite": "IPB-PARKING",                            // "value": "BLOCO-C-BIKE-1"
        "refParkingGroup": "IPB-PARKING-ESTIG",
    },
    {
        "id": "IPB-PARKING-ESTIG-SPOT3",
        "type": "ParkingSpot",
        "name": "SPOT3",
        "location": {
            "type": "Point",
            "coordinates": [-3.80356167695194, 43.46296641666926]
        },
        "status": "free",                                           // Variavel que mostra se o spot está ou não ocupado
        "category": ["offstreet"],
        "refParkingSite": "IPB-PARKING",                            // "value": "BLOCO-C-BIKE-1"
        "refParkingGroup": "IPB-PARKING-ESTIG",
    },
    {
        "id": "IPB-PARKING-ESTIG-SPOT4",
        "type": "ParkingSpot",
        "name": "SPOT4",
        "location": {
            "type": "Point",
            "coordinates": [-3.80356167695194, 43.46296641666926]
        },
        "status": "free",                                           // Variavel que mostra se o spot está ou não ocupado
        "category": ["offstreet"],
        "refParkingSite": "IPB-PARKING",                            // "value": "BLOCO-C-BIKE-1"
        "refParkingGroup": "IPB-PARKING-ESTIG",
    },
    {
        "id": "IPB-PARKING-ESTIG-SPOT5",
        "type": "ParkingSpot",
        "name": "SPOT5",
        "location": {
            "type": "Point",
            "coordinates": [-3.80356167695194, 43.46296641666926]
        },
        "status": "free",                                           // Variavel que mostra se o spot está ou não ocupado
        "category": ["offstreet"],
        "refParkingSite": "IPB-PARKING",                            // "value": "BLOCO-C-BIKE-1"
        "refParkingGroup": "IPB-PARKING-ESTIG",
    }
]

const parking2 = {
    "id": "IPB-PARKING-EDUCACAO",
    "type": "ParkingGroup",
    "category": ["offstreet", "adjacentSpaces", "onlyWithPermit"],
    "allowedVehicleType": "bike",                                    // Especifica o TIPO de veículo que pode estacionar nesse grupo
    "chargeType": ["free"],                                         // Especifica o PREÇO do estacionamento para as vagas desse local                                                  
    "refParkingSite": {                                             // Especifica a qual LOCAL pertence esse Parking Group
        "type": "Relationship",                                     // Parking site to which this zone belongs to. A group cannot be orphan. A group cannot have subgroups.
        "value": "IPB-PARKING"               
    },                         
    "description": "Two parking spots reserved for disabled people",
    "totalSpotNumber": 8,
    "availableSpotNumber": 8,
    "location": {
        "type": "Polygon",
        "coordinates": [
            [
                [-3.80356167695194, 43.46296641666926],
                [-3.803161973253841, 43.46301091092682],
                [-3.803147082548618, 43.462879859445884],
                [-3.803536474744068, 43.462838666196674],
                [-3.80356167695194, 43.46296641666926],
                [-3.803536474744068, 43.462838666196674],
                [-3.80356167695194, 43.46296641666926],
                [-3.80356167695194, 43.46296641666926],
            ]
        ]
    },
    "requiredPermit": "disabledPermit",
    "permitActiveHours": "" /* Always permit is needed */
}

const parking2_spots = [
    {
        "id": "IPB-PARKING-EDUCACAO-SPOT1",
        "type": "ParkingSpot",
        "name": "SPOT1",
        "location": {
            "type": "Point",
            "coordinates": [-3.80356167695194, 43.46296641666926]
        },
        "status": "free",                                           // Variavel que mostra se o spot está ou não ocupado
        "category": ["offstreet"],
        "refParkingSite": "IPB-PARKING",                            // "value": "BLOCO-C-BIKE-1"
        "refParkingGroup": "IPB-PARKING-EDUCACAO",
    },
    {
        "id": "IPB-PARKING-EDUCACAO-SPOT2",
        "type": "ParkingSpot",
        "name": "SPOT2",
        "location": {
            "type": "Point",
            "coordinates": [-3.80356167695194, 43.46296641666926]
        },
        "status": "free",                                           // Variavel que mostra se o spot está ou não ocupado
        "category": ["offstreet"],
        "refParkingSite": "IPB-PARKING",                            // "value": "BLOCO-C-BIKE-1"
        "refParkingGroup": "IPB-PARKING-EDUCACAO",
    },
    {
        "id": "IPB-PARKING-EDUCACAO-SPOT3",
        "type": "ParkingSpot",
        "name": "SPOT3",
        "location": {
            "type": "Point",
            "coordinates": [-3.80356167695194, 43.46296641666926]
        },
        "status": "free",                                           // Variavel que mostra se o spot está ou não ocupado
        "category": ["offstreet"],
        "refParkingSite": "IPB-PARKING",                            // "value": "BLOCO-C-BIKE-1"
        "refParkingGroup": "IPB-PARKING-EDUCACAO",
    },
    {
        "id": "IPB-PARKING-EDUCACAO-SPOT4",
        "type": "ParkingSpot",
        "name": "SPOT4",
        "location": {
            "type": "Point",
            "coordinates": [-3.80356167695194, 43.46296641666926]
        },
        "status": "free",                                           // Variavel que mostra se o spot está ou não ocupado
        "category": ["offstreet"],
        "refParkingSite": "IPB-PARKING",                            // "value": "BLOCO-C-BIKE-1"
        "refParkingGroup": "IPB-PARKING-EDUCACAO",
    },
    {
        "id": "IPB-PARKING-EDUCACAO-SPOT5",
        "type": "ParkingSpot",
        "name": "SPOT5",
        "location": {
            "type": "Point",
            "coordinates": [-3.80356167695194, 43.46296641666926]
        },
        "status": "free",                                           // Variavel que mostra se o spot está ou não ocupado
        "category": ["offstreet"],
        "refParkingSite": "IPB-PARKING",                            // "value": "BLOCO-C-BIKE-1"
        "refParkingGroup": "IPB-PARKING-EDUCACAO",
    },
    {
        "id": "IPB-PARKING-EDUCACAO-SPOT6",
        "type": "ParkingSpot",
        "name": "SPOT6",
        "location": {
            "type": "Point",
            "coordinates": [-3.80356167695194, 43.46296641666926]
        },
        "status": "free",                                           // Variavel que mostra se o spot está ou não ocupado
        "category": ["offstreet"],
        "refParkingSite": "IPB-PARKING",                            // "value": "BLOCO-C-BIKE-1"
        "refParkingGroup": "IPB-PARKING-EDUCACAO",
    },
    {
        "id": "IPB-PARKING-EDUCACAO-SPOT7",
        "type": "ParkingSpot",
        "name": "SPOT7",
        "location": {
            "type": "Point",
            "coordinates": [-3.80356167695194, 43.46296641666926]
        },
        "status": "free",                                           // Variavel que mostra se o spot está ou não ocupado
        "category": ["offstreet"],
        "refParkingSite": "IPB-PARKING",                            // "value": "BLOCO-C-BIKE-1"
        "refParkingGroup": "IPB-PARKING-EDUCACAO",
    },
    {
        "id": "IPB-PARKING-EDUCACAO-SPOT8",
        "type": "ParkingSpot",
        "name": "SPOT8",
        "location": {
            "type": "Point",
            "coordinates": [-3.80356167695194, 43.46296641666926]
        },
        "status": "free",                                           // Variavel que mostra se o spot está ou não ocupado
        "category": ["offstreet"],
        "refParkingSite": "IPB-PARKING",                            // "value": "BLOCO-C-BIKE-1"
        "refParkingGroup": "IPB-PARKING-EDUCACAO",
    },
]

const currentSystem = [];

let currentTime = new Date();
let stopTime =  new Date();
stopTime.setDate(currentTime.getDate()+1);

main();
//deleteAll();

app.listen(3333);

// ---------------------------------------------

async function main() {
    while(currentTime < stopTime) {
        await randomParkFind();

        let incrementTime = getRandomNumber(30,90);
        currentTime.setMinutes(currentTime.getMinutes()+incrementTime);

        console.log("Acao Concluida");
    }
    console.log("Finalizou Main");
}

function getRandomNumber(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

async function getRandomUser(randomId) {
    return await User.findOne({ id: randomId });
}

// Gera requisições de parkFind
async function randomParkFind() {
    // Obtem de 0 a 10 usuarios
    users_number = getRandomNumber(0,3);

    console.log("Chegou aqui 0")

    for(let i=0; i<users_number; i++) {
        // Obtem usuario
        let user = await getRandomUser(getRandomNumber(0,99));

        // Obtem numero de horas de parking
        let parkTime = getRandomNumber(1,3);

        console.log("Chegou aqui");

        isParkingNow = true;
        // Verifica se usuario nao esta com parking ativo atualmente
        while( isParkingNow ) {
            let exists = false;
            
            currentSystem.map(current => {
                if (current.userId == user.id) {
                    exists = true;
                }
            });

            if (!exists) {
                isParkingNow = false;
            } else {
                user = await getRandomUser(getRandomNumber(0,99));
            }
        }
        console.log("Realiza o ParkFind");
        // Realiza o parkFind do usuario
        let auxTimeEnter = new Date(currentTime.valueOf());
        let auxTimeExit = new Date(currentTime.valueOf());

        await ParkFind.create({ 
            enterDate: auxTimeEnter, 
            exitDate: auxTimeExit.setHours(auxTimeExit.getHours()+parkTime),
            refParkingSite: "IPB-PARKING"
        });
    }
    return true;
}

function deleteAll() {
    ParkFind.deleteMany({}, function(err) { 
        console.log('collection removed') 
     });
}