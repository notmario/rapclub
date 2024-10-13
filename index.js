let gameState = "loading";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let notes = [];

let selectedAchievement = 0;

let currDialogueBox = 0;
let dialogue = [];
let currDialogueMusic = null;
let timeInDialogue = 0;

let playerNoteDrain = 3;

let heldKeys = [];

let misses = 0;

let isUsingFnfIntroMode = false;

let devHideBotplay = false;

let lastTick = performance.now();

let ip = "";
// generate random ip
ip += Math.floor(Math.random() * 255);
ip += "." + Math.floor(Math.random() * 255);
ip += "." + Math.floor(Math.random() * 255);
ip += "." + Math.floor(Math.random() * 255);

function getLines(ctx, text, maxWidth) {
  var words = text.split(" ");
  var lines = [];
  var currentLine = words[0];

  for (var i = 1; i < words.length; i++) {
    var word = words[i];
    var width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

let winTime = 0;

let enemyNotes = [];

let fnfintromode = -1;

let targetZoomValue = 1;
let zoomValue = 1;

let darkText = false;

let swapMode = false;

let freeplaySelectedIndex = 0;

let accuracyScore = 0;
let accuracyNotes = 0;

let enemyAccuracyScore = 0;
let enemyAccuracyNotes = 0;

let botplay = false;

let noteMode = "normal";

let noteSpeedMult = 1;

let twoplayermode = false;

let noteDrainMultiplier = 1;
let fakeNoteMultiplier = 1;

let hp = 100;

let score = 0;
let enemyScore = 0;

let bpm = 160;

let songPos = 0;

let endPos = 0;

let currMusic = null;
let currVocals = null;
let currVocals2 = null;

let targetcameraX = 1;
let cameraX = 1;

const noteImages = {
  "left": document.getElementById("leftArrowImage"),
  "right": document.getElementById("rightArrowImage"),
  "up": document.getElementById("upArrowImage"),
  "down": document.getElementById("downArrowImage"),
  "center": document.getElementById("centerArrowImage"),
  "sixkeyleft": document.getElementById("sixKeyLeftArrowImage"),
  "sixkeyup": document.getElementById("sixKeyUpArrowImage"),
  "sixkeydown": document.getElementById("sixKeyDownArrowImage"),
  "sixkeyright": document.getElementById("sixKeyRightArrowImage"),
  "danger": document.getElementById("dangerArrowImage"),
}

const fakeNoteImages = {
  "left": document.getElementById("fakeLeftArrowImage"),
  "right": document.getElementById("fakeRightArrowImage"),
  "up": document.getElementById("fakeUpArrowImage"),
  "down": document.getElementById("fakeDownArrowImage"),
}

const opponentImages = {
  "king": {
    "neutral": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("kingneutral")
    },
    "left": {
      offsetX: 232-400,
      offsetY: 0,
      src: document.getElementById("kingleft")
    },
    "right": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("kingright")
    },
    "up": {
      offsetX: 0,
      offsetY: -250,
      src: document.getElementById("kingup")
    },
    "down": {
      offsetX: 0,
      offsetY: 700-501,
      src: document.getElementById("kingdown")
    },
    "death": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("kingdeath")
    },
  },
  "funnyamong": {
    "neutral": {
      offsetX: -100,
      offsetY: 0,
      src: document.getElementById("funnyamongneutral")
    },
    "left": {
      offsetX: -100,
      offsetY: 0,
      src: document.getElementById("funnyamongleft")
    },
    "right": {
      offsetX: -100,
      offsetY: 0,
      src: document.getElementById("funnyamongright")
    },
    "up": {
      offsetX: -100,
      offsetY: 0,
      src: document.getElementById("funnyamongup")
    },
    "down": {
      offsetX: -100,
      offsetY: 0,
      src: document.getElementById("funnyamongdown")
    },
    "death": {
      offsetX: -100,
      offsetY: 0,
      src: document.getElementById("funnyamongdeath")
    },
    "dialogue": {
      side: "right",
      src: document.getElementById("funnyamongdialogue")
    }
  },
  "kingFloat": {
    "neutral": {
      offsetX: -150,
      offsetY: -150,
      src: document.getElementById("kingneutral")
    },
    "left": {
      offsetX: 232-400-150,
      offsetY: -150,
      src: document.getElementById("kingleft")
    },
    "right": {
      offsetX: -150,
      offsetY: -150,
      src: document.getElementById("kingright")
    },
    "up": {
      offsetX: -150,
      offsetY: -250-150,
      src: document.getElementById("kingup")
    },
    "down": {
      offsetX: -150,
      offsetY: 700-501-150,
      src: document.getElementById("kingdown")
    },
    "death": {
      offsetX: -150,
      offsetY: -150,
      src: document.getElementById("kingdeath")
    },
  },
  "renderforest": {
    "neutral": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("renderforestneutral")
    },
    "left": {
      offsetX: 232-400,
      offsetY: 0,
      src: document.getElementById("renderforestleft")
    },
    "right": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("renderforestright")
    },
    "up": {
      offsetX: 0,
      offsetY: -250,
      src: document.getElementById("renderforestup")
    },
    "down": {
      offsetX: -32,
      offsetY: 700-501,
      src: document.getElementById("renderforestdown")
    },
    "death": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("renderforestdeath")
    },
    "dialogue": {
      side: "right",
      src: document.getElementById("renderforestdialogue")
    }
  },
  "tghazard": {
    "neutral": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("hazardneutral")
    },
    "left": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("hazardleft")
    },
    "right": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("hazardright")
    },
    "up": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("hazardup")
    },
    "down": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("hazarddown")
    },
    "death": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("hazarddeath")
    },
    "dialogue": {
      side: "right",
      src: document.getElementById("renderforestdialogue")
    }
  },
  "h": {
    "neutral": {
      offsetX: -100,
      offsetY: 150,
      src: document.getElementById("hneutral")
    },
    "left": {
      offsetX: -100,
      offsetY: 150,
      src: document.getElementById("hleft")
    },
    "right": {
      offsetX: -100,
      offsetY: 150,
      src: document.getElementById("hright")
    },
    "up": {
      offsetX: -100,
      offsetY: 150,
      src: document.getElementById("hup")
    },
    "down": {
      offsetX: -100,
      offsetY: 150,
      src: document.getElementById("hdown")
    },
    "death": {
      offsetX: -100,
      offsetY: 150,
      src: document.getElementById("hdeath")
    },
    "dialogue": {
      side: "right",
      src: document.getElementById("hdialogue")
    }
  },
  "mspaintrenderforest": {
    "neutral": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("mspaintrenderforestneutral")
    },
    "left": {
      offsetX: 232-400,
      offsetY: 0,
      src: document.getElementById("mspaintrenderforestleft")
    },
    "right": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("mspaintrenderforestright")
    },
    "up": {
      offsetX: 0,
      offsetY: -250,
      src: document.getElementById("mspaintrenderforestup")
    },
    "down": {
      offsetX: -32,
      offsetY: 700-501,
      src: document.getElementById("mspaintrenderforestdown")
    },
    "death": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("mspaintrenderforestdeath")
    },
    "dialogue": {
      side: "right",
      src: document.getElementById("mspaintrenderforestdialogue")
    }
  },
  "squirrel": {
    "neutral": {
      offsetX: -250,
      offsetY: 100,
      src: document.getElementById("squirrelneutral")
    },
    "left": {
      offsetX: -250,
      offsetY: 100,
      src: document.getElementById("squirrelleft")
    },
    "right": {
      offsetX: -250,
      offsetY: 100,
      src: document.getElementById("squirrelright")
    },
    "up": {
      offsetX: -250,
      offsetY: 100,
      src: document.getElementById("squirrelup")
    },
    "down": {
      offsetX: -250,
      offsetY: 150,
      src: document.getElementById("squirreldown")
    },
  },
  "ben": {
    "neutral": {
      offsetX: -550,
      offsetY: -275,
      src: document.getElementById("benneutral")
    },
    "left": {
      offsetX: -550,
      offsetY: -250,
      src: document.getElementById("benleft")
    },
    "right": {
      offsetX: -550,
      offsetY: -250,
      src: document.getElementById("benright")
    },
    "up": {
      offsetX: -550,
      offsetY: -250,
      src: document.getElementById("benup")
    },
    "down": {
      offsetX: -550,
      offsetY: -250,
      src: document.getElementById("bendown")
    },
  },
  "benReal": {
    "neutral": {
      offsetX: -550,
      offsetY: -250,
      src: document.getElementById("benneutral")
    },
    "left": {
      offsetX: -550,
      offsetY: -250,
      src: document.getElementById("benleft")
    },
    "right": {
      offsetX: -550,
      offsetY: -250,
      src: document.getElementById("benright")
    },
    "up": {
      offsetX: -550,
      offsetY: -250,
      src: document.getElementById("benup")
    },
    "down": {
      offsetX: -550,
      offsetY: -250,
      src: document.getElementById("bendown")
    },
  },
  "cat": {
    "neutral": {
      offsetX: 0,
      offsetY: 150,
      src: document.getElementById("catneutral")
    },
    "left": {
      offsetX: 0,
      offsetY: 150,
      src: document.getElementById("catleft")
    },
    "right": {
      offsetX: 0,
      offsetY: 150,
      src: document.getElementById("catright")
    },
    "up": {
      offsetX: 0,
      offsetY: 150,
      src: document.getElementById("catup")
    },
    "down": {
      offsetX: 0,
      offsetY: 200,
      src: document.getElementById("catdown")
    },
    "death": {
      offsetX: 0,
      offsetY: 150,
      src: document.getElementById("catdeath")
    },
    "dialogue": {
      side: "right",
      src: document.getElementById("catdialogue")
    }
  },
  "redman": {
    "neutral": {
      offsetX: -150,
      offsetY: -150,
      src: document.getElementById("redmanneutral")
    },
    "left": {
      offsetX: -150,
      offsetY: -150,
      src: document.getElementById("redmanleft")
    },
    "right": {
      offsetX: -150,
      offsetY: -150,
      src: document.getElementById("redmanright")
    },
    "up": {
      offsetX: -150,
      offsetY: -150,
      src: document.getElementById("redmanup")
    },
    "down": {
      offsetX: -150,
      offsetY: -150,
      src: document.getElementById("redmandown")
    },
    "dialogue": {
      side: "left",
      src: document.getElementById("redmandialogue")
    }
  },
  "dennis": {
    "neutral": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("dennisneutral")
    },
    "left": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("dennisleft")
    },
    "right": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("dennisright")
    },
    "gun": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("dennisgun")
    },
    "up": {
      offsetX: -150,
      offsetY: -150,
      src: document.getElementById("dennisup")
    },
    "down": {
      offsetX: 0,
      offsetY: 0,
      src: document.getElementById("dennisdown")
    },
    "dialogue": {
      side: "left",
      src: document.getElementById("dennisdialogue")
    }
  },
  "dennisgun": {
    "dialogue": {
      side: "left",
      src: document.getElementById("dennisgundialogue")
    }
  },
  "chungus": {
    "neutral": {
      offsetX: -250,
      offsetY: -250,
      src: document.getElementById("chungusneutral")
    },
    "left": {
      offsetX: -250,
      offsetY: -250,
      src: document.getElementById("chungusleft")
    },
    "right": {
      offsetX: -250,
      offsetY: -250,
      src: document.getElementById("chungusright")
    },
    "up": {
      offsetX: -250,
      offsetY: -250 - 80,
      src: document.getElementById("chungusup")
    },
    "down": {
      offsetX: -250,
      offsetY: -250+100,
      src: document.getElementById("chungusdown")
    }
  },
}

let pAnim = "neutral";

let pAnimTimer = -1;

let inputAnimList = [];
let enemyInputAnimList = [];

let opponent = "steviej";

let opponentAnim = "neutral";
let opponentAnimTimer = -1;

let opponentAfterimages = [];

let flashopacity = -1;

let menuMusic = new Audio("mus/menu.ogg");
let hasLoadedMenuMusic = false;
menuMusic.addEventListener("canplaythrough", ()=>{
  hasLoadedMenuMusic = true;
  menuMusic.loop = true;
});

let selectedSong = "tutorial";
let bonusSelectedSong = "big-man";
let selectedDifficulty = "normal";

let player = "tghazard";
if (localStorage.getItem("esrcplayer") !== null) player = localStorage.getItem("esrcplayer");
if (player === "joll") player = "renderforest"

let characters = [
  "tghazard",
  "renderforest",
  "funnyamong"
]

let difficulties = [
  "easy",
  "normal",
  "roofless",
]

let diffimages = {
  "easy": document.getElementById("easydiffimage"),
  "normal": document.getElementById("normaldiffimage"),
  "roofless": document.getElementById("rooflessdiffimage"),
}

let songList = [
  
]

const weeks = [
  {
    name: "gamer",
    songs: [
      "big-man",
    ],
    description: "The Hood Classic",
  },
]

let bonusSongList = [
  "big-man"
]

let weekMode = false;
let isPerfectWeek = false;
let selectedWeek = 0;

let controlMode = "arrows";
// get control mode from local storage
if (localStorage.getItem("controlMode") !== null) {
  controlMode = localStorage.getItem("controlMode");
}

