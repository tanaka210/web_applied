
// 敵：作る・入れる・動かす・描く（かたい敵）

// ① 作る：敵を1体作って返す関数
function createEnemy(x, vx) {
  return {
    x: x,
    y: floor.y - 32,
    w: 32,
    h: 32,
    vx: vx,
    alive: true,
    type: "hard",       // 敵の種類
    hitCount: 0         // 踏まれた回数
  };
}

// ② 入れる：敵をまとめて入れる配列
let enemies = [];
enemies.push(createEnemy(200, 80));
enemies.push(createEnemy(380, -120));
enemies.push(createEnemy(540, 60));

// ③ 動かす：配列の敵を1体ずつ取り出して、同じ処理をする
function updateEnemies(dt) {
  for (const enemy of enemies) {
    enemy.x = enemy.x + enemy.vx * dt;

    // 端を越えたら、位置を戻して、向きを反対にする
    if (enemy.x < 0) {
      enemy.x = 0;
      enemy.vx = -enemy.vx;
    }
    if (enemy.x + enemy.w > canvas.width) {
      enemy.x = canvas.width - enemy.w;
      enemy.vx = -enemy.vx;
    }
  }
}

// プレイヤーとぶつかったとき：上から踏んだときだけ
function collideWithEnemies(prevBottom) {
  for (const enemy of enemies) {
    if (aabb(player, enemy) && prevBottom <= enemy.y && player.vy > 0) {

      enemy.hitCount = enemy.hitCount + 1;  // 踏まれた回数を増やす

      if (enemy.hitCount == 2) {
        enemy.alive = false;  // 2回踏まれたら倒す
      }

      player.vy = -JUMP_SPEED / 2;  // 踏んだら少し跳ねる
    }
  }

  // 生きている敵だけを残す
  enemies = enemies.filter((enemy) => enemy.alive);
}

// ④ 描く：配列の敵を1体ずつ取り出して描く
function drawEnemies() {
  for (const enemy of enemies) {

    // 1回踏まれたら色を変える
    if (enemy.hitCount == 1) {
      ctx.fillStyle = "#888888";
    } else {
      ctx.fillStyle = "#ff6b6b";
    }

    ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
  }

  ctx.fillStyle = "#e8eeff";
  ctx.fillText("敵 = " + enemies.length, 10, 40);
}
