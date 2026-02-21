document.addEventListener('DOMContentLoaded', () => {
    const terminalWindow = document.getElementById('terminalWindow');
    
    setTimeout(() => {
        terminalWindow.classList.add('visible');
    }, 100);
});