let squishyMode = false;
// get squishy mode from local storage
if (localStorage.getItem("rapclubsquishymode") !== null) squishyMode = localStorage.getItem("rapclubsquishymode") === "true";
let squishyTimer = 0;

let downScroll = true;

let deathtime = 0;

let specialNotes = [];

let currBg = null;
let currBgDark = null;

let currSongName = "";

let controlModes = {
  "dfjk": {
    "left": "d",
    "right": "k",
    "up": "j",
    "down": "f",
    "center": " ",
  },
  "wasd": {
    "left": "a",
    "right": "d",
    "up": "w",
    "down": "s",
    "center": " ",
  },
  "arrows": {
    "left": "arrowleft",
    "right": "arrowright",
    "up": "arrowup",
    "down": "arrowdown",
    "center": " ",
  },
  "sixkey": {
    "left": "s",
    "right": "l",
    "up": "k",
    "down": "d",
    "sixkeyleft": "j",
    "sixkeyright": "f" 
  },
  "ninekey": {
    "left": "a",
    "right": "f",
    "up": "d",
    "down": "s",
    "center": " ",
    "sixkeyleft": "j",
    "sixkeydown": "k",
    "sixkeyup": "l",
    "sixkeyright": ";" 
  },
  "ninekeytwoplayerleft": {
    "left": "a",
    "right": "d",
    "up": "w",
    "down": "s",
    "center": " ",
    "sixkeyleft": "f",
    "sixkeydown": "g",
    "sixkeyup": "t",
    "sixkeyright": "h" 
  },
  "ninekeytwoplayerright": {
    "left": "j",
    "right": "l",
    "up": "i",
    "down": "k",
    "center": ";",
    "sixkeyleft": "arrowleft",
    "sixkeydown": "arrowdown",
    "sixkeyup": "arrowup",
    "sixkeyright": "arrowright" 
  }
}

let comboParticleImages = {
  "sick": document.getElementById("sickParticle"),
  "good": document.getElementById("goodParticle"),
  "shit": document.getElementById("shitParticle")
}

let opponentNoteDrain = 0;

let fadeOutTime = 0;

let currSong = null;

let startSong = (song, useSwapMode = false) => {

  heldKeys = [];

  let temploaded = 0;

  new Audio("mus/miss.ogg").play();

  currSong = song;

  menuMusic.pause();
  menuMusic.currentTime = 0;
  currentlyPlayingSong = "";

  currMusic = new Audio(songs[song].music);
  // reset currMusic position
  currMusic.currentTime = 0;

  dialogue = songs[song]?.dialogue;
  timeInDialogue = 0;
  currDialogueBox = 0;
  if (dialogue) {
    currDialogueMusic = new Audio(dialogue.music);
    currDialogueMusic.loop = true;
  }

  currMusic.addEventListener("canplaythrough", () => {
    temploaded++;
    if (temploaded === 3) {
      gameState = "fadeOutBetweenMenuAndGame";
      fadeOutTime = 0;
    }
  });

  currVocals = new Audio(songs[song].vocals);
  currVocals.currentTime = 0;
  let vocals2path = songs[song].vocals2
  if (player != "tghazard") {
    vocals2path = songs[song].vocals2alt
  }
  currVocals2 = new Audio(vocals2path);
  currVocals2.currentTime = 0;

  currVocals.addEventListener("canplaythrough", () => {
    temploaded++;
    if (temploaded === 3) {
      gameState = "fadeOutBetweenMenuAndGame";
      fadeOutTime = 0;
    }
  });

  currVocals2.addEventListener("canplaythrough", () => {
    temploaded++;
    if (temploaded === 3) {
      gameState = "fadeOutBetweenMenuAndGame";
      fadeOutTime = 0;
    }
  });

  bpm = songs[song].bpm;
  notes = [...songs[song].notes];
  enemyNotes = [...songs[song].enemyNotes];
  specialNotes = [...songs[song].specialNotes];

  targetcameraX = 1;
  cameraX = 1;

  endPos = songs[song].endPos;

  pAnim = "neutral";
  hp = 100;
  songPos = 0;
  inputAnimList = [];

  score = 0;
  enemyScore = 0;

  zoomValue = 1;
  targetZoomValue = 1;

  accuracyNotes = 0;
  accuracyScore = 0;
  enemyAccuracyNotes = 0;
  enemyAccuracyScore = 0;
  
  opponentAnim = "neutral";
  opponentAnimTimer = -1;

  currSongName = songs[song].name;

  currBg = document.getElementById(songs[song].bg);
  currBgDark = document.getElementById(songs[song].bgDark);

  opponent = songs[song].opponent;

  if (useSwapMode) {
    swapMode = true;

    // swap notes
    notes = [...songs[song].enemyNotes];
    enemyNotes = [...songs[song].notes];

  } else {
    swapMode = false;
  }

  playerPosOffsetX = songs[song].playerPosOffsetX;
  playerPosOffsetY = songs[song].playerPosOffsetY;

  combo = 0;
  comboparticles = [];

  noteSpeedMult = songs[song].noteSpeedMult;

  noteDrainMultiplier = songs[song].noteDrainMultiplier;
  fakeNoteMultiplier = songs[song]?.fakeNoteMultiplier || 1;

  opponentNoteDrain = 0;
  playerNoteDrain = 3;

  noteMode = songs[song].noteMode || "normal";

  darkText = !!songs[song]?.darkText;

  if (songs[song].fnfintromode) {
    songPos = -5;
    fnfintromode = 4;
    isUsingFnfIntroMode = true;
  } else {
    fnfintromode = -1;
    isUsingFnfIntroMode = false;
  }
}

let csAnimTime = 0;

let menuOptions = [
  // {
  //   "name": "Story Mode",
  //   "description": `Go to the song selection menu`,
  //   "action": (shift) => {
  //     gameState = "songselect";
  //   },
  //   "left": () => {
  //   },
  //   "right": () => {
  //   }
  // },
  {
    "name": "Freeplay",
    "description": `Select any song, plus more songs from FNF.`,
    "action": (shift) => {
      gameState = "bonussongselect";
    },
    "left": () => {
    },
    "right": () => {
    }
  },
  {
    "name": "Settings",
    "description": `Go to the settings`,
    "action": (shift) => {
      gameState = "settings";
      selectedMenuIndex = 0;
    },
    "left": () => {
    },
    "right": () => {
    }
  },
  {
    "name": "Character Select",
    "description": `Go to the character selection menu`,
    "action": (shift) => {
      gameState = "characterselect";
    },
    "left": () => {
    },
    "right": () => {
    }
  },
  // {
  //   "name": "Achievements",
  //   "description": `Go to the achievements menu`,
  //   "action": (shift) => {
  //     gameState = "achievements";
  //   },
  //   "left": () => {
  //   },
  //   "right": () => {
  //   }
  // },
]

let settingsOptions = [
  {
    "name": "Controls",
    "description": "Left / right to change your control mode (current one: [CONTROLMODE])",
    "action": () => {
      
    },
    "left": () => {
      // get all control modes
      let allControlModes = Object.keys(controlModes);
      allControlModes.pop();
      // get index of current control mode
      let currControlModeIndex = allControlModes.indexOf(controlMode);
      // get next control mode
      let nextControlMode = allControlModes[(currControlModeIndex - 1) % allControlModes.length];
      if (nextControlMode === undefined) nextControlMode = allControlModes[2];
      // set control mode
      controlMode = nextControlMode;
      // set local storage
      localStorage.setItem("controlMode", controlMode);
    },
    "right": () => {
      // get all control modes
      let allControlModes = Object.keys(controlModes);
      allControlModes.pop();
      allControlModes.pop();
      // get index of current control mode
      let currControlModeIndex = allControlModes.indexOf(controlMode);
      // get next control mode
      let nextControlMode = allControlModes[(currControlModeIndex + 1) % 3];
      if (nextControlMode === undefined) nextControlMode = allControlModes[0];
      // set control mode
      controlMode = nextControlMode;
      // set local storage
      localStorage.setItem("controlMode", controlMode);
    }
  },
  {
    "name": "Squishy Mode",
    "description": "Squishy mode makes you squishy (current mode: [SQUISHYMODE])",
    "action": () => {
      squishyMode = !squishyMode;
      // set local storage
      localStorage.setItem("rapclubsquishymode", squishyMode);
      
    },
    "left": () => {
    },
    "right": () => {
    }
  },
]

let comboparticles = [];

let combo = 0;
let enemyCombo = 0;

let selectedMenuIndex = 0;

let playerPosOffsetX = 0;
let playerPosOffsetY = 0;

let currentlyPlayingSong = "";

let menuOffsetBGY = 0;

let centerMode = false;
if (localStorage.getItem("esrcCenterMode") !== null) centerMode = localStorage.getItem("esrcCenterMode") === "true";
let funMode = false;
if (localStorage.getItem("esrcFunMode") !== null) funMode = localStorage.getItem("esrcFunMode") === "true";

console.log("%cRap Club", "color: #3333FF; font-size: 4rem;");
console.log("%cEpic hacker interface!!!11!1!!!", "color: #9999FF; font-size: 2rem;");
console.log("%cGood job you have inspected element. Wow incredible.\nSo like, good job. Uhh i dont know what to say, don't cheat lol\nShift + down to access the secret week", "color: #9999FF; font-size: 1rem;");


