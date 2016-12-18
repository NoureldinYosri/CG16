function background() {


	var dr = [0,-1.4,0,0], disLoc;
	var time = 0;
	var points = [],vTexCoord = [];
	var points_buffer,texture,TexCoord_buffer;
	var image;

	function create_background() {
	    background_program = initShaders( gl, "background-vertex-shader", "background-fragment-shader" );
		gl.useProgram( background_program );
		create_scene();
		bind_data(true);
	}

	function create_scene() {
		Cube();
	}




	function bind_data(send_data) {
	    points_buffer = bind(points,points_buffer,"vPosition",4,background_program,send_data);

	    TexCoord_buffer = bind(vTexCoord,TexCoord_buffer,"vTexCoord",2,background_program ,send_data);

	    url = "grass-free-texture.jpg";
		if(image == undefined){
			load_image_excute(url);
			document.addEventListener("image loaded",function (e) {
				if(e.details == url){
		  			image = IMAGE;
					texture = configureTexture(image, texture, "texture", gl.TEXTURE3, 3 ,background_program ,send_data)
					event = new CustomEvent("image loaded");
					render();
				}
			});
		}
		else texture = configureTexture(image, texture,"texture", gl.TEXTURE3, 3 ,background_program ,send_data);
	    disLoc = gl.getUniformLocation( background_program, "dr" );
	}

	function render()
	{
		gl.useProgram(background_program);
		bind_data(false);
	    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	
	    gl.uniform4fv( disLoc,dr);

	    gl.drawArrays( gl.TRIANGLES, 0, points.length );

	    //requestAnimFrame( render );
	    gl.useProgram(null);
	}



	function Cube()
	{
	    quad( 1, 0, 3, 2);
	    quad( 2, 3, 7, 6);
	    quad( 3, 0, 4, 7);
	    quad( 6, 5, 1, 2);
	    quad( 4, 5, 6, 7);
	    quad( 5, 4, 0, 1);
	}

	function quad(a,b,c,d) {
		quadf(vertices[a],vertices[b],vertices[c],vertices[d],0);
	}

	function quadf(a,b,c,d,depth) {
		if(depth == 0){	    
			var L = 2;
			var corners = [ a, b, c, a, c, d ];
	    	for ( var i = 0; i < corners.length; ++i ) {
	    		var r = scale(L,corners[i]); r[3] = 1;
	        	points.push( r );


	    	    vTexCoord.push(vec2(corners[i][0] + 0.5,corners[i][1] + 0.5));
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

	return {"create_background":create_background

	};
}


