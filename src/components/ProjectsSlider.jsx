import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import BlurText from "./BlurText";

const images = [
  {
    src: "/hundersrl.jpeg",
    alt: "Proyecto 1",
    code: "Proyecto 01",
    title: "Hunder SRL",
    type: "Informativo",
    description:
      "Sitio enfocado en mostrar maquinaria y productos de forma clara, profesional y ordenada.",
  },
  {
    src: "/carritope.jpeg",
    alt: "Proyecto 2",
    code: "Proyecto 02",
    title: "Carrito de compra",
    type: "E-commerce",
    description:
      "Diseñado para agrupar todas las compras",
  },
  {
    src: "/hundermaquinaxd.jpeg",
    alt: "Proyecto 3",
    code: "Proyecto 03",
    title: "Hunder SRL",
    type: "Catálogo Industrial",
    description:
      "Página enfocada en presentar un servicio de forma atractiva, directa y moderna.",
  },
  {
    src: "/deschunder.jpeg",
    alt: "Proyecto 4",
    code: "Proyecto 04",
    title: "About me",
    type: "Muestra información acerca de Hunder SRL",
    description:
      "Sitio diseñado para mostrar habilidades, proyectos y una identidad visual más marcada.",
  },
  {
    src: "/miportps.png",
    alt: "Proyecto 5",
    code: "Proyecto 05",
    title: "Mi portafolio",
    type: "Página propia",
    description:
      "Página diseñada para demostrar habilidades",
  },
  {
    src: "/bolitas.png",
    alt: "Proyecto 6",
    code: "Proyecto 06",
    title: "Mi portafolio",
    type: "Página propia",
    description:
      "Página diseñada para demostrar habilidades",
  },
  {
    src: "/catalogoderopape.jpeg",
    alt: "Proyecto 7",
    code: "Proyecto 07",
    title: "Catálogo casual",
    type: "Informativo",
    description:
      "Permite visualizar los productos de tu negocio.",
  },
  {
    src: "/jorgito.jpeg",
    alt: "Proyecto 8",
    code: "Proyecto 08",
    title: "Negocio Local",
    type: "Presencia digital",
    description:
      "Sitio creado para dar visibilidad a un negocio, mejorar imagen y captar más interés.",
  },
  {
    src: "/images/x.com/4.jpeg",
    alt: "Proyecto 9",
    code: "Proyecto 09",
    title: "Proyecto Creativo",
    type: "Diseño experimental",
    description:
      "Exploración visual con una propuesta más llamativa, moderna y enfocada en impacto estético.",
  },
];

export function Skiper52({ darkMode }) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-transparent">
      <HoverExpand_001 images={images} darkMode={darkMode} />
    </div>
  );
}

const HoverExpand_001 = ({ images, darkMode }) => {
  const [activeImage, setActiveImage] = useState(1);
  const activeProject = images[activeImage];

  const colors = {
    title: darkMode ? "#f5f5f5" : "#111111",
    text: darkMode ? "rgba(245,245,245,0.7)" : "rgba(17,17,17,0.7)",
    muted: darkMode ? "rgba(245,245,245,0.5)" : "rgba(17,17,17,0.5)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative w-full max-w-6xl px-5"
    >
      <div className="mb-10 px-4 text-center min-h-[170px]">
  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#12c352]">
    Proyectos
  </p>

  <h2
    className="mt-3 text-3xl font-black md:text-5xl"
    style={{ color: colors.title }}
  >
    <BlurText
      key={`title-${activeImage}`}
      text={activeProject.title}
      delay={18}
      animateBy="letters"
      direction="top"
    />
  </h2>

  <p
    className="mt-3 text-sm uppercase tracking-[0.15em] md:text-base"
    style={{ color: colors.muted }}
  >
    <BlurText
      key={`type-${activeImage}`}
      text={activeProject.type}
      delay={14}
      animateBy="letters"
      direction="top"
    />
  </p>

  <p
    className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed md:text-base"
    style={{ color: colors.text }}
  >
    <BlurText
      key={`desc-${activeImage}`}
      text={activeProject.description}
      delay={6}
      animateBy="words"
      direction="top"
    />
  </p>
</div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="flex w-full items-center justify-center gap-1">
          {images.slice(0, 7).map((image, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-3xl"
              initial={{ width: "2.5rem", height: "20rem" }}
              animate={{
                width: activeImage === index ? "24rem" : "5rem",
                height: "24rem",
              }}
              transition={{ duration: 0.47, ease: "easeInOut" }}
              onClick={() => setActiveImage(index)}
              onHoverStart={() => setActiveImage(index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute h-full w-full bg-gradient-to-t from-black/40 to-transparent"
                  />
                )}
              </AnimatePresence>

              <img
                src={image.src}
                className="size-full object-cover"
                alt={image.alt}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { HoverExpand_001 };