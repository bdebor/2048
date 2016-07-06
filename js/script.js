(function(){
	var Game = function(){
		var score = 0;
		this.squares = [
			['x0-y0', 'x0-y1', 'x0-y2', 'x0-y3'],
			['x1-y0', 'x1-y1', 'x1-y2', 'x1-y3'],
			['x2-y0', 'x2-y1', 'x2-y2', 'x2-y3'],
			['x3-y0', 'x3-y1', 'x3-y2', 'x3-y3']
		];
		this.KEYS = {LEFT: 37, RIGHT: 39, TOP: 38, BOTTOM: 40, SPACE: 32};
		this.isDrawn;

		this.init();
	};

	Game.prototype = {
		init: function(){
			var gameStarts = [
				[['x0-y0', 2], ['x2-y2', 4], ['x0-y3', 2]],
				[['x1-y1', 2], ['x3-y2', 4], ['x2-y0', 4]],
				[['x0-y2', 2], ['x2-y2', 4], ['x2-y0', 2]],
				[['x1-y3', 2], ['x3-y2', 4], ['x3-y0', 4]],
				[['x0-y0', 4], ['x2-y2', 2], ['x0-y1', 2]],
				[['x1-y1', 4], ['x3-y2', 2], ['x1-y0', 4]],
				[['x0-y3', 4], ['x2-y2', 2], ['x2-y0', 2]],
				[['x1-y3', 4], ['x3-y2', 2], ['x3-y0', 4]]
			];

			var index = Math.floor(Math.random()*8);
			var gameStart = gameStarts[index];

			for(var i = 0; i < 3; i++){
				var item = gameStart[i];
				this.drawSquare(item[0], item[1]);
			}
		},

		drawSquare: function(sqPosition, sqValue){
			this.isDrawn = false;
			var squareDiv = document.createElement('div');
			squareDiv.className = sqPosition;
			squareDiv.innerHTML = sqValue;
			var that = this;
			setTimeout(function(){
				document.getElementById('game').appendChild(squareDiv);
				that.isDrawn = true; // !!!
			}, 200);
		},

		addSquare: function(){
			var squareDivs = document.querySelectorAll("#game div");

			if(squareDivs.length == 16){
				this.gameOver();
			}else{
				var ClassNames = [
					'x0-y0', 'x0-y1', 'x0-y2', 'x0-y3',
					'x1-y0', 'x1-y1', 'x1-y2', 'x1-y3',
					'x2-y0', 'x2-y1', 'x2-y2', 'x2-y3',
					'x3-y0', 'x3-y1', 'x3-y2', 'x3-y3'
				];
				var sqPosition = '';
				do{
					var index =  Math.floor(Math.random()*ClassNames.length);
					sqPosition = ClassNames[index];
					ClassNames.splice(index, 1);
				}
				while(document.querySelector('.'+sqPosition) != null);

				var sqValue = Math.floor(Math.random()*2)*2+2; // 2 or 4

				this.drawSquare(sqPosition,sqValue);
			}
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
				var vector = {};
				switch (keyCode) {
					case this.KEYS.TOP:
						var topSquares = [
							['x0-y0', 'x0-y1', 'x0-y2', 'x0-y3'],
							['x1-y0', 'x1-y1', 'x1-y2', 'x1-y3'],
							['x2-y0', 'x2-y1', 'x2-y2', 'x2-y3'],
							['x3-y0', 'x3-y1', 'x3-y2', 'x3-y3']
						];
						for(var i = 0, length = topSquares.length; i < length; i++){
							var squares = topSquares[i];
							moveSquares(squares);
						}
						break;

					case this.KEYS.BOTTOM:
						var BottomSquares = [
							['x0-y3', 'x0-y2', 'x0-y1', 'x0-y0'],
							['x1-y3', 'x1-y2', 'x1-y1', 'x1-y0'],
							['x2-y3', 'x2-y2', 'x2-y1', 'x2-y0'],
							['x3-y3', 'x3-y2', 'x3-y1', 'x3-y0']
						];
						for(var i = 0, length = BottomSquares.length; i < length; i++){
							var squares = BottomSquares[i];
							moveSquares(squares);
						}
						break;

					case this.KEYS.LEFT:
						var leftSquares = [
							['x0-y0', 'x1-y0', 'x2-y0', 'x3-y0'],
							['x0-y1', 'x1-y1', 'x2-y1', 'x3-y1'],
							['x0-y2', 'x1-y2', 'x2-y2', 'x3-y2'],
							['x0-y3', 'x1-y3', 'x2-y3', 'x3-y3']
						];
						for(var i = 0, length = leftSquares.length; i < length; i++){
							var squares = leftSquares[i];
							moveSquares(squares);
						}
						break;

					case this.KEYS.RIGHT:
						var rightSquares = [
							['x3-y0', 'x2-y0', 'x1-y0', 'x0-y0'],
							['x3-y1', 'x2-y1', 'x1-y1', 'x0-y1'],
							['x3-y2', 'x2-y2', 'x1-y2', 'x0-y2'],
							['x3-y3', 'x2-y3', 'x1-y3', 'x0-y3']
						];
						for(var i = 0, length = rightSquares.length; i < length; i++){
							var squares = rightSquares[i];
							moveSquares(squares);
						}
						break;

				}
				if(hasMoved){
					this.deleteSquares();
					this.addSquare();

				}
			}
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