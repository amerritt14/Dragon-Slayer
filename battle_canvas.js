window.onload = function() {
  var canvas = document.getElementById('viewport'),
    ctx = canvas.getContext('2d');
  var enemyHeight = 200;
  var enemyWidth = 200;
  var heroHeight = 100;
  var heroWidth = 70;
  var padding = 50

  function drawBackground() {
    backgroundIMG = new Image();
    backgroundIMG.src = 'img/cavebg.png';
    backgroundIMG.onload = function(){
      ctx.drawImage(backgroundIMG, canvas.width, canvas.height);
    }
  }

  function drawEnemy() {
    enemyIMG = new Image();
    enemyIMG.src = 'img/dragon'+(Math.floor(Math.random() * 2) + 1)  +'.png';
    enemyIMG.onload = function(){
      ctx.drawImage(
              enemyIMG,
              canvas.width - enemyWidth - padding,
              canvas.height - enemyHeight - padding - 30,
              enemyWidth,
              enemyHeight
            );
    }
  }

  function drawHero() {
    heroIMG = new Image();
    heroIMG.src = 'img/hero1.png';
    heroIMG.onload = function(){
      ctx.drawImage(
              heroIMG,
              padding,
              canvas.height - heroHeight - padding - 30,
              heroWidth,
              heroHeight
            );
    }
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
    drawBackground();
    drawEnemy();
    drawHero();
    drawHeroHealthbar();
    drawEnemyHealthbar();
  }

  function fight(enemy){
    battle(enemy);
    drawCharacters();
  }

  function fightBttn(enemy){
    var fight = setInterval(fight(enemy), 0600);
  }

  drawCharacters();
}
