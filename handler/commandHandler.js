const fs = require('fs');
const path = require('path');

class CommandHandler {
    constructor(commandsDir) {
        this.commandsDir = commandsDir;
        this.commands = {};
    }

    loadCommands() {
        this._loadCommandsFromDir(this.commandsDir);
    }

    _loadCommandsFromDir(dir) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                // Recursively load commands from subfolder
                this._loadCommandsFromDir(filePath);
            } else if (file.endsWith('.js')) {
                // Load command file
                const command = require(filePath);
                this.commands[command.name] = command;
            }
        });
    }
}

module.exports = CommandHandler;