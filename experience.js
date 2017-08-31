// 4th file to include
// Contains experience structure for the hero and how it's awarded

function awardXP() {
  var earnedXp = enemy.level + Math.pow(enemy.level, 2)
  player.xp += earnedXp
  document.getElementById("msgLog").innerHTML += "<font color = 'blue'><br> You have gained " + earnedXp + " experience points!</font>"
  levelUp()
}

function levelUp() {
  console.log(player.xp +"/"+ player.nextLevel)
  if (player.xp >= player.nextLevel) {
    // Level up
    player.level += 1
    // Set next level xp
    player.nextLevel = 10 * Math.sqrt(player.nextLevel)
    // Reset health
    player.currentHP = player.maxHP
    drawHeroHealthbar()
    document.getElementById("msgLog").innerHTML += "<font color = 'blue'><br> You have grown to level " + player.level + "!</font>"
    // Check to see if xp was enough to level up again
    levelUp()
  }
}
