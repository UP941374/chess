let fsize = 0;

window.addEventListener('resize', onresize);
window.addEventListener('load', newgame);

function drawboard(){
  let c = document.getElementById('canv');
  let ctx = c.getContext("2d");
  ch = window.innerHeight;
  cw = window.innerWidth;
  let bh = Math.floor(ch * 0.90);
  let bw = Math.floor(cw * 0.90);
  c.width = bh;
  c.height = c.width;
  let boardsize = 8;
  let fieldsize = bh / boardsize;
  fsize = fieldsize;

  //draw board
  for (let i=0; i<boardsize; i++) {
      for (let j=0; j<boardsize; j++) {
        ctx.fillStyle = ((i+j)%2==0) ? "white":"black";
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
        console.log(this.id)
        ctx.drawImage(image,getcordx(this.id),getcordy(this.id),fsize,fsize); // Or at whatever offset you like
      };
    }
  }
};

function getcordx(x){
  return (x[0].charCodeAt(0)-65)*Math.floor(fsize);
}

function getcordy(x){
  return (x[1]-1)*Math.floor(fsize);
}

function onresize(){
  drawboard();
  drawpieces();
}

function newgame(){
  drawboard();
  drawpieces();
}
