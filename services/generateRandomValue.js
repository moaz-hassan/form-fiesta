export default function createRandomString(options = {}) {
    const {
      length = 24,
      charset = 'alphanumeric',
      customCharset = ''
    } = options;
  
    // Define character sets
    const charsets = {
      alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      alphabetic: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      numeric: '0123456789',
      hex: '0123456789ABCDEF',
      binary: '01',
      custom: customCharset
    };
  
    // Get the selected character set
    const characters = charsets[charset] || charsets.alphanumeric;
    
    if (!characters) {
      throw new Error('Invalid charset specified');
    }
  
    // Generate random string
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return String(result);
  }