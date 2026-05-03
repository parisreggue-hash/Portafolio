const getTechs = (darkMode) => [
  { img: 'https://cdn.simpleicons.org/javascript/F7DF1E', name: 'JavaScript' },
  { img: 'https://cdn.simpleicons.org/react/61DAFB', name: 'React' },
  { img: 'https://cdn.simpleicons.org/vite/646CFF', name: 'Vite' },
  { img: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', name: 'Tailwind' },
  { img: 'https://cdn.simpleicons.org/framer/0055FF', name: 'Framer Motion' },
  { img: 'https://cdn.simpleicons.org/git/F05032', name: 'Git' },
  {
    img: darkMode
      ? 'https://cdn.simpleicons.org/github/ffffff'
      : 'https://cdn.simpleicons.org/github/181717',
    name: 'GitHub',
  },
  { img: 'https://cdn.simpleicons.org/netlify/00C7B7', name: 'Netlify' },
  { img: 'https://cdn.simpleicons.org/html5/E34F26', name: 'HTML5' },
  { img: '/css3.png', name: 'CSS3' }
];

export default function LogoLoop({ darkMode }) {
  const techs = getTechs(darkMode);
  const items = [...techs, ...techs];

  return (
    <div
      className="relative overflow-hidden w-full py-6"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div className="flex gap-10 w-max animate-[logoloop_25s_linear_infinite]">
        {items.map((tech, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
            <img
              src={tech.img}
              alt={tech.name}
              width={36}
              height={36}
              className="transition-opacity duration-200"
              style={{ opacity: darkMode ? 0.72 : 0.88 }}
            />
            <span
              className="text-xs font-body transition-colors duration-300"
              style={{
                color: darkMode ? 'rgba(255,255,255,0.65)' : 'rgba(17,17,17,0.72)',
              }}
            >
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}