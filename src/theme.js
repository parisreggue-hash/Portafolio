export const t = (dark) => ({
  bg:           dark ? '#0b0b0b'                  : '#f4efe7',
  surface:      dark ? 'rgba(255,255,255,0.03)'  : 'rgba(17,17,17,0.03)',
  surface2:     dark ? 'rgba(255,255,255,0.06)'  : 'rgba(17,17,17,0.05)',
  border:       dark ? 'rgba(255,255,255,0.07)'  : 'rgba(17,17,17,0.08)',
  border2:      dark ? 'rgba(255,255,255,0.12)'  : 'rgba(17,17,17,0.12)',

  text:         dark ? '#f3f1ec'                 : '#111111',
  textMuted:    dark ? 'rgba(243,241,236,0.48)'  : 'rgba(17,17,17,0.48)',
  aboutText:    dark ? 'rgba(243,241,236,0.76)'  : 'rgba(17,17,17,0.78)',
  textFaint:    dark ? 'rgba(243,241,236,0.14)'  : 'rgba(17,17,17,0.14)',

  accent:       dark ? '#83A0C9'                 : '#4a6fa0',
  accentStrong: dark ? '#a8bedd'                 : '#2e527e',
  accentSoft:   dark ? 'rgba(131,160,201,0.14)'  : 'rgba(74,111,160,0.10)',
  accentGlow:   dark ? '0 0 60px rgba(131,160,201,0.20)' : 'none',

  btnGlass:     dark ? 'rgba(255,255,255,0.05)'  : 'rgba(17,17,17,0.04)',
  btnBorder:    dark ? 'rgba(255,255,255,0.10)'  : 'rgba(17,17,17,0.10)',
  btnText:      dark ? 'rgba(243,241,236,0.62)'  : 'rgba(17,17,17,0.60)',

  divider:      dark ? 'rgba(255,255,255,0.05)'  : 'rgba(17,17,17,0.07)',
})