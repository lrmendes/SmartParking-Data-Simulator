const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User');
const ParkFind = require('./models/ParkFind');
const ParkRequest = require('./models/ParkRequest');
const Parking = require('./models/Parking');
const fs = require('fs');

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
stopTime.setDate(currentTime.getDate()+30);

//deleteAll();    // Delete Database
//main();         // Create 30 Days Database simulation

query1();   // Generate CSV1: Total Parking Ever
query2(30); // Generate CSV2: Days range
query3(24); // Generate CSV3: Hours range

app.listen(3333);

// ---------------------------------------------

async function query1() {
    let query ="ParkGroup,Total Parkings\n";
    await Parking.count({ refParkingGroup: "IPB-PARKING-ESTIG" }, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          query += "IPB-PARKING-ESTIG,"+result.toString()+"\n";
        }
      });
    await Parking.count({ refParkingGroup: "IPB-PARKING-EDUCACAO" }, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          query += "IPB-PARKING-EDUCACAO,"+result.toString()+"\n";
        }
      });
    await Parking.count({ refParkingGroup: "IPB-PARKING-CANTINA" }, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          query += "IPB-PARKING-CANTINA,"+result.toString()+"\n";
        }
      });

    fs.writeFileSync('src/csv/query1.csv', query);
    return console.log("Query1 - Finalizada");
 }

 async function query2(days) {
    let baseTime = new Date();
    baseTime.setHours(1);
    baseTime.setMinutes(0);
    baseTime.setSeconds(0);
    let lastTime = new Date();
    lastTime.setHours(24);
    lastTime.setMinutes(59);
    lastTime.setSeconds(59);

    console.log(baseTime);
    console.log(lastTime);

    let query ="Data,Total Parkings\n";
    for (let i=1; i<=days; i++) {
        await Parking.count({ enterDate: { $gte: baseTime, $lte: lastTime } }, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                query += baseTime.getDate()+"/"+baseTime.getMonth()+"/"+baseTime.getFullYear()+","+result.toString()+"\n";
            }
        });
        baseTime.setDate(baseTime.getDate()+1);
        lastTime.setDate(lastTime.getDate()+1);
    }

    fs.writeFileSync('src/csv/query2.csv', query);
    return console.log("Query2 - Finalizada");
 }

 async function query3(hours) {
    let baseTime = new Date();
    let lastTime = new Date();

    baseTime.setDate(baseTime.getDate()+6);
    lastTime.setDate(lastTime.getDate()+6);

    baseTime.setHours(0);
    lastTime.setHours(1);
    baseTime.setMinutes(0);
    baseTime.setSeconds(0);
    lastTime.setMinutes(0);
    lastTime.setSeconds(0);

    let query ="Hour,Total Parkings (30/05/2020)\n";
    for (let i=1; i<=hours; i++) {
        await Parking.count({ enterDate: { $gte: baseTime, $lte: lastTime } }, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                query += baseTime.getHours()+":"+baseTime.getMinutes()+","+result.toString()+"\n";
            }
        });
        baseTime.setHours(baseTime.getHours()+1);
        lastTime.setHours(lastTime.getHours()+1);
    }

    fs.writeFileSync('src/csv/query3.csv', query);
    return console.log("Query3 - Finalizada");
 }

 // Maior Taxa de preenchimento simultaneo diario
 async function query4(hours) {

 }

async function main() {
    let max = 0;

    while(currentTime < stopTime) {
        await randomParkFind();

        let incrementTime = getRandomNumber(5,70);
        currentTime.setMinutes(currentTime.getMinutes()+incrementTime);

        // Remove da lista atual todos parking cujo horario de saida foi ultrapassado
        currentParking = currentParking.filter( (park) => { 
            if (park.exitDate.getTime() > currentTime.getTime() ) {
            }
            return park.exitDate.getTime() > currentTime.getTime();
        });

        if (currentParking.length > max) {
            max = currentParking.length;
        }
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

            let attemptNumber = 14;
            let reserved = false;

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