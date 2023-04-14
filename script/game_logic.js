const gameboard = document.getElementById("gameboard");
const container = document.getElementById("container");

makeGrid(5, 5);

const url = "https://api.chucknorris.io/jokes/random"
document.getElementById("gameName").innerHTML = "Cats and Chuck Norris"
let playerText = document.getElementById("playertext");
let pointsText = document.getElementById("points");
let restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener('click', restart);
let joke = document.getElementById("joke");
let boxes = Array.from(document.getElementsByClassName("box"));
let imageTexts = getImageTextArray();
let count = 0;
const xMax = 5;
let playerXPos = getRandomInt(4);
let playerYPos = getRandomInt(4);
let hunterXPos = getRandomInt(4);
let hunterYPos = getRandomInt(4);
let playerIndex = playerXPos + (playerYPos * xMax);
let hunterIndex = hunterXPos + (hunterYPos * xMax);
let player, hunter, cat;
let points = 0;


function makeGrid(rows, cols) {
    gameboard.style.setProperty('--grid-rows', rows);
    gameboard.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        cell.setAttribute("id", c);
        cell.setAttribute("class", "box");
        gameboard.appendChild(cell);
    };
};

function createPlayer() {
    let player = {
        name: "ACE",
        pos: playerIndex
    }
    return player
}

function createHunter() {
    let hunter = {
        name: "CHUCK",
        pos: hunterIndex
    }
    return hunter;
}

function createCat() {
    let cat = {
        name: "CAT",
        pos: getRandomInt(24)
    }
    return cat;
}

startGame();

function startGame() {
    player = createPlayer();
    hunter = createHunter();
    cat = createCat();
    playerText.innerHTML = "Save the cat before Chuck Norris gets it - or you!";
    pointsText.innerHTML = points + " points"
    changeBackgroundImage(player.pos);
    foundCat();
    caughtByChuck();
    setCharachternames();
}

function setCharachternames(){
    boxes[player.pos].innerHTML = player.name;
    boxes[hunter.pos].innerHTML = hunter.name;
    boxes[cat.pos].innerHTML = cat.name;
}

function resetCharacterProperties(){
    playerXPos = getRandomInt(4);
    playerYPos = getRandomInt(4);
    hunterXPos = getRandomInt(4);
    hunterYPos = getRandomInt(4);
    playerIndex = playerXPos + (playerYPos * xMax);
    hunterIndex = hunterXPos + (hunterYPos * xMax);
    resetHtml(player);
    resetHtml(hunter);
    resetHtml(cat);
}

function resetTextAndStyle(){
    playerText.innerHTML = "";
    joke.innerHTML = "";
    document.getElementById("playertext").style.fontSize = "";
    document.getElementById(cat.pos).style.backgroundImage = "";
    document.getElementById(hunter.pos).style.backgroundImage = "";

}

function restart() {
    resetCharacterProperties();
    resetTextAndStyle();
    startGame();
}

function resetHtml(character) {
    boxes[character.pos].innerHTML = "";
}

function move(xMove, yMove) {
    resetHtml(player);
    playerXPos = Math.max(0, Math.min(playerXPos + xMove, 4));
    playerYPos = Math.max(0, Math.min(playerYPos + yMove, 4));
    playerIndex = playerXPos + (playerYPos * xMax);
    player.pos = playerIndex;
    boxes[player.pos].innerHTML = player.name;
    changeBackgroundImage(player.pos);
    foundCat();
    if (count % 2 == 0) {
        moveChuck(xMove, yMove);
    }
    caughtByChuck();
    count++;
}

function moveChuck(xMove, yMove) {
    resetHtml(hunter);
    hunterXPos = Math.max(0, Math.min(hunterXPos + xMove, 4));
    hunterYPos = Math.max(0, Math.min(hunterYPos + yMove, 4));
    hunterIndex = hunterXPos + (hunterYPos * xMax);
    hunter.pos = hunterIndex;
    boxes[hunter.pos].innerHTML = hunter.name;
}

