// http://tool.chacuo.net/cryptaes
const CryptoJS = require('./aes.js')
const key = CryptoJS.enc.Utf8.parse("2R7MD82GPgqdT446brh2VHb4wDcI1Daw"); 

// aes 加密
export function AesEncrypt(word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
    iv:'',
  });
  // hex模式
  // var encryptData = encrypted.ciphertext.toString().toUpperCase(); 
  // return encryptData

  // base64模式 下三句好像等价于encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  var encryptData = encrypted.toString().toUpperCase(); 
  // console.log("hex结果:" + encryptData);
  var oldHexStr = CryptoJS.enc.Hex.parse(encryptData);
  // 转为Base64的字符串
  var base64Str = CryptoJS.enc.Base64.stringify(oldHexStr);
  // console.log('base64结果:' + base64Str);
  return base64Str
}

// aes 解密
export function AesDecrypt(word) {
  // let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let srcs = {
    // ciphertext: CryptoJS.enc.Hex.parse(word) //hex模式
    ciphertext: CryptoJS.enc.Base64.parse(word) // base64模式
  }
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
    iv:'',
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr
}
