const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User');
const ParkFind = require('./models/ParkFind');
const ParkRequest = require('./models/ParkRequest');
const Parking = require('./models/Parking');

const app = express();

const perHourPrice = 2; // Per Hour

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

const parking3 = {
    "id": "IPB-PARKING-CANTINA",
    "type": "ParkingGroup",
    "category": ["offstreet", "adjacentSpaces", "onlyWithPermit"],
    "allowedVehicleType": "bike",                                    // Especifica o TIPO de veículo que pode estacionar nesse grupo
    "chargeType": ["free"],                                         // Especifica o PREÇO do estacionamento para as vagas desse local                                                  
    "refParkingSite": "IPB-PARKING",                                 // Especifica a qual LOCAL pertence esse Parking Group
                                                                    // Parking site to which this zone belongs to. A group cannot be orphan. A group cannot have subgroups.                         
    "description": "Two parking spots reserved for disabled people",
    "totalSpotNumber": 3,
    "availableSpotNumber": 3,
    "location": {
        "type": "Polygon",
        "coordinates": [
            [
                [-3.80356167695194, 43.46296641666926],
                [-3.803161973253841, 43.46301091092682],
                [-3.803147082548618, 43.462879859445884],
            ]
        ]
    },
    "requiredPermit": "disabledPermit",
    "permitActiveHours": "" /* Always permit is needed */
}

const parking3_spots = [
    {
        "id": "IPB-PARKING-CANTINA-SPOT1",
        "type": "ParkingSpot",
        "name": "SPOT1",
        "location": {
            "type": "Point",
            "coordinates": [-3.80356167695194, 43.46296641666926]
        },
        "status": "free",                                           // Variavel que mostra se o spot está ou não ocupado
        "category": ["offstreet"],
        "refParkingSite": "IPB-PARKING",                            // "value": "BLOCO-C-BIKE-1"
        "refParkingGroup": "IPB-PARKING-CANTINA",
    },
    {
        "id": "IPB-PARKING-CANTINA-SPOT2",
        "type": "ParkingSpot",
        "name": "SPOT2",
        "location": {
            "type": "Point",
            "coordinates": [-3.80356167695194, 43.46296641666926]
        },
        "status": "free",                                           // Variavel que mostra se o spot está ou não ocupado
        "category": ["offstreet"],
        "refParkingSite": "IPB-PARKING",                            // "value": "BLOCO-C-BIKE-1"
        "refParkingGroup": "IPB-PARKING-CANTINA",
    },
    {
        "id": "IPB-PARKING-CANTINA-SPOT3",
        "type": "ParkingSpot",
        "name": "SPOT3",
        "location": {
            "type": "Point",
            "coordinates": [-3.80356167695194, 43.46296641666926]
        },
        "status": "free",                                           // Variavel que mostra se o spot está ou não ocupado
        "category": ["offstreet"],
        "refParkingSite": "IPB-PARKING",                            // "value": "BLOCO-C-BIKE-1"
        "refParkingGroup": "IPB-PARKING-CANTINA",
    },
]

var currentParking = [];

let currentTime = new Date();
let stopTime =  new Date();
stopTime.setDate(currentTime.getDate()+10);
//stopTime.setHours(currentTime.getDate()+8);

//deleteAll();
main();
//query();

app.listen(3333);

// ---------------------------------------------

async function query() {
    const list = await Parking.find({ refParkingSpot: "IPB-PARKING-ESTIG-SPOT1"},{ _id:0, enterDate:1 ,exitDate: 1 });
    console.log(list);
}

