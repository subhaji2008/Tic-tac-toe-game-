    <script>
        const statusDisplay = document.getElementById('status');
        const cells = document.querySelectorAll('.cell');
        
        let currentPlayer = "X";
        let gameState = ["", "", "", "", "", "", "", "", ""];
        let gameActive = true;

        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        function fireCelebration() {
            // First burst: Small colorful paper (confetti)
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#f43f5e', '#0ea5e9', '#fb923c', '#8b5cf6']
            });

            // Second burst: Flower rain
            const defaults = { spread: 360, ticks: 100, gravity: 0.5, decay: 0.94, startVelocity: 30, shapes: ['circle'], scalar: 2 };
            
            function shootFlowers() {
                confetti({
                    ...defaults,
                    particleCount: 20,
                    scalar: 2,
                    shapes: ['text'],
                    shapeOptions: { text: { value: ['🌸', '🌼', '🌻', '🌺', '🌷'] } }
                });
            }

            setTimeout(shootFlowers, 0);
            setTimeout(shootFlowers, 200);
            setTimeout(shootFlowers, 400);
        }

        function handleCellClick(e) {
            const clickedCell = e.target;
            const idx = parseInt(clickedCell.getAttribute('data-index'));

            if (gameState[idx] !== "" || !gameActive) return;

            gameState[idx] = currentPlayer;
            clickedCell.innerText = currentPlayer;
            clickedCell.classList.add(currentPlayer);

            checkResult();
        }

        function checkResult() {
            let roundWon = false;
            let winIndices = [];

            for (let condition of winningConditions) {
                const [a, b, c] = condition;
                if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                    roundWon = true;
                    winIndices = [a, b, c];
                    break;
                }
            }

            if (roundWon) {
                statusDisplay.innerHTML = `<span style="color: gold">🎉 Player ${currentPlayer} Wins! 🎉</span>`;
                gameActive = false;
                winIndices.forEach(i => cells[i].classList.add('winner'));
                fireCelebration();
                return;
            }

            if (!gameState.includes("")) {
                statusDisplay.innerText = "It's a Draw! 🤝";
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusDisplay.innerText = `Player ${currentPlayer}'s Turn`;
        }

        function resetGame() {
            currentPlayer = "X";
            gameState = ["", "", "", "", "", "", "", "", ""];
            gameActive = true;
            statusDisplay.innerText = "Player X's Turn";
            cells.forEach(cell => {
                cell.innerText = "";
                cell.className = 'cell';
            });
        }

        cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    </script>