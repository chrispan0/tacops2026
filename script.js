const statusText = document.getElementById("statusText");
const barFill = document.getElementById("barFill");
const granted = document.getElementById("granted");
const codeArea = document.getElementById("codeArea");
const boot = document.getElementById("boot");
const final = document.getElementById("final");
const bootDots = document.getElementById("bootDots");
const navbar = document.getElementById("navbar");

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

async function typeText(el, text) {
    el.innerHTML = "";

    // create blinking cursor
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "█";

    el.appendChild(cursor);

    // helper to insert text BEFORE cursor
    const insertText = (textToInsert) => {
        el.insertBefore(document.createTextNode(textToInsert), cursor);
    };

    // Type text
    for (const ch of text) {
        insertText(ch);
        await sleep(70);
    }

    // Remove cursor after typing
    await sleep(300);
    cursor.remove();
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
        ">> loading assets: tacops2026.pkg (1.2MB)",
        ">> sync clock: ntp_offset=+0.004s",
        ">> permissions: operator_level=5",
        ">> all systems operational. welcome, hacker."
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

    // Show navbar
    navbar.classList.remove("hidden");
    setTimeout(() => {
        navbar.classList.add("visible");
    }, 100);

    const finalTitle = document.querySelector(".final-title");
    const eventDetails = document.getElementById("eventDetails");

    // type out final text
    await typeText(finalTitle, "TACOPS 2026");

    // small pause, then glitch
    await sleep(150);
    finalTitle.classList.add("glitch");

    // optional: remove glitch class after it runs
    await sleep(950);
    finalTitle.classList.remove("glitch");

    // Fade in event details
    await sleep(400);
    eventDetails.classList.add("visible");

    // Initialize and animate map after details are visible
    await sleep(800);
    initMap();
}

async function initMap() {
    // Wait for Leaflet to be loaded
    while (typeof L === 'undefined') {
        await sleep(100);
    }

    const targetLat = 43.945062;
    const targetLng = -78.895891;

    // Initialize map with a zoomed-out view
    const map = L.map('map', {
        center: [targetLat, targetLng],
        zoom: 10,
        zoomControl: false,
        attributionControl: false
    });

    // Add dark-themed tile layer (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
    }).addTo(map);

    // Add custom marker with green glow
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
            width: 20px;
            height: 20px;
            background: var(--green);
            border: 2px solid #000;
            border-radius: 50%;
            box-shadow: 0 0 20px rgba(0,255,102,0.8), 0 0 40px rgba(0,255,102,0.4);
            animation: pulse 2s ease-in-out infinite;
        "></div>
        <style>
            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.2); opacity: 0.8; }
            }
        </style>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    const marker = L.marker([targetLat, targetLng], { icon: customIcon }).addTo(map);

    // Make map clickable to open campus map
    map.on('click', () => {
        window.open('https://ontariotechu.ca/map/?state=location&destination=8ee48f7ce00b47e693fb482a', '_blank');
    });

    // Add visual feedback that map is clickable
    const mapContainer = document.getElementById('map');
    mapContainer.style.cursor = 'pointer';

    // Wait a moment, then animate zoom in
    await sleep(600);
    
    // Smooth zoom animation to the building
    map.flyTo([targetLat, targetLng], 18, {
        duration: 2.5,
        easeLinearity: 0.25
    });
}

// Check if boot animation has already played this session
if (sessionStorage.getItem('bootAnimationPlayed') === 'true') {
    // Skip animation, show final content immediately
    boot.style.display = 'none';
    final.classList.remove('hidden');
    final.style.opacity = '1';
    final.style.transform = 'translateY(0)';
    navbar.classList.remove('hidden');
    navbar.classList.add('visible');
    
    // Show event details
    const eventDetails = document.getElementById("eventDetails");
    eventDetails.classList.add('visible');
    
    // Initialize map even when animation is skipped
    initMap();
} else {
    // Play animation and mark as played
    runSequence().then(() => {
        sessionStorage.setItem('bootAnimationPlayed', 'true');
    });
}

