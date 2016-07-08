//describe("La librairie de conversion", function() {
//	describe("Conversion de livre à kilo", function() {
//
//		it("Devrait multiplier le nombre de livre par 2.2", function() {
//			expect(Conversion.livreVersKilo(22)).toBe(10);
//		});
//
//		it("Devrait lancer une exception si l'entrée n'est pas numérique", function()  {
//			expect(Conversion.livreVersKilo.bind("abc"))
//				.toThrow("ValeurLivreIncorrecte");
//		});
//
//	});
//});


describe("tests", function() {
	describe("init", function() {
		var game = new Game();

		it("should add the value 2 at 3 different positions in this.grid", function() {
			var availablePositions = [];
			var keys = Object.keys(game.grid);
			for(i = 0; i < keys.length; i++){
				if(game.grid[i].val == 2){
					availablePositions.push(i);
				}
			}
			expect(availablePositions.length).toBe(3);
		});

		//it("should display 3 squares at different position", function() {
		//	var squares = document.querySelectorAll("#game div"); // undefined
		//	sqClasses = [];
		//	for(i = 0; i < squares.length; i++){
		//		sqClasses.push(squares[i].className);
		//	}
		//	var isGood = true;
		//	// 1==2, 1==3, 2==3
		//	console.log(sqClasses[1] + ', ' + sqClasses[2] + ', ' + sqClasses[3] + ', ');
		//	if(
		//		sqClasses[1] == sqClasses[2] ||
		//		sqClasses[1] == sqClasses[3] ||
		//		sqClasses[2] == sqClasses[3]
		//	){
		//		isGood = false;
		//	}
		//	expect(isGood).toBe(true);
		//});
	});
});