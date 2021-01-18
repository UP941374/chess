let fsize = 0;
let boardsize = 8;
let whitecolor = '#ffffff';
let blackcolor = '#b3b3b3';

window.addEventListener('resize', onresize);
window.addEventListener('load', newgame);
document.getElementById('canv').addEventListener('mousedown', pickpiece);
document.getElementById('canv').addEventListener('mouseup', droppiece);

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
      image.onload = function(piece){
        ctx.drawImage(image,getcordx(this.id),getcordy(this.id),fsize,fsize);
      };
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

function legalmove(p,o,n){
  console.log(p.type +':'+ o + '->'+n)
  return true;
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
