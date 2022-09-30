const getelement = (rows, cols) => {
	var array = new Array(rows);
	for (let i = 0; i < cols; i++) {
		array[i] = new Array(cols);
	}
	return array;
}
function getmatrix() {
	var mymatrix = getelement(3, 4);
	mymatrix[0][0] = document.getElementById('a1').value;
	mymatrix[0][1] = document.getElementById('a2').value;
	mymatrix[0][2] = document.getElementById('a3').value;
	mymatrix[0][3] = document.getElementById('x1').value;
	mymatrix[1][0] = document.getElementById('b1').value;
	mymatrix[1][1] = document.getElementById('b2').value;
	mymatrix[1][2] = document.getElementById('b3').value;
	mymatrix[1][3] = document.getElementById('x2').value;
	mymatrix[2][0] = document.getElementById('c1').value;
	mymatrix[2][1] = document.getElementById('c2').value;
	mymatrix[2][2] = document.getElementById('c3').value;
	mymatrix[2][3] = document.getElementById('x3').value;
	return mymatrix;
}
function gauss() {
	var a = getmatrix();
	var augMat = a;
	var m21 = augMat[1][0] / augMat[0][0];
	var m31 = augMat[2][0] / augMat[0][0];
	for (i = 0; i < 4; i++) {
		augMat[1][i] -= m21 * augMat[0][i];
		augMat[2][i] -= m31 * augMat[0][i];
	}
	document.getElementById('outdiv').innerHTML += '<p style="font-size:120%; font-weight:bold;"> m21 =  ' + m21 + '<br> R2 - (m21)R1 --> R2 </p>';
	printMatrix(augMat, 3, 4);
	var m32 = augMat[2][1] / augMat[1][1];
	for (i = 0; i < 4; i++) {
		augMat[2][i] -= m32 * augMat[1][i];
	}
	document.getElementById('outdiv').innerHTML += '<br> <p style="font-size:120%; font-weight:bold;"> m32 =  ' + m32 + '<br> R3 - (m22)R2 --> R3 </p>';
	printMatrix(augMat, 3, 4);
	var x3 = augMat[2][3] / augMat[2][2];
	var x2 = (augMat[1][3] - (augMat[1][2] * x3)) / augMat[1][1];
	var x1 = (augMat[0][3] - (augMat[0][2] * x3) - (augMat[0][1] * x2)) / augMat[0][0];
	document.getElementById('resdiv').innerHTML += '<p style="font-size:120%; font-weight:bold;" > X1 = ' + x1 + "<br> X2 = " + x2 + "<br> X3 = " + x3 + "</p>";
}
function LU() {
	var X = getmatrix();
	var augMat = X;
	var b = [augMat[0][3], augMat[1][3], augMat[2][3]];
	var m21 = augMat[1][0] / augMat[0][0];
	var m31 = augMat[2][0] / augMat[0][0];
	for (i = 0; i < 4; i++) {
		augMat[1][i] -= m21 * augMat[0][i];
		augMat[2][i] -= m31 * augMat[0][i];
	}
	var m32 = augMat[2][1] / augMat[1][1];
	for (i = 0; i < 4; i++) {
		augMat[2][i] -= m32 * augMat[1][i];
	}
	var x3 = augMat[2][3] / augMat[2][2];
	var x2 = (augMat[1][3] - (augMat[1][2] * x3)) / augMat[1][1];
	var x1 = (augMat[0][3] - (augMat[0][2] * x3) - (augMat[0][1] * x2)) / augMat[0][0];
	var U = getelement(3, 4);
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			U[i][j] = augMat[i][j];
		}
	}
	U[1][0] = U[2][0] = U[2][1] = 0;
	var L = getelement(3, 4);
	L = [
		[1, 0, 0, 0],
		[m21, 1, 0, 0],
		[m31, m32, 1, 0]
	];
	document.getElementById('outdiv').innerHTML += '<b>L = </b>'; printMatrix(L, 3, 3);
	document.getElementById('outdiv').innerHTML += '<b>U = </b>'; printMatrix(U, 3, 3);
	var C = [[augMat[0][3]], [augMat[1][3]], [augMat[2][3]]];// creates an array with 3 undefined elements
	x3 = C[2] / U[2][2];
	x2 = (C[1] - (U[1][2] * x3)) / U[1][1];
	x1 = (C[0] - (U[0][1] * x2) - (U[0][2] * x3)) / U[0][0];
	document.getElementById('outdiv').innerHTML += '<b>C = </b>'; printMatrix(C, 3, 1);
	document.getElementById('resdiv').innerHTML += '<p style="font-size:120%; font-weight:bold;" > X1 = ' + x1 + "<br> X2 = " + x2 + "<br> X3 = " + x3 + "</p>";
}
function printMatrix(matrix, rows, cols) {
	var out = '<table class="augtab">';
	for (var i = 0; i < rows; i++) {
		out += "<tr>";
		for (var j = 0; j < cols; j++) {
			if ((cols == 4) && (j == cols - 1)) {
				out += "<td style='border: 1px solid #555555; border-top-color: transparent; border-bottom-color: transparent; border-right-color: transparent;'>" + matrix[i][j]; + "</td>";
			}
			else {
				out += "<td>" + matrix[i][j]; + "</td>";
			}
		}
		out += "</tr>";
	}
	document.getElementById('outdiv').innerHTML += out + "</table>";
}
function clrans() {
	document.getElementById('resdiv').innerHTML = '';
	document.getElementById('outdiv').innerHTML = '';
}
const myClear = document.getElementById("clear-btn");
myClear.addEventListener("click", (e) => {
	e.preventDefault();
	outdiv.innerHTML = "";
	resdiv.innerHTML = "";
	document.getElementById("my-form").reset();
	mapHeadersToTable(headers[mySelect.value]);
  });
