import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const images = [
  {
    src: "/images/x.com/13.jpeg",
    alt: "Proyecto 1",
    code: "Proyecto 01",
    title: "Hunder SRL",
    type: "Catálogo industrial",
    description:
      "Sitio enfocado en mostrar maquinaria y productos de forma clara, profesional y ordenada.",
  },
  {
    src: "/images/x.com/32.jpeg",
    alt: "Proyecto 2",
    code: "Proyecto 02",
    title: "Tienda Virtual",
    type: "E-commerce",
    description:
      "Diseño pensado para mostrar productos, mejorar la experiencia visual y facilitar la navegación.",
  },
  {
    src: "/images/x.com/20.jpeg",
    alt: "Proyecto 3",
    code: "Proyecto 03",
    title: "Landing Comercial",
    type: "Landing page",
    description:
      "Página enfocada en presentar un servicio de forma atractiva, directa y moderna.",
  },
  {
    src: "/images/x.com/21.jpeg",
    alt: "Proyecto 4",
    code: "Proyecto 04",
    title: "Portafolio Personal",
    type: "Portfolio",
    description:
      "Sitio diseñado para mostrar habilidades, proyectos y una identidad visual más marcada.",
  },
  {
    src: "/images/x.com/19.jpeg",
    alt: "Proyecto 5",
    code: "Proyecto 05",
    title: "Web Corporativa",
    type: "Sitio empresarial",
    description:
      "Página profesional para transmitir confianza, presentar servicios y reforzar presencia digital.",
  },
  {
    src: "/images/x.com/1.jpeg",
    alt: "Proyecto 6",
    code: "Proyecto 06",
    title: "Catálogo de Productos",
    type: "Catálogo web",
    description:
      "Diseño orientado a organizar productos y facilitar una presentación visual limpia y efectiva.",
  },
  {
    src: "/images/x.com/2.jpeg",
    alt: "Proyecto 7",
    code: "Proyecto 07",
    title: "Página Informativa",
    type: "Informativa",
    description:
      "Web rápida y clara para comunicar información importante con una estructura sencilla.",
  },
  {
    src: "/images/x.com/3.jpeg",
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
      <div className="mb-10 px-4 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#12c352]">
          Proyectos
        </p>

        <h2
          className="mt-3 text-3xl font-black md:text-5xl"
          style={{ color: colors.title }}
        >
          {activeProject.title}
        </h2>

        <p
          className="mt-3 text-sm uppercase tracking-[0.15em] md:text-base"
          style={{ color: colors.muted }}
        >
          {activeProject.type}
        </p>

        <p
          className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed md:text-base"
          style={{ color: colors.text }}
        >
          {activeProject.description}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="flex w-full items-center justify-center gap-1">
          {images.map((image, index) => (
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