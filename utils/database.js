'use strict';

class Database {
    constructor() {
        this.tempBans = [];
        this.VIPUsers = [];
        this.blacklist = [];
        this.groupSettings = {};
    }

    // Function to add a temporary ban
    addTempBan(userId, duration) {
        this.tempBans.push({ userId, duration, timestamp: Date.now() });
    }

    // Function to check if a user is temporarily banned
    isTempBanned(userId) {
        const ban = this.tempBans.find(b => b.userId === userId);
        if (ban) {
            const isBanned = (Date.now() - ban.timestamp) < ban.duration;
            if (!isBanned) {
                this.removeTempBan(userId);
            }
            return isBanned;
        }
        return false;
    }

    // Function to remove a temporary ban
    removeTempBan(userId) {
        this.tempBans = this.tempBans.filter(b => b.userId !== userId);
    }

    // Function to add a VIP user
    addVIPUser(userId) {
        if (!this.VIPUsers.includes(userId)) {
            this.VIPUsers.push(userId);
        }
    }

    // Function to remove a VIP user
    removeVIPUser(userId) {
        this.VIPUsers = this.VIPUsers.filter(id => id !== userId);
    }

    // Function to check if a user is VIP
    isVIPUser(userId) {
        return this.VIPUsers.includes(userId);
    }

    // Function to add a user to the blacklist
    addToBlacklist(userId) {
        if (!this.blacklist.includes(userId)) {
            this.blacklist.push(userId);
        }
    }

    // Function to remove a user from the blacklist
    removeFromBlacklist(userId) {
        this.blacklist = this.blacklist.filter(id => id !== userId);
    }

    // Function to check if a user is blacklisted
    isBlacklisted(userId) {
        return this.blacklist.includes(userId);
    }

    // Function to set group settings
    setGroupSettings(settings) {
        this.groupSettings = { ...this.groupSettings, ...settings };
    }

    // Function to get group settings
    getGroupSettings() {
        return this.groupSettings;
    }
}

module.exports = new Database();