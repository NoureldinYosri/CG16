"use strict";

var gl,canvas;
var background_program, BackGround;
var game_time = 0;

var vertices = [
    vec4( -0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5,  0.5,  0.5, 1.0 ),
    vec4(  0.5,  0.5,  0.5, 1.0 ),
    vec4(  0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5, -0.5, -0.5, 1.0 ),
    vec4( -0.5,  0.5, -0.5, 1.0 ),
    vec4(  0.5,  0.5, -0.5, 1.0 ),
    vec4(  0.5, -0.5, -0.5, 1.0 )
];


window.onload = function init()
{
	init_canvas();
	create_UI();
    BackGround = background();
    BackGround.create_background();
}

function init_canvas() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);
}

function bind(data,name,size,program) {
	var buffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(data), gl.STATIC_DRAW );
    
    var location = gl.getAttribLocation( program, name );
    if(location == -1){
        window.alert("couldn't find : " + name + " ... abort");
        return;
    }
    gl.vertexAttribPointer( location, size, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( location );
}



function load_image_excute(url,func) {
   	var image = new Image();
    image.crossOrigin = "";
	image.src = url;
    image.onload = function() {
  		func ( image );
	};
	image.onerror=function(){window.alert("failed to load image")};
}
	

function vec_lenght(v) {
	var n = min(v.length,3);
	var l = 0;
	for (var i = 0;i < n;i++)
		l += v[i]*v[i];
	l = Math.sqrt(l);
	return max(l,1e-15);
}