const update = () => {
  // among us
  const now = performance.now();
  const delta = (now - lastTick) /1000;
  lastTick = now;

  // reset transform
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  cameraX = (targetcameraX + 23 * cameraX) / 24;
  zoomValue = (targetZoomValue + 23 * zoomValue) / 24;

  switch (gameState) {
    case "loading":
      ctx.font = "200px Poppins";
      ctx.fillStyle = "white";
      ctx.fillText("Loading", canvas.width / 2 - ctx.measureText("Loading").width/2, canvas.height / 2 - 120);

      if (hasLoadedMenuMusic) {
        ctx.font = "80px Poppins";
        ctx.fillText("Press enter to go to menu", canvas.width / 2 - ctx.measureText("Press enter to go to menu").width/2, canvas.height / 2 + 250);
      } else {
        ctx.font = "40px Poppins";
        ctx.fillText("loading...", canvas.width / 2 - ctx.measureText("loading...").width/2, canvas.height / 2 + 250);
      }
      break;
    case "menu":
      menuAnimTime+= ( 75.36 /60)*delta;

      menuOffsetBGY = (menuOffsetBGY * 15 + selectedMenuIndex * canvas.height * 0.02) / 16;
      // draw menu
      
      // draw bg
      ctx.drawImage(document.getElementById("blissDarkBG"), 
        canvas.width * -(0.1+0.0125*Math.abs(Math.sin(menuAnimTime * Math.PI/2))), 
        canvas.height * -(0.1+0.0125*Math.abs(Math.sin(menuAnimTime * Math.PI/2))) - menuOffsetBGY, 
        canvas.width * (1.2+0.025*Math.abs(Math.sin(menuAnimTime * Math.PI/2))), 
        canvas.height * (1.2+0.025*Math.abs(Math.sin(menuAnimTime * Math.PI/2))));

      ctx.font = "120px Poppins";
      ctx.fillStyle = "white";
      ctx.fillText("rapclub*", canvas.width / 2 - ctx.measureText("rapclub*").width/2, canvas.height / 2 - 60);
      ctx.font = "60px Poppins";
      ctx.fillText("(arrows to select)", canvas.width / 2 - ctx.measureText("(arrows to select)").width/2, canvas.height / 2 + 5);

      // draw menu options
      ctx.font = "60px Poppins";
      menuOptions.forEach((option, index) => {
        if (index === selectedMenuIndex) {
          ctx.fillStyle = "white";
        } else {
          ctx.fillStyle = "gray";
        }
        ctx.fillText(option.name, canvas.width / 2 - ctx.measureText(option.name).width/2, canvas.height / 2 + index * 60 + 90);
      });

      // draw menu description
      ctx.font = "40px Poppins";
      ctx.fillStyle = "white";
      ctx.fillText(menuOptions[selectedMenuIndex].description, canvas.width / 2 - ctx.measureText(menuOptions[selectedMenuIndex].description).width/2, canvas.height / 2 + 30 + 360);
      break;
    case "settings":
      menuAnimTime+= ( 75.36 /60)*delta;

      menuOffsetBGY = (menuOffsetBGY * 15 + selectedMenuIndex * canvas.height * 0.03) / 16;
      // draw menu
      
      // draw bg
      ctx.drawImage(document.getElementById("blissDarkBG"), 
        canvas.width * -(0.1+0.0125*Math.abs(Math.sin(menuAnimTime * Math.PI/2))), 
        canvas.height * -(0.1+0.0125*Math.abs(Math.sin(menuAnimTime * Math.PI/2))) - menuOffsetBGY, 
        canvas.width * (1.2+0.025*Math.abs(Math.sin(menuAnimTime * Math.PI/2))), 
        canvas.height * (1.2+0.025*Math.abs(Math.sin(menuAnimTime * Math.PI/2))));

      ctx.font = "40px Poppins";
      ctx.fillStyle = "white";
      ctx.fillText("(esc to go back)", 32, 40+32);

      ctx.font = "120px Poppins";
      ctx.fillStyle = "white";
      ctx.fillText("Settings", canvas.width / 2 - ctx.measureText("Settings").width/2, canvas.height / 2 - 180);

      // draw menu options
      ctx.font = "60px Poppins";
      settingsOptions.forEach((option, index) => {
        if (index === selectedMenuIndex) {
          ctx.fillStyle = "white";
        } else {
          ctx.fillStyle = "gray";
        }
        ctx.fillText(option.name, canvas.width / 2 - ctx.measureText(option.name).width/2, canvas.height / 2 + index * 60 - 30);
      });

      // draw menu description
      ctx.font = "40px Poppins";
      ctx.fillStyle = "white";
      let temp = settingsOptions[selectedMenuIndex].description;
      // temp = temp.replace("[SONG]", songs[`${selectedSong}-${selectedDifficulty}`].name);
      temp = temp.replace("[CONTROLMODE]", controlMode);
      temp = temp.replace("[CENTERMODE]", centerMode ? "centered" : "normal");
      temp = temp.replace("[SCROLLDIRECTION]", downScroll ? "down" : "up");
      temp = temp.replace("[FUNMODE]", funMode ? "on" : "off");
      temp = temp.replace("[SQUISHYMODE]", squishyMode ? "on" : "off");
      ctx.fillText(temp, canvas.width / 2 - ctx.measureText(temp).width/2, canvas.height / 2 + 30 + 300);
      break;
    case "songselect":
      menuAnimTime+= ( 75.36 /60)*delta;

      menuOffsetBGY = (menuOffsetBGY * 15 + (selectedWeek) * canvas.height * 0.025) / 16;
      // draw bg
      ctx.drawImage(document.getElementById("blissDarkBG"), 
        canvas.width * -(0.1+0.0125*Math.abs(Math.sin(menuAnimTime * Math.PI/2))), 
        canvas.height * -(0.1+0.0125*Math.abs(Math.sin(menuAnimTime * Math.PI/2))) - menuOffsetBGY, 
        canvas.width * (1.2+0.025*Math.abs(Math.sin(menuAnimTime * Math.PI/2))), 
        canvas.height * (1.2+0.025*Math.abs(Math.sin(menuAnimTime * Math.PI/2))));
      
      // draw menu
      ctx.font = "40px Poppins";
      ctx.fillStyle = "white";
      ctx.fillText("(esc to go back)", 32, 40+32);

      ctx.font = "40px Poppins";
      ctx.fillStyle = "white";
      ctx.fillText(weeks[selectedWeek].description, canvas.width - ctx.measureText(weeks[selectedWeek].description).width - 32, 40+32);

      ctx.font = "120px Poppins";
      ctx.fillText("Select a week!", canvas.width / 2 - ctx.measureText("Select a week!").width/2, canvas.height / 2 - 240);
      ctx.font = "60px Poppins";
      ctx.fillText("(left / right to change difficulty)", canvas.width / 2 - ctx.measureText("(left / right to change difficulty)").width/2, canvas.height / 2 - 160);

      // draw menu options
      ctx.font = "60px Poppins";
      weeks.slice(0,-1).forEach((week, index) => {
        if (selectedWeek === index) {
          ctx.fillStyle = "white";
        } else {
          ctx.fillStyle = "gray";
        }
        ctx.fillText(week.name, canvas.width / 3 - ctx.measureText(week.name).width/2, canvas.height / 2 + index * 75 + 30);
      });
      // draw difficulty image
      ctx.drawImage(diffimages[selectedDifficulty], 2 * canvas.width / 3 - diffimages[selectedDifficulty].width / 2, 2 * canvas.height / 3 - diffimages[selectedDifficulty].height - 75, diffimages[selectedDifficulty].width * 1.5, diffimages[selectedDifficulty].height * 1.5);

      // draw menu options
      ctx.font = "50px Poppins";
      ctx.fillStyle = "white";
      ctx.fillText("Song List", 3*canvas.width / 4 - ctx.measureText("Song List").width/2, 3 * canvas.height / 4 - 85);
      ctx.font = "40px Poppins";
      weeks[selectedWeek].songs.forEach((song, index) => {
        ctx.fillText(songs[song+"-normal"].name, 3*canvas.width / 4 - ctx.measureText(songs[song+"-normal"].name).width/2, 3 * canvas.height / 4 + index * 45 - 45);
      });
      break;
    case "bonussongselect":
      menuAnimTime+= ( 75.36 /60)*delta;

      menuOffsetBGY = (menuOffsetBGY * 15 + (songList.indexOf(selectedSong)) * canvas.height * 0.025) / 16;
      // draw bg
      ctx.drawImage(document.getElementById("blissDarkBG"), 
        canvas.width * -(0.1+0.0125*Math.abs(Math.sin(menuAnimTime * Math.PI/2))), 
        canvas.height * -(0.1+0.0125*Math.abs(Math.sin(menuAnimTime * Math.PI/2))) - menuOffsetBGY, 
        canvas.width * (1.2+0.025*Math.abs(Math.sin(menuAnimTime * Math.PI/2))), 
        canvas.height * (1.2+0.025*Math.abs(Math.sin(menuAnimTime * Math.PI/2))));
      
      // draw menu
      ctx.font = "40px Poppins";
      ctx.fillStyle = "white";
      ctx.fillText("(esc to go back)", 32, 40+32);
      
      if (twoplayermode) {
        ctx.font = "40px Poppins";
        ctx.fillStyle = "white";
        ctx.fillText("two player mode on!", canvas.width - ctx.measureText("two player mode on!").width - 32, 40+32);
      }

      ctx.font = "120px Poppins";
      ctx.fillText("Select a song!", canvas.width / 2 - ctx.measureText("Select a song!").width/2, canvas.height / 2 - 240);
      ctx.font = "60px Poppins";
      ctx.fillText("(left / right to change difficulty)", canvas.width / 2 - ctx.measureText("(left / right to change difficulty)").width/2, canvas.height / 2 - 160);

      // draw menu options
      ctx.font = "60px Poppins";
      bonusSongList.forEach((song, index) => {
        ctx.globalAlpha = (Math.abs(index - bonusSongList.indexOf(bonusSelectedSong)) < 3) ? 1 - Math.abs(index - bonusSongList.indexOf(bonusSelectedSong)) / 3 : 0;
        ctx.fillStyle = "white";
        ctx.fillText(songs[`${song}-normal`].name, canvas.width / 3 - ctx.measureText(songs[`${song}-normal`].name).width/2, canvas.height / 2 + index * 75 + 120 - bonusSongList.indexOf(bonusSelectedSong) * 75);
      });
      ctx.globalAlpha = 1;
      // draw difficulty image
      ctx.drawImage(diffimages[selectedDifficulty], 2 * canvas.width / 3 - diffimages[selectedDifficulty].width / 2, 2 * canvas.height / 3 - diffimages[selectedDifficulty].height, diffimages[selectedDifficulty].width * 1.5, diffimages[selectedDifficulty].height * 1.5);
      break;
      
    case "achievements":
      menuAnimTime+= ( 75.36 /60)*delta;

      menuOffsetBGY = (menuOffsetBGY * 15 + (songList.indexOf(selectedSong)) * canvas.height * 0.025) / 16;
      // draw bg
      ctx.drawImage(document.getElementById("blissDarkBG"), 
        canvas.width * -(0.1+0.0125*Math.abs(Math.sin(menuAnimTime * Math.PI/2))), 
        canvas.height * -(0.1+0.0125*Math.abs(Math.sin(menuAnimTime * Math.PI/2))) - menuOffsetBGY, 
        canvas.width * (1.2+0.025*Math.abs(Math.sin(menuAnimTime * Math.PI/2))), 
        canvas.height * (1.2+0.025*Math.abs(Math.sin(menuAnimTime * Math.PI/2))));
      
      // draw menu
      ctx.font = "40px Poppins";
      ctx.fillStyle = "white";
      ctx.fillText("(esc to go back)", 32, 40+32);
      
      if (twoplayermode) {
        ctx.font = "40px Poppins";
        ctx.fillStyle = "white";
        ctx.fillText("two player mode on!", canvas.width - ctx.measureText("two player mode on!").width - 32, 40+32);
      }


      // draw menu options
      ctx.font = "48px Poppins";
      Object.entries(achievements).forEach(([key, ach], index) => {
        ctx.globalAlpha = (Math.abs(index - selectedAchievement) < 3) ? 1 - Math.abs(index - selectedAchievement) / 3 : 0;
        ctx.fillStyle = "#303030";
        ctx.fillRect(3*canvas.width / 4 - 384, canvas.height / 3 + (index-selectedAchievement) * 224 + 64 - Math.abs(Math.sin(menuAnimTime * Math.PI/2)) * 8, 768, 192);

        if (document.getElementById(`achievement-${key}`)) ctx.drawImage(document.getElementById(`achievement-${key}`), 3*canvas.width / 4 - 384 + 16, canvas.height / 3 + (index-selectedAchievement) * 224 + 64 + 16 - Math.abs(Math.sin(menuAnimTime * Math.PI/2)) * 8, 160,160);

        ctx.fillStyle = "white";
        ctx.font = "48px Poppins";
        ctx.fillText(ach.title, 3*canvas.width / 4 - 384 + 160 + 48, canvas.height / 3 + (index-selectedAchievement) * 224 + 64 + 64 - Math.abs(Math.sin(menuAnimTime * Math.PI/2)) * 8, 768 - 160 - 64);
        ctx.font = "32px Poppins";
        let lines = getLines(ctx, ach.description, 768 - 160 - 64);
        lines.forEach((line, i) => {
          ctx.fillText(line, 3*canvas.width / 4 - 384 + 160 + 48, canvas.height / 3 + (index-selectedAchievement) * 224 + 64 + 128 + i*32 - Math.abs(Math.sin(menuAnimTime * Math.PI/2)) * 8);
        });
        if (unlockedAchievements.indexOf(key) === -1) {
          ctx.globalAlpha = 1;
          ctx.fillStyle = "#303030EF";
          ctx.fillRect(3*canvas.width / 4 - 384, canvas.height / 3 + (index-selectedAchievement) * 224 + 64 - Math.abs(Math.sin(menuAnimTime * Math.PI/2)) * 8, 768, 192);
          ctx.fillStyle = "white";
          ctx.font = "128px Poppins";
          ctx.fillStyle = "white";
          ctx.fillText("LOCKED", 3*canvas.width / 4 - ctx.measureText("LOCKED").width/2, canvas.height / 3 + (index-selectedAchievement) * 224 + 64 + 192/2 + 48 - Math.abs(Math.sin(menuAnimTime * Math.PI/2)) * 8);
        }
      });
      ctx.globalAlpha = 1;
      ctx.font = "120px Poppins";
      ctx.fillStyle = "white";
      ctx.fillText("Achievements", 2*canvas.width / 7 - ctx.measureText("Achievements").width/2, canvas.height / 2 - 240);
      ctx.font = "60px Poppins";
      ctx.fillText("Total completion:", 2*canvas.width / 7 - ctx.measureText("Total completion:").width/2, canvas.height / 2 - 180);
      ctx.font = "180px Poppins";
      ctx.fillText(`${(100*unlockedAchievements.length/Object.keys(achievements).length).toFixed(1)}%`, 2*canvas.width / 7 - ctx.measureText(`${(100*unlockedAchievements.length/Object.keys(achievements).length).toFixed(1)}%`).width/2, canvas.height / 2);

      // draw achievement bar
      ctx.font = "60px Poppins";
      ctx.fillStyle = "black";
      ctx.fillRect(2*canvas.width / 7 - 3 * canvas.width / 14, canvas.height / 2 + 60, 3 * canvas.width / 7, 128);
      ctx.fillStyle = "white";
      ctx.fillRect(2*canvas.width / 7 - 3 * canvas.width / 14 + 16, canvas.height / 2 + 60 + 16, (3 * canvas.width / 7-32) * (unlockedAchievements.length/Object.keys(achievements).length), 128-32);

      break;
    case "fadeOutBetweenMenuAndGame":
      // draw bg
      ctx.drawImage(document.getElementById("blissDarkBG"), 
        canvas.width * -(0.1+0.0125*Math.abs(Math.sin(menuAnimTime * Math.PI/2))), 
        canvas.height * -(0.1+0.0125*Math.abs(Math.sin(menuAnimTime * Math.PI/2))) - menuOffsetBGY, 
        canvas.width * (1.2+0.025*Math.abs(Math.sin(menuAnimTime * Math.PI/2))), 
        canvas.height * (1.2+0.025*Math.abs(Math.sin(menuAnimTime * Math.PI/2))));
      
      // draw fadeout
      fadeOutTime += 1/25;
      ctx.fillStyle = "black";
      ctx.globalAlpha = fadeOutTime > 1 ? 1 : fadeOutTime;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (fadeOutTime > 4) {
        fadeOutTime = 0;
        if (dialogue) {
          gameState = "dialogue";
          currDialogueMusic.play();
        } else {
          heldKeys = [];
          gameState = "game";
          if (fnfintromode === -1) {
            currMusic.play();
            currVocals.play();
            currVocals2.play();
          }
        }
      }
      ctx.globalAlpha = 1;
      break;
    case "freeplay":
      menuAnimTime+= ( 75.36 /60)*delta;

      menuOffsetBGY = (menuOffsetBGY * 15 + (freeplaySelectedIndex) * canvas.height * 0.00625) / 16;

      // draw bg
      ctx.drawImage(document.getElementById("blissDarkBG"), 
        canvas.width * -(0.1+0.0125*Math.abs(Math.sin(menuAnimTime * Math.PI/2))), 
        canvas.height * -(0.1+0.0125*Math.abs(Math.sin(menuAnimTime * Math.PI/2))) - menuOffsetBGY, 
        canvas.width * (1.2+0.025*Math.abs(Math.sin(menuAnimTime * Math.PI/2))), 
        canvas.height * (1.2+0.025*Math.abs(Math.sin(menuAnimTime * Math.PI/2))));

      // draw menu
      ctx.font = "40px Poppins";
      ctx.fillStyle = "white";
      ctx.fillText("(esc to go back)", 32, 40+32);

      if (twoplayermode) {
        ctx.font = "40px Poppins";
        ctx.fillStyle = "white";
        ctx.fillText("two player mode on!", canvas.width - ctx.measureText("two player mode on!").width - 32, 40+32);
      }

      // draw menu
      ctx.font = "120px Poppins";
      ctx.fillStyle = "white";
      ctx.fillText("freeplay", canvas.width / 2 - ctx.measureText("freeplay").width/2, canvas.height / 2 - 240);

      // draw menu options
      ctx.font = "60px Poppins";
      Object.values(songs).forEach((song, index) => {
        ctx.globalAlpha = (Math.abs(index - freeplaySelectedIndex) < 3) ? 1 - Math.abs(index - freeplaySelectedIndex) / 3 : 0;
        ctx.fillStyle = "white";
        ctx.fillText(song.name, canvas.width / 2 - ctx.measureText(song.name).width/2, canvas.height / 2 + index * 75 + 90 - freeplaySelectedIndex * 75);
      });
      ctx.globalAlpha = 1;
      break;
    case "dialogue":
      // draw current dialogue
      timeInDialogue += 0.01;
      ctx.font = "60px Poppins";
      ctx.setTransform(zoomValue, 0, 0, zoomValue, (-256 - playerPosOffsetX) * cameraX - (zoomValue-1) * (1+cameraX) * canvas.width/3, -playerPosOffsetY * cameraX - (zoomValue-1) * (1+cameraX) * canvas.height/3 );
      if (currBg !== null) ctx.drawImage(currBg, 0, 0);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = "#0000009F";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // draw dialogue image
      // get current speaker
      let currSpeaker = dialogue.lines[currDialogueBox].char;
      if (currSpeaker === "player") currSpeaker = player;

      // draw speaker's image
      ctx.drawImage(opponentImages[currSpeaker].dialogue.src, (opponentImages[currSpeaker].dialogue.side === "left" ? 1 : 3) *canvas.width / 4 - opponentImages[currSpeaker].dialogue.src.width / 2, canvas.height / 3 - opponentImages[currSpeaker].dialogue.src.height / 2);

      // draw dialogue box
      ctx.drawImage(document.getElementById("dialoguebox"), 0, 0);

      // draw text
      ctx.font = "60px Poppins";
      ctx.fillStyle = "black";
      let dl = getLines(ctx,dialogue.lines[currDialogueBox].text.replace("{IP}",ip).slice(0,timeInDialogue * 50),canvas.width - 480 - 60);
      dl.forEach((line, index) => {
        ctx.fillText(line, 240 + 30, 540 + 30 + 60 + index * 60);
      })

      if (currDialogueBox === 0 && timeInDialogue < 0.25) {
        ctx.fillStyle = "#000000";
        ctx.globalAlpha = 1-(timeInDialogue)*4;

        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
      }
      
      break;
    case "game":
      // draw game
      songPos += (bpm/60)*delta;

    case "pause":

      ctx.setTransform(zoomValue, 0, 0, zoomValue, (-256 - playerPosOffsetX) * cameraX - (zoomValue-1) * (1+cameraX) * canvas.width/3, -playerPosOffsetY * cameraX - (zoomValue-1) * (1+cameraX) * canvas.height/3 );

      if (swapMode) {
        // flip canvas horizontally
        ctx.setTransform(1, 0, 0, 1, (-256 - playerPosOffsetX) * -cameraX, -playerPosOffsetY * cameraX);
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }

      if (opponent === "steviejreal") {
        ctx.translate(Math.sin(songPos / 8 * Math.PI) * 48, Math.cos(songPos / 8 * Math.PI) * 48);
      }

      // draw beasley bg
      if (currBg === null) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // draw lines
        ctx.strokeStyle = "#ff00ff";
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 4;
        for (let i = -128 + (songPos*16)%128; i < canvas.width + 256; i+=128) {
          ctx.beginPath();
          ctx.moveTo(i, -256);
          ctx.lineTo(i, canvas.height + 256);
          ctx.stroke(); 
        }

        for (let i = -128 + (songPos*16)%128; i < canvas.height + 128; i+=128) {
          ctx.beginPath();
          ctx.moveTo(-256, i);
          ctx.lineTo(canvas.width + 256, i);
          ctx.stroke(); 
        }

        ctx.globalAlpha = 0.25;
        for (let i = -128 + -(songPos*4)%128; i < canvas.width + 256; i+=128) {
          ctx.beginPath();
          ctx.moveTo(i, -256);
          ctx.lineTo(i, canvas.height + 256);
          ctx.stroke(); 
        }

        for (let i = -128 + (songPos*5)%128; i < canvas.height + 128; i+=128) {
          ctx.beginPath();
          ctx.moveTo(-256, i);
          ctx.lineTo(canvas.width + 256, i);
          ctx.stroke(); 
        }

        ctx.globalAlpha = 0.125;
        for (let i = -256 + (songPos*64)%256; i < canvas.width + 256; i+=256) {
          ctx.beginPath();
          ctx.moveTo(i, -256);
          ctx.lineTo(i, canvas.height + 256);
          ctx.stroke(); 
        }

        for (let i = -256 + -(songPos*8)%256; i < canvas.height + 256; i+=256) {
          ctx.beginPath();
          ctx.moveTo(-256, i);
          ctx.lineTo(canvas.width + 256, i);
          ctx.stroke(); 
        }

        ctx.globalAlpha = 1;
      } else {
        ctx.drawImage(currBg, 0, 0);
      }

      var animationPlayerIsUsing = pAnim;
      var animationOpponentIsUsing = opponentAnim;
      if (swapMode) {
        animationPlayerIsUsing = opponentAnim;
        if (animationPlayerIsUsing === "left") {
          animationPlayerIsUsing = "right";
        } else if (animationPlayerIsUsing === "right") {
          animationPlayerIsUsing = "left";
        }

        animationOpponentIsUsing = pAnim;
        if (animationOpponentIsUsing === "left") {
          animationOpponentIsUsing = "right";
        } else if (animationOpponentIsUsing === "right") {
          animationOpponentIsUsing = "left";
        }
      }
      
      // draw player
      if (squishyTimer > 0) squishyTimer--;

      ctx.drawImage(opponentImages[player][animationPlayerIsUsing].src, 1024 + 256 + 128 + opponentImages[player][animationPlayerIsUsing].offsetX + playerPosOffsetX - (squishyTimer**2), 2*(squishyTimer**2) + canvas.height/2 + opponentImages[player][animationPlayerIsUsing].offsetY - Math.abs(8 * Math.cos(songPos * Math.PI + Math.PI / 2)) + 32 - 128 + playerPosOffsetY, opponentImages[player][animationPlayerIsUsing].src.width + 2*(squishyTimer**2), opponentImages[player][animationPlayerIsUsing].src.height + Math.abs(8 * Math.cos(songPos * Math.PI + Math.PI / 2)) - 2*(squishyTimer**2));

      if (squishyMode) {
        if (heldKeys.length > 0) squishyTimer+=5;
        if (heldKeys.indexOf("left") !== -1 || heldKeys.indexOf("sixkeyleft") !== -1) playerPosOffsetX-=4;
        if (heldKeys.indexOf("right") !== -1 || heldKeys.indexOf("sixkeyright") !== -1) playerPosOffsetX+=4;
        if (squishyTimer > 12) squishyTimer = 12;
      }

      // draw afterimages
      for (let i = 0; i < opponentAfterimages.length; i++) {
        let afterimage = opponentAfterimages[i];
        ctx.globalAlpha = afterimage.alpha;
        // reduce alpha and remove afterimage if alpha is 0
        afterimage.alpha -= 0.05;
        if (afterimage.alpha <= 0) {
          opponentAfterimages.splice(i, 1);
          i--;
        } else {
          if (opponent === "redman" || opponent === "kingFloat") {
            ctx.drawImage(opponentImages[opponent][afterimage.dir].src, 512 + 128 + opponentImages[opponent][afterimage.dir].offsetX - Math.sin(afterimage.pos / 8 * Math.PI) * 96, canvas.height/2 + opponentImages[opponent][afterimage.dir].offsetY - 128 - Math.sin(afterimage.pos / 4 * Math.PI) * 48);
          } else {
            ctx.drawImage(opponentImages[opponent][afterimage.dir].src, 512 + 128 + opponentImages[opponent][afterimage.dir].offsetX, canvas.height/2 + opponentImages[opponent][afterimage.dir].offsetY - Math.abs(8 * Math.cos(afterimage.pos * Math.PI + Math.PI / 2)) + 32 - 128, opponentImages[opponent][afterimage.dir].src.width, opponentImages[opponent][afterimage.dir].src.height + Math.abs(8 * Math.cos(afterimage.pos * Math.PI + Math.PI / 2)));
          }
        }
      }
      ctx.globalAlpha = 1;
      // draw opponent
      if (opponent === "redman" || opponent === "kingFloat") {
        ctx.drawImage(opponentImages[opponent][animationOpponentIsUsing].src, 512 + 128 + opponentImages[opponent][animationOpponentIsUsing].offsetX - Math.sin(songPos / 8 * Math.PI) * 96, canvas.height/2 + opponentImages[opponent][animationOpponentIsUsing].offsetY - 128 - Math.sin(songPos / 4 * Math.PI) * 48);
      } else {
        ctx.drawImage(opponentImages[opponent][animationOpponentIsUsing].src, 512 + 128 + opponentImages[opponent][animationOpponentIsUsing].offsetX, canvas.height/2 + opponentImages[opponent][animationOpponentIsUsing].offsetY - Math.abs(8 * Math.cos(songPos * Math.PI + Math.PI / 2)) + 32 - 128, opponentImages[opponent][animationOpponentIsUsing].src.width, opponentImages[opponent][animationOpponentIsUsing].src.height + Math.abs(8 * Math.cos(songPos * Math.PI + Math.PI / 2)));
      }

      opponentAnimTimer--;
      if (opponentAnimTimer == 0) {
        opponentAnimTimer = -1;
        opponentAnim = "neutral";
      }

      if (botplay) {
        pAnimTimer--;
        if (squishyMode) {
          if (pAnim !== "neutral") squishyTimer+=5;
          if (pAnim === "left") playerPosOffsetX-=4;
          if (pAnim === "right") playerPosOffsetX+=4;
          if (squishyTimer > 12) squishyTimer = 12;

        }
        if (pAnimTimer == 0) {
          pAnimTimer = -1;
          pAnim = "neutral";
        }
      }

      // draw combo particles
      for (let i = 0; i < comboparticles.length; i++) {
        comboparticles[i].x += comboparticles[i].xv;
        comboparticles[i].y += comboparticles[i].yv;
        comboparticles[i].yv += .2;
        comboparticles[i].alpha -= .02;
        if (comboparticles[i].alpha <= 0) {
          comboparticles.splice(i, 1);
          i--;
        } else {
          ctx.globalAlpha = comboparticles[i].alpha;
          ctx.drawImage(comboParticleImages[comboparticles[i].image], comboparticles[i].x, comboparticles[i].y + comboParticleImages[comboparticles[i].image].height/2, comboParticleImages[comboparticles[i].image].width/2, comboParticleImages[comboparticles[i].image].height/2);
        }
      }

      ctx.globalAlpha = 1;

      // reset transform
      if (opponent !== "kingFloat" || opponent !== "benReal") {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      } else {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (selectedDifficulty !== "easy") ctx.translate(Math.sin((songPos - 20) * Math.PI / 16) * 256, Math.sin((songPos - 20) / 8 * Math.PI) * 64);
      }

      if (funMode) {
        ctx.translate(canvas.width/2,canvas.height/2)
        ctx.transform(1,0,0,Math.sin(songPos*Math.PI/4),0,0)
        ctx.translate(-canvas.width/2,-canvas.height/2)
      }
      if (noteMode === "sixKey") {
        ctx.setTransform(0.9, 0, 0, 0.9, 0, 0);
      } else if (noteMode === "nineKey") {
        ctx.setTransform(0.625, 0, 0, 0.625, 0, 0);
      }

      if (opponent === "kingFloat" || opponent === "benReal") {
        if (selectedDifficulty !== "easy") ctx.translate(Math.sin((songPos - 20) * Math.PI / 16) * 256, Math.sin((songPos - 20) / 8 * Math.PI) * 64);
      }

      var notesY = downScroll ? canvas.height - 256 - 64 : 128;
      if (noteMode === "gun") {
        ctx.drawImage(document.getElementById("gunNoteReceptacle"), 1024 - 16,128)
      } else if (noteMode === "sixKey") {
        ctx.drawImage(document.getElementById("sixKeyNoteReceptacle"), 1024 + 64 + 16,128)
      } else if (noteMode === "nineKey") {
        ctx.drawImage(document.getElementById("nineKeyNoteReceptacle"), 1024 + 512 + 16,128)
      } else {
        if (centerMode) {
          ctx.drawImage(document.getElementById("noteReceptacle"), 512 + 128,notesY)
        } else {
          ctx.drawImage(document.getElementById("noteReceptacle"), 1024 + 128,notesY)
        }
      }
      // draw notes
      notes
        .filter(note => note.pos < songPos + 32)
        .forEach(note => {
        // if note is too high, remove it
        if (note.pos-songPos < -1 && songPos > 1) {
          notes.splice(notes.indexOf(note), 1);
          if (note.fake) return;
          accuracyNotes++;
          hp -= 10 * noteDrainMultiplier;
          if (note?.gun) {
            hp = -10000;
            unlockAchievement("gun");
          }
          score -= 10;
          combo = 0;
          currVocals2.volume = 0.01;
          if (Math.random() < 0.9 && (currSongName.indexOf("School This Monday") !== -1 || currSongName.indexOf("Oh god") !== -1)) return;
          isPerfectWeek = false;
          new Audio("mus/miss.ogg").play();
          misses++;
          return;
        }
        // draw note image
        if (noteMode === "sixKey") {
          ctx.drawImage(noteImages[note.dir], 1024 + 64 + 16 + {
            "sixkeyleft": 384 + 48,
            "left": 0,
            "right": 640 + 80,
            "up": 512 + 64,
            "down": 128 + 16,
            "sixkeyright": 256 + 32
          }[note.dir], 128+(note.pos-songPos) * 512 * noteSpeedMult, 128, 128);

        } else if (noteMode === "nineKey") {
          ctx.drawImage(noteImages[note.dir], 1024 + 512 + 16 + {
            "left": 0,
            "right": 384 + 48,
            "up": 256 + 32,
            "down": 128 + 16,
            "center": 512 + 64,
            "sixkeyleft": 0 + 128 + 16 + 512 + 64,
            "sixkeyright": 384 + 48 + 128 + 16 + 512 + 64,
            "sixkeyup": 256 + 32 + 128 + 16 + 512 + 64,
            "sixkeydown": 128 + 16 + 128 + 16 + 512 + 64,
          }[note.dir], 128+(note.pos-songPos) * 512 * noteSpeedMult, 128, 128);

        } else if (noteMode === "gun") {
          let notesX = centerMode ? 512 + 128 : 1024 + 128;
          if (note?.gun) {
            ctx.drawImage(noteImages["danger"], notesX + 128 + 16, notesY+(note.pos-songPos) * (downScroll ? -1 : 1) * 512 * noteSpeedMult, 128, 128);
          } else {
            ctx.drawImage(noteImages[note.dir], notesX + {
              "left": -128-16,
              "right": 384 + 48,
              "up": 256 + 32,
              "down": 0,
            }[note.dir], notesY+(note.pos-songPos) * (downScroll ? -1 : 1) * 512 * noteSpeedMult, 128, 128);
          }
        } else {
          let notesX = centerMode ? 512 + 128 : 1024 + 128;
          if (note?.fake) {
            ctx.drawImage(fakeNoteImages[note.dir], notesX + {
              "left": 0,
              "right": 384 + 48,
              "up": 256 + 32,
              "down": 128 + 16,
            }[note.dir], notesY+(note.pos-songPos) * (downScroll ? -1 : 1) * 512 * noteSpeedMult, 128, 128);
          } else {
            ctx.drawImage(noteImages[note.dir], notesX + {
              "left": 0,
              "right": 384 + 48,
              "up": 256 + 32,
              "down": 128 + 16,
            }[note.dir], notesY+(note.pos-songPos) * (downScroll ? -1 : 1) * 512 * noteSpeedMult, 128, 128);
          }
        }

        if (note.pos-songPos <= bpm/60**2 && botplay && !note?.fake) {
          notes.splice(notes.indexOf(note), 1);
          accuracyNotes++; 
          accuracyScore+=100;
          // set vocal volume to 1
          currVocals2.volume = 1;
          // set enemy animation to note hit
          pAnim = note.dir;
          // if sixkey, set animation to not sixkey
          if (note.dir === "sixkeyleft" || note.dir === "sixkeyright" || note.dir === "sixkeyup" || note.dir === "sixkeydown") {
            pAnim = note.dir.split("key")[1];
          } else if (note.dir === "center") {
            pAnim = "down";
          }
          hp += playerNoteDrain;
          if (hp > 200) hp = 200;
          // increase score, higher if closer to actual note
          score += Math.round(100 - Math.abs(note.pos-songPos) * 100) + combo * 2;
          // set vocal volume to 1
          combo++;
          pAnimTimer = 10;
          if (!swapMode) {
            comboparticles.push({
              x: 1024 + 256 + 128 + playerPosOffsetX,
              y: canvas.height/2 - 128 + playerPosOffsetY,
              xv: 3,
              yv: -3,
              alpha: 1,
              image: Math.abs(note.pos-songPos) < 0.1 ? "sick" :
                Math.abs(note.pos-songPos) < 0.2 ? "good" : "shit"
            })
            if (comboparticles.length > 50) comboparticles.shift();
          }
        }

        if (fnfintromode >= 0) {
          // alright fnf intro mode.
          // play 3 sound at -3 song pos
          if (songPos >= -4 && fnfintromode === 4) {
            fnfintromode = 3;
            new Audio("mus/intro3.ogg").play();
          }
          if (songPos >= -3 && fnfintromode === 3) {
            fnfintromode = 2;
            new Audio("mus/intro2.ogg").play();
          }
          if (songPos >= -2 && fnfintromode === 2) {
            fnfintromode = 1;
            new Audio("mus/intro1.ogg").play();
          }
          if (songPos >= -1 && fnfintromode === 1) {
            fnfintromode = 0;
            new Audio("mus/introGo.ogg").play();
          }
          if (songPos >= 0 && fnfintromode === 0) {
            fnfintromode = -1;
            currMusic.play();
            currVocals.play();
            currVocals2.play();
          }
        }
      });


      if (noteMode === "sixKey") {
        ctx.drawImage(document.getElementById("sixKeyNoteReceptacle"), 64,notesY)
      } else if (noteMode === "nineKey") {
        ctx.drawImage(document.getElementById("nineKeyNoteReceptacle"), 64,notesY)

      } else {
        if (centerMode) {
          ctx.globalAlpha = 0.5;
          ctx.drawImage(document.getElementById("noteReceptacleLeftHalf"), 128,notesY)
          ctx.drawImage(document.getElementById("noteReceptacleRightHalf"), 1024 + 256 + 128,notesY)
        } else {
          ctx.drawImage(document.getElementById("noteReceptacle"), 128,notesY)
        }
      }

      // draw enemy notes
      enemyNotes
        .filter(note => note.pos < songPos + 32)
        .forEach(note => {
        // draw note image
        if (note.dir === "gun") {

        } else if (noteMode === "sixKey") {
          ctx.drawImage(noteImages[note.dir], 64 + {
            "sixkeyleft": 384 + 48,
            "left": 0,
            "right": 640 + 80,
            "up": 512 + 64,
            "down": 128 + 16,
            "sixkeyright": 256 + 32
          }[note.dir], 128+(note.pos-songPos) * 512 * noteSpeedMult, 128, 128);
        } else if (noteMode === "nineKey") {
          ctx.drawImage(noteImages[note.dir], 64 + {
            "left": 0,
            "right": 384 + 48,
            "up": 256 + 32,
            "down": 128 + 16,
            "center": 512 + 64,
            "sixkeyleft": 0 + 128 + 16 + 512 + 64,
            "sixkeyright": 384 + 48 + 128 + 16 + 512 + 64,
            "sixkeyup": 256 + 32 + 128 + 16 + 512 + 64,
            "sixkeydown": 128 + 16 + 128 + 16 + 512 + 64,
          }[note.dir], 128+(note.pos-songPos) * 512 * noteSpeedMult, 128, 128);
        } else {
          if (centerMode) {
            if (note?.fake) {
              ctx.drawImage(fakeNoteImages[note.dir], 128 + {
                "left": 0,
                "right": 1024 + 256 + 128 + 16,
                "up": 1024 + 256,
                "down": 128 + 16,
              }[note.dir], notesY+(note.pos-songPos) * (downScroll ? -1 : 1) * 512 * noteSpeedMult, 128, 128);
            } else {
              ctx.drawImage(noteImages[note.dir], 128 + {
                "left": 0,
                "right": 1024 + 256 + 128 + 16,
                "up": 1024 + 256,
                "down": 128 + 16,
              }[note.dir], notesY+(note.pos-songPos) * (downScroll ? -1 : 1) * 512 * noteSpeedMult, 128, 128);
            }
          } else {
            if (note?.fake) {
              ctx.drawImage(fakeNoteImages[note.dir], 128 + {
                "left": 0,
                "right": 384 + 48,
                "up": 256 + 32,
                "down": 128 + 16,
              }[note.dir], notesY+(note.pos-songPos) * (downScroll ? -1 : 1) * 512 * noteSpeedMult, 128, 128);
            } else {
              ctx.drawImage(noteImages[note.dir], 128 + {
                "left": 0,
                "right": 384 + 48,
                "up": 256 + 32,
                "down": 128 + 16,
              }[note.dir], notesY+(note.pos-songPos) * (downScroll ? -1 : 1) * 512 * noteSpeedMult, 128, 128);
            }
          }
        }

        if (note.pos-songPos < -1) {
          enemyNotes.splice(enemyNotes.indexOf(note), 1);
          if (twoplayermode) {
            // miss
            isPerfectWeek = false;
            new Audio("mus/miss.ogg").play();
            misses++;
            enemyScore -= 10;
            enemyAccuracyNotes++;
            enemyCombo = 0;
          }
        }
        if (note.pos-songPos <= bpm/60**2 && !note?.fake && !twoplayermode) {
          enemyNotes.splice(enemyNotes.indexOf(note), 1);
          // set vocal volume to 1
          currVocals.volume = 1;
          // set enemy animation to note hit
          if (opponentAnimTimer > 37) {
            opponentAfterimages.push({
              dir: opponentAnim,
              alpha: 1,
              pos: note.pos,
            })
          }
          opponentAnim = note.dir;
          // if sixkey, set animation to not sixkey
          if (note.gun) {
            opponentAnim = "gun";
          } else if (note.dir === "sixkeyleft" || note.dir === "sixkeyright" || note.dir === "sixkeyup" || note.dir === "sixkeydown") {
            opponentAnim = note.dir.split("key")[1];
          } else if (note.dir === "center") {
            opponentAnim = "down";
          }
          opponentAnimTimer = 40;
        
          if (opponentNoteDrain > 0) {
            // drain hp, drain less at lower hp
            if (hp > 100) hp -= opponentNoteDrain * 3;
            else hp -= opponentNoteDrain * 2;
            if (hp <= 0) hp = 1; // don't go below 0
          }

          if (swapMode) {
            comboparticles.push({
              x: 1024 + 256 + 128 + playerPosOffsetX,
              y: canvas.height/2 - 128 + playerPosOffsetY,
              xv: 3,
              yv: -3,
              alpha: 1,
              image: Math.abs(note.pos-songPos) < 0.1 ? "sick" :
                Math.abs(note.pos-songPos) < 0.2 ? "good" : "shit"
            })
            if (comboparticles.length > 50) comboparticles.shift();
          }
        }
      });
      ctx.globalAlpha = 1;

      specialNotes.forEach(note => {
        // check if note is hit
        if (note.pos-songPos <= bpm/60**2) {
          if (note.action === "cameraLeft") {
            targetcameraX = 0;
          }
          if (note.action === "cameraRight") {
            targetcameraX = 1;
          }
          if (note.action === "cameraMid") {
            targetcameraX = 1/2;
          }
          if (note.action === "cameraMidLeft") {
            targetcameraX = 1/3;
          }
          if (note.action === "cameraMidRight") {
            targetcameraX = 2/3;
          }
          if (note.action === "setBPM") {
            bpm *= note.value;
            bpm = Number(bpm.toFixed(2));
          }
          if (note.action === "setZoom") {
            targetZoomValue = note.value;
          }
          if (note.action === "flash") {
            flashopacity = 1;
          }
          if (note.action === "setBG") {
            currBg = document.getElementById(note.value);
          }
          if (note.action === "setBGDark") {
            currBgDark = document.getElementById(note.value);
          }
          if (note.action === "setOpponent") {
            opponent = note.value;
          }
          if (note.action === "setOpponentNoteDrain") {
            opponentNoteDrain = note.value;
          }
          if (note.action === "setPlayerNoteDrain") {
            playerNoteDrain = note.value;
          }
          if (note.action === "setNoteMode") {
            noteMode = note.value;
          }
          if (note.action === "setDarkText") {
            darkText = note.value;
          }
          if (note.action === "setPlayerPosOffset") {
            playerPosOffsetX = note.value;
            playerPosOffsetY = note.value;
          }
          // splice note
          specialNotes.splice(specialNotes.indexOf(note), 1);
        }
      });

      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // draw progress bar
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, canvas.height - 16, canvas.width, 16);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, canvas.height - 16, canvas.width * (songPos / endPos), 16);
      
      // draw songpos
      ctx.font = "30px Poppins";
      ctx.fillStyle = darkText ? "black" : "white";
      ctx.fillText(`Song: ${currSongName + (swapMode ? " (Reverse)" : "")}, BPM: ${bpm.toFixed(0)}`, canvas.width - ctx.measureText(`Song: ${currSongName + (swapMode ? " (Reverse)" : "")}, BPM: ${bpm.toFixed(0)}`).width - 16, canvas.height - 28 - Math.abs(Math.sin(songPos*Math.PI/2)) * 8);

      // draw hp

      // draw score
      if (!twoplayermode) {
        ctx.fillStyle = "black";
        ctx.fillRect(canvas.width - 128 - 8, canvas.height/2-400 - 8 - Math.abs(Math.sin(songPos*Math.PI)) * 16, 16 + 16, 800 + 16);
        ctx.fillStyle = opponentNoteDrain > 0 ? "#af2f2f" :"#1984d7";
        ctx.fillRect(canvas.width - 128, canvas.height/2-400 - 8 - Math.abs(Math.sin(songPos*Math.PI)) * 16 + (200-hp)/200 * 800 + 8, 16, (hp)/200 * 800);
  
        ctx.drawImage(opponentNoteDrain > 0 ? document.getElementById("dollarcashOrange") : document.getElementById("dollarcash"), canvas.width - 128 - 64 + 8, canvas.height/2-400 - 8 - Math.abs(Math.sin(songPos*Math.PI)) * 16 + (200-hp)/200 * 800 + 8 - 64, 128, 128);

        ctx.font = "50px Poppins";
        ctx.fillStyle = darkText ? "black" : "white";
        ctx.fillText(`Score: ${score}, Combo: ${combo}, Accuracy: ${accuracyNotes === 0 ? "100.00" : (accuracyScore/accuracyNotes).toFixed(2)}%`, canvas.width/2-ctx.measureText(`Score: ${score}, Combo: ${combo}, Accuracy: ${accuracyNotes === 0 ? "100.00" : (accuracyScore/accuracyNotes).toFixed(2)}%`).width/2, canvas.height-54 - Math.abs(Math.sin(songPos*Math.PI/2)) * 8);
      } else {
        ctx.font = "45px Poppins";
        ctx.fillStyle = darkText ? "black" : "white";
        ctx.fillText(`Score: ${score}, Combo: ${combo}, Accuracy: ${accuracyNotes === 0 ? "100.00" : (accuracyScore/accuracyNotes).toFixed(2)}%`, 3*canvas.width/4-ctx.measureText(`Score: ${score}, Combo: ${combo}, Accuracy: ${accuracyNotes === 0 ? "100.00" : (accuracyScore/accuracyNotes).toFixed(2)}%`).width/2, canvas.height-128);

        ctx.fillStyle = darkText ? "black" : "white";
        ctx.fillText(`Score: ${enemyScore}, Combo: ${enemyCombo}, Accuracy: ${enemyAccuracyNotes === 0 ? "100.00" : (enemyAccuracyScore/enemyAccuracyNotes).toFixed(2)}%`, canvas.width/4-ctx.measureText(`Score: ${enemyScore}, Combo: ${enemyCombo}, Accuracy: ${enemyAccuracyNotes === 0 ? "100.00" : (enemyAccuracyScore/enemyAccuracyNotes).toFixed(2)}%`).width/2, canvas.height-128);
      }
      

      // draw flash
      if (flashopacity > 0) {
        ctx.fillStyle = "white";
        ctx.globalAlpha = flashopacity;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        flashopacity -= .02;
      }
      ctx.globalAlpha = 1;

      // draw perfect icon
      if (weekMode ? isPerfectWeek && (songPos > 68 || weeks[selectedWeek].songs.indexOf(currSong.split("-")[0]) >= 1) : misses === 0 && (songPos > (isUsingFnfIntroMode ? 64 : 68))) {
        ctx.drawImage(document.getElementById("perfect"), 16, 16 - Math.abs(Math.sin(songPos*Math.PI/2)) * 16, 64, 64);
        ctx.fillStyle = "white";
        ctx.font = "64px Poppins";
        ctx.fillText("Go for a Perfect!", 16+64, 8+64 - Math.abs(Math.sin(songPos*Math.PI/2)) * 16);
      }

      if (botplay && !devHideBotplay) {
        // draw botplay watermark
        // first rotate canvas
        ctx.font = "120px Comic Sans MS";
        ctx.fillStyle = darkText ? "#0000001F" : "#FFFFFF1F";
  
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(15 * Math.PI / 8);
        ctx.translate(-canvas.width/2, -canvas.height/2);
        
        // draw [BOTPLAY] in columns
        let botplaywatermarkstring = "[BOTPLAY] ".repeat(35);
        for (let i = - 8; i < 8; i++) {
          ctx.fillText(botplaywatermarkstring, canvas.width/2 - ctx.measureText(botplaywatermarkstring).width/2 + songPos * 8 * Math.pow(-1,i), canvas.height / 2 + i * 150);
        }
      }

      if (hp > 200) hp = 200;

      if (hp <= 0 && !twoplayermode) {
        gameState = "gameover";
        currMusic.pause();
        currVocals.pause();
        currVocals2.pause();
        targetcameraX = 1;

        // play death sound
        new Audio("mus/death.ogg").play();

        deathtime = 0;
      }

      if (songPos > endPos) {
        // you win!
        if (weekMode) {
          if (songPos-endPos >  1) {
            // if we are at final song in week go to week win screen
            if (currSong.split("-")[0] === weeks[selectedWeek].songs[weeks[selectedWeek].songs.length-1]) {
              gameState = "weekwin";

              if (!botplay) {
                // award achievement
                if (selectedWeek === 0) {
                  // tutorial
                  if (selectedDifficulty === "normal") {
                    unlockAchievement("tutorial");
                  } else if (selectedDifficulty === "hard") {
                    unlockAchievement("tutorialhard");
                    if (isPerfectWeek) {
                      unlockAchievement("tutorialperfect");
                    }
                  }
                }
                if (selectedWeek === 1) {
                  // week 1
                  if (selectedDifficulty === "normal") {
                    unlockAchievement("week1");
                  } else if (selectedDifficulty === "hard") {
                    unlockAchievement("week1hard");
                    if (isPerfectWeek) {
                      unlockAchievement("week1perfect");
                    }
                  }
                }
                if (selectedWeek === 2) {
                  // week 1
                  if (selectedDifficulty === "normal") {
                    unlockAchievement("week2");
                  } else if (selectedDifficulty === "hard") {
                    unlockAchievement("week2hard");
                    if (isPerfectWeek) {
                      unlockAchievement("week2perfect");
                    }
                  }
                }
                if (selectedWeek === 3) {
                  // week 1
                  if (selectedDifficulty === "normal") {
                    unlockAchievement("week3");
                  } else if (selectedDifficulty === "hard") {
                    unlockAchievement("week3hard");
                    if (isPerfectWeek) {
                      unlockAchievement("week3perfect");
                    }
                  }
                }
                if (selectedWeek === weeks.length-1) {
                  // secret week !!
                  unlockAchievement("secretweek");
                }

                if (score < 0) {
                  // you lose
                  unlockAchievement("winwithminusscore");
                }
                if (hp < 20) {
                  // you lose
                  unlockAchievement("tisbutascratch");
                }
              }

              // play win sound
              new Audio("mus/win.ogg").play();
              targetcameraX = 1;
    
              // set win time
              winTime = 0;
    
              currMusic.pause();
              currVocals.pause();
              currVocals2.pause();
            } else {
              // go to next song in week
              gameState = "fadeOutBetweenMenuAndGame";
              fadeOutTime = 0;
              startSong(weeks[selectedWeek].songs[weeks[selectedWeek].songs.indexOf(currSong.split("-")[0])+1] + "-" + selectedDifficulty, swapMode);
            }
          }
        } else {
          gameState = "win";

          // play win sound
          new Audio("mus/win.ogg").play();
          targetcameraX = 1;

          // set win time
          winTime = 0;

          unlockAchievement("freedom");

          // stop music
          currMusic.pause();
          currVocals.pause();
          currVocals2.pause();
        }
      }

      if (gameState !== "pause") break;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = "#0000007F";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.font = "120px Poppins";
      ctx.fillText("Paused", canvas.width/2-ctx.measureText("Paused").width/2, canvas.height/2);
      ctx.font = "60px Poppins";
      ctx.fillText("Escape to resume", canvas.width/2-ctx.measureText("Escape to resume").width/2, canvas.height/2 + 75);
      ctx.fillText("Enter to quit", canvas.width/2-ctx.measureText("Enter to quit").width/2, canvas.height/2 + 150);
      break;
    case "gameover":
      // draw gameover

      deathtime += 0.01;

      ctx.setTransform(1, 0, 0, 1, (-256 - playerPosOffsetX) * cameraX, (-playerPosOffsetY) * cameraX);

      if (currBg !== null) ctx.drawImage(currBgDark, 0, 0);

      ctx.font = "120px Poppins";
      ctx.drawImage(opponentImages[player]["death"].src, 1024 + 256 + 128 + playerPosOffsetX + opponentImages[player]["death"].offsetX, canvas.height/2 - 128 + playerPosOffsetY + opponentImages[player]["death"].offsetY);

      ctx.setTransform(1, 0, 0, 1, 0, 0);

      if (deathtime > 2.29) {
        ctx.fillStyle = "#0000007F";
        ctx.fillRect(0, canvas.height / 3, canvas.width, canvas.height / 3);
        let wasted = document.getElementById("wasted");
        ctx.drawImage(wasted, canvas.width / 2 - 638/2, canvas.height/2- 164/2);

        ctx.font = "40px Poppins";
        ctx.fillStyle = "white";
        ctx.fillText(`You got ${(100*songPos/endPos).toFixed(1)}% of the way through!`, canvas.width/2-ctx.measureText(`You got ${(100*songPos/endPos).toFixed(1)}% of the way through!`).width/2, canvas.height/2 + 135);
      }

      if (deathtime < 1) {
        ctx.fillStyle = "white";
        ctx.globalAlpha = 1-deathtime;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
      }
      break;
    case "win":
      // draw win

      deathtime += 0.01;

      ctx.setTransform(1, 0, 0, 1, (-256 - playerPosOffsetX) * cameraX, (-playerPosOffsetY) * cameraX);

      if (currBg !== null) ctx.drawImage(currBgDark, 0, 0);

      ctx.font = "120px Poppins";
      ctx.drawImage(opponentImages[player]["death"].src, 1024 + 256 + 128 + playerPosOffsetX + opponentImages[player]["death"].offsetX, canvas.height/2 - 128 + playerPosOffsetY + opponentImages[player]["death"].offsetY);

      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // draw win text
      ctx.fillStyle = "#0000007F";
      ctx.fillRect(0, canvas.height / 3, canvas.width, canvas.height / 3);

      if (!twoplayermode) {
        ctx.fillStyle = "white";
        ctx.font = "120px Poppins";
        ctx.fillText("You Win!", canvas.width / 2 - ctx.measureText("You Win!").width / 2, canvas.height/2-32);
  
        // draw song and score
        ctx.font = "60px Poppins";
        ctx.fillText(`Score: ${score}, Song: ${currSongName + (swapMode ? " (Reverse)" : "")}, Accuracy: ${accuracyNotes === 0 ? "100.00" : (accuracyScore/accuracyNotes).toFixed(2)}%`, canvas.width/2-ctx.measureText(`Score: ${score + (swapMode ? " (Reverse)" : "")}, Song: ${currSongName}, Accuracy: ${accuracyNotes === 0 ? "100.00" : (accuracyScore/accuracyNotes).toFixed(2)}%`).width/2, canvas.height/2+96);
        if (winTime < 1) {
          ctx.fillStyle = "white";
          ctx.globalAlpha = 1-winTime;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = 1;
          winTime += 0.01;
        }
      } else {
        ctx.fillStyle = "white";
        ctx.font = "120px Poppins";
        // calculate accuracies
        let accuracy = (accuracyScore/accuracyNotes);
        let enemyAccuracy = (enemyAccuracyScore/enemyAccuracyNotes);
        ctx.fillText(enemyAccuracy > accuracy ? "Left Player Wins!" : "Right Player Wins!", canvas.width / 2 - ctx.measureText(enemyAccuracy > accuracy ? "Left Player Wins!" : "Right Player Wins!").width / 2, canvas.height/2-32);

        // draw song and score
        ctx.font = "45px Poppins";
        ctx.fillText(`Song: ${currSongName}`, canvas.width/2-ctx.measureText(`Song: ${currSongName}`).width/2, canvas.height/2+32);

        ctx.font = "45px Poppins";
        ctx.fillText(`Score: ${score}, Accuracy: ${accuracy.toFixed(2)}%`, 3*canvas.width/4-ctx.measureText(`Score: ${score}, Accuracy: ${accuracy.toFixed(2)}%`).width/2, canvas.height/2+96);
        ctx.font = "45px Poppins";
        ctx.fillText(`Score: ${enemyScore}, Accuracy: ${enemyAccuracy.toFixed(2)}%`, canvas.width/4-ctx.measureText(`Score: ${enemyScore}, Accuracy: ${enemyAccuracy.toFixed(2)}%`).width/2, canvas.height/2+96);
        if (winTime < 1) {
          ctx.fillStyle = "white";
          ctx.globalAlpha = 1-winTime;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = 1;
          winTime += 0.01;
        }
      }

      if (botplay && !devHideBotplay) {
        // draw botplay watermark
        // first rotate canvas
        ctx.font = "120px Comic Sans MS";
        ctx.fillStyle = darkText ? "#0000001F" : "#FFFFFF1F";

        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(15 * Math.PI / 8);
        ctx.translate(-canvas.width/2, -canvas.height/2);

        // draw [BOTPLAY] in columns
        let botplaywatermarkstring = "[BOTPLAY] ".repeat(35);
        for (let i = - 8; i < 8; i++) {
          ctx.fillText(botplaywatermarkstring, canvas.width/2 - ctx.measureText(botplaywatermarkstring).width/2 + songPos * 8 * Math.pow(-1,i), canvas.height / 2 + i * 150);
        }

        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      break;
    
    case "weekwin":
      // draw win

      deathtime += 0.01;

      ctx.setTransform(1, 0, 0, 1, (-256 - playerPosOffsetX) * cameraX, (-playerPosOffsetY) * cameraX);

      if (currBg !== null) ctx.drawImage(currBgDark, 0, 0);

      ctx.font = "120px Poppins";
      ctx.drawImage(opponentImages[player]["death"].src, 1024 + 256 + 128 + playerPosOffsetX + opponentImages[player]["death"].offsetX, canvas.height/2 - 128 + playerPosOffsetY + opponentImages[player]["death"].offsetY);

      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // draw win text
      ctx.fillStyle = "#0000007F";
      ctx.fillRect(0, canvas.height / 3, canvas.width, canvas.height / 3);

      if (!twoplayermode) {
        ctx.fillStyle = "white";
        ctx.font = "120px Poppins";
        ctx.fillText("You Win!", canvas.width / 2 - ctx.measureText("You Win!").width / 2, canvas.height/2-32);
  
        // draw song and score
        ctx.font = "60px Poppins";
        ctx.fillText(`You beat ${weeks[selectedWeek].name} on ${selectedDifficulty}!`, canvas.width/2-ctx.measureText(`You beat${weeks[selectedWeek].name} on ${selectedDifficulty}!`).width/2, canvas.height/2+96);
        if (winTime < 1) {
          ctx.fillStyle = "white";
          ctx.globalAlpha = 1-winTime;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = 1;
          winTime += 0.01;
        }
      } else {
        ctx.fillStyle = "white";
        ctx.font = "120px Poppins";
        // calculate accuracies
        let accuracy = (accuracyScore/accuracyNotes);
        let enemyAccuracy = (enemyAccuracyScore/enemyAccuracyNotes);
        ctx.fillText(enemyAccuracy > accuracy ? "Left Player Wins!" : "Right Player Wins!", canvas.width / 2 - ctx.measureText(enemyAccuracy > accuracy ? "Left Player Wins!" : "Right Player Wins!").width / 2, canvas.height/2-32);

        // draw song and score
        ctx.font = "45px Poppins";
        ctx.fillText(`Song: ${currSongName}`, canvas.width/2-ctx.measureText(`Song: ${currSongName}`).width/2, canvas.height/2+32);

        ctx.font = "45px Poppins";
        ctx.fillText(`Score: ${score}, Accuracy: ${accuracy.toFixed(2)}%`, 3*canvas.width/4-ctx.measureText(`Score: ${score}, Accuracy: ${accuracy.toFixed(2)}%`).width/2, canvas.height/2+96);
        ctx.font = "45px Poppins";
        ctx.fillText(`Score: ${enemyScore}, Accuracy: ${enemyAccuracy.toFixed(2)}%`, canvas.width/4-ctx.measureText(`Score: ${enemyScore}, Accuracy: ${enemyAccuracy.toFixed(2)}%`).width/2, canvas.height/2+96);
        if (winTime < 1) {
          ctx.fillStyle = "white";
          ctx.globalAlpha = 1-winTime;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = 1;
          winTime += 0.01;
        }
      }

      if (botplay && !devHideBotplay) {
        // draw botplay watermark
        // first rotate canvas
        ctx.font = "120px Comic Sans MS";
        ctx.fillStyle = darkText ? "#0000001F" : "#FFFFFF1F";

        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(15 * Math.PI / 8);
        ctx.translate(-canvas.width/2, -canvas.height/2);

        // draw [BOTPLAY] in columns
        let botplaywatermarkstring = "[BOTPLAY] ".repeat(35);
        for (let i = - 8; i < 8; i++) {
          ctx.fillText(botplaywatermarkstring, canvas.width/2 - ctx.measureText(botplaywatermarkstring).width/2 + songPos * 8 * Math.pow(-1,i), canvas.height / 2 + i * 150);
        }

        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      break;
    case "characterselect":
      menuAnimTime+= ( 75.36 /60)*delta;

      menuOffsetBGY = (menuOffsetBGY * 15 + (characters.indexOf(player)) * canvas.height * 0.025) / 16;
      csAnimTime+=0.1;
      // draw bg
      ctx.drawImage(document.getElementById("blissDarkBG"), 
        canvas.width * -(0.1+0.0125*Math.abs(Math.sin(menuAnimTime * Math.PI/2))), 
        canvas.height * -(0.1+0.0125*Math.abs(Math.sin(menuAnimTime * Math.PI/2))) - menuOffsetBGY, 
        canvas.width * (1.2+0.025*Math.abs(Math.sin(menuAnimTime * Math.PI/2))), 
        canvas.height * (1.2+0.025*Math.abs(Math.sin(menuAnimTime * Math.PI/2))));

      // draw menu
      ctx.font = "40px Poppins";
      ctx.fillStyle = "white";
      ctx.fillText("(esc to go back)", 32, 40+32);
      // draw menu
      ctx.font = "120px Poppins";
      ctx.fillStyle = "white";
      ctx.fillText("Character Select", canvas.width / 2 - ctx.measureText("Character Select").width/2, canvas.height / 2 - 240);

      // draw menu options
      ctx.font = "60px Poppins";
      characters.forEach((char, index) => {
        ctx.globalAlpha = (Math.abs(index - characters.indexOf(player)) < 3) ? 1 - Math.abs(index - characters.indexOf(player)) / 3 : 0;
        ctx.fillStyle = "white";
        ctx.fillText(char, canvas.width / 2 - ctx.measureText(char).width/2, canvas.height / 2 + index * 75 + 90 - characters.indexOf(player) * 75);
      });
      ctx.globalAlpha = 1;

      let anims = [
        "left",
        "up",
        "right",
        "down",
      ]
      // draw character
      ctx.drawImage(opponentImages[player][anims[Math.floor(csAnimTime)%4]].src, canvas.width * 3 / 4 + opponentImages[player][anims[Math.floor(csAnimTime)%4]].offsetX, canvas.height / 2 + opponentImages[player][anims[Math.floor(csAnimTime)%4]].offsetY);

      break;

  }

  // draw achievements
  if (currentlyDisplayingAchievements.length > 0) {
    currentlyDisplayingAchievements.forEach((achievement, index) => {
      achievement.time++;
      if (achievement.time < 120) {
        ctx.fillStyle = "#000000AF";
        ctx.fillRect(canvas.width-512-16+((120-achievement.time)*23/120)**2, canvas.height - (128 + 32)*(index+1), 512, 128);
        ctx.font = "32px Poppins";
        ctx.fillStyle = "white";
        ctx.fillText("Achievement Unlocked!", canvas.width-512-16+((120-achievement.time)*23/120)**2+128, canvas.height - (128 + 32)*(index+1) + 48);
        ctx.fillText(achievements[achievement.id].title, canvas.width-512-16+((120-achievement.time)*23/120)**2+128, canvas.height - (128 + 32)*(index+1) + 48+64);
        // draw image
        ctx.drawImage(document.getElementById(`achievement-${achievement.id}`), canvas.width-512-16+((120-achievement.time)*23/120)**2 + 16, canvas.height - (128 + 32)*(index+1) + 16, 96,96);
      } else if (achievement.time < 360) {
        ctx.fillStyle = "#000000AF";
        ctx.fillRect(canvas.width-512-16, canvas.height - (128 + 32)*(index+1), 512, 128);
        ctx.font = "32px Poppins";
        ctx.fillStyle = "white";
        ctx.fillText("Achievement Unlocked!", canvas.width-512-16+128, canvas.height - (128 + 32)*(index+1) + 48);
        ctx.fillText(achievements[achievement.id].title, canvas.width-512-16+128, canvas.height - (128 + 32)*(index+1) + 48+64);
        // draw image
        ctx.drawImage(document.getElementById(`achievement-${achievement.id}`), canvas.width-512-16 + 16, canvas.height - (128 + 32)*(index+1) + 16, 96,96);
      } else if (achievement.time < 480) {
        ctx.fillStyle = "#000000AF";
        ctx.fillRect(canvas.width-512-16+((achievement.time-360)*23/120)**2, canvas.height - (128 + 32)*(index+1), 512, 128);
        ctx.font = "32px Poppins";
        ctx.fillStyle = "white";
        ctx.fillText("Achievement Unlocked!", canvas.width-512-16+((achievement.time-360)*23/120)**2+128, canvas.height - (128 + 32)*(index+1) + 48);
        ctx.fillText(achievements[achievement.id].title, canvas.width-512-16+((achievement.time-360)*23/120)**2+128, canvas.height - (128 + 32)*(index+1) + 48+64);
        // draw image
        ctx.drawImage(document.getElementById(`achievement-${achievement.id}`), canvas.width-512-16+((achievement.time-360)*23/120)**2 + 16, canvas.height - (128 + 32)*(index+1) + 16, 96,96);
      } else {
        currentlyDisplayingAchievements.splice(index, 1);
      }
    })
  }
}


