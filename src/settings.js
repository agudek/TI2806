function Settings() {
	this.protocol = 'http';
	this.hostname = '1988';
	this.port = '';
	this.host = this.protocol + '://' + this.hostname + ((this.port.length > 0) ? ':' + this.port : '') + '/api';
}
