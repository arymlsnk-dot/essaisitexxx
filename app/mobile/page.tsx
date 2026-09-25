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

export default function MobileHome() {
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
      <header className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-4 bg-gradient-to-b from-black/80 to-transparent transition-transform duration-300 ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}>
        <button onClick={() => setIsMenuOpen(true)} className={`bg-transparent border-none text-white p-2 ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 border border-white/10 rounded-sm w-[160px]">
          <Search size={14} strokeWidth={1.5} className="text-white shrink-0" />
          <input type="text" placeholder="RECHERCHER..." className="bg-transparent border-none outline-none text-[9px] tracking-widest w-full placeholder-white text-white uppercase font-sans" style={{ color: "#ffffff" }} />
        </div>
        <ShoppingBag size={22} strokeWidth={1.5} className="text-white" />
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]" onClick={() => setIsMenuOpen(false)} />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 left-0 h-full w-[80vw] bg-black/50 backdrop-blur-2xl z-[100] flex flex-col p-6">
              <button onClick={() => setIsMenuOpen(false)} className="bg-transparent border-none text-white self-start mb-8">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <span className="font-serif tracking-[0.3em] text-white uppercase font-bold text-lg mb-6">NAVIGATION</span>
              <div className="flex flex-col gap-6">
                {["HOMME", "FEMME", "ENFANT", "CHAUSSURES", "BONNETS", "GANTS", "LUNETTES", "MAROQUINERIE"].map((item) => (
                  <a key={item} href="#" className="text-white font-serif tracking-[0.15em] text-xl no-underline">{item}</a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 w-full h-full z-0 bg-[#050505] pointer-events-none">
        <img src="/fond.jpg" alt="Background" className="w-full h-full object-cover brightness-100 contrast-125" />
      </div>

      <section className="relative z-0 h-screen w-full flex flex-col items-center justify-center px-4 text-center">
        <motion.div animate={{ opacity: isHeroHidden ? 0 : 1, scale: isHeroHidden ? 0.85 : 1, y: isHeroHidden ? -40 : 0 }} transition={{ duration: 0.5 }} className="w-full">
          <h1 className="font-serif text-[3.5rem] leading-none tracking-widest text-white/90 mb-6 uppercase">
            Balenciaga
          </h1>
          <button onClick={toggleCollection} className="font-sans text-[10px] tracking-[0.2em] uppercase bg-black/50 backdrop-blur-md text-white px-8 py-4 border-none inline-flex items-center gap-3 font-bold cursor-pointer">
            {showCollection ? <>Masquer <ArrowUp size={18} /></> : <>Découvrir <ArrowDown size={18} /></>}
          </button>
        </motion.div>
      </section>

      {showCollection && (
        <motion.section id="collection-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="relative z-20 w-full py-16 bg-transparent">
          <div className="relative z-10 w-full bg-white/10 backdrop-blur-md text-white py-2 overflow-hidden mb-8">
            <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] flex gap-8 font-sans text-[8px] tracking-[0.3em] uppercase font-bold text-white">
              <span>CUIR PLEINE GRAINE • ARTISANAT ITALIEN • ÉDITION LIMITÉE • FINITIONS MAIN •</span>
              <span>CUIR PLEINE GRAINE • ARTISANAT ITALIEN • ÉDITION LIMITÉE • FINITIONS MAIN •</span>
            </div>
          </div>
          <div className="relative z-10 max-w-[340px] mx-auto px-4">
            <div className="grid grid-cols-1 gap-12">
              {products.map((product) => (
                <div key={product.id} className="group flex flex-col items-center w-full">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/50 flex flex-col justify-between rounded-sm">
                    <div className="flex-1 flex items-center justify-center p-6">
                      <img src={product.image} alt={product.name} className="object-contain w-full h-full" />
                    </div>
                    <div className="w-full bg-black/80 backdrop-blur-md py-3 px-2 text-center">
                      <h3 className="font-serif text-xs tracking-[0.15em] text-white uppercase mb-1">{product.name}</h3>
                      <p className="font-sans text-xs text-white tracking-wider font-semibold">{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      <footer className="relative z-25 w-full pt-16 pb-12 px-6 mt-12 bg-transparent text-white">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-lg tracking-[0.2em] uppercase">Newsletter</h3>
            <p className="text-[10px] uppercase tracking-widest leading-relaxed">Abonnez-vous pour recevoir les actualités exclusives.</p>
            <div className="flex flex-col gap-2 bg-black/40 p-3 border border-white/20">
              <input type="email" placeholder="VOTRE EMAIL" className="bg-transparent border-none outline-none text-[10px] tracking-widest text-white uppercase" />
              <button className="text-[10px] uppercase tracking-widest font-bold bg-[#222222] py-2 border border-white/30 text-white">S'inscrire</button>
            </div>
          </div>
          <div className="flex flex-col gap-6 text-[10px] uppercase tracking-widest">
            <h4 className="font-serif text-xs tracking-[0.2em] font-bold">Service client</h4>
            <a href="#" className="no-underline text-white">Suivre votre commande</a>
            <a href="#" className="no-underline text-white">Retours & Échanges</a>
            <a href="#" className="no-underline text-white">Livraison</a>
          </div>
          <div className="pt-8 border-t border-white/20 text-center">
            <p className="text-[9px] uppercase tracking-widest">© 2026 L'ESSENTIEL STUDIO.</p>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `body, html { margin: 0 !important; padding: 0 !important; background-color: #050505 !important; overflow-x: hidden !important; } @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } } html { scroll-behavior: smooth; }`}} />
    </div>
  );
}