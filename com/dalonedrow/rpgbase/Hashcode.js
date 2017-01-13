/**
 * 
 */
function Hashcode() {
    var text = [];
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    do { 
        for(var i = 8; i > 0; i--) {
            text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
        }
        text = text.join("");
    } while (Hashcode.codes.indexOf(text) >= 0);
    Hashcode.codes.push(text);
    this.getHashcode = function() {
        return text;
    }
    this.findHashcode = function(hashcode) { 
        return hashcode.getHashcode() === text;
    }
}
Hashcode.codes = [];
module.exports = Hashcode;