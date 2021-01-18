let fsize = 0;
const boardsize = 8;
const whitecolor = '#ffffff';
const blackcolor = '#b3b3b3';
const selected = -50;

window.addEventListener('resize', onresize);
window.addEventListener('load', newgame);
//document.getElementById('canv').addEventListener('mousedown', pickpiece);
//document.getElementById('canv').addEventListener('mouseup', droppiece);
document.getElementById('canv').addEventListener('click', movepiece);

function drawboard(){
  let c = document.getElementById('canv');
  let ctx = c.getContext("2d");
  ch = window.innerHeight*0.95;
  cw = window.innerWidth*0.95;
  let bh = ch;
  let bw = cw;
  c.width = bh;
  c.height = c.width;
  if (ch > cw) {
    c.height =  cw;
    c.width = c.height;
    bh = cw;
  }
  let fieldsize = bh / boardsize;
  fsize = fieldsize;
  //draw board
  for (let i=0; i<boardsize; i++) {
      for (let j=0; j<boardsize; j++) {
        ctx.fillStyle = ((i+j)%2==0) ? whitecolor:blackcolor;
        ctx.fillRect(j*fieldsize, i*fieldsize, fieldsize, fieldsize);
    };
  }
};

function drawpieces(x){
  for (var piece of pieces) {
    if (piece.ingame) {
      let c = document.getElementById('canv');
      let ctx = c.getContext("2d");
      let image = new Image();
      image.src = piece.img;
      image.id = piece.pos
      if (!piece.moving) {
        image.onload = function(piece){
          ctx.drawImage(image,getcordx(this.id),getcordy(this.id),fsize,fsize);
        }
      } else {
        image.onload = function(piece){
          ctx.drawImage(image,getcordx(this.id)-selected/2,getcordy(this.id)-selected/2,fsize+selected,fsize+selected); //when selected
        }
      }
    }
  }
};

function pickpiece(x){
  let c = document.getElementById('canv');
  ch = c.height;
  cw = c.width;
  let posx = Math.round(x.clientX - ((window.innerWidth - c.width) / 2));
  let posy = Math.round(x.clientY-10);
  for (let piece of pieces) {
    if (piece.pos == tocord(posx,posy)) {
      piece.moving = true;
    }
  }
  redraw();
};

function droppiece(x){
  let c = document.getElementById('canv');
  ch = c.height;
  cw = c.width;
  let posx = Math.round(x.clientX - ((window.innerWidth - c.width) / 2));
  let posy = Math.round(x.clientY-10);

  for (let piece of pieces) {
    if (piece.moving) {
      if (legalmove(piece, piece.pos, tocord(posx,posy))) {
        piece.pos = tocord(posx,posy)
        piece.moving = false;
      }
    }
  }
  redraw();
};

function movepiece(x){
  let moved = false;
  let c = document.getElementById('canv');
  ch = c.height;
  cw = c.width;
  let posx = Math.round(x.clientX - ((window.innerWidth - c.width) / 2));
  let posy = Math.round(x.clientY-10);

  for (var piece of pieces) {
    if (piece.moving) {
      if (legalmove(piece, piece.pos, tocord(posx,posy))) {
        piece.pos = tocord(posx,posy)
        piece.moving = false;
        moved = true;
      }
    }
  }

  for (var piece of pieces) {
    piece.moving = false;
  };

  if (moved == false) {
    for (let piece of pieces) {
      if (piece.pos == tocord(posx,posy)) {
        piece.moving = true;
      }
    }
  }
 redraw()
};


function legalmove(p,o,n){
  let move = true;
  console.log(p.type +':'+ o + '->'+n)

  if (o==n){ //same field
    move = false;
  }

for (var piece of pieces) {
  if (n == piece.pos && p.color == piece.color) {
    move = false;
  }
}

  return move;
}

function tocord(x,y){
  let cordx = String.fromCharCode(Math.ceil(x/fsize+64));
  let cordy = Math.ceil(y/fsize);
  let cords = cordx+cordy;
  return cords;
}

function getcordx(x){
  return Math.round((x[0].charCodeAt(0)-65)*fsize);
}

function getcordy(x){
  return Math.round((x[1]-1)*fsize);
}

function onresize(){
  redraw()
}

function newgame(){
  redraw()
};

function redraw(){
  drawboard();
  drawpieces();
}
