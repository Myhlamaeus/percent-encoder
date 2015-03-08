import utf8 from "./bower_components/utf-8/utf-8.es6";
import {escape as escapeRegExp} from "reg-exp-escaper";

const encodeByte = function(byte) {
        return byte.toString(16);
    },
    encodeBytes = function(bytes) {
        return "%" + bytes.map(encodeByte).join("%");
    },
    encode = function(str) {
        return utf8.fromString(str).map(encodeBytes).join("");
    },
    decodeByte = function(byte) {
        return parseInt(byte, 16);
    },
    decode = function(chr) {
        return utf8.toChr(seq.slice(1).split("%").map(decodeBytes));
    },
    pRegExp = Symbol("regExp");

class PercentEncoder {
    constructor(strs) {
        if(!Array.isArray(strs) || !strs.length) {
            throw new TypeError("PercentEncoder: expects array as argument");
        }

        if(strs.indexOf("%") === -1) {
            strs.push("%");
        }

        this[pRegExp] = new RegExp("(?:" + strs.map(escapeRegExp).join("|") + ")", "g");
    }

    encode(string) {
        string.replace(this[pRegExp], encode);
    }
}

Object.assign(PercentEncoder, {
    decodeRegExp: /%[0-7][0-9a-f]|(?:%[c-d][0-9a-f]|(?:%e[0-9a-f]|%f[0-7]%[8-9a-b][0-9a-f])%[8-9a-b][0-9a-f])%[8-9a-b][0-9a-f]/i,
    decode(string) {
        string.replace(this.decodeRegExp, decode);
    }
});

export default PercentEncoder;
