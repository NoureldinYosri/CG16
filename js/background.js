function background() {


	var dr = [0,-1.4,0,0], disLoc;
	var time = 0;
	var points = [],vTexCoord = [];
	var points_buffer,texture,TexCoord_buffer;
	var image,original_dr = [0,-1.4,0,0],speed = 50,tick = 0;

	function create_background() {
		background_program = initShaders( gl, "background-vertex-shader", "background-fragment-shader" );
		gl.useProgram( background_program );
		create_scene();
		bind_data(true);
	}

	function create_scene() {
		Cube([0,0,0,0]);
		Cube([1,0,0,0]);
		Cube([2,0,0,0]);
	}




	function bind_data(send_data) {
		points_buffer = bind(points,points_buffer,"vPosition",4,background_program,send_data);

		TexCoord_buffer = bind(vTexCoord,TexCoord_buffer,"vTexCoord",2,background_program ,send_data);

		if(image == undefined){
			image = new Image();
			url = "brick_texture3417.jpg";
			image.crossOrigin = "";
			image.src = url;
			image.onload = function() {
				texture = configureTexture(image, texture, "texture", gl.TEXTURE3, 3 ,background_program ,send_data)
				render();
			};
		}
		else texture = configureTexture(image, texture,"texture", gl.TEXTURE3, 3 ,background_program ,send_data);
		disLoc = gl.getUniformLocation( background_program, "dr" );
	}

	function render()
	{
		gl.useProgram(background_program);
		bind_data(false);
		//gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		if(tick == speed) {
			dr = original_dr;
			tick = 0;
		}
		if(game_time%5 == 0) {
			dr = add(dr,vec4(-1/speed,0,0,0));
			tick += 1;
		}

		gl.uniform4fv( disLoc,dr);

		gl.drawArrays( gl.TRIANGLES, 0, points.length );

		//requestAnimFrame( render );
		gl.useProgram(null);
	}



	function Cube(dis)
	{
		quad( 1, 0, 3, 2,dis);
		quad( 2, 3, 7, 6,dis);
		quad( 3, 0, 4, 7,dis);
		quad( 6, 5, 1, 2,dis);
		quad( 4, 5, 6, 7,dis);
		quad( 5, 4, 0, 1,dis);
	}

	function quad(a,b,c,d,dis) {

		quadf(vertices[a],vertices[b],vertices[c],vertices[d],0,dis);
	}

	function quadf(a,b,c,d,depth,dis) {
		if(depth == 0){		
			var L = 2;
			var corners = [ a, b, c, a, c, d ];
			for ( var i = 0; i < corners.length; ++i ) {
				var r = scale(L,corners[i]); r[3] = 1;
				r = add(r,dis);
				points.push( r );


				vTexCoord.push(vec2(0.5 - corners[i][0],0.5 - corners[i][1] ));
			}
		}
		else{
			var ab = mix(a,b,0.5);
			var ad = mix(a,d,0.5);
			var bc = mix(b,c,0.5);
			var cd = mix(c,d,0.5);
			var O = mix(ab,cd,0.5);
			quadf(a,ab,O,ad,depth - 1);
			quadf(ab,b,bc,O,depth - 1);
			quadf(ad,O,cd,d,depth - 1);
			quadf(O,bc,c,cd,depth - 1);
		}	
	}

	create_background();
	return {"render":render};
}


