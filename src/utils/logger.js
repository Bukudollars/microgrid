const Logger = {
    isEnabled: false,
    logLevel: 'debug',

    log: function (...args) {
        if (this.isEnabled && ['debug', 'info', 'error'].includes(this.logLevel)) {
            console.log(...args);
        }
    },

    info: function (...args) {
        if (this.isEnabled && ['info', 'debug'].includes(this.logLevel)) {
            console.info('INFO: ', ...args);
        }
    },

    error: function (...args) {
        if (this.isEnabled && ['error', 'info', 'debug'].includes(this.logLevel)) {
            console.error('ERROR: ', ...args);
        }
    }
};

export default Logger;