setInterval(update, 10);


const hitNote = (note) => {
  let hasHitNote = false;
  accuracyNotes++;
  notes.forEach((n, i) => {
    if (hasHitNote) return;
    if (n.dir == note && Math.abs(n.pos-songPos) < 0.33333) {
      if (n?.fake) {
        notes.splice(i, 1);
        hp -= 25 * noteDrainMultiplier * fakeNoteMultiplier;
        score -= 10;
        isPerfectWeek = false;
        if (hp < 0) unlockAchievement("fatalmiscalculation");
        new Audio("mus/miss.ogg").play();
        misses++;
        combo = 0;
        currVocals.volume = 0.01;
      } else {
        notes.splice(i, 1);
        hp += playerNoteDrain;
        if (hp > 200) hp = 200;
        hasHitNote = true;
        // increase score, higher if closer to actual note
        score += Math.round(100 - Math.abs(n.pos-songPos) * 100) + combo * 2;
        // set vocal volume to 1
        currVocals2.volume = 1;
        combo++;
        accuracyScore += 100;
        if (!swapMode) {
          comboparticles.push({
            x: 1024 + 256 + 128 + playerPosOffsetX,
            y: canvas.height/2 - 128 + playerPosOffsetY,
            xv: 3,
            yv: -3,
            alpha: 1,
            image: Math.abs(n.pos-songPos) < 0.1 ? "sick" :
              Math.abs(n.pos-songPos) < 0.2 ? "good" : "shit"
          })
          if (comboparticles.length > 50) comboparticles.shift();
        }
      }
    }
  });
  if (!hasHitNote) {
    hp-=1 * noteDrainMultiplier;
    score -= 10;
    // play miss sound
    isPerfectWeek = false;
    new Audio("mus/miss.ogg").play();
    misses++;
    combo = 0;
    currVocals.volume = 0.01;
  }
}

