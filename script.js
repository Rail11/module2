document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    function startGame(gridSize) {
        function createGrid() {
            let grid = document.querySelector('.grid');

            for (let i = 0; i < gridSize; i++) {
                let gridRow = document.createElement('div');

                gridRow.classList.add('grid__row');

                grid.append(gridRow);

                for (let j = 0; j < gridSize; j++) {
                    let gridCell = document.createElement('div');

                    gridCell.classList.add('grid__cell');

                    gridRow.append(gridCell);
                }
            }
        }
        createGrid();

        function getTilePos() {
            return Math.floor(Math.random() * gridSize);
        }

        function get2or4() {
            let tileVal = 0,
                randomNum = Math.floor(Math.random() * 100) + 1;
            if (randomNum <= 90) {
                tileVal = 2;
            } else {
                tileVal = 4;
            }
            return tileVal;
        }

        function createTilesArr() {
            let tilesArr = [];
                
            for (let i = 0; i < gridSize; i++) {
                tilesArr.push([]);
                for (let j = 0; j < gridSize; j++) {
                    tilesArr[i].push(0);
                }
            }
            return tilesArr;
        }
        let tilesArr = createTilesArr();

        function createTileInArr() {
            let x = getTilePos(),
                y = getTilePos(),
                val = get2or4();
            console.log(x, y);
            tilesArr[x][y] = val;
        }
        createTileInArr();
        
        console.log(tilesArr);

        function getCellPos() {
            let cell = document.querySelectorAll('.grid__cell')[7],
                cellPosX = cell.offsetLeft,
                cellPosY = cell.offsetTop;

            return {cellPosX, cellPosY};
        }

        function addTileToGrid() {
            let tile = document.createElement('div'),
                grid = document.querySelector('.grid');

            tile.classList.add('tile');
            tile.style.left = `${getCellPos().cellPosX}px`;
            tile.style.top = `${getCellPos().cellPosY}px`;
            grid.append(tile);
        }

        addTileToGrid();
    }
    startGame(5);
});