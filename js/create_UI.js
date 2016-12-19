

function create_UI() {
/*  function create_mover() {
    var redraw = false;
    var prv ;
    canvas.addEventListener("mousedown", function(event){
      redraw = true;
      prv = vec4(2*event.clientX/canvas.width-1,2*(canvas.height-event.clientY)/canvas.height-1,0,0);
    });

    canvas.addEventListener("mouseup", function(event){
      redraw = false;
    });
    //canvas.addEventListener("mousedown", function(){
    canvas.addEventListener("mousemove", function(event){
      if(redraw) {
        var cur = vec4(2*event.clientX/canvas.width-1,2*(canvas.height-event.clientY)/canvas.height-1,0,0);
        var dir = add(cur,scale(-1,prv));

        prv = cur;
      }

    } );
    
  }
 
  create_mover();   	
*/
	var step = 2;
  canvas.addEventListener("mousedown", function(event){
    Character.jump();
  });
	document.getElementById("+x").onclick = function () {
		Character.rotate([step,0,0]);
	};
	document.getElementById("-x").onclick = function () {
		Character.rotate([-step,0,0]);
	};
	document.getElementById("+y").onclick = function () {
		Character.rotate([0,step,0]);
	};
	document.getElementById("-y").onclick = function () {
		Character.rotate([0,-step,0]);
	};
	document.getElementById("+z").onclick = function () {
		Character.rotate([0,0,step]);
	};
	document.getElementById("-z").onclick = function () {
		Character.rotate([0,0,-step]);
	};

}
