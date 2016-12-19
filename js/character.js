
function character() {
	var points = [],vTexCoord = [],colors = [];
	var points_buffer,texture,TexCoord_buffer,colors_buffer;
	var image;
	var theta = vec3(0,0,0),thetaLoc;
	var red = vec4(1,0,0,1),green = vec4(0,1,0,1),blue = vec4(0,0,1,1);
	function Cube(){
		quad( 1, 0, 3, 2,red); // left face
		quad( 2, 3, 7, 6,green); // front face
		quad( 3, 0, 4, 7,blue); // bottom face
		quad( 6, 5, 1, 2,add(red,blue));  // up face
		quad( 4, 5, 6, 7,add(red,green)); // right face
		quad( 5, 4, 0, 1,add(blue,green)); // back face
	}

	function quad(a,b,c,d,color) {
		var corners = [ a, b, c, a, c, d ];
		for ( var i = 0; i < corners.length; ++i ) {
			var r = vertices[corners[i]];
			points.push(r);
			colors.push(color);

//			vTexCoord.push(vec2(0.5 - corners[i][0],0.5 - corners[i][1] ));
		}
	}

	function create_character() {
		character_program = initShaders( gl, "character-vertex-shader", "character-fragment-shader" );
		gl.useProgram( character_program );
		create_scene();
		bind_data(true);
	}

	function create_scene() {
		var head = node("head",[0.4,-0.15,0,0],0.1,0.1,0.1);
		var torso = node("torso",[0.4,-0.25,0,0],0.1,0.1,0.1);
		var left_hand = node("left hand",[0.4,-0.25,-0.01,0],0.1,0.1,0.1);
		var right_hand = node("right hand",[0.4,-0.25,0.01,0],0.1,0.1,0.1);
		var left_leg = node("left leg",[0.4,-0.35,-0.1,0],0.1,0.1,0.1);
		var right_leg = node("right leg",[0.4,-0.35,0.1,0],0.1,0.1,0.1);

		torso.add_child(head);
		torso.add_child(left_hand);
		torso.add_child(right_hand);
		torso.add_child(left_leg);
		torso.add_child(right_leg);
		torso.traverse();
		console.log(points)

	}

	function bind_data(send_data) {
		points_buffer = bind(points,points_buffer,"vPosition",4,character_program,send_data);
		colors_buffer = bind(colors,colors_buffer,"vColor",4,character_program,send_data);

//		TexCoord_buffer = bind(vTexCoord,TexCoord_buffer,"vTexCoord",2,character_program ,send_data);
/*
		if(image == undefined){
			image = new Image();
			url = "brick_texture3417.jpg";
			image.crossOrigin = "";
			image.src = url;
			image.onload = function() {
				texture = configureTexture(image, texture, "texture", gl.TEXTURE3, 3 ,character_program ,send_data)
				render();
			};
		}
		else texture = configureTexture(image, texture,"texture", gl.TEXTURE3, 3 ,character_program ,send_data);
*/
		thetaLoc = gl.getUniformLocation( character_program, "theta" );
	}
		function render()
	{
		gl.useProgram(character_program);
		bind_data(false);


		gl.uniform3fv( thetaLoc,theta);

		gl.drawArrays( gl.TRIANGLES, 0, points.length );

		gl.useProgram(null);
	}



	create_character();


	function node(s,dis,w,h,l) {
		var name = s;
		var trans_matrix = mat4(1),pos = dis,width = w,height = h,length = l;
		var children = [];
		function traverse(M) {
			if(M != undefined) trans_matrix = mult(M,trans_matrix);
			print_node();
			if(children != undefined){
				for(var i = 0;i < children.length;i++){
					children[i].traverse(M);
				}
			}
		}
		function print_node() {
			Cube();
			for(var i = points.length - 36;i < points.length;i++){
				var r = points[i];
				r = scale(1,r);
				r[0] *= width; r[1] *= height; r[2] *= length;
				r = add(r,pos);
				if(trans_matrix != undefined) r = mult(trans_matrix,r);
				points[i] = r;
			}
		}

		return {"traverse":traverse,"add_child":function (v) {
			children.push(v);
		}};
	}


	return {"render":render

	}
}

