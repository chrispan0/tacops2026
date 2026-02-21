// Animation for terminal window on load
document.addEventListener('DOMContentLoaded', () => {
    const terminalWindow = document.querySelector('.terminal-window');
    
    // Fade in terminal window
    setTimeout(() => {
        terminalWindow.style.opacity = '0';
        terminalWindow.style.transform = 'translateY(20px)';
        terminalWindow.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        requestAnimationFrame(() => {
            terminalWindow.style.opacity = '1';
            terminalWindow.style.transform = 'translateY(0)';
        });
    }, 100);
});
