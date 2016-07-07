(function(){
	var Game = function(){
		this.grid = this.createGrid();
		this.coordinates = this.createCoordinates();
		this.KEYS = {LEFT: 37, RIGHT: 39, TOP: 38, BOTTOM: 40, SPACE: 32};
		this.isDrawn;

		this.init();

		//	['x0-y0', 'x1-y0', 'x2-y0', 'x3-y0'],
		//	['x0-y1', 'x1-y1', 'x2-y1', 'x3-y1'],
		//	['x0-y2', 'x1-y2', 'x2-y2', 'x3-y2'],
		//	['x0-y3', 'x1-y3', 'x2-y3', 'x3-y3']

		vector = [1, 0]; // LEFT
		var array = [];
		for(var y = 0; y <= 3; y++){
			for(var x = 0; x <= 3; x++){
				array.push('x'+x+'-y'+y);
			}
			//moveSquares(squares);
		}
		console.log(array);
	};

	Game.prototype = {
		//createGrid: function(){
		//	var grid = [];
		//	for(var x = 0; x <= 3; x++){
		//		grid[x] = [];
		//		for(var y = 0; y <= 3; y++){
		//			grid[x][y] = '';
		//		}
		//	}
		//	return grid;
		//},
		
		createGrid: function(){
			//var grid = [];
			//for(var i = 0; i < 16; i++){
			//	grid[i] = '';
			//}
			//return grid;
			return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
		},

		createCoordinates: function(){
			//var coordinates = [];
			//for(var y = 0; y <= 3; y++){
			//	for(var x = 0; x <= 3; x++){
			//		coordinates.push('x'+x+'-y'+y);
			//	}
			//}
			//return coordinates;
			return [
				'x0-y0', 'x1-y0', 'x2-y0', 'x3-y0',
				'x0-y1', 'x1-y1', 'x2-y1', 'x3-y1',
				'x0-y2', 'x1-y2', 'x2-y2', 'x3-y2',
				'x0-y3', 'x1-y3', 'x2-y3', 'x3-y3'
			];
		},

		//coordinateToPosition: function(x, y){
		//	var coordinate = 'x'+x+'-y'+y;
		//	return this.coordinates.indexOf(coordinate);
		//},

		coordinateToPosition: function(sqCoordinate){
			return this.coordinates.indexOf(sqCoordinate);
		},

		positionToCoordinate: function(sqPosition){
			return this.coordinates[sqPosition];
		},

		init: function(){
			var indexes = [];
			for(var i = 0; i < 16; i++){
				indexes.push(i);
			}

			for(var x = 0; x < 3; x++){
				var index = Math.floor(Math.random()*indexes.length);
				var sqCoordinate = this.coordinates[index];
				var sqValue = Math.floor(Math.random()*2)*2+2; // 2 or 4
				this.drawSquare(sqCoordinate, sqValue);
				indexes.splice(index, 1);
			}
		},
		
		updateGrid: function(sqPosition, sqValue){
			this.grid[sqPosition] = sqValue;
			console.log(this.grid);
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
			var availablePositions = this.grid.filter(function(sqPosition){
				return sqPosition == '';
			});

			if(availablePositions.length == 0){
				this.gameOver();
			}else{
				var sqPosition = Math.floor(Math.random()*availablePositions.length);
				var sqCoordinate = this.positionToCoordinate(sqPosition);
				var sqValue = Math.floor(Math.random()*2)*2+2; // 2 or 4
				this.drawSquare(sqCoordinate,sqValue);
			}

			//if(squareDivs.length == 16){
			//	this.gameOver();
			//}else{
			//	var ClassNames = [
			//		'x0-y0', 'x0-y1', 'x0-y2', 'x0-y3',
			//		'x1-y0', 'x1-y1', 'x1-y2', 'x1-y3',
			//		'x2-y0', 'x2-y1', 'x2-y2', 'x2-y3',
			//		'x3-y0', 'x3-y1', 'x3-y2', 'x3-y3'
			//	];
			//	var sqPosition = '';
			//	do{
			//		var index =  Math.floor(Math.random()*ClassNames.length);
			//		sqPosition = ClassNames[index];
			//		ClassNames.splice(index, 1);
			//	}
			//	while(document.querySelector('.'+sqPosition) != null);
            //
			//	var sqValue = Math.floor(Math.random()*2)*2+2; // 2 or 4
            //
			//	this.drawSquare(sqPosition,sqValue);
			//}
		},

		deleteSquares: function(){
			var squareDivs = document.querySelectorAll("#game .delete");
			for(var i = 0, length = squareDivs.length; i < length; i++){
				var squareDiv = squareDivs[i];
				squareDiv.remove(0);
			}
		},

		gameOver: function(){
			console.log('Game over');
		},

		onkeydownWindow: function(keyCode){
			if(this.isDrawn == true){
				hasMoved = false;
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
					moveSquares(processingOrders[i]);
				}

				if(hasMoved){
					this.deleteSquares();
					this.addSquare();
				}
			}
		}
	};

	var Square = function(position, value){
		this.position = position;
		this.value = value;
		this.isMerged = false;
	};

	Square.prototype = {
		init: function () {

		}
	};

	var hasMoved = false;

	var moveSquares = function(squares){
		var sq0 = document.querySelector('.'+squares[0]);
		var sq1 = document.querySelector('.'+squares[1]);
		var sq2 = document.querySelector('.'+squares[2]);
		var sq3 = document.querySelector('.'+squares[3]);

		var sq0Val = getSquareValue(sq0);
		var sq1Val = getSquareValue(sq1);
		var sq2Val = getSquareValue(sq2);
		var sq3Val = getSquareValue(sq3);

		var sqVals = [sq0Val, sq1Val, sq2Val, sq3Val];
		var merges = [0, 0, 0, 0];

		var isSquare = function(index){
			if(sqVals[index] != '' && index >= 0){
				return true;
			}else{
				return false;
			}
		};

		var isWithinGrid = function(index){
			if(index >= 0){
				return true;
			}else{
				return false;
			}
		};

		var isSameValue = function(index1, index2){
			if(sqVals[index1] == sqVals[index2]){
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
				document.querySelector('.'+squares[index1]).className = squares[index2];

				hasMoved = true;
				updateSqVals(index1, index2);
			}
		};

		var merge = function(index1, index2){
			updateSqVals(index1, index2, true);
			var newVal = sqVals[index2];
			document.querySelector('.'+squares[index2]).innerHTML = newVal;
			document.querySelector('.'+squares[index1]).className = squares[index2]+' delete';

			merges[index2] == 1;
			hasMoved = true;
		};
		
		var updateSqVals = function(index1, index2, mergeAction = false){
			var coef = 1;
			if(mergeAction){
				coef = 2;
			}
			var sqval = parseInt(sqVals[index1])*coef;
			sqVals[index2] = sqval;
			sqVals[index1] = '';
		};

		for(var i = 1; i <= 3; i++){
			if(isSquare(i)){
				var counter = 1;
				while(true){
					j = i - counter;
					if(isSquare(j) == true){
						if(isWithinGrid(j)){
							if(isSameValue(i, j)){
								if(isMerged(j)){
									move(i, j+1);
								}else{
									merge(i, j);
								}
							}else{
								move(i, j+1);
							}
							break;
						}else{
							move(i, j+1);
							break;
						}
					}else{
						if(isWithinGrid(j) == false){
							move(i, j+1);
							break;
						}
					}
					counter++;
				}
			}
		}
	};

	var getSquareValue = function(square){
		return square !== null? square.innerHTML : '';
	};

	window.onload = function(){
		var game = new Game();
		window.onkeydown = function(e){
			game.onkeydownWindow(e.keyCode);
		};
	};

})();