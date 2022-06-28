        //varibales 
        var canvasWidth = 900; // ancho del canvas 
        var canvasHeight = 500; // altura del canvas
        //Creación de la variable 
        var player;   // jugador 
        var playerYPosition = 200; // variable  posición-Y del jugardor 

        var fallSpeed = 0; //caida de velocidad inicalizada en 0 
        var interval = setInterval(updateCanvas, 20); // establecer el intervalo y actualiza 

        var isJumping = false; //esta saltando va ser ingual a false 
        var jumpSpeed = 0;// velocidad de salto inicializada en 0 

        var block; // bloque

        // Crear una puntuación de 0 para empezar
        var score = 0;
        // Crear una variable para contener nuestro scoreLabel
        var scoreLabel;

        function startGame() {
            gameCanvas.start();
            // crea el jugador o función 
            player = new createPlayer(30, 30, 10);
            block = new createBlock();
        // Asigne a su variable scoreLabel un valor de scoreLabel()
        scoreLabel = new createScoreLabel(10, 30);
}

        var gameCanvas = {
            canvas: document.createElement("canvas"),
            start: function() {
                this.canvas.width = canvasWidth;
                this.canvas.height = canvasHeight;
                this.context = this.canvas.getContext("2d");
                document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}
// crear una función llamada crear jugador
function createPlayer(width, height, x) {
    this.width = width; //ancho jugador
    this.height = height; //altura juador
    this.x = x; //posiscion x
    this.y = playerYPosition;// posicion Y 
    
    this.draw = function() { //dibujar 
        ctx = gameCanvas.context; //juego canvas
        ctx.fillStyle = "yellow" //color de la figura
        ctx.fillRect(this.x, this.y, this.width, this.height );
    }
    this.makeFall = function() {
        if (!isJumping) {
            this.y += fallSpeed;
            fallSpeed += 0.1;
            this.stopPlayer();
        }
    }
    this.stopPlayer = function() {
        var ground = canvasHeight - this.height;
        if (this.y > ground) {
            this.y = ground;
        }
    }
    this.jump = function() {
        if (isJumping) {
            this.y -= jumpSpeed;
            jumpSpeed += 0.3;
        }
    }
}

function createBlock() {
    var width = randomNumber(10, 50);
    var height = randomNumber(10, 200);
    var speed = randomNumber(2, 6);
    
    this.x = canvasWidth;
    this.y = canvasHeight - height;
    
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, width, height);
    }
    this.attackPlayer = function() {
        this.x -= speed;
        this.returnToAttackPosition();
    }
    this.returnToAttackPosition = function() {
        if (this.x < 0) {
            width = randomNumber(10, 50);
            height = randomNumber(50, 200);
            speed = randomNumber(4, 6);
            this.y = canvasHeight - height;
            this.x = canvasWidth;
            // Aumenta tu puntuación si tu bloque llegó al borde
            score++;
        }
    }
}

function detectCollision() {
    var playerLeft = player.x
    var playerRight = player.x + player.width;
    var blockLeft = block.x;
    var blockRight = block.x + block.width;
    
    var playerBottom = player.y + player.height;
    var blockTop = block.y;
    
    if (playerRight > blockLeft && 
        playerLeft < blockLeft && 
        playerBottom > blockTop) {
        
        gameCanvas.stop();
    }
}

function createScoreLabel(x, y) {
    this.score = 0;  
    this.x = x;
    this.y = y;
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.font = "35px Marker Felt";
        ctx.fillStyle = "Black";
        ctx.fillText(this.text, this.x, this.y);
    }
}

function updateCanvas() {
    detectCollision();
    
    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    player.makeFall();
    player.draw();
    player.jump();
    
    block.draw();
    block.attackPlayer();
    
    // Vuelva a dibujar su puntaje y actualice el valor
    scoreLabel.text = "SCORE: " + score;
    scoreLabel.draw();
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function resetJump() {
    jumpSpeed = 0;
    isJumping = false;
}

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        isJumping = true;
        setTimeout(function() { resetJump(); }, 1000);
    }
}