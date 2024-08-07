let score = 0;
let gameInterval;
let gameActive = false;

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('coin').addEventListener('click', increaseScore);

function startGame() {
    if (gameActive) return; // Prevent multiple starts
    gameActive = true;
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('start-button').disabled = true;
    document.getElementById('coin').classList.add('active');

    gameInterval = setTimeout(() => {
        gameActive = false;
        clearTimeout(gameInterval);
        document.getElementById('start-button').disabled = false;
        document.getElementById('coin').classList.remove('active');
        alert(`Game Over! Your score is ${score}`);
    }, 30000); // Game lasts 30 seconds
}

function increaseScore() {
    if (!gameActive) return;
    score++;
    document.getElementById('score').textContent = score;
    animateCoin();
}

function animateCoin() {
    const coin = document.getElementById('coin');
    coin.style.transform = 'scale(1.2)';
    setTimeout(() => {
        coin.style.transform = 'scale(1)';
    }, 200);
}

document.getElementById('connect-wallet').addEventListener('click', connectWallet);

async function connectWallet() {
    if (window.solana) {
        try {
            await window.solana.connect();
            const walletAddress = window.solana.publicKey.toString();
            alert(`Connected to wallet: ${walletAddress}`);
        } catch (error) {
            console.error('Error connecting to wallet:', error);
        }
    } else {
        alert('Solana wallet not found! Please install a Solana wallet extension.');
    }
}
