function obstacles() {
	var N = 20;
	var points = [],colors = [];
	var points_buffer,colors_buffer;
	var speed = 50,tick = 0;
	var dr = vec4(0,0,0,0);

	function create_obstacles(){
	    obstacles_program = initShaders( gl, "obstacles-vertex-shader", "obstacles-fragment-shader" );
		gl.useProgram( obstacles_program );
		create_scene();
		bind_data(true);
	}

	function create_scene(){
		for (var i = 0;i < N;i++){
			var dx = i;
			var Obstacle = obstacle(dx);
			for(var j = 0;j < Obstacle.points.length;j++){
				points.push(Obstacle.points[j]);
				colors.push(Obstacle.colors[j]);
			}
		}
		console.log(points.length)
	}

	function bind_data(send_data){
		points_buffer = bind(points,points_buffer,"vPosition",4,obstacles_program,send_data);
		colors_buffer = bind(colors,colors_buffer,"vColor",4,obstacles_program,send_data);
		disLoc = gl.getUniformLocation( obstacles_program, "dr" );
	}

	function render() {
		gl.useProgram(obstacles_program);
		bind_data(false);
		if(tick == speed) {
			dr = vec4(0,0,0,0);
			tick = 0;
		}
		if(game_time%5 == 0) {
			dr = add(dr,vec4(-1/speed,0,0,0));
			tick += 1;
		}
		
		//gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.uniform4fv( disLoc,dr);

	
		gl.drawArrays( gl.TRIANGLES, 0, points.length );

		//requestAnimFrame( render );
		gl.useProgram(null);
	}

	create_obstacles();
	return {"render":render}
}

function obstacle(dx) {
	var points = [],colors = [];
	var dis = vec4(dx,-0.25,0,0);
	Cube(0.1);
	dis = add(dis,vec4(0,-0.1,0,0));
	Cube(0.15);

	function Cube(L){
		quad( 1, 0, 3, 2,L);
		quad( 2, 3, 7, 6,L);
		quad( 3, 0, 4, 7,L);
		quad( 6, 5, 1, 2,L);
		quad( 4, 5, 6, 7,L);
		quad( 5, 4, 0, 1,L);
	}
	function quad(a,b,c,d,L) {
		var corners = [ a, b, c, a, c, d ];
		for ( var i = 0; i < corners.length; ++i ) {
			var r = scale(L,vertices[corners[i]]); r[3] = 1;
			r = add(r,dis);
			points.push( r );

//			vTexCoord.push(vec2(0.5 - corners[i][0],0.5 - corners[i][1] ));
//			colors.push(vec4(Math.random(),Math.random(),Math.random(),1));
			colors.push(vec4(0,1,0,1));
		}
	}




	return {"points":points,"colors":colors}
}