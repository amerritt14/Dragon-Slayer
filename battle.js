// 2nd file to include
// Contains battle logic
function hero(name, level = 1) {
  this.name         = name;
  this.level        = level;
  this.strength     = 15 + 1.2*level;
  this.constitution = 15 + 1.2*level;
  this.dexterity    = 15 + 1.2*level;
  this.quickness    = 15 + 1.2*level;
  this.maxHP        = 10 + this.constitution * 5;
  this.currentHP    = this.maxHP;
  this.weaponAPS    = 2.5;
  this.weaponDmg    = 2;
  this.attackAPS    = this.weaponAPS * (this.quickness/100 + 1);
  this.xp           = 0;
  this.nextLevel    = 10;
  heroIMG.src = 'img/hero1.png';
  heroIMG.onload = drawHero();
}

class monster {
  constructor(name, level = 0) {
    console.log("making dragon " + name)
    this.name         = name;
    this.level        = level;
    this.strength     = 10 + 1.2*level;
    this.constitution = 10 + 1.2*level;
    this.dexterity    = 10 + 1.2*level;
    this.quickness    = 10 + 1.2*level;
    this.maxHP        = Math.round(this.constitution * 5);
    this.currentHP    = this.maxHP;
    this.weaponAPS    = 1 + .2*level;
    this.weaponDmg    = 1.2*level;
    this.attackAPS    = this.weaponAPS * (this.quickness/100 + 1);
    enemyIMG.src = 'img/dragon'+(Math.floor(Math.random() * 2) + 1)  +'.png';
    enemyIMG.onload = drawEnemy()
  }
}

function hit(attacker, defender) {
  if (attacker.dexterity * (Math.random() + 1) >= defender.dexterity * (Math.random() + 0.7)) {
    return true;
  } else {
      return false;
  }
}

function attackDmg(attacker) {
  return Math.round(attacker.weaponDmg * (Math.random() + Math.random()) * (attacker.strength/100 + 1));
}

function crit() {
  // 10% base crit chance
  return Math.random() < 0.1;
}

function swing(attacker, defender) {
  if (hit(attacker, defender)) {
    damage = attackDmg(attacker);
    hitMessage = "hit"
    if (crit()) {
      // Crits deal 150% of normal damage... +1 avoids 0 damage crits
      round(damage += (damage * 1.5) + 1, 1);
      hitMessage = "CRIT"
    }
    defender.currentHP -= damage;
    if (attacker.name === player.name) {
      attackMessage = "<font color='#ff944d'>You <strong>" + hitMessage + "</strong> " + defender.name + " for " + damage + " damage!</font>";
    } else {
      attackMessage = "<font color='red'>You are <strong>" + hitMessage + "</strong> for " + damage + " damage by " + attacker.name +"!</font>";
    }
  } else {
    if (attacker.name === player.name) {
      attackMessage = "<font color='#b38f00'>You swing but miss!";
    } else {
      attackMessage = attacker.name + " swings but misses!";
    }
  }
  msgLog = document.getElementById("msgLog");
  document.getElementById("msgLog").innerHTML += "<br>" + attackMessage;
  msgLog.scrollTop = msgLog.scrollHeight;
}

function battle(enemy) {
  playerAPS = 0;
  enemyAPS = 0;
  // Prevent interval being triggered multiple times with button clicks
  if(!window.fightInterval){
    window.fightInterval = setInterval(function() { attackRound(enemy) }, framerate);
  }
}

function attackRound(enemy) {
  if (playerAPS <= 0 || enemyAPS <= 0) {
    playerAPS += round(player.attackAPS, 2);
    enemyAPS += round(enemy.attackAPS, 2);
  }
  if (playerAPS >= enemyAPS) {
    swing(player, enemy);
    playerAPS -= 1;
    animateHeroAttack();
    if (checkHealth(enemy)) {
      deathMessage(enemy);
      stopFight();
      stopAttackAnimation();
    }
  } else {
    swing(enemy, player);
    enemyAPS -= 1;
    animateEnemyAttack();
    if (checkHealth(player)) {
      deathMessage(player);
      stopFight();
      stopAttackAnimation();
    }
  }
}

function checkHealth(defender) {
  if(defender.currentHP < 0) { defender.currentHP = 0 };
  drawCharacters();
  return defender.currentHP <= 0;
}

function deathMessage(corpse) {
  msgLog = document.getElementById("msgLog");
  if (player.currentHP <= 0) {
    reset("soft")
    document.getElementById("msgLog").innerHTML += "<font color='red'><strong><br>You have been slain!</strong></font>";
    msgLog.scrollTop = msgLog.scrollHeight;
    return;
  } else {
    reset("soft")
    document.getElementById("msgLog").innerHTML += "<strong><br>You have defeated " + corpse.name + "!</strong>";
    awardXP()
    msgLog.scrollTop = msgLog.scrollHeight;
    return;
  }
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function stopFight() {
  clearInterval(window.fightInterval);
  window.fightInterval = null;
}

function stopAttackAnimation() {
  clearInterval(window.attackInterval);
  window.attackInterval = null;
}

function newEnemy() {
  console.log("Summoning new monster, Dragon(level "+ (player.level + 2) +")" )
  var old = enemy
  window.enemy = new monster("Dragon(level "+ (player.level + 2) +")", player.level + 2);
  console.log("Same? " + old == enemy)
  console.log(enemy.currentHP)
  stopFight()
  stopAttackAnimation()
  drawCharacters()
  drawEnemy()
  drawEnemyHealthbar()
}

function reset(option) {
  stopFight()
  stopAttackAnimation()
  drawCharacters()
  if (option === "hard") {
    player.currentHP = player.maxHP
    enemy.currentHP = enemy.maxHP
    document.getElementById("msgLog").innerHTML = "An enemy has appeared!"
  }
}
