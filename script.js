document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    function startGame(gridSize) {
        let tilesArray = createTilesArray();

        // Создание массива для хранения значений плиток.
        function createTilesArray() {
            let tilesArray = [];

            for (let i = 0; i < gridSize; i++) {
                tilesArray.push([]);
                for (let j = 0; j < gridSize; j++) {
                    tilesArray[i].push(0);
                }
            }
            return tilesArray;
        }

        // Создание вёрстки клеток исходя из gridSize.
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

        // Получение случайного числа в диапозоне от 0 до указаного в gridSize.
        function getRandomNum() {
            return Math.floor(Math.random() * gridSize);
        }

        // Получение значения числа 2 или 4.
        function get2or4() {
            let tileValue = 0,
                randomNum = Math.floor(Math.random() * 100) + 1;

            if (randomNum <= 90) {
                tileValue = 2;
            } else {
                tileValue = 4;
            }
            return tileValue;
        }

        // Проверка есть ли место в массиве для хранения значений плиток.
        function checkEmptyTileInTilesArray(array) {
            let result = false;
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array.length; j++) {
                    if (array[i][j] == 0) {
                        result = true;
                        break;
                    }
                }
            }
            return result;
        }

        // Добавление плитки в вёрстку по позиции клетки.
        function addTileToGrid(position, value) {
            let tile = document.createElement('div'),
                grid = document.querySelector('.grid'),
                tileInGridPosX = position.cellPosX,
                tileInGridPosY = position.cellPosY;

            tile.classList.add('tile');
            if (value === 2) {
                tile.classList.add('tile-2');
            } else if (value === 4) {
                tile.classList.add('tile-4');
            }
            tile.style.left = `${tileInGridPosX}px`;
            tile.style.top = `${tileInGridPosY}px`;
            tile.textContent = `${value}`;
            grid.append(tile);
        }

        // Получение позиции клетки, где будет потом расположена плитка.
        function getCellPos(x, y) {
            // Получение номера клетки, где будет расположена плитка.
            let cellNum = x * gridSize + y;
            // Получение клетки и его положения, где будет расположена плитка. 
            let cell = document.querySelectorAll('.grid__cell')[`${cellNum}`],
                cellPosX = cell.offsetLeft,
                cellPosY = cell.offsetTop;

            return {
                cellPosX,
                cellPosY
            };
        }

        // Добавление значения плитки в массив.
        function addTileInArray() {
            if (checkEmptyTileInTilesArray(tilesArray)) {
                let tileInArrayPosX = getRandomNum(),
                    tileInArrayPosY = getRandomNum(),
                    tileValue = get2or4();
                do {
                    tileInArrayPosX = getRandomNum();
                    tileInArrayPosY = getRandomNum();
                } while (tilesArray[tileInArrayPosX][tileInArrayPosY] != 0);

                tilesArray[tileInArrayPosX][tileInArrayPosY] = tileValue;

                return {
                    tileInArrayPosX,
                    tileInArrayPosY,
                    tileValue
                };
            } else {
                return false;
            }
        }

        // Создание плитки в массиве и его добавление в клетку.
        function createTile() {
            let tileInArray = addTileInArray();
            if (tileInArray != false) {
                let tileInArrayPosX = tileInArray.tileInArrayPosX,
                    tileInArrayPosY = tileInArray.tileInArrayPosY,
                    tileValue = tileInArray.tileValue;
                addTileToGrid(getCellPos(tileInArrayPosX, tileInArrayPosY), tileValue);
            } else {
                alert('GAME OVER');
            }
        }
        createTile();
        createTile();

        document.addEventListener(`keydown`, (e) => {
            if (e.code == `ArrowRight`) {
                createTile();
            }
        });
        console.log(tilesArray);
        // добавление передвижений плитки
        // добавление складываения плиток в зависимости от направлений передвижения
    }
    startGame(5);
});