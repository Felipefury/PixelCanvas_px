var coord, offset = { x: 0, y: 0 }, pixels = [];
var ctx = document.getElementById("gameWindow").getContext("2d");
var evtSource = new EventSource('https://pixelcanvas.io/events?fingerprint=' + fingerprint());

init = function() {

   coord = window.location.pathname.substring(2).split(',');

   offset.x = parseInt(coord[0]) - (window.innerWidth / 2);
   offset.y = parseInt(coord[1]) - (window.innerHeight / 2);

   pixels.forEach(function(obj){

      ctx.fillStyle = "rgba(" + colorsRGB[obj.color] + ", 0.9)";
      ctx.beginPath();
      ctx.arc(obj.x -  offset.x, obj.y - offset.y, obj.size, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();

      obj.size > 50 || obj.size == 0 ? obj.size = 0 : obj.size += .7

      if(obj.size == 0) {
         delete obj
      };

   });

   window.requestAnimationFrame(init);
};

init()

evtSource.onmessage = function(e) {
    let obj = JSON.parse(e.data);
    obj['size'] = 1
    pixels.push(obj);
};

function fingerprint() {
   let _fingerprint = "", possible = "abcdefghijklmnopqrstuvwxyz0123456789", i;

   for (i = 0; i < 32; i++) {
      _fingerprint += possible.charAt(Math.floor(Math.random() * possible.length));
   };

   return _fingerprint;
};

const colorsRGB = [
   [255,255,255],
   [228,228,228],
   [136,136,136],
   [34,34,34],
   [255,167,209],
   [229,0,0],
   [229,149,0],
   [160,106,66],
   [229,217,0],
   [148,224,68],
   [2,190,1],
   [0,211,221],
   [0,131,199],
   [0,0,234],
   [207,110,228],
   [130,0,128]
];
