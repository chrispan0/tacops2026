// Slot machine icons for spinning effect
const iconNames = ['monetization_on', 'diamond', 'casino', 'lock', 'flash_on', 'emoji_events', 'computer', 'gps_fixed'];
const hackerIcon = 'code';

const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const slotStatus = document.getElementById('slotStatus');
const slotMachine = document.getElementById('slotMachine');
const prizesContent = document.getElementById('prizesContent');

let spinning = false;

// Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Random icon
function getRandomIcon() {
    return iconNames[Math.floor(Math.random() * iconNames.length)];
}

// Create icon HTML
function createIconHTML(iconName) {
    return `<span class="material-icons">${iconName}</span>`;
}

// Spin a single reel
async function spinReel(reel, duration, finalIcon) {
    const startTime = Date.now();
    const interval = 80; // Change icon every 80ms
    
    while (Date.now() - startTime < duration) {
        reel.innerHTML = createIconHTML(getRandomIcon());
        await sleep(interval);
    }
    
    // Set final icon
    reel.innerHTML = createIconHTML(finalIcon);
}

// Main slot machine animation
async function playSlotMachine() {
    if (spinning) return;
    spinning = true;
    
    slotStatus.textContent = '> SPINNING...';
    slotStatus.style.color = '#ffff00';
    
    // Spin all three reels with staggered durations
    const spinPromises = [
        spinReel(reel1, 1000, hackerIcon),
        spinReel(reel2, 1500, hackerIcon),
        spinReel(reel3, 2000, hackerIcon)
    ];
    
    await Promise.all(spinPromises);
    
    // Update status
    slotStatus.textContent = '> JACKPOT! ACCESS GRANTED';
    slotStatus.style.color = '#00ff66';
    
    await sleep(1500);
    
    // Fade out slot machine
    slotMachine.style.opacity = '0';
    await sleep(800);
    
    // Show prizes
    prizesContent.classList.remove('hidden');
    await sleep(50);
    prizesContent.classList.add('visible');
}

// Start animation on page load
window.addEventListener('DOMContentLoaded', () => {
    // Check if slot machine has already played this session
    if (sessionStorage.getItem('slotMachinePlayed') === 'true') {
        // Skip animation, show prizes immediately
        slotMachine.style.display = 'none';
        prizesContent.classList.remove('hidden');
        prizesContent.classList.add('visible');
    } else {
        // Play animation and mark as played
        setTimeout(() => {
            playSlotMachine().then(() => {
                sessionStorage.setItem('slotMachinePlayed', 'true');
            });
        }, 500);
    }
});
