// 各要素
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const circle = document.getElementById('circle');

// 状態管理オブジェクト
const state = {
  deg: 0, // 角度
  velocity: 0, // 初速
  active: false, // 動作状態
};

// スタートクリック
startButton.addEventListener('click', () => {
  if (!state.active) {
    state.active = true;
    state.velocity = 60 + Math.random() * 20;
    roulette();
  }
});

// リセットクリック
resetButton.addEventListener('click', () => {
  state.active = false;
  state.deg = 0;
  setDeg();
});

// 回転処理
function roulette() {
  const { active, velocity } = state;
  if (active && velocity > 0.2) {
    state.deg += velocity;
    state.velocity /= 1.005;
    setDeg();
    setTimeout(roulette, 16); // 16ミリ秒ごとに再帰的に呼び出す
  } else {
    state.active = false;
  }
}

// 角度セット
function setDeg() {
  circle.style.transform = `rotate(${state.deg}deg)`;
}
