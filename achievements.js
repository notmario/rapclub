// wow its a different js file

// alright achievements time

const achievements = {
}

let unlockedAchievements = [];

let currentlyDisplayingAchievements = [];

// load the achievements from local storage
if (localStorage.getItem("rapclubunlockedAchievements") != null) {
  unlockedAchievements = JSON.parse(localStorage.getItem("rapclubunlockedAchievements"));
}

const unlockAchievement = (achievement) => {
  return false;
  if (unlockedAchievements.includes(achievement)) {
    return;
  }
  setTimeout(()=>{new Audio("mus/achievement.ogg").play();}, currentlyDisplayingAchievements.length*300)
  currentlyDisplayingAchievements.push({
    id: achievement,
    time: -currentlyDisplayingAchievements.length*30,
  });
  unlockedAchievements.push(achievement);
  localStorage.setItem("rapclubunlockedAchievements", JSON.stringify(unlockedAchievements));
}