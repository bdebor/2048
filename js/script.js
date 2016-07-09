var Game = function(){
	this.grid = this.createGrid();
	this.coordinates = this.createCoordinates();
	this.KEYS = {LEFT: 37, RIGHT: 39, TOP: 38, BOTTOM: 40};
	this.isDrawn = false;
	this.hasMoved = false;

	this.init();
};

Game.prototype = {
	createGrid: function(){
		var grid = {};
		for(var i = 0; i < 16; i++){
			grid[i] = {val: ''};
		}
		return grid;
	},

	createCoordinates: function () {
		return [
			'x0-y0', 'x1-y0', 'x2-y0', 'x3-y0',
			'x0-y1', 'x1-y1', 'x2-y1', 'x3-y1',
			'x0-y2', 'x1-y2', 'x2-y2', 'x3-y2',
			'x0-y3', 'x1-y3', 'x2-y3', 'x3-y3'
		];
	},

	coordinateToPosition: function (sqCoordinate) {
		return this.coordinates.indexOf(sqCoordinate);
	},

	positionToCoordinate: function (sqPosition) {
		return this.coordinates[sqPosition];
	},

	init: function () {
		var indexes = [];
		for(var i = 0; i < 16; i++){
			indexes.push(i);
		}

		for(var i = 0; i < 3; i++){
			var j = Math.floor(Math.random() * indexes.length);
			var sqCoordinate = this.coordinates[indexes[j]];
			var sqValue = 2;
			this.drawSquare(sqCoordinate, sqValue);
			indexes.splice(j, 1);
		}
	},

	updateGrid: function(sqPosition, sqValue){
		this.grid[sqPosition].val = sqValue;
	},

	drawSquare: function(sqCoordinate, sqValue){
		this.isDrawn = false;
		var sqDiv = document.createElement('div');
		sqDiv.className = sqCoordinate;
		sqDiv.innerHTML = sqValue;

		var sqPosition = this.coordinateToPosition(sqCoordinate);
		this.updateGrid(sqPosition, sqValue);

		var that = this;
		setTimeout(function(){
			document.getElementById('game').appendChild(sqDiv);
			that.isDrawn = true; // !!!
		}, 200);
	},

	addSquare: function(){
		var availablePositions = [];
		var keys = Object.keys(this.grid);
		for(i = 0; i < keys.length; i++){
			if(this.grid[i].val == ''){
				availablePositions.push(i);
			}
		}

		if(availablePositions.length == 0){
			this.gameOver();
		}else{
			var sqPosition = Math.floor(Math.random() * availablePositions.length);
			var sqCoordinate = this.positionToCoordinate(availablePositions[sqPosition]);
			var sqValue = 2;
			this.drawSquare(sqCoordinate, sqValue);
		}
	},

	deleteSquares: function(){
		var sqDivs = document.querySelectorAll("#game .delete");
		for(var i = 0, length = sqDivs.length; i < length; i++){
			var sqDiv = sqDivs[i];
			sqDiv.remove(0);
		}
	},

	gameOver: function () {
		console.log('Game over');
	},

	onkeydownWindow: function(keyCode){
		if(this.isDrawn == true){
			this.hasMoved = false;
			var processingOrders = [];
			switch (keyCode) {
				case this.KEYS.TOP:
					processingOrders = [
						['x0-y0', 'x0-y1', 'x0-y2', 'x0-y3'],
						['x1-y0', 'x1-y1', 'x1-y2', 'x1-y3'],
						['x2-y0', 'x2-y1', 'x2-y2', 'x2-y3'],
						['x3-y0', 'x3-y1', 'x3-y2', 'x3-y3']
					];
					break;

				case this.KEYS.BOTTOM:
					processingOrders = [
						['x0-y3', 'x0-y2', 'x0-y1', 'x0-y0'],
						['x1-y3', 'x1-y2', 'x1-y1', 'x1-y0'],
						['x2-y3', 'x2-y2', 'x2-y1', 'x2-y0'],
						['x3-y3', 'x3-y2', 'x3-y1', 'x3-y0']
					];
					break;

				case this.KEYS.LEFT:
					processingOrders = [
						['x0-y0', 'x1-y0', 'x2-y0', 'x3-y0'],
						['x0-y1', 'x1-y1', 'x2-y1', 'x3-y1'],
						['x0-y2', 'x1-y2', 'x2-y2', 'x3-y2'],
						['x0-y3', 'x1-y3', 'x2-y3', 'x3-y3']
					];
					break;

				case this.KEYS.RIGHT:
					vector = [1, 0];
					processingOrders = [
						['x3-y0', 'x2-y0', 'x1-y0', 'x0-y0'],
						['x3-y1', 'x2-y1', 'x1-y1', 'x0-y1'],
						['x3-y2', 'x2-y2', 'x1-y2', 'x0-y2'],
						['x3-y3', 'x2-y3', 'x1-y3', 'x0-y3']
					];
					break;
			}

			for(var i = 0, length = processingOrders.length; i < length; i++){
				this.moveSquares(processingOrders[i]);
			}

			if(this.hasMoved){
				this.deleteSquares();
				this.addSquare();
			}
		}
	},

	moveSquares: function(squares){
		var that  = this; // !!!
		var sqVals = [
			this.grid[this.coordinateToPosition(squares[0])],
			this.grid[this.coordinateToPosition(squares[1])],
			this.grid[this.coordinateToPosition(squares[2])],
			this.grid[this.coordinateToPosition(squares[3])]
		];
		var merges = [0, 0, 0, 0];

		var isSquare = function(index){
			if(sqVals[index].val != ''){
				return true;
			}else{
				return false;
			}
		};

		var isSameValue = function(index1, index2){
			if(sqVals[index1].val == sqVals[index2].val){
				return true;
			}else{
				return false;
			}
		};

		var isMerged = function(index){
			if(merges[index] == 0){
				return false;
			}else{
				return true;
			}
		};

		var move = function(index1, index2){
			if(index1 != index2){
				document.querySelector('.' + squares[index1]).className = squares[index2];

				that.hasMoved = true;
				updateSqVals(index1, index2);
			}
		};

		var merge = function(index1, index2){
			updateSqVals(index1, index2, true);
			var newVal = sqVals[index2].val;
			document.querySelector('.' + squares[index2]).innerHTML = newVal;
			document.querySelector('.' + squares[index1]).className = squares[index2] + ' delete';

			merges[index2] = 1;
			that.hasMoved = true;
		};

		var updateSqVals = function(index1, index2, mergeAction = false){
			var coef = 1;
			if(mergeAction){
				coef = 2;
			}
			var sqval = parseInt(sqVals[index1].val) * coef;
			sqVals[index2].val = sqval;
			sqVals[index1].val = '';
		};

		for(var i = 1; i <= 3; i++){
			if(isSquare(i)){
				var j = i - 1;
				while(j >= 0){
					if(isSquare(j)){
						if(isSameValue(i, j)){
							if(isMerged(j)){
								move(i, j + 1);
							}else{
								merge(i, j);
							}
						}else{
							move(i, j + 1);
						}
						break;
					}else if(j == 0){
						move(i, j);
						break;
					}
					j--;
				}
			}
		}
	}
};

window.onload = function(){
	var game = new Game();
	window.onkeydown = function(e){
		game.onkeydownWindow(e.keyCode);
	};
};