const enemyHitNote = (note) => {
  let hasHitNote = false;
  enemyAccuracyNotes++;
  enemyNotes.forEach((n, i) => {
    if (hasHitNote) return;
    if (n.dir == note && Math.abs(n.pos-songPos) < 0.33333) {
      if (n?.fake) {
        enemyNotes.splice(i, 1);
        enemyScore -= 10;
        isPerfectWeek = false;
        new Audio("mus/miss.ogg").play();
        combo = 0;
        currVocals.volume = 0.01;
      } else {
        enemyNotes.splice(i, 1);
        hasHitNote = true;
        // increase score, higher if closer to actual note
        enemyScore += Math.round(100 - Math.abs(n.pos-songPos) * 100) + combo * 2;
        // set vocal volume to 1
        currVocals.volume = 1;
        enemyCombo++;
        enemyAccuracyScore += 100;
        if (!swapMode) {
          comboparticles.push({
            x: 256 + 128,
            y: canvas.height/2 - 128,
            xv: 3,
            yv: -3,
            alpha: 1,
            image: Math.abs(n.pos-songPos) < 0.1 ? "sick" :
              Math.abs(n.pos-songPos) < 0.2 ? "good" : "shit"
          })
          if (comboparticles.length > 50) comboparticles.shift();
        }
      }
    }
  });
  if (!hasHitNote) {
    hp-=1 * noteDrainMultiplier;
    enemyScore -= 10;
    // play miss sound
    isPerfectWeek = false;
    new Audio("mus/miss.ogg").play();
    misses++;
    enemyCombo = 0;
    currVocals.volume = 0.01;
  }
}

