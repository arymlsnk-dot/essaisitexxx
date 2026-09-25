"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Bookmark, ArrowDown, ArrowUp } from "lucide-react";

const products = [
  { id: 1, name: "DERBY STUDS HARDWARE", price: "990,00 €", image: "/produit1.png" },
  { id: 2, name: "STRIKE CANVAS BOOT", price: "1 095,00 €", image: "/produit2.png" },
  { id: 3, name: "BOTTES HAUTES SOUPLES", price: "1 990,00 €", image: "/produit3.png" },
  { id: 4, name: "SNEAKER RUNNER BLACK", price: "950,00 €", image: "/produit4.png" },
  { id: 5, name: "SNEAKER MULTI-POCKET", price: "1 150,00 €", image: "/produit5.png" },
  { id: 6, name: "SNEAKER RUNNER BLACK", price: "950,00 €", image: "/produit6.png" },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [isHeroHidden, setIsHeroHidden] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);

      const collectionElement = document.getElementById("collection-section");
      if (collectionElement) {
        const rect = collectionElement.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) {
          setIsHeroHidden(true);
        } else {
          setIsHeroHidden(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleCollection = () => {
    if (!showCollection) {
      setShowCollection(true);
      setTimeout(() => {
        document.getElementById("collection-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        setShowCollection(false);
        setIsHeroHidden(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen text-[#ffffff] relative overflow-x-hidden w-full" style={{ backgroundColor: "transparent" }}>

      {/* --- HEADER / NAVIGATION BAR --- */}
      <header className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-gradient-to-b from-black/80 to-transparent transition-transform duration-300 ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`bg-transparent border-none text-white hover:text-gray-300 transition-opacity duration-300 cursor-pointer outline-none flex items-center justify-center p-2 ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* --- BARRE DE RECHERCHE AU MILIEU --- */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 border border-white/10 rounded-sm w-[200px] sm:w-[240px] md:w-[320px]">
          <Search size={18} strokeWidth={1.5} className="text-white shrink-0" />
          <input
            type="text"
            placeholder="RECHERCHER..."
            className="bg-transparent border-none outline-none text-[11px] md:text-xs tracking-widest w-full placeholder-white text-white focus:ring-0 uppercase font-sans"
            style={{ color: "#ffffff" }}
          />
        </div>

        <div className="flex items-center gap-4 md:gap-6 -ml-7">
          <Bookmark size={22} strokeWidth={1.5} className="cursor-pointer hover:text-gray-300 transition-colors hidden md:block text-white" />
          <ShoppingBag size={28} strokeWidth={1.5} className="cursor-pointer hover:text-gray-300 transition-colors text-white" />
        </div>
      </header>

      {/* --- OVERLAY & MENU --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[85vw] md:w-[50vw] bg-black/40 backdrop-blur-2xl z-[100] flex flex-col"
            >
              <div className="relative z-[120] px-6 md:px-12 pt-12 pb-6 flex items-center gap-6 w-full">
                <motion.button 
                  onClick={() => setIsMenuOpen(false)} 
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                  className="bg-transparent border-none text-white hover:text-gray-300 cursor-pointer outline-none flex items-center justify-center"
                >
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </motion.button>
                <span className="font-serif tracking-[0.4em] text-white uppercase font-bold text-xl md:text-2xl">NAVIGATION</span>
              </div>

              <div className="relative z-[110] flex-1 overflow-y-auto flex flex-col justify-center pb-12 pl-6 md:pl-12">
                <div className="flex flex-col" style={{ gap: "calc(1.75rem * 1.5)" }}>
                  {["HOMME", "FEMME", "ENFANT", "CHAUSSURES", "BONNETS", "GANTS", "LUNETTES", "MAROQUINERIE"].map((item, idx) => (
                    <motion.a
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={item}
                      href="#"
                      className="text-white hover:text-gray-300 transition-all hover:translate-x-3 duration-300 block font-serif tracking-[0.15em] text-[1.75rem] md:text-[2.5rem] leading-none no-underline"
                      style={{ color: "#ffffff" }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- BACKGROUNDS --- */}
      <div className="fixed inset-0 w-full h-full z-0 bg-[#050505] pointer-events-none">
        <img src="/fond.jpg" alt="Background" className="w-full h-full object-cover brightness-100 contrast-125" />
      </div>

      <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.03] mix-blend-overlay"
        style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}
      />

      {/* --- HERO SECTION --- */}
      <section className="relative z-0 h-screen w-full flex flex-col items-center justify-center pt-28 px-4">
        <motion.div
          animate={{
            opacity: isHeroHidden ? 0 : 1,
            scale: isHeroHidden ? 0.85 : 1,
            y: isHeroHidden ? -60 : 0
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative flex flex-col items-center text-center w-full"
        >
          {/* Titre : exactement [30rem] d'origine sur PC, et réduit uniquement sur mobile */}
          <h1 className="font-serif text-[5rem] sm:text-[8rem] lg:text-[30rem] leading-none tracking-widest text-white/80 mb-6 uppercase">
            Balenciaga
          </h1>
          <button onClick={toggleCollection} className="group font-sans text-xs md:text-sm tracking-[0.2em] uppercase bg-black/40 backdrop-blur-md text-white px-12 py-5 hover:bg-white hover:text-black transition-all duration-500 border-none flex items-center gap-4 cursor-pointer font-bold">
            {showCollection ? (
              <>Masquer la collection <ArrowUp size={30} className="group-hover:-translate-y-2 transition-transform duration-300" /></>
            ) : (
              <>Découvrir la collection <ArrowDown size={30} className="group-hover:translate-y-2 transition-transform duration-300" /></>
            )}
          </button>
        </motion.div>
      </section>

      {/* --- COLLECTION SECTION --- */}
      {showCollection && (
        <motion.section 
          id="collection-section" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 w-full py-32 overflow-hidden bg-transparent"
        >
          {/* LA BANDE ANIMÉE (Marquee) */}
          <div className="relative z-10 w-full bg-white/10 backdrop-blur-md text-white py-3 overflow-hidden mb-0">
            <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] flex gap-12 font-sans text-[10px] tracking-[0.3em] uppercase font-bold text-white">
              <span className="flex gap-12">CUIR PLEINE GRAINE • ARTISANAT ITALIEN • ÉDITION LIMITÉE • BOUTOTS STRUCTURES • SNEAKERS ARCHITECTURALES • FINITIONS MAIN • COLLECTION EXCLUSIVE •</span>
              <span className="flex gap-12">CUIR PLEINE GRAINE • ARTISANAT ITALIEN • ÉDITION LIMITÉE • BOUTOTS STRUCTURES • SNEAKERS ARCHITECTURALES • FINITIONS MAIN • COLLECTION EXCLUSIVE •</span>
            </div>
          </div>

          {/* GRILLE DE PRODUITS : 4 colonnes exactes d'origine sur PC (lg:grid-cols-4), et 1/2 colonnes adaptées sur mobile */}
          <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 mt-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 lg:gap-x-8 lg:gap-y-24">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer flex flex-col items-center w-full"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/40 flex flex-col justify-between">
                    <div className="flex-1 flex items-center justify-center p-4 lg:p-6">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-contain w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-108 transition-all duration-500"
                      />
                    </div>
                    <div className="w-full bg-black/75 backdrop-blur-md py-3 lg:py-4 px-2 lg:px-3 text-center">
                      <h3 className="font-serif text-[10px] lg:text-sm tracking-[0.15em] text-white uppercase mb-1 truncate" style={{ color: "#ffffff" }}>{product.name}</h3>
                      <p className="font-sans text-[10px] lg:text-sm text-white tracking-wider font-semibold" style={{ color: "#ffffff" }}>{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* --- FOOTER HARMONISÉ --- */}
      <footer className="relative z-25 w-full pt-32 pb-24 px-6 md:px-16 lg:px-24 mt-[17.5vh]" style={{ backgroundColor: "transparent", color: "#ffffff" }}>
        <div className="max-w-[1600px] mx-auto">

          {/* SECTION SUPÉRIEURE : NEWSLETTER ET CONTACTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 pb-20 border-b border-white/20">
            {/* Colonne Newsletter */}
            <div className="flex flex-col gap-6 max-w-xl">
              <h3 className="font-serif text-xl md:text-2xl tracking-[0.2em] uppercase !text-white" style={{ color: "#ffffff" }}>Newsletter</h3>
              <p className="text-xs uppercase tracking-widest !text-white leading-relaxed" style={{ color: "#ffffff" }}>
                Abonnez-vous pour recevoir les actualités exclusives et les lancements de la Maison.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 items-stretch sm:items-center bg-black/40 backdrop-blur-md px-4 py-3 border border-white/20 rounded-sm">
                <input
                  type="email"
                  placeholder="VOTRE EMAIL"
                  className="bg-transparent border-none outline-none text-xs tracking-widest w-full placeholder-white !text-white focus:ring-0 uppercase"
                  style={{ color: "#ffffff" }}
                />
                <button className="text-xs uppercase tracking-widest font-bold hover:opacity-80 transition-opacity bg-[#222222] px-6 py-3 sm:py-2 sm:ml-2 rounded-sm border border-white/30 !text-white shrink-0" style={{ backgroundColor: "#222222", color: "#ffffff" }}>S'inscrire</button>
              </div>
            </div>

            {/* Colonne Nous Contacter */}
            <div className="flex flex-col gap-6">
              <h3 className="font-serif text-xl md:text-2xl tracking-[0.2em] uppercase !text-white" style={{ color: "#ffffff" }}>Nous Contacter</h3>
              <p className="text-[10px] uppercase tracking-widest !text-white leading-relaxed" style={{ color: "#ffffff" }}>
                Nos conseillers vous répondent du lundi au samedi de 9h30 à 19h00.
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
                <a href="#" className="text-[10px] uppercase tracking-widest hover:text-gray-300 transition-colors flex items-center gap-2 no-underline !text-white" style={{ color: "#ffffff" }}>
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE CHAT
                </a>
                <a href="#" className="text-[10px] uppercase tracking-widest hover:text-gray-300 transition-colors flex items-center gap-2 no-underline !text-white" style={{ color: "#ffffff" }}>
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span> WHATSAPP
                </a>
                <a href="#" className="text-[10px] uppercase tracking-widest hover:text-gray-300 transition-colors flex items-center gap-2 no-underline !text-white" style={{ color: "#ffffff" }}>
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span> TÉLÉPHONE
                </a>
                <a href="#" className="text-[10px] uppercase tracking-widest hover:text-gray-300 transition-colors flex items-center gap-2 no-underline !text-white" style={{ color: "#ffffff" }}>
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span> EMAIL
                </a>
              </div>
            </div>
          </div>

          {/* GRILLE PRINCIPALE DU FOOTER : 4 colonnes d'origine sur PC (md:grid-cols-4) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
            
            {/* Colonne 1 : Service client */}
            <div className="flex flex-col gap-4">
              <h4 className="font-serif text-xs md:text-sm tracking-[0.2em] uppercase mb-2 font-bold !text-white" style={{ color: "#ffffff" }}>Service client</h4>
              <div className="flex flex-col gap-3 text-[10px] uppercase tracking-widest !text-white" style={{ color: "#ffffff" }}>
                <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>Suivre votre commande</a>
                <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>Retours & Échanges</a>
                <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>Livraison</a>
                <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>Paiement</a>
                <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>FAQ</a>
              </div>
            </div>

            {/* Colonne 2 : L'entreprise & Pays */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h4 className="font-serif text-xs md:text-sm tracking-[0.2em] uppercase mb-2 font-bold !text-white" style={{ color: "#ffffff" }}>L'entreprise</h4>
                <div className="flex flex-col gap-3 text-[10px] uppercase tracking-widest !text-white" style={{ color: "#ffffff" }}>
                  <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>Carrières</a>
                  <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>Design Studio</a>
                  <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>Nos Engagements</a>
                  <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>Archives</a>
                </div>
              </div>

              <div className="pt-4 border-t border-white/25">
                <p className="text-[10px] uppercase tracking-widest !text-white mb-1" style={{ color: "#ffffff" }}>Pays / Région</p>
                <p className="text-xs uppercase tracking-widest font-bold !text-white" style={{ color: "#ffffff" }}>France</p>
              </div>
            </div>

            {/* Colonne 3 : Nous suivre */}
            <div className="flex flex-col gap-4">
              <h4 className="font-serif text-xs md:text-sm tracking-[0.2em] uppercase mb-2 font-bold !text-white" style={{ color: "#ffffff" }}>Nous suivre</h4>
              <div className="flex flex-col gap-3 text-[10px] uppercase tracking-widest !text-white" style={{ color: "#ffffff" }}>
                <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>Instagram</a>
                <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>Tiktok</a>
                <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>Pinterest</a>
                <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>Facebook</a>
                <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>Substack</a>
              </div>
            </div>

            {/* Colonne 4 : Boutiques & Signature */}
            <div className="flex flex-col justify-between gap-8 col-span-2 md:col-span-1">
              <div className="flex flex-col gap-4">
                <h4 className="font-serif text-xs md:text-sm tracking-[0.2em] uppercase mb-2 font-bold !text-white" style={{ color: "#ffffff" }}>Boutiques</h4>
                <div className="flex flex-col gap-3 text-[10px] uppercase tracking-widest !text-white" style={{ color: "#ffffff" }}>
                  <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>Trouver une boutique</a>
                  <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>Prendre rendez-vous</a>
                </div>
              </div>

              <div className="hidden lg:block">
                 <span className="font-serif italic tracking-[0.3em] uppercase font-bold text-xl !text-white" style={{ color: "#ffffff" }}>L'ESSENTIEL</span>
              </div>
            </div>

          </div>

          {/* BAS DE PAGE : COPYRIGHT & LÉGAL */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 pb-8 gap-4 border-t border-white/25">
            <p className="text-[10px] uppercase tracking-widest !text-white text-center md:text-left" style={{ color: "#ffffff" }}>
              © 2026 L'ESSENTIEL STUDIO. TOUS DROITS RÉSERVÉS.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-widest !text-white" style={{ color: "#ffffff" }}>
              <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>Mentions légales</a>
              <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>Confidentialité</a>
              <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>Cookies</a>
              <a href="#" className="no-underline hover:text-gray-300 transition-colors !text-white" style={{ color: "#ffffff" }}>Accessibilité</a>
            </div>
          </div>

        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        body, html { margin: 0 !important; padding: 0 !important; background-color: #050505 !important; overflow-x: hidden !important; }
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        html { scroll-behavior: smooth; }
      `}} />
    </div>
  );
}