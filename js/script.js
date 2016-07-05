(function(){
	var Game = function(){
		var score = 0;
		this.squares = [];
		this.KEYS = {LEFT: 37, RIGHT: 39, TOP: 38, BOTTOM: 40, SPACE: 32};
		this.isDrawn;

		this.addSquare();
		this.addSquare();
		this.addSquare();

	};

	Game.prototype = {
		drawSquare: function(sqPosition, sqValue){
			this.isDrawn = false;
			var squareDiv = document.createElement('div');
			squareDiv.className = sqPosition;
			squareDiv.innerHTML = sqValue;
			var that = this;
			setTimeout(function(){
				document.getElementById('game').appendChild(squareDiv);
				that.isDrawn = true; // !!!
				console.log(that.isDrawn);
			}, 200);
			console.log(this.isDrawn);
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
			console.log(this.isDrawn);
			if(this.isDrawn == true){
				hasMoved = false;
				switch (keyCode) {
					case this.KEYS.TOP:
						var TopSquares = [
							['x0-y0', 'x0-y1', 'x0-y2', 'x0-y3'],
							['x1-y0', 'x1-y1', 'x1-y2', 'x1-y3'],
							['x2-y0', 'x2-y1', 'x2-y2', 'x2-y3'],
							['x3-y0', 'x3-y1', 'x3-y2', 'x3-y3']
						];
						for(var i = 0, length = TopSquares.length; i < length; i++){
							var squares = TopSquares[i];
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

		var setSquaresValues = function(){ // filter ???
			console.log('setSquaresValues');
			if(sq0Val != ''){
				if(sq1Val != '' && sq1Val == sq0Val){
					sq0Val = parseInt(sq0Val)*2;
					sq1Val = '';
				}
			}else{
				if(sq1Val != ''){
					sq0Val = sq1Val;
					sq1Val = '';
				}
			}
			if(sq1Val != ''){
				if(sq2Val != '' && sq2Val == sq1Val){
					sq1Val = parseInt(sq1Val)*2;
					sq2Val = '';
				}
			}else{
				if(sq2Val != ''){
					sq1Val = sq2Val;
					sq2Val = '';
				}
			}
			if(sq2Val != ''){
				if(sq3Val != ''  && sq3Val == sq2Val){
					sq2Val = parseInt(sq2Val)*2;
					sq3Val = '';
				}
			}else{
				if(sq3Val != ''){
					sq2Val = sq3Val;
					sq3Val = '';
				}
			}
		};

		//var filter = x0vals.filter(function(val){
		//	return val == '';
		//});
		//console.log(filter);
		//var length = filter.length;
		//console.log(length);
		//setSquaresValues();
		//if(length <= 1){
		//	setSquaresValues();
		//}
		//if(length == 0){
		//	setSquaresValues();
		//}

		var x0vals = [{pos: squares[0], val:sq0Val}, {pos: squares[1], val:sq1Val}, {pos: squares[2], val:sq2Val}, {pos: squares[3], val:sq3Val}];

		var filter1 = x0vals.filter(function(square){
			return square.val !== '';
		});
		var length1 = filter1.length;

		setSquaresValues(); // optimisation !!!
		setSquaresValues();
		setSquaresValues();

		// draw
		var x0vals = [{pos: squares[0], val:sq0Val}, {pos: squares[1], val:sq1Val}, {pos: squares[2], val:sq2Val}, {pos: squares[3], val:sq3Val}];

		var filter2 = x0vals.filter(function(square){
			return square.val !== '';
		});
		var length2 = filter2.length;

		if(length1 == 4){
			if(length2 == 4) {
				var prev0 = filter1[0].pos;
				var next0 = filter2[0].pos;

				if(prev0 != next0){
					hasMoved = true;
				}
			}
			// 4 -> 3
			if(length2 == 3){
				hasMoved = true;
				var prev0 = filter1[0].pos;
				var next0 = filter2[0].pos;
				var prevVal0 = filter1[0].val;
				var nextVal0 = filter2[0].val;
				var prev1 = filter1[1].pos;
				var next1 = filter2[1].pos;
				var prevVal1 = filter1[1].val;
				var nextVal1 = filter2[1].val;
				var prev2 = filter1[2].pos;
				var next2 = filter2[2].pos;
				var nextVal2 = filter2[2].val;
				var prev3 = filter1[3].pos;

				var squareDiv0 = document.querySelector('.'+prev0);
				var squareDiv1 = document.querySelector('.'+prev1);
				var squareDiv2 = document.querySelector('.'+prev2);
				var squareDiv3 = document.querySelector('.'+prev3);

				if(prevVal0 == nextVal0){
					if(prevVal1 == nextVal1){// wxyz -> ayz
						squareDiv2.className = next2;
						squareDiv3.className = next2+' delete';
						setTimeout(function(){squareDiv2.innerHTML = nextVal2;}, 200);
					}else{ // wxyz -> waz
						squareDiv1.className = next1;
						squareDiv2.className = next1+' delete';
						squareDiv3.className = next2;
						setTimeout(function(){squareDiv1.innerHTML = nextVal1;}, 200);
					}
				}else{ // wxyz -> wxa
					squareDiv1.className = next0+' delete'
					squareDiv2.className = next1;
					squareDiv3.className = next2;
					setTimeout(function(){squareDiv0.innerHTML = nextVal0;}, 200);
				}
			}
			// 4 -> 2
			if(length2 == 2){
				hasMoved = true;
				var prev0 = filter1[0].pos;
				var next0 = filter2[0].pos;
				var prevVal0 = filter1[0].val;
				var nextVal0 = filter2[0].val;
				var prev1 = filter1[1].pos;
				var next1 = filter2[1].pos;
				var nextVal1 = filter2[1].val;
				var prev2 = filter1[2].pos;
				var prev3 = filter1[3].pos;
				var prevVal3 = filter1[3].val;

				var squareDiv0 = document.querySelector('.'+prev0);
				var squareDiv1 = document.querySelector('.'+prev1);
				var squareDiv2 = document.querySelector('.'+prev2);
				var squareDiv3 = document.querySelector('.'+prev3);

				if(prevVal0 == nextVal0){ // wxyz -> az
					squareDiv2.className = next1+' delete';
					squareDiv3.className = next1+' delete';
					setTimeout(function(){squareDiv1.innerHTML = nextVal1;}, 200);
				}else if(prevVal3 == nextVal1){ // wxyz -> wa
					squareDiv1.className = next0+' delete';
					squareDiv2.className = next0+' delete';
					squareDiv3.className = next1;
					setTimeout(function(){squareDiv0.innerHTML = nextVal0;}, 200);
				}else{ // wxyz -> ab
					squareDiv1.className = next0+' delete';
					squareDiv2.className = next1;
					squareDiv3.className = next1+' delete';
					setTimeout(function(){
						squareDiv0.innerHTML = nextVal0;
						squareDiv2.innerHTML = nextVal1;
					}, 200);
				}
			}
			// 4 -> 1
			if(length2 == 1){
				hasMoved = true;
				var prev0 = filter1[0].pos;
				var next0 = filter2[0].pos;
				var val0 = filter2[0].val;
				var prev1 = filter1[1].pos;
				var prev2 = filter1[2].pos;
				var prev3 = filter1[3].pos;

				var squareDiv0 = document.querySelector('.'+prev0);
				squareDiv0.className = next0;
				var squareDiv1 = document.querySelector('.'+prev1);
				squareDiv1.className = next0+' delete';
				var squareDiv2 = document.querySelector('.'+prev2);
				squareDiv2.className = next0+' delete';
				var squareDiv3 = document.querySelector('.'+prev3);
				squareDiv3.className = next0+' delete';

				setTimeout(function(){squareDiv0.innerHTML = val0;}, 200);
			}
		}

		if(length1 == 3){
			// 3 -> 3
			if(length2 == 3){
				var prev0 = filter1[0].pos;
				var next0 = filter2[0].pos;
				var prev1 = filter1[1].pos;
				var next1 = filter2[1].pos;
				var prev2 = filter1[2].pos;
				var next2 = filter2[2].pos;

				var squareDiv0 = document.querySelector('.'+prev0);
				squareDiv0.className = next0;
				var squareDiv1 = document.querySelector('.'+prev1);
				squareDiv1.className = next1;
				var squareDiv2 = document.querySelector('.'+prev2);
				squareDiv2.className = next2;

				if(prev0 != next0 || prev1 != next1 || prev2 != next2){
					hasMoved = true;
				}
			}
			// 3 -> 2
			if(length2 == 2){
				hasMoved = true;
				var prev0 = filter1[0].pos;
				var next0 = filter2[0].pos;
				var prevVal0 = filter1[0].val;
				var nextVal0 = filter2[0].val;
				var prev1 = filter1[1].pos;
				var next1 = filter2[1].pos;
				var nextVal1 = filter2[1].val;
				var prev2 = filter1[2].pos;

				var squareDiv0 = document.querySelector('.'+prev0);
				squareDiv0.className = next0;
				var squareDiv1 = document.querySelector('.'+prev1);
				var squareDiv2 = document.querySelector('.'+prev2);

				if(prevVal0 == nextVal0){
					squareDiv1.className = next1;
					squareDiv2.className = next0+' delete';
					setTimeout(function(){squareDiv1.innerHTML = nextVal1;}, 200);
				}else{
					squareDiv1.className = next0+' delete'
					squareDiv2.className = next1;
					setTimeout(function(){squareDiv0.innerHTML = nextVal0;}, 200);
				}
			}
			// 3 -> 1
			if(length2 == 1){
				hasMoved = true;
				var prev0 = filter1[0].pos;
				var next0 = filter2[0].pos;
				var val0 = filter2[0].val;
				var prev1 = filter1[1].pos;
				var prev2 = filter1[2].pos;

				var squareDiv0 = document.querySelector('.'+prev0);
				squareDiv0.className = next0;
				var squareDiv1 = document.querySelector('.'+prev1);
				squareDiv1.className = next0+' delete';
				var squareDiv2 = document.querySelector('.'+prev2);
				squareDiv2.className = next0+' delete';

				setTimeout(function(){squareDiv0.innerHTML = val0;}, 200);
			}
		}

		if(length1 == 2){
			// 2 -> 2
			if(length2 == 2){
				var prev0 = filter1[0].pos;
				var next0 = filter2[0].pos;
				var prev1 = filter1[1].pos;
				var next1 = filter2[1].pos;

				var squareDiv0 = document.querySelector('.'+prev0);
				squareDiv0.className = next0;
				var squareDiv1 = document.querySelector('.'+prev1);
				squareDiv1.className = next1;

				if(prev0 != next0 || prev1 != next1){
					hasMoved = true;
				}
			}
			// 2 -> 1
			if(length2 == 1){
				hasMoved = true;
				var prev0 = filter1[0].pos;
				var next0 = filter2[0].pos;
				var val0 = filter2[0].val;
				var prev1 = filter1[1].pos;

				var squareDiv0 = document.querySelector('.'+prev0);
				squareDiv0.className = next0;
				var squareDiv1 = document.querySelector('.'+prev1);
				squareDiv1.className = next0+' delete';

				setTimeout(function(){squareDiv0.innerHTML = val0;}, 200);
			}
		}
		// 1 -> 1
		if(length1 == 1){
			var prev = filter1[0].pos;
			var next = filter2[0].pos;

			var squareDiv = document.querySelector('.'+prev);
			squareDiv.className = next;

			if(prev != next){
				hasMoved = true;
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