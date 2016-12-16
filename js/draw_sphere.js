
function draw_sphere(r,num_points ,num_sectors )
{
	var pointsArray = [];
	var colorsArray = [];
	var texCoordsArray = [];
	var vertices = [],map2 = [];
    var PI = Math.acos(-1);
    var aux = [];
    var normal = [],tangent = [],bi_tangent = [];

    function create_layer(theta,r,n,j) {
        var layer = []; 
        var offset = vertices.length;
        for(var i = 0;i <= n;i++){
            var phi = (i/n) * 2 * PI;
            var x = r * Math.cos(phi) * Math.sin(theta);
            var y = r * Math.sin(phi) * Math.sin(theta);
            var z = r * Math.cos(theta);
            vertices.push(vec4(x,y,z,1));
            layer.push(i + offset);
            map2.push(vec2(i/num_points,j/num_sectors))
            aux.push(vec4(Math.cos(phi)*Math.cos(theta),Math.sin(phi) * Math.cos(theta),-Math.sin(theta),0));
        }
        return layer;
    }

    var prv_layer = create_layer(0,r,num_points,0);

    for(var i = 1;i <= num_sectors;i++){
        var theta = i/num_sectors * PI;
        var layer = create_layer(theta,r,num_points,i);
        for(var j = 0;j < num_points ;j++){
            var t = (j + 1);
            quad( prv_layer[j],layer[j],layer[t],prv_layer[t]);
        }
        prv_layer = layer;
    }



	function quad(a, b, c, d)
	{


	    var indices = [ a, b, c, a, c, d ];

	    for ( var i = 0; i < indices.length; ++i ) {
	        pointsArray.push( vertices[indices[i]] );

            texCoordsArray.push(map2[indices[i]]);
            var u = vertices[indices[i]].constructor(); u = normalize(u);
            u[3] = 0;
            var v = aux[indices[i]];
            var t = cross(u,v);
            normal.push(u);
            tangent.push(v);
            bi_tangent.push(t);
	    }

	}
	return {"points":pointsArray,"colors":colorsArray,"texCoordsArray":texCoordsArray,"normal":normal,"tangent":tangent,"bi_tangent":bi_tangent};
}



