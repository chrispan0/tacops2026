const statusText = document.getElementById("statusText");
const barFill = document.getElementById("barFill");
const granted = document.getElementById("granted");
const codeArea = document.getElementById("codeArea");
const boot = document.getElementById("boot");
const final = document.getElementById("final");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function playDots(el, cycles = 2) {
    el.textContent = "";
    for (let i = 0; i < cycles; i++) {
        el.textContent = ".";
        await sleep(200);
        el.textContent = "..";
        await sleep(200);
        el.textContent = "...";
        await sleep(280);

        el.textContent = "..";
        await sleep(140);
        el.textContent = ".";
        await sleep(140);
        el.textContent = "";
        await sleep(200);
    }
}

async function fillBar({ label, durationMs }) {
    statusText.textContent = label;
    barFill.style.width = "0%";

    const start = performance.now();
    while (true) {
        const now = performance.now();
        const t = Math.min(1, (now - start) / durationMs);

        // Ease-out fill for nicer feel
        const eased = 1 - Math.pow(1 - t, 3);
        barFill.style.width = `${Math.floor(eased * 100)}%`;

        if (t >= 1) break;
        await sleep(16);
    }

    await sleep(250);
}

async function typeFinalTitle(el, line1, line2) {
    el.innerHTML = "";

    // create blinking cursor
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "█";

    el.appendChild(cursor);

    // helper to insert text BEFORE cursor
    const insertText = (text) => {
        el.insertBefore(document.createTextNode(text), cursor);
    };

    // Type first line
    for (const ch of line1) {
        insertText(ch);
        await sleep(70);
    }

    // Pause, then new line
    await sleep(450);
    insertText("\n");

    // Type second line
    for (const ch of line2) {
        insertText(ch);
        await sleep(70);
    }

    // leave cursor blinking at end
}

async function typeLines(lines, { charDelay = 18, lineDelay = 140 } = {}) {
    codeArea.textContent = "";
    for (const line of lines) {
        for (const ch of line) {
            codeArea.textContent += ch;
            await sleep(charDelay);
        }
        codeArea.textContent += "\n";
        await sleep(lineDelay);
    }
}

async function runSequence() {
    // Pre-boot dots animation
    statusText.textContent = "Initializing";
    await playDots(bootDots, 2);

    // Step 1: Loading
    await fillBar({ label: "Loading", durationMs: 1800 });

    // Step 2: Authorizing
    await fillBar({ label: "Authorizing", durationMs: 2000 });

    bootDots.textContent = "";

    // Step 3: Access Granted fade in/out (3 times)
    statusText.textContent = "Authorized";
    granted.classList.remove("hidden");
    granted.classList.add("flash");

    // wait for animation (3 seconds)
    await sleep(3000);

    // leave it visible at the end
    granted.classList.remove("flash");
    granted.style.opacity = "1";


    // Step 4: random code typing out
    const lines = [
        ">> init secure_channel(0xA7F1)",
        ">> handshake: rsa2048_ok  aes_gcm_ok",
        ">> verifying checksum... PASS",
        ">> loading assets: trailer_v1.mp4",
        ">> sync clock: ntp_offset=+0.004s",
        ">> permissions: operator_level=5",
        ">> all systems nominal. welcome, operator."
    ];

    await typeLines(lines, { charDelay: 16, lineDelay: 170 });
    await sleep(600);

    // Step 5: clear code + transition
    codeArea.textContent = "";
    await sleep(250);

    // Step 6: hide boot screen
    boot.classList.add("hidden");

    // create ellipsis element
    const dots = document.createElement("div");
    dots.className = "ellipsis";
    document.body.appendChild(dots);

    // animate ... typing backwards/forwards (3 times)
    for (let i = 0; i < 3; i++) {
        dots.textContent = ".";
        await sleep(200);
        dots.textContent = "..";
        await sleep(200);
        dots.textContent = "...";
        await sleep(300);

        dots.textContent = "..";
        await sleep(150);
        dots.textContent = ".";
        await sleep(150);
        dots.textContent = "";
        await sleep(200);
    }

    // remove dots
    dots.remove();

    // tiny pause before title
    await sleep(300);

    // show final container
    final.classList.remove("hidden");

    const finalTitle = document.querySelector(".final-title");

    // type out final text
    await typeFinalTitle(finalTitle, "TACOPS 2026", "COMING SOON");

    // small pause, then glitch
    await sleep(150);
    finalTitle.classList.add("glitch");

    // optional: remove glitch class after it runs
    await sleep(950);
    finalTitle.classList.remove("glitch");
}

runSequence();

