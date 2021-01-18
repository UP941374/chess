let fsize = 0;
let boardsize = 8;
let whitecolor = '#ffffff';
let blackcolor = '#b3b3b3';

window.addEventListener('resize', onresize);
window.addEventListener('load', newgame);
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
    console.log('pionowe')
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

function drawpieces(){
  for (var piece of pieces) {
    if (piece.ingame) {
      let c = document.getElementById('canv');
      let ctx = c.getContext("2d");
      let image = new Image();
      image.src = piece.img;
      image.id = piece.pos
      image.onload = function(piece){
        ctx.drawImage(image,getcordx(this.id),getcordy(this.id),fsize,fsize); // Or at whatever offset you like
      };
    }
  }
};

function movepiece(x){
  console.log(x.clientY,x.clientX)
};

function getcordx(x){
  let res = (x[0].charCodeAt(0)-65)*Math.floor(fsize);
  return res;
}

function getcordy(x){
  let res = (x[1]-1)*Math.floor(fsize);
  return res;
}

function onresize(){
  drawboard();
  drawpieces();
}

function newgame(){
  drawboard();
  drawpieces();
}
