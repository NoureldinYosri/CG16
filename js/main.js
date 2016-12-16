"use strict";






window.onload = function init()
{
	var sphere = draw_sphere(0.7,50,50);
	init_canvas();
	create_buttons();
	points = sphere.points;
	colors = sphere.colors;
	texCoordsArray = sphere.texCoordsArray;
	bind_data();
}



