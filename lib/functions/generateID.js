function generateID(count) {
   let result = '';
   let charset = '1234567890abcdefghijklmnopqrstuvwxyz';
   for (let i = 0; i < count; i++) {
       result += charset[Math.floor(Math.random() * (charset.length - 1))];
   }
   return result;
};

module.exports = generateID;