function background() {


	var dr = [0,-1.4,0,0], disLoc;
	var time = 0;
	var points = [],vTexCoord = [];


	function create_background() {
	    background_program = initShaders( gl, "vertex-shader", "fragment-shader" );
		gl.useProgram( background_program );
		create_scene();
		bind_data();
		render();
	}

	function create_scene() {
		Cube();
	}




	function bind_data() {
	    bind(points,"vPosition",4,background_program);

	    bind(vTexCoord,"vTexCoord",2,background_program);

		load_image_excute("grass-free-texture.jpg",function (image) {
			configureTexture(image,"texture",gl.TEXTURE3, 3,background_program);
		});

	    disLoc = gl.getUniformLocation( background_program, "dr" );

	}

	function render()
	{
	    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	
	    gl.uniform4fv( disLoc,dr);

	    gl.drawArrays( gl.TRIANGLES, 0, points.length );

	    requestAnimFrame( render );
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


