function obstacles(n) {
	var N = n;
	var points = [],colors = [];
	var points_buffer,colors_buffer;

	function create_obstacles(){
	    obstacles_program = initShaders( gl, "obstacles-vertex-shader", "obstacles-fragment-shader" );
		gl.useProgram( obstacles_program );
		create_scene();
		bind_data(true);
	}

	function create_scene(){
		for (var i = 0;i < 10;i++){
			points.push(vec4(i/5 - 1,0,0,1));
			colors.push(vec4(Math.random(),Math.random(),Math.random(),1));
		}
	}
	function bind_data(send_data){
		points_buffer = bind(points,points_buffer,"vPosition",4,obstacles_program,send_data);
		colors_buffer = bind(colors,colors_buffer,"vColor",4,obstacles_program,send_data);
	}

	function render() {
		gl.useProgram(obstacles_program);
		bind_data(false);
		//gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	
		gl.drawArrays( gl.POINTS, 0, points.length );

		//requestAnimFrame( render );
		gl.useProgram(null);
	}

	create_obstacles();
	return {"render":render}
}

function obstacle() {
	
}