/* exported Settings */

function Settings() {
    this.protocol = 'http';
    this.hostname = '146.185.128.124';
    this.port = '';
    this.host = this.protocol + '://' + this.hostname + ((this.port.length > 0) ? ':' + this.port : '') + '/api';
}
