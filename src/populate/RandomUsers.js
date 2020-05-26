const User = require('./models/User')

async function populateUsersDataBase() {
    const RandomUsers = [
        { id: 0, name: "Emilio Rayner" },
        { id: 1, name: "Ariel Findlay" },
        { id: 2, name: "Ailsa Dowling" },
        { id: 3, name: "Shyam Feeney" },
        { id: 4, name: "Fatima Mahoney" },
        { id: 5, name: "Taylan Marin" },
        { id: 6, name: "Kitty Smart" },
        { id: 7, name: "Ansh Rhodes" },
        { id: 8, name: "Tasha Joyce" },
        { id: 9, name: "Rishi Gomez" },
        { id: 10, name: "Alena Burch" },
        { id: 11, name: "Felicity Vaughan" },
        { id: 12, name: "Vivien Hoover" },
        { id: 13, name: "Elsie-Mae Bentley" },
        { id: 14, name: "Bertie Sandoval" },
        { id: 15, name: "Ianis Irwin" },
        { id: 16, name: "Marlon Beard" },
        { id: 17, name: "Natalie Porter" },
        { id: 18, name: "Ellouise Bloom" },
        { id: 19, name: "Kim Ellison" },
        { id: 20, name: "Zander Reeve" },
        { id: 21, name: "Nawal Cotton" },
        { id: 22, name: "Arham Thomas" },
        { id: 23, name: "Usamah Finley" },
        { id: 24, name: "Leanne Frazier" },
        { id: 25, name: "Iestyn Curry" },
        { id: 26, name: "Chyna Dawson" },
        { id: 27, name: "Taran Lawson" },
        { id: 28, name: "Elwood Partridge" },
        { id: 29, name: "Carol Delarosa" },
        { id: 30, name: "Daniaal Butt" },
        { id: 31, name: "Johnny Bryan" },
        { id: 32, name: "Safa Povey" },
        { id: 33, name: "Mason Mullins" },
        { id: 34, name: "Asiyah Cummings" },
        { id: 35, name: "Cai Sharp" },
        { id: 36, name: "Damian Ware" },
        { id: 37, name: "Kairo Forrest" },
        { id: 38, name: "Chaim Atkins" },
        { id: 39, name: "Elen Campbell" },
        { id: 40, name: "Wesley Carroll" },
        { id: 41, name: "Jaylan Morin" },
        { id: 42, name: "Shelly Calhoun" },
        { id: 43, name: "Jordan-Lee Horne" },
        { id: 44, name: "Paddy Bevan" },
        { id: 45, name: "Danniella Busby" },
        { id: 46, name: "Viktor Weeks" },
        { id: 47, name: "Bailey Dotson" },
        { id: 48, name: "Faiz Hale" },
        { id: 49, name: "Daisie Dunne" },
        { id: 50, name: "Amelia Wormald" },
        { id: 51, name: "Kayan Logan" },
        { id: 52, name: "Danyal Storey" },
        { id: 53, name: "Marissa Sheridan" },
        { id: 54, name: "Murat Welsh" },
        { id: 55, name: "Lexi Burris" },
        { id: 56, name: "Mekhi Brooks" },
        { id: 57, name: "Georgia Beach" },
        { id: 58, name: "Rae Aguilar" },
        { id: 59, name: "Denny Millar" },
        { id: 60, name: "Elle-May Langley" },
        { id: 61, name: "Yasemin Connolly" },
        { id: 62, name: "Helena Greenaway" },
        { id: 63, name: "Kamran Bassett" },
        { id: 64, name: "Ashraf Finney" },
        { id: 65, name: "Hussain Kumar" },
        { id: 66, name: "Marie Obrien" },
        { id: 67, name: "John Walker" },
        { id: 68, name: "Emillie Mellor" },
        { id: 69, name: "Lucca Benson" },
        { id: 70, name: "Vivaan Short" },
        { id: 71, name: "Ayat Daniel" },
        { id: 72, name: "Adeeb Trevino" },
        { id: 73, name: "Luqman Floyd" },
        { id: 74, name: "Kajal Hayes" },
        { id: 75, name: "Hayley Greer" },
        { id: 76, name: "Cienna O'Brien" },
        { id: 77, name: "Brian Gould" },
        { id: 78, name: "Avaya Tierney" },
        { id: 79, name: "Doris Rawlings" },
        { id: 80, name: "Haya Vance" },
        { id: 81, name: "Deon Phelps" },
        { id: 82, name: "Cydney Kemp" },
        { id: 83, name: "Sila Singh" },
        { id: 84, name: "Lucian O'Doherty" },
        { id: 85, name: "Yu Quintero" },
        { id: 86, name: "Donovan Baker" },
        { id: 87, name: "Jagdeep Pena" },
        { id: 88, name: "Colin Howe" },
        { id: 89, name: "Ryder Lowry" },
        { id: 90, name: "Jolyon Mcfarland" },
        { id: 91, name: "Oskar Rose" },
        { id: 92, name: "Mikael Decker" },
        { id: 93, name: "Faye Mcdermott" },
        { id: 94, name: "Elmer Berry" },
        { id: 95, name: "Giorgio Cherry" },
        { id: 96, name: "Lacey Burt" },
        { id: 97, name: "Kerry Roman" },
        { id: 98, name: "Alexia Palmer" },
        { id: 99, name: "Tomi Briggs" },
    ];

    RandomUsers.map(async (randomUser) => {
        try {
            const user = await User.create(randomUser);
            console.log("Sucess: ",user);
        } catch (err) {
            console.log("Erro ao adicionar usuario");
            console.log(err);
        }
    });
}

async function getRandomUser(min, max) {
    randomId = Math.floor(Math.random() * (max - min + 1) + min)
    const randomUser = await User.findOne({ id: randomId });
    console.log(randomUser);
}

function deleteAll() {
    User.deleteMany({}, function(err) { 
        console.log('collection removed') 
     });
}