function getJoke() {
    fetch(url)
        .then(function (response) { return response.json() })
        .then(function (data) {
            let result = data.value;
            let joke = document.getElementById("joke");
            joke.innerHTML = result;
        })
}

function win() {
    playerText.innerHTML = "You won!"
    document.getElementById("playertext").style.fontSize = "54px";
    points += 50;
    pointsText.innerHTML = points + " points";
    resetHtml(player);
    setTimeout('restart()', 3000);
}

function loose() {
    getJoke();
    playerText.innerHTML = "You lost!";
    document.getElementById("playertext").style.fontSize = "54px";
    points -= 20;
    pointsText.innerHTML = points + " points";
    resetHtml(player);
    setTimeout('restart()', 5000);
}

function foundCat() {
    let catIsFound = false;
    if (player.pos == cat.pos) {
        catIsFound = true;
        document.getElementById(cat.pos).style.backgroundImage = "url('images/cat.jpg')";
        win();
    }
    return catIsFound;
}

function caughtByChuck() {
    let caughtByChuck = false;
    if (player.pos == hunter.pos || cat.pos == hunter.pos) {
        caughtByChuck = true;
        document.getElementById(hunter.pos).style.backgroundImage = "url('images/chucknorris.jpg')";
        loose();
    }
    return caughtByChuck;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function changeBackgroundImage(playerPosition) {
    document.getElementById("gameboard").style.backgroundImage = "url('images/" + playerPosition + ".jpg')";
    document.getElementById("imageText").innerHTML = imageTexts[playerPosition];
}

function getImageTextArray() {
    let imageTexts = [
        "Mitt i vattnet står Rafikis träd, där får han vara i fred från nyfikna lejonungar",
        "Lejonklippan skymtar i bakgrunden, kisar man så syns Mufasa i molnen",
        "I Narnia är solen på väg upp, med isdrottningens slott uppe på berget",
        "Inne i regnskogen skymtar vattenfallet och på grenen högst upp går Timon och Pumba i godan ro",
        "Precis efter att denna bilden togs så kom Owen Grady med fem velociraptorer springandes efter sig",
        "Djupt inne i skogen finns resterna av jätten Jorms fin-kopp",
        "På stranden låg en båt som Robinson tyvärr aldrig hittade",
        "Mitt ute i ingenstans fanns en sittplats för den som blev lässugen. Tyvärr fanns även krypskyttar i närheten",
        "På andra sidan bron visste ingen vad som väntade",
        "Blommornas grotta var en plats så avlägsen att inte ens captain Jack Sparrow hittat dit",
        "Högst upp bland Alperna var det svårt att veta om man befann sig där eller på månen",
        "Livbåtarna var slut så besättningen satte sitt hopp till fisktunnorna",
        "När som helst kommer Robin och Marion. Hoodeladi hoodeladi hoppsan vilken dag",
        "I det gamla tornet hade Inka-folket utfört ritualer till sina gudar",
        "De röda trädens skog vaktades av the Knights who say Ni!",
        "Om man kisar och sätter sig på huk är det svårt att veta var trädet slutar och månen börjar",
        "Templets främsta skydd var att man bara kunde ta sig in med kajak och där får inga kanoner plats",
        "Bergen i dalen kallades även 'Valrossbergen'",
        "Denna del av världen är lite som en april-dag - svårt att veta vilken klimatzon man befinner sig i",
        "Vid myrsloks-berget samlas termitstackarna för att be till högre makter om att får vara i fred",
        "Gert Wingårdh kunde med lönen från Husdrömmar äntligen bygga sitt drömhus",
        "A-frame-husen börjar få ett uppsving igen. Tyvärr hade tomten dåligt med kvällssol",
        "The pale orch gillade att stå i solnedgången för att få illusionen om att vara brunbränd",
        "Jättarna brukade ställa ut sina alster från keramik-kursen i öknen för att brännas",
        "Broccoli-träden kan endast växa på den här platsen, precis under dreggelberget",
    ];
    return imageTexts;
}

//testar github-kontot