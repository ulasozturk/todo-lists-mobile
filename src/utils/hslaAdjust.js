export const hslaAdjust = ({ color, h, s, l, a, hAbs, sAbs, lAbs }) => {
  const hsla = color
    .split('(')[1]
    .split(')')[0]
    .split(',')
    .map(i => Number(i.split('%')[0]));

  hsla[0] = h ? hsla[0] + h : hAbs ? hAbs : hsla[0];
  hsla[1] = s ? hsla[1] + s : sAbs ? sAbs : hsla[1];
  hsla[2] = l ? hsla[2] + l : lAbs ? lAbs : hsla[2];
  hsla[3] = a ? hsla[3] + a : hsla[3];

  return `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
};
