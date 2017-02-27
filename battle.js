function hero(name, level = 1) {
  this.name         = name;
  this.level        = level;
  this.strength     = 15 + 1.2*level;
  this.constitution = 15 + 1.2*level;
  this.dexterity    = 15 + 1.2*level;
  this.quickness    = 15 + 1.2*level;
  this.health       = 10 + this.constitution * 5;
  this.weaponAPS    = 2.5;
  this.weaponDmg    = 2;
  this.attackAPS    = this.weaponAPS * (this.quickness/100 + 1);
}

class monster {
  constructor(name, level = 0) {
    this.name         = name;
    this.level        = level;
    this.strength     = 10 + 1.2*level;
    this.constitution = 10 + 1.2*level;
    this.dexterity    = 10 + 1.2*level;
    this.quickness    = 10 + 1.2*level;
    this.health       = Math.round(this.constitution * 5);
    this.weaponAPS    = 1 + .2*level;
    this.weaponDmg    = 1.2*level;
    this.attackAPS    = this.weaponAPS * (this.quickness/100 + 1);
  }

}

function hit(attacker, defender) {
  if (attacker.dexterity * (Math.random() + 1) >= defender.dexterity * (Math.random() + .7)) {
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
  return Math.random() < .1;
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
    defender.health -= damage;
    if (attacker.name === player.name) {
      attackMessage = "You " + hitMessage + " " + defender.name + " for " + damage + " damage!";
    } else {
      attackMessage = "You are " + hitMessage + " for " + damage + " damage by " + attacker.name +"!";
    }
  } else {
    if (attacker.name === player.name) {
      attackMessage = "You swing but miss!";
    } else {
      attackMessage = attacker.name + " swings but misses!";
    }
  }
  console.log(attackMessage)
}

function battle(enemy) {
  playerAPS = 0
  enemyAPS = 0
  var attackTimer = window.setInterval(function() {
    if (playerAPS <= 0 || enemyAPS <= 0) {
      playerAPS += round(player.attackAPS, 2);
      enemyAPS += round(enemy.attackAPS, 2);
    }
    if (playerAPS >= enemyAPS) {
      swing(player, enemy);
      playerAPS -= 1;
      if (checkHealth(enemy)) {
        deathMessage(enemy);
        clearInterval(attackTimer);
      }
    } else {
      swing(enemy, player);
      enemyAPS -= 1;
      if (checkHealth(player)) {
        deathMessage(player);
        clearInterval(attackTimer);
      }
    }
  }, 0500);
}

function checkHealth(defender) {
 return defender.health <= 0;
}

function deathMessage(corpse) {
  if (player.health <= 0) {
    console.log ("You have been slain!");
    return;
  } else {
    console.log ("You have defeated " + corpse.name + "!");
    return;
  }
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function reset() {
  player.health = 20 + player.constitution * 5;
  dragon.health = Math.round(0 + dragon.constitution * 5);
}
