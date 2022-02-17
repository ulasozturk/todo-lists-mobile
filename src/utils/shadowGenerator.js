const shadowsRadius = [
  0, 1.0, 1.41, 2.22, 2.62, 3.84, 4.65, 4.65, 4.65, 5.46, 6.27, 6.68, 7.49, 8.3,
  9.11, 9.51, 10.32, 11.14, 11.95, 12.35, 13.16, 13.97, 14.78, 15.19, 16.0,
];

export function shadow(p) {
  const elevation = Math.min(24, Math.max(0, p));
  return {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: elevation > 1 ? Math.floor(elevation / 2) : elevation,
    },
    shadowOpacity: Number(
      (0.16 + elevation * 0.02 - Math.floor(elevation / 4) * 0.01).toFixed(2),
    ),
    shadowRadius: shadowsRadius[elevation],
    elevation: elevation,
  };
}
