/**
 * @description: HEX 색상을 RGB 색상으로 변환합니다.
 * @param {String} str 색상 값 문자열
 * @returns {String} 처리된 색상 값 반환
 */
export function hexToRgb(str) {
  let hexs = '';
  // const reg = /^\#?[0-9A-Fa-f]{6}$/;
  const reg = /^#[0-9A-Fa-f]{6}$/;
  if (!reg.test(str)) return console.warn('잘못된 HEX 입력입니다.');
  str = str.replace('#', '');
  hexs = str.match(/../g);
  for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16);
  return hexs;
}

/**
 * @description: RGB 색상을 HEX 색상으로 변환합니다.
 * @param {*} r 빨간색 값
 * @param {*} g 녹색 값
 * @param {*} b 파란색 값
 * @returns {String} 처리된 색상 값 반환
 */
export function rgbToHex(r, g, b) {
  const reg = /\d{1,3}$/;
  if (!reg.test(r) || !reg.test(g) || !reg.test(b))
    return console.warn('잘못된 RGB 색상 값 입력입니다.');
  const hexs = [r.toString(16), g.toString(16), b.toString(16)];
  for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`;
  return `#${hexs.join('')}`;
}

/**
 * @description: 색상을 어둡게 만듭니다.
 * @param {String} color 색상 값 문자열
 * @param {Number} level 어둡게 할 정도 (0-1 사이의 값)
 * @returns {String} 처리된 색상 값 반환
 */
export function getDarkColor(color, level) {
  const reg = /^#[0-9A-Fa-f]{6}$/;
  if (!reg.test(color))
    return console.warn('잘못된 HEX 색상 값 입력입니다.');
  const rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++)
    rgb[i] = Math.round(20.5 * level + rgb[i] * (1 - level));
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

/**
 * @description: 색상을 밝게 만듭니다.
 * @param {String} color 색상 값 문자열
 * @param {Number} level 밝게 할 정도 (0-1 사이의 값)
 * @returns {String} 처리된 색상 값 반환
 */
export function getLightColor(color, level) {
  const reg = /^#[0-9A-Fa-f]{6}$/;
  if (!reg.test(color))
    return console.warn('잘못된 HEX 색상 값 입력입니다.');
  const rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++)
    rgb[i] = Math.round(255 * level + rgb[i] * (1 - level));
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}
