// Sponsor data
const sponsors = {
    venue: {
        name: "The Adaptavist Group / Venue.sh",
        logo: "media/logos/adaptavist_venue_sh.png",
        description: "DevOps pros at Adaptavist and Venue.sh enable our cloud deployments and collaborative tools for event infrastructure. Their platforms streamline everything from streaming setups to secure hosting, perfect for CTF environments. Epic support for modern workflows!"
    },
    verkada: {
        name: "Verkada",
        logo: "media/logos/verkada.png",
        description: "Verkada's cutting-edge security cameras and cloud platforms secure our event venues and inspire IoT pentesting workshops. Their tech expertise aligns perfectly with our supply chain security research. Visionary partners!"
    },
    infinite: {
        name: "Infinite Cables",
        logo: "media/logos/infinitecables.png",
        description: "Essential for our tech setups and used in LAN WAR 2.0, Infinite Cables delivers premium networking cables and AV gear that keep our events running smoothly. Infinite Cables hooked us up with 3000 ft of premium cable for LAN WAR 2.0, turning our event into a wired wonderland for massive multiplayer gaming and CTF networking. Their gear ensured zero downtime during intense LAN sessions."
    },
    lenovo: {
        name: "Lenovo",
        logo: "media/logos/lenovo.webp",
        description: "Lenovo's commitment to secure tech innovation fuels our hands-on learning in pentesting and network security. From laptops powering late-night coding sessions to their cybersecurity leadership, they equip us for real-world challenges. Lenovo crushed it by donating a high-spec server rental for LAN WAR 2.0 and TacOps, powering our central hub for game servers, packet captures, and exploit demos. This beast handled everything from EIGRP routing challenges to high-traffic streams flawlessly."
    },
    i3: {
        name: "i3 Solutions Inc",
        logo: "media/logos/i3_solutions.jpg",
        description: "i3 Solutions brings IT excellence to our community with innovative digital solutions and healthcare tech insights. Their sponsorship enhances our events and bridging academia with industry expertise."
    },
    bitsoc: {
        name: "BITSoc",
        logo: "media/logos/bitsoc.png",
        description: "BITSoc builds bridges between Business and IT at Ontario Tech, sparking skills in security and networking. They amplify our events with peer support and professionalism from our Umbrella Society."
    },
    fbit: {
        name: "Faculty of Business & IT @ Ontario Tech University",
        logo: "media/logos/fbit.png",
        description: "Home to Netsoc, the Faculty fuels our passion for cybersecurity through resources, spaces, and guidance. Their backing turns ideas into events wherever possible."
    }
};

// Get elements
const modal = document.getElementById('sponsorModal');
const closeBtn = document.getElementById('closeBtn');
const staticOverlay = document.getElementById('staticOverlay');
const sponsorContent = document.getElementById('sponsorContent');
const sponsorLogo = document.getElementById('sponsorLogo');
const sponsorInfo = document.getElementById('sponsorInfo');
const fileLinks = document.querySelectorAll('.file-link');

// Function to open sponsor modal with dial-up printer effect
async function openSponsor(sponsorKey) {
    const sponsor = sponsors[sponsorKey];
    if (!sponsor) return;

    // Show modal
    modal.classList.remove('hidden');
    
    // Hide content initially
    sponsorContent.classList.remove('visible');
    
    // Show loading text with printer effect
    staticOverlay.classList.add('active');
    const loadingText = 'LOADING...';
    staticOverlay.textContent = '';
    
    // Print loading text character by character (fast)
    for (let i = 0; i < loadingText.length; i++) {
        staticOverlay.textContent += loadingText[i];
        await sleep(40); // 40ms per char = ~320ms total for "LOADING..."
    }
    
    // Wait a bit more
    await sleep(200);
    
    // Hide loading overlay
    staticOverlay.classList.remove('active');
    
    // Prepare sponsor content (hidden)
    sponsorLogo.src = sponsor.logo;
    sponsorLogo.alt = sponsor.name;
    sponsorInfo.innerHTML = `
        <h2>${sponsor.name}</h2>
        <p>${sponsor.description}</p>
    `;
    
    // Show content with printer-style reveal
    sponsorContent.classList.add('visible');
    
    // Simulate printer effect on the description by revealing it character by character
    const descPara = sponsorInfo.querySelector('p');
    const fullText = sponsor.description;
    descPara.textContent = '';
    
    // Calculate delay to fit within remaining time (~480ms left to stay under 1s total)
    const charDelay = Math.max(1, Math.floor(480 / fullText.length));
    
    for (let i = 0; i < fullText.length; i++) {
        descPara.textContent += fullText[i];
        if (charDelay > 1) {
            await sleep(charDelay);
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to close modal
function closeModal() {
    sponsorContent.classList.remove('visible');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Add click listeners to file links
fileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sponsorKey = link.getAttribute('data-sponsor');
        openSponsor(sponsorKey);
    });
});

// Close button listener
closeBtn.addEventListener('click', closeModal);

// Close on background click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});
