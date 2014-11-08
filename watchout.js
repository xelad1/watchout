// Reimplement this game, referring to the source code as needed. You should have commits that refer to each of these numbered steps.
  // Draw the enemies in an svg element.
  // Make it so that the enemies move to a new random location every second using.
  // Make a differently-colored dot to represent the player. Make it draggable.
  // Detect when a enemy touches you.
  // Keep track of the user's score, and display it.
  // Use css3 animations to make the enemies whirling shuriken.// start slingin' some d3 here.

// Define a board class
  // Define height and width
  // Specify number of enemies
  // Set the display properties of the board
  // Initialize the SVG element that will represent the board in the dom

var Game = function() {
  this.height = 450;
  this.width  = 700;
  this.nEnemies = 30;
  this.padding = 20;
  this.score = 0;
  this.bestScore = 0;
}

Game.prototype.initialize = function() {

  var board = d3.select("body").append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("padding", this.padding);

  this.board = board;
  this.moveEnemies(board);
  this.movePlayer(board);

}

Game.prototype.movePlayer = function() {

  var radius = 10;
  var width = this.width;
  var height = this.height;

  var player = this.board.selectAll("circle").select(".player")
    .data([{x: width / 2, y: height / 2}]);

  var dragmove = function (d) {
    d3.select(this)
      .attr("cx", d.x = Math.max(radius, Math.min(width - radius, d3.event.x)))
      .attr("cy", d.y = Math.max(radius, Math.min(height - radius, d3.event.y)));
  }

  var drag = d3.behavior.drag()
      .on("drag", dragmove);

  // player.call(drag);

  player.enter()
    .append("circle")
    .attr("class","player")
    .attr("r",radius)
    .attr("fill","red")
    .attr("cx",function(d) { return d.x; })
    .attr("cy",function(d) { return d.y; })
    .call(drag);

}

Game.prototype.detectCollision = function() {

}

Game.prototype.moveEnemies = function() {

  var height = this.height - 2 * this.padding;
  var width = this.width - 2 * this.padding;
  var padding = this.padding;
  var enemiesData = [];
  var randPositionX = function(d) {
    var randomPos = Math.floor(Math.random() * width) + padding;
    return randomPos;
  }

  var randPositionY = function(d) {
    var randomPos = Math.floor(Math.random() * height) + padding;
    return randomPos;
  }

  for(var i=0; i<this.nEnemies; i++) {
    enemiesData.push(i);
  }

  var enemies = this.board.selectAll("circle")
    .data(enemiesData);

    enemies.transition()
      .duration(1000)
      .attr("cx", randPositionX)
      .attr("cy", randPositionY);
    enemies.enter()
      .append("circle")
      .attr("r","10")
      .attr("fill","green")
      .attr("cx", randPositionX)
      .attr("cy", randPositionY);




}

Game.prototype.adjustScore = function() {

}

var game = new Game();
game.initialize();

window.setInterval(game.moveEnemies.bind(game), 1000);

