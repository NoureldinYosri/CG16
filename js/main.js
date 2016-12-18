"use strict";

var gl,canvas;
var background_program, BackGround;
var obstacles_program , Obstacles;
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
    Obstacles = obstacles();
    render();
}

function init_canvas() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);
}

function bind(data,buffer,name,size,program ,send_data) {
	if(buffer == undefined) buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
    if(send_data) gl.bufferData( gl.ARRAY_BUFFER, flatten(data), gl.STATIC_DRAW );
    
    var location = gl.getAttribLocation( program, name );
    if(location == -1){
        window.alert("couldn't find : " + name + " ... abort");
        return;
    }
    gl.vertexAttribPointer( location, size, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( location );
    return buffer;
}



	

function vec_lenght(v) {
	var n = min(v.length,3);
	var l = 0;
	for (var i = 0;i < n;i++)
		l += v[i]*v[i];
	l = Math.sqrt(l);
	return max(l,1e-15);
}


function configureTexture(image, texture, buffer, unit, location ,program ,send_data) {
    if(texture == undefined) texture = gl.createTexture();
    gl.activeTexture(unit);
    gl.bindTexture(gl.TEXTURE_2D, texture);
//    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    if(send_data) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
//    gl.generateMipmap(gl.TEXTURE_2D);

    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    //
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.uniform1i(gl.getUniformLocation(program, buffer), location);
    return texture;
}


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    BackGround.render();
    Obstacles.render();

    requestAnimFrame( render );
}