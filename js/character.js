
function character() {
	var points = [],vTexCoord = [],colors = [];
	var points_buffer,texture,TexCoord_buffer,colors_buffer;
	var image,h = 0,hLoc,step = 0.02,max_h = 0.75,jump = false;
	var theta = vec3(0,90,0),thetaLoc;

	var blue = [vec2(447,70),vec2(447,117),vec2(480,117),vec2(480,70)];
	var red = [vec2(580,255),vec2(580,290),vec2(540,290),vec2(580,255)];
	var TexCoord = [
		[[vec2(1400,1030),vec2(1255,1170),vec2(1032,950),vec2(1250,740)]
		,[vec2(1040,525),vec2(850,735),vec2(1032,950),vec2(1250,740)]
		,[vec2(820,740),vec2(609,950),vec2(820,1170),vec2(1040,950)]
		,[vec2(1260,300),vec2(1038,520),vec2(1250,735),vec2(1472,513)]
		,[vec2(1255,1170),vec2(1400,1020),vec2(1250,740),vec2(1032,950)]
		,[vec2(540,162),vec2(393,309),vec2(607,524),vec2(756,375)]
		] // head
		,[[vec2(5,535),vec2(240,535),vec2(240,347),vec2(5,347)]
		,[vec2(55,730),vec2(250,730),vec2(250,530),vec2(55,530)]
		,blue
		,[vec2(820,740),vec2(609,950),vec2(820,1170),vec2(1040,950)]
		,[vec2(240,347),vec2(5,347),vec2(5,535),vec2(240,535)]
		,[vec2(55,1120),vec2(245,1120),vec2(245,925),vec2(60,925)]
		] // torso
		,[red,red,red,red,red,red] // lef hand
		,[red,red,red,red,red,red] // right hand
		,[blue,blue,blue,blue,blue,blue] // left leg
		,[blue,blue,blue,blue,blue,blue] // right leg
	];

	function Cube(idx){
		quad( 1, 0, 3, 2,idx,0); // left face
		quad( 2, 3, 7, 6,idx,1); // front face
		quad( 3, 0, 4, 7,idx,2); // bottom face
		quad( 6, 5, 1, 2,idx,3);  // up face
		quad( 4, 5, 6, 7,idx,4); // right face
		quad( 5, 4, 0, 1,idx,5); // back face
	}

	function quad(a,b,c,d,idx,idx2) {
		var corners = [ a, b, c, a, c, d ];
		var TexCoor = [0 , 1, 2 ,0 , 2 ,3];
		for ( var i = 0; i < corners.length; ++i ) {
			var r = vertices[corners[i]];
			points.push(r);
			var v = scale(1,TexCoord[idx][idx2][TexCoor[i]]);
			v[0] /= 1482; v[1] /= 1173;
			vTexCoord.push(v);
		}
	}

	function create_character() {
		character_program = initShaders( gl, "character-vertex-shader", "character-fragment-shader" );
		gl.useProgram( character_program );
		create_scene();
		bind_data(true);
	}

	function create_scene() {
		var head = node(0,"head",[0.4,0.0,0,0],0.2,0.1,0.1);
		var torso = node(1,"torso",[0.4,-0.2,0,0], 0.3,0.3,0.1); // 
		var left_hand = node(2,"left hand",[0.4,-0.1,-0.1,0],0.07,0.1,0.07);
		var right_hand = node(3,"right hand",[0.4,-0.1,0.1,0],0.07,0.1,0.07);
		var left_leg = node(4,"left leg",[0.4,-0.35,-0.1,0],0.07,0.1,0.07);
		var right_leg = node(5,"right leg",[0.4,-0.35,0.1,0],0.07,0.1,0.07);
		torso.add_child(head);
		torso.add_child(left_hand);
		torso.add_child(right_hand);
		torso.add_child(left_leg);
		torso.add_child(right_leg);
		var M = mat4(1);
		M[1][3] = 0;
		torso.traverse(M);
	}

	function bind_data(send_data) {
		points_buffer = bind(points,points_buffer,"vPosition",4,character_program,send_data);

		TexCoord_buffer = bind(vTexCoord,TexCoord_buffer,"vTexCoord",2,character_program ,send_data);

		if(image == undefined){
			image = new Image();
			url = "character018-1.jpg";
			image.crossOrigin = "";
			image.src = url;
			image.onload = function() {
				texture = configureTexture(image, texture, "texture", gl.TEXTURE2, 2 ,character_program ,send_data)
				render();
			};
		}
		else texture = configureTexture(image, texture,"texture", gl.TEXTURE2, 2 ,character_program ,send_data);

		thetaLoc = gl.getUniformLocation( character_program, "theta" );
		hLoc = gl.getUniformLocation( character_program, "h" );
	}
		function render()
	{
		gl.useProgram(character_program);
		bind_data(false);
		if(game_time%5 == 0){
			if(jump){
				h += step;
				if(h >= max_h) {
					h = max_h;
					jump = false;
				}
			}
			else if(h > 0){
				h -= step;
				h = Math.max(h,0);
			}
		}
		gl.uniform3fv( thetaLoc,theta);
		gl.uniform1f( hLoc,h);
		gl.drawArrays( gl.TRIANGLES, 0, points.length );

		gl.useProgram(null);
	}



	create_character();


	function node(idx,s,dis,w,h,l) {
		var name = s,index = idx;
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
			Cube(index);
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
		,"jump":function () {
			if(h == 0) jump = true;
		}
	}
}

