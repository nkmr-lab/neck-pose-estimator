// ==== Neck Angle Estimator 部分（元コードを活かして最小修正） ====

// 映像を表示するコンテナ要素を取得
const videoContainer = document.getElementById("video-container");

// Estimatorをインスタンス化
const estimator = new NeckAngleEstimator({
  apiBaseUrl: "/posture-api", // APIのベースURL
  appId: "8377bb405e8440beb53f092b789279a6", // アプリケーションID
  container: videoContainer, // (任意)
  loginOnStart: true, // start()時にログインを要求
});

// タイプライター速度（首角度で変動）
let delay = 50;

/**
 * 推定結果リスナー
 */
estimator.onEstimate((result) => {
  if (result.neckAngle === null) {
    console.log("キャリブレーション中です");
  } else {
    const resultElement = document.getElementById("neck-angle-result");
    resultElement.innerHTML = `現在の首の角度は${result.neckAngle}度です`;
    if (result.neckAngle > 60) {
      console.warn("首の角度が大きすぎます:", result.neckAngle);
      delay = 800;
    } else if (result.neckAngle > 30) {
      console.warn("首の角度が少し大きいです:", result.neckAngle);
      delay = 500;
    } else if (result.neckAngle > 15) {
      console.log("首の角度は正常です:", result.neckAngle);
      delay = 200;
    } else {
      console.log("首の角度がとても良いです:", result.neckAngle);
      delay = 50;
    }
  }
});

/**
 * エラーリスナー
 */
estimator.onError((error) => {
  if ("data" in error) {
    console.error("APIエラー:", error.data);
  } else {
    console.error("推定エラー:", error);
  }
});

// 推定開始
async function startEstimation() {
  try {
    await estimator.sensor.requestPermission(); // パーミッション要求
    await estimator.start();
    console.log("推定を開始しました。");
    // ★ 推定開始時にチャット入力を解放
    enableChatInput(true);
    renderMsg(
      "assistant",
      "チャットを開始しました。メッセージを入力してください。",
    );
    focusInput();
  } catch (error) {
    console.error("推定の開始に失敗しました:", error);
  }
}
document
  .getElementById("start-button")
  .addEventListener("click", startEstimation);

// 推定停止
function stopEstimation() {
  estimator.stop();
  console.log("推定を停止しました");
}
document
  .getElementById("stop-button")
  .addEventListener("click", stopEstimation);

// ==== ここからチャットUI/処理 ====

// 要素参照
const chatEl = document.getElementById("chat");
const formEl = document.getElementById("input-form");
const inputEl = document.getElementById("input_text");
const sendBtn = document.getElementById("request-button");
const statusEl = document.getElementById("status");

// ⚠ デモ用途のみ。キー直置きは危険です。
const endpoint = "https://api.openai.com/v1/chat/completions";
const apiKey =
  "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"; // ← 実キーをセット（本番NG）
const model = "gpt-4o";

// フロント側の会話履歴（直近だけ送る）
const history = []; // { role: 'user'|'assistant', content: string }

// 入力の有効/無効切り替え
function enableChatInput(on) {
  inputEl.disabled = !on;
  sendBtn.disabled = !on;
  formEl.classList.toggle("disabled", !on);
  formEl.setAttribute("aria-disabled", String(!on));
}
function focusInput() {
  inputEl?.focus();
}

// 吹き出し描画
function renderMsg(role, content) {
  const div = document.createElement("div");
  div.className = `msg ${role}`;
  div.textContent = content;
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
  return div;
}

// タイプライター表示（首角度に応じた delay を使用）
let typingTimer = null;
function typewriter(targetEl, text) {
  if (!targetEl) return;
  // 既存のタイピングがあれば停止
  if (typingTimer) {
    clearTimeout(typingTimer);
    typingTimer = null;
  }
  targetEl.textContent = "";
  const chars = Array.from(text); // サロゲートペア対応
  let i = 0;

  const step = () => {
    if (i < chars.length) {
      targetEl.textContent += chars[i++];
      typingTimer = setTimeout(step, delay);
    } else {
      typingTimer = null;
    }
  };
  step();
}

// 送信処理
async function sendMessage() {
  if (inputEl.disabled) return;
  const userText = inputEl.value.trim();
  if (!userText) return;

  // 自分の発話を即描画＆履歴に追加
  renderMsg("user", userText);
  history.push({ role: "user", content: userText });
  inputEl.value = "";
  statusEl.textContent = "送信中…";

  // 直近の文脈を作成（system + 履歴）
  const systemPrompts = [
    { role: "system", content: "日本語で答えてください。" },
  ];
  const messages = [...systemPrompts, ...history].slice(-12);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 500,
        temperature: 1,
      }),
    });

    if (!response.ok) {
      const errTxt = await response.text().catch(() => "");
      throw new Error(
        `HTTP ${response.status}: ${errTxt || response.statusText}`,
      );
    }

    const data = await response.json();
    const reply =
      data?.choices?.[0]?.message?.content ??
      data?.choices?.[0]?.text ??
      "（返答の読み取りに失敗しました）";

    // アシスタント吹き出しを追加し、タイプライターで流す
    const bubble = renderMsg("assistant", "");
    typewriter(bubble, reply);
    history.push({ role: "assistant", content: reply });

    statusEl.textContent = "完了";
  } catch (err) {
    console.error(err);
    renderMsg("assistant", `（エラー）${err.message || err}`);
    statusEl.textContent = "エラー";
  }
}

// イベント
// 「送信」ボタン（type="button"）
sendBtn.addEventListener("click", sendMessage);

// Enterで送信（inputが有効な時のみ）
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (!sendBtn.disabled) sendMessage();
  }
});

// 初期は入力ロック（HTML側でもdisabled済み）
enableChatInput(false);
