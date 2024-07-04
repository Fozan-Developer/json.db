/**
 * Generates a random alphanumeric string of length 35 characters.
 * @returns {string} Random alphanumeric string.
 */
module.exports = function generateID() {
    let result = '';
    const charset = '1234567890abcdefghijklmnopqrstuvwxyz';
    const length = 35;

    for (let i = 0; i < length; i++) {
        result += charset[Math.floor(Math.random() * charset.length)];
    }

    return result;
}
