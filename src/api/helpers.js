function isHex(str) {
  const pattern = /^[a-fA-F0-9]+$/;

  str.startsWith("0x") ? str.slice(2) : str; // Common optional prefix
  return pattern.test(str);
}

export default { isHex };