// key input
document.addEventListener("keydown", (e) => {
  let key = e.key.toLowerCase();
  if (key === "p") {
    unlockAchievement("p");
  }
  if (e.repeat) return;
  if (gameState === "loading") {
    if (key === "enter" && hasLoadedMenuMusic) {
      gameState = "menu";
      menuAnimTime = 0;
      currentlyPlayingSong = "menu";
      menuMusic.play();
    }
    return;
  } else if (gameState === "menu") {
    if (key === "enter") {
      // run selected menu option's script
      menuOptions[selectedMenuIndex].action(e.shiftKey);
    } else if (key === "arrowup") {
      selectedMenuIndex--;
      if (selectedMenuIndex < 0) selectedMenuIndex = menuOptions.length-1;
    } else if (key === "arrowdown") {
      selectedMenuIndex++;
      if (selectedMenuIndex >= menuOptions.length) selectedMenuIndex = 0;
    } else if (key === "arrowleft") {
      // run left script
      menuOptions[selectedMenuIndex]?.left();
    } else if (key === "arrowright") {
      // run right script
      menuOptions[selectedMenuIndex]?.right();
    }
  } else if (gameState === "settings") {
    if (key === "escape") {
      gameState = "menu";
      selectedMenuIndex = 2;
    } else if (key === "enter") {
      // run selected menu option's script
      settingsOptions[selectedMenuIndex].action(e.shiftKey);
    } else if (key === "arrowup") {
      selectedMenuIndex--;
      if (selectedMenuIndex < 0) selectedMenuIndex = settingsOptions.length-1;
    } else if (key === "arrowdown") {
      selectedMenuIndex++;
      if (selectedMenuIndex >= settingsOptions.length) selectedMenuIndex = 0;
    } else if (key === "arrowleft") {
      // run left script
      settingsOptions[selectedMenuIndex]?.left();
    } else if (key === "arrowright") {
      // run right script
      settingsOptions[selectedMenuIndex]?.right();
    }
  } else if (gameState === "songselect") {
    // song select
    if (key === "arrowup") {
      selectedWeek--;
      if (selectedWeek < 0) selectedWeek = weeks.length-1-(e.shiftKey ? 0 : 1);
    } else if (key === "arrowdown") {
      selectedWeek++;
      if (selectedWeek >= weeks.length - (e.shiftKey ? 0 : 1)) selectedWeek = 0;
    } 
    else if (key === "arrowleft") {
      // pick previous difficulty
      let index = difficulties.indexOf(selectedDifficulty);
      index--;
      if (index < 0) index = difficulties.length-1;
      selectedDifficulty = difficulties[index];
    } else if (key === "arrowright") {
      // pick next difficulty
      let index = difficulties.indexOf(selectedDifficulty);
      index++;
      if (index >= difficulties.length) index = 0;
      selectedDifficulty = difficulties[index];
    } 
    else if (key === "enter") {
      // start song
      weekMode = true;
      isPerfectWeek = true;
      botplay = e.ctrlKey;
      startSong(`${weeks[selectedWeek].songs[0]}-${selectedDifficulty}`, false);
    } else if (key === "escape") {
      // go back to menu
      gameState = "menu";
    }

  } else if (gameState === "bonussongselect") {
    // song select
    if (key === "arrowup") {
      let index = bonusSongList.indexOf(bonusSelectedSong);
      index--;
      if (index < 0) index = bonusSongList.length-1;
      bonusSelectedSong = bonusSongList[index];
    } else if (key === "arrowdown") {
      let index = bonusSongList.indexOf(bonusSelectedSong);
      index++;
      if (index >= bonusSongList.length) index = 0;
      bonusSelectedSong = bonusSongList[index];
    } 
    else if (key === "arrowleft") {
      // pick previous difficulty
      let index = difficulties.indexOf(selectedDifficulty);
      index--;
      if (index < 0) index = difficulties.length-1;
      selectedDifficulty = difficulties[index];
    } else if (key === "arrowright") {
      // pick next difficulty
      let index = difficulties.indexOf(selectedDifficulty);
      index++;
      if (index >= difficulties.length) index = 0;
      selectedDifficulty = difficulties[index];
    } 
    else if (key === "enter") {
      // start song
      botplay = e.ctrlKey;
      weekMode = false;
      startSong(`${bonusSelectedSong}-${selectedDifficulty}`, false);
    } else if (key === "escape") {
      // go back to menu
      gameState = "menu";
    } 

  } else if (gameState === "achievements") {
    // song select
    if (key === "arrowup") {
      selectedAchievement--;
      if (selectedAchievement < 0) selectedAchievement = Object.keys(achievements).length-1;
    } else if (key === "arrowdown") {
      selectedAchievement++;
      if (selectedAchievement >= Object.keys(achievements).length) selectedAchievement = 0;
    } else if (key === "escape") {
      // go back to menu
      gameState = "menu";
    }
  }else if (gameState === "freeplay") {
    // freeplay
    if (key === "arrowup") {
      // move freeplay index
      freeplaySelectedIndex--;
      if (freeplaySelectedIndex < 0) freeplaySelectedIndex = Object.keys(songs).length-1;
    } else if (key === "arrowdown") {
      // move freeplay index
      freeplaySelectedIndex++;
      if (freeplaySelectedIndex >= Object.keys(songs).length) freeplaySelectedIndex = 0;
    } else if (key === "enter") {
      // start song
      botplay = e.ctrlKey;
      if (twoplayermode) botplay = false;
      startSong(Object.keys(songs)[freeplaySelectedIndex], false);
    } else if (key === "escape") {
      // go back to menu
      gameState = "menu";
    }
  } else if (gameState === "characterselect") {
    // wow
    if (key === "arrowup") {
      let index = characters.indexOf(player);
      index--;
      if (index < 0) index = characters.length-1;
      player = characters[index];
      localStorage.setItem("esrcplayer", player);
    } else if (key === "arrowdown") {
      let index = characters.indexOf(player);
      index++;
      if (index >= characters.length) index = 0;
      player = characters[index];
      localStorage.setItem("esrcplayer", player);
    } else if (key === "escape") {
      // go back to menu
      gameState = "menu";
      if (player !== "renderforest") {
        unlockAchievement("costumechange");
      }
    }
  } else if (gameState === "game") {
    if (key === "escape") {
      gameState = "pause";
      currMusic.pause();
      currVocals.pause();
      currVocals2.pause();
    }
    if (botplay) return;
    let tempControlMode = controlMode;
    if (!!twoplayermode) tempControlMode = "arrows";
    if (noteMode === "sixKey") tempControlMode = "sixkey";
    if (noteMode === "nineKey") {
      tempControlMode = "ninekey";
      if (twoplayermode) tempControlMode = "ninekeytwoplayerright";
    }
    if (key === controlModes[tempControlMode].up) {
      if (inputAnimList.indexOf("up") === -1) inputAnimList.push("up");
      pAnim = "up";
      hitNote("up");
      heldKeys.push("up");
    } else if (key === controlModes[tempControlMode].down) {
      if (inputAnimList.indexOf("down") === -1) inputAnimList.push("down");
      pAnim = "down";
      hitNote("down");
      heldKeys.push("down");
    } else if (key === controlModes[tempControlMode].left) {
      if (inputAnimList.indexOf("left") === -1) inputAnimList.push("left");
      pAnim = "left";
      hitNote("left");
      heldKeys.push("left");
    } else if (key === controlModes[tempControlMode].right) {
      if (inputAnimList.indexOf("right") === -1) inputAnimList.push("right");
      pAnim = "right";
      hitNote("right");
      heldKeys.push("right");
    } else if (key === controlModes[tempControlMode]?.sixkeyleft) {
      if (inputAnimList.indexOf("left") === -1) inputAnimList.push("left");
      pAnim = "left";
      hitNote("sixkeyleft");
      heldKeys.push("sixkeyleft");
    } else if (key === controlModes[tempControlMode]?.sixkeyright) {
      if (inputAnimList.indexOf("right") === -1) inputAnimList.push("right");
      pAnim = "right";
      hitNote("sixkeyright");
      heldKeys.push("sixkeyright");
    } else if (key === controlModes[tempControlMode]?.sixkeyup) {
      if (inputAnimList.indexOf("up") === -1) inputAnimList.push("up");
      pAnim = "up";
      hitNote("sixkeyup");
      heldKeys.push("sixkeyup");
    } else if (key === controlModes[tempControlMode]?.sixkeydown) {
      if (inputAnimList.indexOf("down") === -1) inputAnimList.push("down");
      pAnim = "down";
      hitNote("sixkeydown");
      heldKeys.push("sixkeydown");
    } else if (key === controlModes[tempControlMode]?.center && noteMode !== "normal") {
      if (inputAnimList.indexOf("down") === -1) inputAnimList.push("down");
      pAnim = "down";
      hitNote("center");
      heldKeys.push("center");
    }
    // remove duplicates
    heldKeys = [...new Set(heldKeys)];
  } else if (gameState === "pause") {
    if (key === "escape") {
      gameState = "game";
      if (fnfintromode === -1) {
        currMusic.play();
        currVocals.play();
        currVocals2.play();
      }
    } else if (key === "enter") {
      // back to menu
      gameState = "menu";
      hp = 100;
      menuAnimTime = 0;
      menuMusic.play();
      menuMusic.currentTime = 0;
    }
  } else if (gameState === "gameover") {
    if (key === "enter" && deathtime > 2.29) {
      // restart current song
      startSong(currSong, swapMode);
    } else if (key === "escape" && deathtime > 2.29) {
      // restart current song
      gameState = "menu";
      hp = 100;
      menuAnimTime = 0;
      menuMusic.play();
      menuMusic.currentTime = 0;
    }
  } else if (gameState === "win" || gameState === "weekwin") {
    if (key === "enter") {
      gameState = "menu";
      hp = 100;
      menuAnimTime = 0;
      menuMusic.play();
      menuMusic.currentTime = 0;
    }
  } else if (gameState === "dialogue") {
    if (key !== "enter") return;
    if (currDialogueBox === dialogue.lines.length - 1) {
      gameState = "game";
      if (fnfintromode === -1) {
        currMusic.play();
        currVocals.play();
        currVocals2.play();
      }
      currDialogueMusic.pause();
    } else {
      currDialogueBox++;
      timeInDialogue = 0;
    }
  }
});

