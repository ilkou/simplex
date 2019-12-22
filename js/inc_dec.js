let num_vars = document.getElementById('num_vars').value;
let num_conts = document.getElementById('num_conts').value;
function var_dec() {
	if (num_vars > 1)
		num_vars--;
	let val = document.getElementById('num_vars');
	val.value = num_vars.toString();
}
function var_inc() {
	num_vars++;
	let val = document.getElementById('num_vars');
	val.value = num_vars.toString();
}
function cont_dec() {
	if (num_conts > 1)
		num_conts--;
	let val = document.getElementById('num_conts');
	val.value = num_conts.toString();
}
function cont_inc() {
	num_conts++;
	let val = document.getElementById('num_conts');
	val.value = num_conts.toString();
}
