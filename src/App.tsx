import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Play, 
  ChevronDown, ChevronUp, Lock, HelpCircle, 
  Check, Gift, Award, ThumbsUp, ShoppingCart, Info
} from 'lucide-react';
import { EBOOK_COVER_PATH, PREVIEW_HAIRSTYLE_PATH, bonuses, faqItems } from './data';
import CheckoutModal from './components/CheckoutModal';
import MembersArea from './components/MembersArea';
import { BraidsCarousel } from './components/BraidsCarousel';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Interactive page states
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [urgencyMinutes, setUrgencyMinutes] = useState(14);
  const [urgencySeconds, setUrgencySeconds] = useState(59);
  const [recentPurchaseName, setRecentPurchaseName] = useState<string | null>(null);
  const [previewPageIndex, setPreviewPageIndex] = useState(0);

  // Offers section ref for smooth scroll
  const offerSectionRef = useRef<HTMLDivElement>(null);

  // Urgency Timer for header
  useEffect(() => {
    const timer = setInterval(() => {
      setUrgencySeconds(prev => {
        if (prev === 0) {
          setUrgencyMinutes(m => (m === 0 ? 14 : m - 1));
          return 59;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Purchase Popups simulator (to make the page feel dynamically converting!)
  useEffect(() => {
    const names = [
      'Mariana S.', 'Karina F.', 'Renata de M.', 'Viviane O.', 
      'Priscila de A.', 'Ana Paula N.', 'Fernanda G.', 'Alessandra Santos'
    ];
    let count = 0;
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      setRecentPurchaseName(randomName);
      // disappear after 4 seconds
      setTimeout(() => setRecentPurchaseName(null), 4000);
      count++;
      if (count > 6) clearInterval(interval);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const scrollToOffer = () => {
    if (offerSectionRef.current) {
      offerSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    setIsCheckoutOpen(false);
    setIsUnlocked(true);
    // Smooth scroll back to top to let them see their unlocked area instantly!
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sample book pages for interactive preview
  const bookPages = [
    {
      title: "Como trançar mecha por mecha",
      subtitle: "Capítulo 2: Introdução para Dedos Iniciantes",
      desc: "Evite puxar com força! O segredo é manter os cotovelos apoiados na mesa para dar firmeza às mãos. Comece dividindo o cabelo com um pente fino umedecido.",
      visualCode: "01"
    },
    {
      title: "Cabelos Curtinhos caipiras",
      subtitle: "Capítulo 5: O Truque das Presilhas Ocultas",
      desc: "Ideal para bebês e pequenininhas com pouco cabelo. Use pequenos elásticos coloridos criando fileiras simétricas até prender nas orelhinhas com mini flores.",
      visualCode: "02"
    },
    {
      title: "Incorporar fitas sem embolar",
      subtitle: "Capítulo 3: Costura Caipira",
      desc: "Prenda a fita de cetim com um grampo invisível antes de trançar. A fita deve sempre acompanhar o lado de fora do cabelo para ficar brilhando na dança.",
      visualCode: "03"
    },
    {
      title: "Fixação que resiste à quadrilha",
      subtitle: "Capítulo 9: Higiene e Durabilidade",
      desc: "Como assentar o frizz sem deixar o cabelo duro ou pesado. O segredo é misturar 1 tampinha de soro fisiológico a borrifadas de fixador suave infantil.",
      visualCode: "04"
    }
  ];

  return (
    <div className="bg-[#FAF9F6] text-slate-800 font-sans min-h-screen relative selection:bg-rose-500 selection:text-white" id="main-landing-root">

      <AnimatePresence>
        {isUnlocked ? (
          // MEMEBERS PREMIUM DASHBOARD (Unlocked)
          <motion.div
            key="members-dashboard-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MembersArea onExit={() => setIsUnlocked(false)} />
          </motion.div>
        ) : (
          // VISUALLY CAPTIVATING & PERSUASIVE SALES LANDING PAGE (Normal Mode)
          <motion.div
            key="sales-landing-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-16"
          >
            {/* 1. BARRA DE URGÊNCIA */}
            <div className="relative z-40 bg-rose-600 text-white text-[11px] sm:text-xs font-black text-center py-2.5 px-4 shadow-sm border-b border-rose-500 flex items-center justify-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 bg-rose-700 text-amber-300 px-1.5 py-0.5 rounded-md text-[9px] uppercase tracking-wider font-extrabold shrink-0">
                ⏰ OFERTA LIMITADA
              </span>
              <span>As Festas Juninas Já Começaram! Essa oferta especial expira em </span>
              <span className="font-mono text-amber-200 underline font-black">
                {urgencyMinutes.toString().padStart(2, '0')}:{urgencySeconds.toString().padStart(2, '0')}
              </span>
              <span> — Garanta agora seu Guia e assista às vídeo aulas imediatamente por e-mail!</span>
            </div>

            {/* HEADER HERO SECTION */}
            <header className="relative overflow-hidden bg-gradient-to-b from-rose-500 via-rose-500 to-rose-600 text-white pt-10 pb-16 px-4 md:px-6">
              
              {/* Minimalist flags decor */}
              <div className="absolute top-0 inset-x-0 h-4 flex justify-around opacity-45 select-none pointer-events-none">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-4 origin-top transform rotate-12 ${
                      i % 3 === 0 ? 'bg-amber-300' : i % 3 === 1 ? 'bg-sky-300' : 'bg-emerald-300'
                    }`}
                    style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
                  ></div>
                ))}
              </div>

              <div className="max-w-4xl mx-auto text-center space-y-6">

                {/* 2. HEADLINE PRINCIPAL (Emotional pain-focused) */}
                <h1 className="text-3xl sm:text-4xl md:text-5.5xl font-black tracking-tight leading-none md:leading-tight">
                  Aprenda Mais de 35 Penteados Juninos Infantis de Forma <span className="text-amber-300 underline underline-offset-4">Simples e Fácil</span>!
                </h1>

                {/* IMAGE BELOW HEADLINE */}
                <div className="flex justify-center pt-2 pb-2">
                  <div className="relative group">
                    {/* Decorative backglow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-rose-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-45 transition-opacity"></div>
                    
                    <img
                      src={EBOOK_COVER_PATH}
                      alt="Guia Penteados Juninos"
                      referrerPolicy="no-referrer"
                      className="relative w-64 sm:w-80 md:w-[440px] rounded-2xl shadow-2xl border border-white/20 transform -rotate-1 group-hover:rotate-0 transition-all duration-300 mx-auto"
                    />
                  </div>
                </div>

                {/* Subheadline description */}
                <p className="text-sm md:text-lg text-rose-50 font-medium max-w-2xl mx-auto leading-relaxed">
                  Aprenda mais de <strong className="text-yellow-250 font-extrabold">+35 penteados juninos infantis</strong> simples, rápidos e encantadores através de vídeo aulas detalhadas passo a passo de fácil entendimento e bônus salvadores.
                </p>

                {/* 3. DETAILS & CTA CONTAINER */}
                <div className="max-w-xl mx-auto pt-4 pb-2 bg-white/5 p-4 sm:p-6 rounded-3xl border border-white/10 backdrop-blur-xs space-y-6">
                  {/* details list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-left max-w-md mx-auto">
                    <div className="flex items-center gap-2 text-rose-50">
                      <span className="w-5 h-5 flex items-center justify-center bg-white/15 rounded-full text-amber-300 text-xs shrink-0">✔</span>
                      <span>Acesso imediato no seu Email</span>
                    </div>
                    <div className="flex items-center gap-2 text-rose-50">
                      <span className="w-5 h-5 flex items-center justify-center bg-white/15 rounded-full text-amber-300 text-xs shrink-0">✔</span>
                      <span>Vídeo Aulas Passo a Passo Sem Complicação</span>
                    </div>
                    <div className="flex items-center gap-2 text-rose-50">
                      <span className="w-5 h-5 flex items-center justify-center bg-white/15 rounded-full text-amber-300 text-xs shrink-0">✔</span>
                      <span>Ideal Para Mães Iniciantes e com pouco tempo</span>
                    </div>
                    <div className="flex items-center gap-2 text-rose-50">
                      <span className="w-5 h-5 flex items-center justify-center bg-white/15 rounded-full text-amber-300 text-xs shrink-0">✔</span>
                      <span>Super Bônus de Looks e Acessórios inclusos</span>
                    </div>
                  </div>

                  {/* 4. BOTÃO DE CTA PRINCIPAL */}
                  <div className="space-y-4 max-w-sm mx-auto">
                    <button
                      onClick={scrollToOffer}
                      id="hero-cta-btn"
                      className="w-full py-4 bg-yellow-400 text-rose-900 font-black rounded-2xl hover:bg-yellow-300 transition-all text-xs sm:text-sm tracking-wide uppercase shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-4 focus:ring-amber-300/40 cursor-pointer text-center flex items-center justify-center gap-2 pulse-cta"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      QUERO DEIXAR MINHA FILHA LINDA NA FESTA JUNINA
                    </button>
                    
                    <p className="text-center text-[10px] text-rose-100 font-medium">
                      🛡️ Pagamento seguro de parcela única • Garantia Incondicional de 7 Dias.
                    </p>
                  </div>
                </div>

              </div>

              {/* Angle cutting separator */}
              <div className="absolute bottom-0 inset-x-0 h-8 bg-[#FAF9F6] origin-bottom-right transform"></div>
            </header>

            {/* SECTIONS LAYOUT CONTAINER */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16 mt-8">

              {/* GALERIA DE RESULTADOS REALISTAS (Carrossel Automático) */}
              <section id="galeria-penteados" className="space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-1.5">
                  <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-black rounded-full uppercase tracking-wider">
                    Modelos Incríveis Que Você Fará
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Veja Alguns dos Penteados Reais que Você Vai Aprender!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
                    Assista à nossa vitrine de resultados práticos em constante movimento ou deslize com o dedo:
                  </p>
                </div>
                
                <BraidsCarousel />
              </section>

              {/* 6. PARA QUEM É? */}
              <section id="for-who" className="relative bg-gradient-to-r from-rose-50/50 via-amber-50/45 to-sky-50/50 border border-rose-100/50 rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(244,63,94,0.05)] overflow-hidden">
                {/* Decorative bubbles */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-rose-200/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-sky-200/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="text-center space-y-2 relative z-10">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[10px] uppercase font-black tracking-wider rounded-full shadow-3xs">
                    Para Quem Foi Feito?
                  </span>
                  <h2 className="text-2xl sm:text-3.5xl font-black text-slate-900 tracking-tight leading-tight">
                    Este material é perfeito para as mães que:
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs pt-6 relative z-10">
                  {[
                    { text: 'Não sabem fazer tranças ou penteados elaborados de salão', bg: 'bg-white hover:border-rose-200 hover:shadow-2xs', checkBg: 'bg-rose-500 text-white' },
                    { text: 'Precisam de ideias fáceis, rápidas e práticas de até 10 minutos', bg: 'bg-white hover:border-emerald-200 hover:shadow-2xs', checkBg: 'bg-emerald-500 text-white' },
                    { text: 'Querem economizar dinheiro e evitar filas estressantes de salão', bg: 'bg-white hover:border-sky-200 hover:shadow-2xs', checkBg: 'bg-sky-500 text-white' },
                    { text: 'Desejam deixar a filha linda e se destacando na quadrilha escolar', bg: 'bg-white hover:border-amber-200 hover:shadow-2xs', checkBg: 'bg-amber-500 text-white' },
                    { text: 'Buscam aprender um método prático e intuitivo de penteado infantil em vídeo', bg: 'bg-white hover:border-purple-200 hover:shadow-2xs', checkBg: 'bg-purple-500 text-white' },
                    { text: 'Querem registrar fotos maravilhosas desse dia especial sem fúria', bg: 'bg-white hover:border-pink-200 hover:shadow-2xs', checkBg: 'bg-pink-500 text-white' }
                  ].map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border border-slate-100 shadow-3xs flex items-center gap-3 transition-all duration-300 transform hover:scale-[1.01] ${item.bg}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 shadow-2xs font-bold text-xs ${item.checkBg}`}>
                        ✓
                      </div>
                      <span className="font-extrabold text-slate-700 leading-relaxed text-left">{item.text}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. O QUE VOCÊ VAI RECEBER */}
              <section id="what-you-receive" className="space-y-6">
                <div className="text-center space-y-1">
                  <span className="text-[10px] uppercase font-black tracking-wider text-rose-600">Conteúdo do Material</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">O Que Você Vai Aprender nas Vídeo Aulas do Guia Principal:</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: '✔ +35 Vídeo Aulas Passo a Passo', text: 'Vídeos didáticos e diretos ao ponto, de fácil entendimento, mostrando cada detalhe do posicionamento correto das mãos.' },
                    { title: '✔ Penteados para Cabelo Curto', text: 'Não tem comprimento? Vídeo aulas ensinando amarrações falsas de tranças, elásticos cruzados e chapeuzinhos de palha.', image: 'https://i.ibb.co/7tKb0B2z/curto.png' },
                    { title: '✔ Penteados para Cabelo Médio', text: 'Opções incríveis gravadas para fazer rabos decorados com Chita caipira, tiaras laterais com fitas e coques rápidos.', image: 'https://i.ibb.co/qLsCcZrV/medio.png' },
                    { title: '✔ Penteados para Cabelo Longo', text: 'Tranças caipiras deslumbrantes com lenços, tranças boxadoras decoradas com fitas coloridas marcantes explicadas em detalhes.', image: 'https://i.ibb.co/SDkgQdN2/longocerto.png' },
                    { title: '✔ Tranças Simples de 3 Pontas', text: 'Aprenda do zero a segurar as mechas, de forma prática em vídeo, sem dar nó nem cansar os braços da sua bonequinha.', image: 'https://i.ibb.co/Y4qJPc1q/tres-pontas.png' },
                    { title: '✔ Lista de Materiais Necessários', text: 'Para cada vídeo indicamos o que você usará, inclusive ensinando a adaptar do que já tem na gaveta.' },
                    { title: '✔ Técnicas para Penteado Durar e ter Brilho', text: 'Como segurar os fios rebeldes usando produtos baratos de farmácia para o penteado resistir o dia inteiro na quadrilha.' }
                  ].map((card, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-3xs flex gap-3">
                      <span className="text-lg text-rose-600 shrink-0 font-bold">✔</span>
                      <div className="flex-1">
                        {card.image && (
                          <div className="mb-3 overflow-hidden rounded-xl border border-rose-100/30 shadow-3xs bg-rose-50/10">
                            <img 
                              src={card.image} 
                              alt={card.title} 
                              referrerPolicy="no-referrer"
                              className="w-full h-auto object-cover max-h-60 rounded-xl"
                            />
                          </div>
                        )}
                        <h4 className="font-black text-xs sm:text-sm text-slate-800 leading-tight">{card.title.replace('✔ ', '')}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed mt-1.5">{card.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* BOTÃO DIRECIONADOR PARA A SEÇÃO DE OFERTA */}
                <div className="pt-6 text-center max-w-sm sm:max-w-md mx-auto space-y-3">
                  <button
                    onClick={scrollToOffer}
                    className="w-full py-4 bg-yellow-400 text-rose-900 font-black rounded-2xl hover:bg-yellow-300 transition-all text-xs sm:text-sm tracking-wide uppercase shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-4 focus:ring-amber-300/40 cursor-pointer text-center flex items-center justify-center gap-2 pulse-cta"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Quero Garantir Meu Acesso
                  </button>
                  <p className="text-[10px] text-slate-400 font-semibold">
                    🛡️ Pagamento único e seguro • Receba o acesso imediatamente
                  </p>
                </div>
              </section>

              {/* 10. BÔNUS EXCLUSIVOS */}
              <section id="bonus-section" className="space-y-6">
                <div className="text-center max-w-md mx-auto space-y-1.5">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-black rounded-full uppercase tracking-wider">
                    Presentes Exclusivos Inclusos
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Veja os Super Bônus que você vai receber de Graça:</h2>
                  <p className="text-xs text-slate-500">
                    Se você comprar HOJE, leva estes 3 materiais complementares sem pagar nenhum centavo extra!
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {bonuses.map((bonus, idx) => (
                    <div 
                      key={bonus.id} 
                      className={`p-5 rounded-3xl border text-center relative overflow-hidden flex flex-col justify-between min-h-[150px] ${
                        bonus.highlight 
                          ? 'border-rose-300 bg-rose-50/50 shadow-sm ring-1 ring-rose-200' 
                          : 'border-amber-200 bg-gradient-to-br from-amber-50/35 to-amber-50/10'
                      }`}
                    >
                      <div className="absolute top-0 right-0 p-2 bg-amber-400 text-rose-900 font-extrabold text-[8px] rounded-bl-xl uppercase tracking-wider">
                        Gratuito
                      </div>
                      <div className="space-y-2 mt-2">
                        {bonus.image && (
                          <div className="mb-3 overflow-hidden max-w-full flex justify-center">
                            <img 
                              src={bonus.image} 
                              alt={bonus.title} 
                              className="w-auto h-auto object-contain max-h-[160px] transform hover:scale-105 transition-transform duration-300" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}
                        <h3 className="font-black text-xs sm:text-sm text-slate-800 leading-tight px-4">
                          {bonus.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed px-2">
                          {bonus.description}
                        </p>
                      </div>

                      <div className="border-t border-slate-100 pt-3 mt-3 flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">
                          Valor original: <span className="line-through font-mono">R$ {bonus.originalValue},00</span>
                        </span>
                        <span className="text-emerald-700 font-black">
                          Hoje: GRÁTIS
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Value Summary block */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-150 text-center text-xs text-slate-500 max-w-md mx-auto">
                  🎁 Somente estes bônus separados custariam <strong className="font-mono text-rose-600 line-through">R$ 70,00</strong>. Comprando hoje, você leva todos eles inclusos na nossa oferta especial!
                </div>
              </section>

              {/* 12. DEPOIMENTOS DE MÃES (Social proof) */}
              <section id="depoimentos" className="space-y-6">
                <div className="text-center space-y-1">
                  <span className="text-[10px] uppercase font-black tracking-wider text-rose-600">Amor Revelado por Mães</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Quem já assistiu e usou, Recomenda:</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                  <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-3xs hover:shadow-2xs hover:scale-[1.02] transition-all duration-300">
                    <img 
                      src="https://i.ibb.co/9923zDZ5/pv01.png" 
                      alt="Depoimento 1" 
                      className="w-full h-auto rounded-xl object-contain mx-auto" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-3xs hover:shadow-2xs hover:scale-[1.02] transition-all duration-300">
                    <img 
                      src="https://i.ibb.co/R44mrzMm/pv02.png" 
                      alt="Depoimento 2" 
                      className="w-full h-auto rounded-xl object-contain mx-auto" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-3xs hover:shadow-2xs hover:scale-[1.02] transition-all duration-300">
                    <img 
                      src="https://i.ibb.co/3ypxjfK9/pv03.png" 
                      alt="Depoimento 3" 
                      className="w-full h-auto rounded-xl object-contain mx-auto" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-3xs hover:shadow-2xs hover:scale-[1.02] transition-all duration-300">
                    <img 
                      src="https://i.ibb.co/C3t8Jw7X/pv04.png" 
                      alt="Depoimento 4" 
                      className="w-full h-auto rounded-xl object-contain mx-auto" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </section>

              {/* 11. CARD DE OFERTA PRINCIPAL */}
              <section 
                ref={offerSectionRef} 
                className="relative bg-gradient-to-br from-rose-600 via-rose-600 to-rose-700 text-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(244,63,94,0.3)] max-w-lg mx-auto text-center space-y-6 border-2 border-rose-400 overflow-hidden ring-4 ring-rose-500/10" 
                id="oferta-card"
              >
                {/* Visual Accent Badge */}
                <div className="absolute top-4 right-4 bg-yellow-400 text-rose-950 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg border border-yellow-300 z-10 animate-pulse flex items-center gap-1">
                  <span>⚡</span> OFERTA IMEDIATA
                </div>

                {/* Subtle backglow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl"></div>
                
                {/* Image at the top of Offer Section */}
                <div className="flex justify-center pb-2">
                  <div className="relative group">
                    <img
                      src="https://i.ibb.co/cc1VL9HK/Chat-GPT-Image-4-de-jun-de-2026-12-58-04.png"
                      alt="Guia Penteados Juninos"
                      referrerPolicy="no-referrer"
                      className="w-56 sm:w-72 md:w-80 rounded-2xl shadow-xl border border-white/20 transform hover:scale-105 transition-transform duration-300 mx-auto"
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <p className="text-xs text-rose-100 font-extrabold uppercase tracking-widest pt-1.5">
                    Guia Principal + 3 Bônus Exclusivos
                  </p>
                  <h3 className="text-2xl sm:text-3.5xl font-black text-white leading-tight tracking-tight">
                    +35 Penteados Juninos Infantis
                  </h3>
                </div>

                {/* Offer list checklist */}
                <div className="text-left max-w-sm mx-auto bg-rose-950/20 py-4.5 px-5 rounded-2xl border border-white/10 space-y-3 text-xs text-rose-50 font-bold shadow-inner">
                  <div className="flex items-start gap-2.5">
                    <span className="text-yellow-300 font-extrabold shrink-0">✔</span>
                    <span>Guia em vídeo com +35 penteados práticos</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-yellow-300 font-extrabold shrink-0">✔</span>
                    <span>Bônus 1: Checklist e Lista de Materiais Econômicos</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-yellow-300 font-extrabold shrink-0">✔</span>
                    <span>Bônus 2: 20 Ideias de Looks Juninos Femininos</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-yellow-300 font-extrabold shrink-0">✔</span>
                    <span>Bônus 3: Guia de Laços, Fitas e Acessórios Juninos</span>
                  </div>
                  <div className="h-px bg-white/10 my-1"></div>
                  <div className="flex items-center gap-2 text-yellow-300 font-black">
                    <span className="text-[14px]">🛡️</span>
                    <span>Garantia de 7 Dias Incondicional</span>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-300 font-black">
                    <span className="text-[14px]">⚡</span>
                    <span>Acesso Vitalício</span>
                  </div>
                </div>

                {/* Premium Pricing Wrapper */}
                <div className="space-y-1.5 py-4 px-6 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-xs shadow-inner">
                  <p className="text-xs text-rose-200/90 font-medium line-through">De R$ 47,00</p>
                  <p className="text-xs text-rose-100 font-bold tracking-wider uppercase">Por apenas</p>
                  <p className="text-5xl sm:text-6xl font-black text-yellow-300 tracking-tight font-mono drop-shadow-[0_2px_8px_rgba(234,179,8,0.25)]">
                    R$ 10,00
                  </p>
                  <p className="text-[10px] text-yellow-105 tracking-wider uppercase font-black flex items-center justify-center gap-1.5 pt-0.5">
                    <span>⚡</span> Pagamento Único • Sem Mensalidades
                  </p>
                </div>

                {/* Purchase Button */}
                <a
                  href="https://pay.lowify.com.br/checkout.php?product_id=2nKgYP"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="checkout-cta-btn"
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-white font-black rounded-2xl text-sm tracking-widest uppercase shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 border-b-4 border-emerald-700 flex items-center justify-center gap-2 no-underline group shrink-0 cursor-pointer pulse-cta"
                >
                  <ShoppingCart className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
                  QUERO MEU ACESSO AGORA
                </a>

                {/* Fast secure indicators */}
                <div className="flex justify-center items-center gap-4 text-[10px] text-rose-150 pt-2 border-t border-white/10">
                  <span className="flex items-center gap-1">🔒 SSL Criptografado</span>
                  <span>•</span>
                  <span>⚡ Liberação On-line Imediata</span>
                  <span>•</span>
                  <span>🛡️ Reembolso fácil</span>
                </div>
              </section>

              {/* 13. GARANTIA */}
              <section id="garantia" className="bg-white border-2 border-dashed border-amber-300 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto shadow-2xs">
                {/* Guarantee Shield Emblem */}
                <div className="shrink-0 flex items-center justify-center bg-amber-50 border border-amber-200/50 p-4.5 rounded-full relative">
                  <ShieldCheck className="w-12 h-12 text-amber-600" />
                  <div className="absolute -bottom-1 bg-amber-400 text-rose-900 font-black text-[9px] px-2 py-0.5 rounded-full uppercase">
                    7 DIAS
                  </div>
                </div>

                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-base sm:text-lg font-black text-slate-800 tracking-tight">Garantia Blindada de Satisfação Total 7 Dias</h3>
                  <p className="text-xs sm:text-xs text-slate-500 leading-relaxed font-medium">
                    Acesse todo o nosso portal de vídeo aulas e os bônus sem perigo! Se dentro de 7 dias você assistir às vídeo aulas de penteados e decidir que o conteúdo não serve para você ou que sua filha não se adaptou, basta nos enviar um e-mail que devolveremos 100% do seu valor imediatamente. Sem complicação.
                  </p>
                </div>
              </section>

              {/* 14. FAQ PERGUNTAS FREQUENTES */}
              <section id="faq" className="space-y-6">
                <div className="text-center space-y-1">
                  <span className="text-[10px] uppercase font-black tracking-wider text-rose-600">Dúvidas Frequentes</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Perguntas Respondidas:</h2>
                </div>

                <div className="max-w-2xl mx-auto space-y-2" id="faq-accordions">
                  {faqItems.map(faq => {
                    const isOpen = activeFaqId === faq.id;
                    return (
                      <div 
                        key={faq.id} 
                        className="bg-white rounded-xl border border-slate-200/65 overflow-hidden transition-all text-left"
                      >
                        <button
                          onClick={() => setActiveFaqId(isOpen ? null : faq.id)}
                          className="w-full p-4 font-bold text-slate-800 text-xs sm:text-sm hover:bg-slate-50/55 transition-colors flex items-center justify-between gap-3 text-left cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5 font-extrabold">
                            <HelpCircle className="w-4 h-4 text-rose-500 shrink-0" />
                            {faq.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-slate-100 bg-[#FAF9F6]/50 text-xs text-slate-500 leading-relaxed"
                            >
                              <div className="p-4 font-medium select-text">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </section>

            </div>

            {/* 15. RODAPÉ (Professional Footer) */}
            <footer className="mt-20 border-t border-slate-200/70 bg-[#FAF9F6]">
              <div className="max-w-4xl mx-auto px-4 py-10 text-center space-y-6">
                
                {/* Security badges images in text rows */}
                <div className="flex flex-wrap justify-center items-center gap-5 text-slate-400 text-xs font-semibold">
                  <span>🛡️ SITE COMPROMETIDO COM A PROTEÇÃO DE DADOS</span>
                  <span className="text-slate-300">•</span>
                  <span>🔒 TRANSAÇÃO SEGURA SSL</span>
                  <span className="text-slate-300">•</span>
                  <span>💳 APROVADO PELAS BANDEIRAS LÍDERES</span>
                </div>

                <p className="text-[11px] text-slate-400 max-w-xl mx-auto leading-relaxed">
                  <strong>Aviso Legal Importante:</strong> &quot;Este site não é afiliado ou endossado pelo Facebook, Instagram, Google ou TikTok. Todas as marcas registradas pertencem a seus respectivos donos. O resultado pode variar dependendo do tempo de treino e da paciência da mãe.&quot;
                </p>

                {/* Mini links */}
                <div className="flex justify-center gap-4 text-[10px] font-bold text-rose-600 uppercase tracking-wider">
                  <a href="#rodapé" className="hover:underline">Termos de Uso</a>
                  <span>•</span>
                  <a href="#rodapé" className="hover:underline">Política de Privacidade</a>
                  <span>•</span>
                  <a href="#rodapé" className="hover:underline">Contato de Suporte</a>
                </div>

                <div className="text-[10px] text-slate-450 leading-relaxed pt-2 border-t border-slate-200/50">
                  <p>+35 Penteados Juninos Infantis © 2026. Todos os direitos reservados.</p>
                </div>
              </div>
            </footer>

            {/* REAL-TIME DYNAMIC SOCIAL PROOF TOAST POPUP */}
            <AnimatePresence>
              {recentPurchaseName && (
                <motion.div
                  initial={{ opacity: 0, x: -50, y: 50 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -50, y: 50 }}
                  className="fixed bottom-4 left-4 z-40 bg-white border border-rose-100 p-3 sm:p-4 rounded-xl shadow-xl flex items-center gap-2.5 max-w-xs"
                >
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-full">
                    <ThumbsUp className="w-4 h-4" />
                  </div>
                  <div className="text-left text-xs">
                    <p className="font-extrabold text-slate-800">Nova compra realizada!</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      <strong>{recentPurchaseName}</strong> acabou de adquirir o Guia + Bônus!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Simulated Checkout Overlay Modal */}
            <CheckoutModal
              isOpen={isCheckoutOpen}
              onClose={() => setIsCheckoutOpen(false)}
              onSuccess={handleCheckoutSuccess}
            />

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
