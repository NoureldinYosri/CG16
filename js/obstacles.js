function obstacles() {
	var N = 20;
	var points = [],colors = [],vTexCoord = [];
	var points_buffer,colors_buffer;
	var speed = 50,tick = 0;
	var dr = vec4(0,0,0,0);
	var image,texture,TexCoord_buffer;

	function create_obstacles(){
	    obstacles_program = initShaders( gl, "obstacles-vertex-shader", "obstacles-fragment-shader" );
		gl.useProgram( obstacles_program );
		create_scene();
		bind_data(true);
	}

	function create_scene(){
		for (var i = 0;i < N;i++){
			var dx = i - 1;
			var Obstacle = obstacle(dx);
			for(var j = 0;j < Obstacle.points.length;j++){
				points.push(Obstacle.points[j]);
				colors.push(Obstacle.colors[j]);
				vTexCoord.push(Obstacle.vTexCoord[j]);
			}
		}
		console.log(points.length)
	}

	function bind_data(send_data){
		points_buffer = bind(points,points_buffer,"vPosition",4,obstacles_program,send_data);
		//colors_buffer = bind(colors,colors_buffer,"vColor",4,obstacles_program,send_data);
		TexCoord_buffer = bind(vTexCoord,TexCoord_buffer,"vTexCoord",2,obstacles_program ,send_data);
		disLoc = gl.getUniformLocation( obstacles_program, "dr" );
		if(image == undefined){
			image = new Image();
			url = "Super-Mario-A-green-cartoon-pipe-vector-free-download-300x182.jpg";
			image.crossOrigin = "";
			image.src = url;
			image.onload = function() {
				texture = configureTexture(image, texture, "texture", gl.TEXTURE0, 0,obstacles_program ,send_data)
				render();
			};
		}
		else texture = configureTexture(image, texture,"texture", gl.TEXTURE0, 0 ,obstacles_program ,send_data);
	

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
	var points = [],colors = [],vTexCoord = [];
	var dis = vec4(dx,-0.15,0,0),type = 0;
	var TexCoord = [[vec2(51,208),vec2(12,208),vec2(12,94),vec2(51,94)]
					,[vec2(157,195),vec2(51,195),vec2(51,113),vec2(157,113)]
					];

	var L = 2;
//	var TexCoord = [vec2(94/300,12/182),vec2(208/300,12/182),vec2(208/300,51/182),vec2(94/300,51/182)];
	
	var h1 = 0.06,h2 = 0.1;
	Cube(0.15,h1);
	dis = add(dis,vec4(0,-h1 - h2,0,0));
	Cube(0.1,h2);
	//Cube(0.25,0.25);
	function Cube(w,h){
		quad( 1, 0, 3, 2,w,h);
		quad( 2, 3, 7, 6,w,h);
		quad( 3, 0, 4, 7,w,h);
		quad( 6, 5, 1, 2,w,h);
		quad( 4, 5, 6, 7,w,h);
		quad( 5, 4, 0, 1,w,h);
	}
	function quad(a,b,c,d,w,h) {
		var corners = [ a, b, c, a, c, d ];
		var tex_coor = [ 0, 1, 2, 0, 2, 3];
		for ( var i = 0; i < corners.length; ++i ) {
			var r = scale(1,vertices[corners[i]]);
			r[0] = r[0] * w;
			r[1] = r[1] * h;
			r = scale(L,r); r[3] = 1;
			r = add(r,dis);
			points.push( r );

//			var tex = TexCoord[tex_coor[i]];
			var tex = TexCoord[type][tex_coor[i]];
			tex = vec2(tex[1],tex[0]);
			tex[0] /= 300; tex[1] /= 182;
			vTexCoord.push(tex);
//			colors.push(vec4(Math.random(),Math.random(),Math.random(),1));
			colors.push(vec4(0,1,0,1));
		}
	}




	return {"points":points,"colors":colors,"vTexCoord":vTexCoord}
}