async function main() {
    let max = 0;

    while(currentTime < stopTime) {
        await randomParkFind();

        let incrementTime = getRandomNumber(5,70);
        currentTime.setMinutes(currentTime.getMinutes()+incrementTime);

        /*let total = 0;
        currentParking.map( (park) => {
            let inside_total = 0;
            currentParking.map( (park2) => {
                if (park.refParkingSpot == park2.refParkingSpot) {
                    inside_total += 1;
                }
            });
            if (inside_total > 1) {
               total = 1;
            }
        });

        if (total == 1) {
            console.log("\n ERRO GROSSEIRO: \n",currentParking);
        }*/
        //console.log("\n\n*** ANTES\n");
        //console.log(currentParking);
        //console.log("\n**** ",currentTime);

        // Remove da lista atual todos parking cujo horario de saida foi ultrapassado
        currentParking = currentParking.filter( (park) => { 
            if (park.exitDate.getTime() > currentTime.getTime() ) {
                //console.log("\nData de Saida maior que data Atual: ",park.exitDate," => ",currentTime,"\n");
                //console.log(park.exitDate);
                //console.log(currentTime);
            }
            return park.exitDate.getTime() > currentTime.getTime();
        });

        if (currentParking.length == 16) {
            console.log("Cheio");
        } else {
            console.log("Vago");
        }

        if (currentParking.length > max) {
            max = currentParking.length;
        }

        //console.log("\n\n*** APOS\n");
        //console.log(currentParking);
        //console.log("\n**** "+currentTime);

        /*if (currentParking.length >= 10) {
            console.log("\nALERT:",currentParking.length,"\n");
            console.log("\n ***************** "+currentTime+" **************\n")
        }*/
    }
    console.log("Finalizou Main");
    console.log("Maximo de vagas simultaneamente: ",max);
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
    users_number = getRandomNumber(0,10);

    for(let i=0; i<users_number; i++) {
        // Obtem usuario
        let user = await getRandomUser(getRandomNumber(0,99));

        // Obtem numero de horas de parking
        let parkTime = getRandomNumber(1,3);
        let auxTimeEnter = new Date(currentTime.valueOf());
        let auxTimeExit = new Date(currentTime.valueOf());
        auxTimeExit.setHours(auxTimeExit.getHours()+parkTime);

        isParkingNow = true;
        // Verifica se usuario nao esta com parking ativo atualmente
        while( isParkingNow ) {
            let exists = false;
            
            currentParking.map(current => {
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

        // Realiza o parkFind do usuario
        await ParkFind.create({ 
            enterDate: auxTimeEnter, 
            exitDate: auxTimeExit,
            refParkingSite: "IPB-PARKING"
        });
        console.log("1. ParkFind");

        // Depois de realizar a busca o usuario tem uma chance de 30% de realizar um parking
        let parkChance = getRandomNumber(1,10);

        // Avaliabe Parking
        if(parkChance <= 3) {

            // Cria o Request
            await ParkRequest.create({
                userId: user.id,
                enterDate: auxTimeEnter, 
                exitDate: auxTimeExit,
                refParkingSite: "IPB-PARKING"
            });
            console.log("2. ParkRequest");

            let attemptNumber = 10;
            let reserved = false;

            /*
            while(attemptNumber > 0) {
                spotNumber = getRandomNumber(1,16);

                if(spotNumber <= 5) {
                    // ESTIG
                    for (const spot of parking1_spots) {
                        let isFree = true;
                        currentParking.map(park => {
                            if (park.refParkingSpot == spot.id) {
                                isFree = false;
                            }
                        });

                        if (isFree == true) {
                            // Realiza o parkFind do usuario
                            attemptNumber = 0;

                            // Cria o Parking
                            await Parking.create({
                                userId: user.id,
                                enterDate: auxTimeEnter,
                                exitDate: auxTimeExit,
                                refParkingSite: spot.refParkingSite,
                                refParkingGroup: spot.refParkingGroup,
                                refParkingSpot: spot.id,
                                price: perHourPrice*parkTime,
                            });

                            // Adiciona na lista de Parkings Atuais
                            currentParking.push({
                                userId: user.id,
                                enterDate: auxTimeEnter,
                                exitDate: auxTimeExit,
                                refParkingSpot: spot.id,
                            });

                            reserved = true;

                            console.log("3. Parking");

                            break;
                        }
                    }
                } else if (spotNumber <= 13) {
                    // EDUCACAO
                    for (const spot of parking2_spots) {
                        let isFree = true;
                        currentParking.map(park => {
                            if (park.refParkingSpot == spot.id) {
                                isFree = false;
                            }
                        });

                        if (isFree == true) {

                            attemptNumber = 0;

                            // Cria o Parking
                            await Parking.create({
                                userId: user.id,
                                enterDate: auxTimeEnter,
                                exitDate: auxTimeExit,
                                refParkingSite: spot.refParkingSite,
                                refParkingGroup: spot.refParkingGroup,
                                refParkingSpot: spot.id,
                                price: perHourPrice*parkTime,
                            });

                            // Adiciona na lista de Parkings Atuais
                            currentParking.push({
                                userId: user.id,
                                enterDate: auxTimeEnter,
                                exitDate: auxTimeExit,
                                refParkingSpot: spot.id,
                            });

                            reserved = true;
                            
                            console.log("3. Parking");

                            break;
                        }
                    }
                } else if (spotNumber <= 16) {
                    // CANTINA
                    for (const spot of parking3_spots) {
                        let isFree = true;
                        currentParking.map(park => {
                            if (park.refParkingSpot == spot.id) {
                                isFree = false;
                            }
                        });

                        if (isFree == true) {

                            attemptNumber = 0;

                            // Cria o Parking
                            await Parking.create({
                                userId: user.id,
                                enterDate: auxTimeEnter,
                                exitDate: auxTimeExit,
                                refParkingSite: spot.refParkingSite,
                                refParkingGroup: spot.refParkingGroup,
                                refParkingSpot: spot.id,
                                price: perHourPrice*parkTime,
                            });

                            // Adiciona na lista de Parkings Atuais
                            currentParking.push({
                                userId: user.id,
                                enterDate: auxTimeEnter,
                                exitDate: auxTimeExit,
                                refParkingSpot: spot.id,
                            });

                            reserved = true;
                            
                            console.log("3. Parking");

                            break;
                        }
                    }
                }
                attemptNumber -= 1;
            }
            */

            if (reserved == false) {
                for (const spot of parking1_spots) {
                    let isFree = true;
                        currentParking.map(park => {
                            if (park.refParkingSpot == spot.id) {
                                isFree = false;
                            }
                        });

                    if (isFree == true) {

                        // Cria o Parking
                        await Parking.create({
                            userId: user.id,
                            enterDate: auxTimeEnter,
                            exitDate: auxTimeExit,
                            refParkingSite: spot.refParkingSite,
                            refParkingGroup: spot.refParkingGroup,
                            refParkingSpot: spot.id,
                            price: perHourPrice*parkTime,
                        });

                        // Adiciona na lista de Parkings Atuais
                        currentParking.push({
                            userId: user.id,
                            enterDate: auxTimeEnter,
                            exitDate: auxTimeExit,
                            refParkingSpot: spot.id,
                        });

                        reserved = true;

                        break;
                    }
                }
            }

            if (reserved == false) {
                for (const spot of parking2_spots) {
                    let isFree = true;
                        currentParking.map(park => {
                            if (park.refParkingSpot == spot.id) {
                                isFree = false;
                            }
                        });

                    if (isFree == true) {

                        // Cria o Parking
                        await Parking.create({
                            userId: user.id,
                            enterDate: auxTimeEnter,
                            exitDate: auxTimeExit,
                            refParkingSite: spot.refParkingSite,
                            refParkingGroup: spot.refParkingGroup,
                            refParkingSpot: spot.id,
                            price: perHourPrice*parkTime,
                        });

                        // Adiciona na lista de Parkings Atuais
                        currentParking.push({
                            userId: user.id,
                            enterDate: auxTimeEnter,
                            exitDate: auxTimeExit,
                            refParkingSpot: spot.id,
                        });

                        reserved = true;

                        break;
                    }
                }
            }

            if (reserved == false) {
                for (const spot of parking3_spots) {
                    let isFree = true;
                    currentParking.map(park => {
                        if (park.refParkingSpot == spot.id) {
                            isFree = false;
                        }
                    });

                    if (isFree == true) {

                        // Cria o Parking
                        await Parking.create({
                            userId: user.id,
                            enterDate: auxTimeEnter,
                            exitDate: auxTimeExit,
                            refParkingSite: spot.refParkingSite,
                            refParkingGroup: spot.refParkingGroup,
                            refParkingSpot: spot.id,
                            price: perHourPrice*parkTime,
                        });

                        // Adiciona na lista de Parkings Atuais
                        currentParking.push({
                            userId: user.id,
                            enterDate: auxTimeEnter,
                            exitDate: auxTimeExit,
                            refParkingSpot: spot.id,
                        });

                        reserved = true;

                        break;
                    }
                }
            }
        }

    }
    return true;
}

function deleteAll() {
    ParkFind.deleteMany({}, function(err) { 
        console.log('collection removed') 
     });

     ParkRequest.deleteMany({}, function(err) { 
        console.log('collection removed') 
     });

     Parking.deleteMany({}, function(err) { 
        console.log('collection removed') 
     });
}