function Settings() {
	this.protocol = 'http';
	this.hostname = 'localhost';
	this.port = '8000';
	this.host = this.protocol + '://' + this.hostname + ((this.port.length > 0) ? ':' + this.port : '') + '/api';
}
