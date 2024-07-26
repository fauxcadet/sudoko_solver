const grid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

function createGrid() {
    const table = document.getElementById('sudoku-grid');
    for (let row = 0; row < 9; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < 9; col++) {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = 9;
            input.value = grid[row][col] !== 0 ? grid[row][col] : '';
            input.disabled = grid[row][col] !== 0;
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function isSafe(grid, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num || grid[x][col] === num) {
            return false;
        }
    }

    const startRow = row - row % 3;
    const startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }
    return true;
}

function solveSudoku(grid, row = 0, col = 0) {
    if (row === 9 - 1 && col === 9) {
        return true;
    }
    if (col === 9) {
        row++;
        col = 0;
    }
    if (grid[row][col] !== 0) {
        return solveSudoku(grid, row, col + 1);
    }
    for (let num = 1; num <= 9; num++) {
        if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid, row, col + 1)) {
                return true;
            }
        }
        grid[row][col] = 0;
    }
    return false;
}

function fillGrid() {
    const table = document.getElementById('sudoku-grid');
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = table.rows[row].cells[col].firstChild;
            if (grid[row][col] === 0) {
                cell.value = '';
            } else {
                cell.value = grid[row][col];
            }
        }
    }
}

document.getElementById('solve-button').addEventListener('click', () => {
    if (solveSudoku(grid)) {
        fillGrid();
    } else {
        alert('No solution exists!');
    }
});

createGrid();
