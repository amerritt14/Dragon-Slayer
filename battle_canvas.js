// 1st file to include
// Contains rendering logic
var canvas = document.getElementById('viewport'),
  ctx = canvas.getContext('2d');
var enemyHeight = 200;
var enemyWidth = 200;
var heroHeight = 100;
var heroWidth = 70;
var padding = 50
var enemyIMG = new Image();
var heroIMG = new Image();
var enemyDX = 0;
var heroDX = 0;
var framerate = 33 // 33ms is ~30 fps

// Enemy on the right
function drawEnemy() {
  ctx.drawImage(
          enemyIMG,
          canvas.width - enemyWidth - padding - enemyDX,
          canvas.height - enemyHeight - padding - 30,
          enemyWidth,
          enemyHeight
        );
}

// Hero on the left
function drawHero() {
  ctx.drawImage(
          heroIMG,
          padding + heroDX,
          canvas.height - heroHeight - padding - 30,
          heroWidth,
          heroHeight
        );
}

function drawHeroHealthbar() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#fff";
  var name = player.name;
  var nameCenter = ctx.measureText(name).width/2;
  var health = player.currentHP+"/"+player.maxHP;
  var healthCenter = ctx.measureText(health).width/2;
  ctx.fillText(name, padding + heroWidth/2 - nameCenter, canvas.height - 30)
  ctx.fillText(health, padding + heroWidth/2 - healthCenter, canvas.height - 8);
}

function drawEnemyHealthbar() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#fff";
  var name = enemy.name;
  var nameCenter = ctx.measureText(name).width/2;
  var health = enemy.currentHP+"/"+enemy.maxHP;
  var healthCenter = ctx.measureText(health).width/2;
  ctx.fillText(name, canvas.width - nameCenter - padding - enemyWidth/2 , canvas.height - 30);
  ctx.fillText(health, canvas.width - healthCenter - padding - enemyWidth/2 , canvas.height - 8);
}

function drawCharacters() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawEnemy();
  drawHero();
  drawHeroHealthbar();
  drawEnemyHealthbar();
}

function animateEnemyAttack() {
  stopFight();
  direction = 4;
  enemyDX += direction;
  window.attackInterval = setInterval( function() {
    // At 60 pixels, reverse the direction
    if (enemyDX === 60) {
      console.log("Switched directions. enemyDX: " + enemyDX + "and direction: " + direction);
      direction = -direction;
      console.log("Direction after switch: " + direction);
    }
    enemyDX += direction;
    console.log("enemyDX += direction = enemyDX: " + enemyDX + " += " + direction + " = " + enemyDX);
    drawCharacters();
    if (enemyDX === 0){
      // Stop Animation
      stopAttackAnimation();
      // Resume attack logic
      if(!window.fightInterval){
        window.fightInterval = setInterval(function() { attackRound(enemy) }, framerate);
      }
    }
  }, framerate);

}

function animateHeroAttack() {
  // Pause swings before starting the animation
  stopFight();
  direction = 4;
  heroDX += direction;
  window.attackInterval = setInterval( function() {
    // At 60 pixels, reverse the direction
    if (heroDX === 60) {
      console.log("Switched directions. heroDX: " + heroDX + "and direction: " + direction);
      direction = -direction;
      console.log("Direction after switch: " + direction);
    }
    heroDX += direction;
    console.log("heroDX += direction = heroDX: " + heroDX + " += " + direction + " = " + heroDX);
    drawCharacters();
    if (heroDX === 0){
      // Stop Animation
      stopAttackAnimation();
      // Resume attack logic
      if(!window.fightInterval){
        window.fightInterval = setInterval(function() { attackRound(enemy) }, framerate);
      }
    }
  }, framerate);
}


// Draws characters initially
window.onload = function() {
  drawCharacters();
}