document.addEventListener("keyup", (e) => {
  let key = e.key.toLowerCase();
  if (gameState === "game") {
    let tempControlMode = controlMode;
    if (twoplayermode) tempControlMode = "arrows";
    if (noteMode === "sixKey") tempControlMode = "sixkey";
    if (noteMode === "nineKey") {
      tempControlMode = "ninekey";
      if (twoplayermode) tempControlMode = "ninekeytwoplayerright";
    }
    if (Object.values(controlModes[tempControlMode]).indexOf(key) !== -1) {
      // get the key that was released
      let releasedNote = null;
      Object.entries(controlModes[tempControlMode]).forEach(([k, v]) => {
        if (v === key) releasedNote = k;
      });
      // remove it from the heldKeys array
      let index = heldKeys.indexOf(releasedNote);
      if (index !== -1) heldKeys.splice(index, 1);

      if (key === controlModes[tempControlMode].up || key === controlModes[tempControlMode]?.sixkeyup) inputAnimList = inputAnimList.filter(i => i !== "up");
      else if (key === controlModes[tempControlMode].down || key === controlModes[tempControlMode]?.sixkeydown || key === controlModes[tempControlMode]?.center) inputAnimList = inputAnimList.filter(i => i !== "down");
      else if (key === controlModes[tempControlMode].left || key === controlModes[tempControlMode]?.sixkeyleft) inputAnimList = inputAnimList.filter(i => i !== "left");
      else if (key === controlModes[tempControlMode].right || key === controlModes[tempControlMode]?.sixkeyright) inputAnimList = inputAnimList.filter(i => i !== "right");
      
      if (inputAnimList.length >= 1) pAnim = inputAnimList[inputAnimList.length-1];  // if there is more than one input, use the last one
      else {
        pAnim = "neutral";
        inputAnimList = [];
      }
    }

    if (twoplayermode) {
      tempControlMode = "wasd";
      if (noteMode === "nineKey") {
        tempControlMode = "ninekeytwoplayerleft";
      }
      if (Object.values(controlModes[tempControlMode]).indexOf(key) !== -1) {
        if (key === controlModes[tempControlMode].up || key === controlModes[tempControlMode]?.sixkeyup) enemyInputAnimList = enemyInputAnimList.filter(i => i !== "up");
        else if (key === controlModes[tempControlMode].down || key === controlModes[tempControlMode]?.sixkeydown || key === controlModes[tempControlMode]?.center) enemyInputAnimList = enemyInputAnimList.filter(i => i !== "down");
        else if (key === controlModes[tempControlMode].left || key === controlModes[tempControlMode]?.sixkeyleft) enemyInputAnimList = enemyInputAnimList.filter(i => i !== "left");
        else if (key === controlModes[tempControlMode].right || key === controlModes[tempControlMode]?.sixkeyright) enemyInputAnimList = enemyInputAnimList.filter(i => i !== "right");
        
        if (enemyInputAnimList.length >= 1) opponentAnim = enemyInputAnimList[enemyInputAnimList.length-1];  // if there is more than one input, use the last one
        else {
          opponentAnim = "neutral";
          enemyInputAnimList = [];
        }
      }
    }
}});