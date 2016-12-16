function create_buttons() {
    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
    };
    document.getElementById( "rButton" ).onclick = function () {
        rotate ^= 1;
    };
    document.getElementById( "xM+Button" ).onclick = function () {
      	theta[0] += step;
    };
    document.getElementById( "yM+Button" ).onclick = function () {
      	theta[1] += step;
    };
    document.getElementById( "zM+Button" ).onclick = function () {
      	theta[2] += step;
    };
    document.getElementById( "xM-Button" ).onclick = function () {
      	theta[0] -= step;
    };
    document.getElementById( "yM-Button" ).onclick = function () {
      	theta[1] -= step;
    };
    document.getElementById( "zM-Button" ).onclick = function () {
      	theta[2] -= step;
    };
    	
}
