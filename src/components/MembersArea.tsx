import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Download, Search, CheckCircle, Award, 
  Clock, Scissors, Sparkles, LogOut, FileText, CheckSquare, Square, Gift, Check
} from 'lucide-react';
import { hairstyles, bonuses, EBOOK_COVER_PATH } from '../data';
import { Hairstyle } from '../types';

interface MembersAreaProps {
  onExit: () => void;
}

export default function MembersArea({ onExit }: MembersAreaProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | 'Curto' | 'Médio' | 'Longo'>('Todos');
  const [selectedHairstyle, setSelectedHairstyle] = useState<Hairstyle>(hairstyles[0]);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [checkedMaterials, setCheckedMaterials] = useState<Record<string, boolean>>({});
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [unlockedBonus, setUnlockedBonus] = useState<string | null>(null);

  // Filter hairstyles
  const filteredHairstyles = hairstyles.filter(style => {
    const matchesSearch = style.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          style.materials.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'Todos' || style.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleStep = (stepIndex: number) => {
    const key = `${selectedHairstyle.id}-step-${stepIndex}`;
    setCheckedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleMaterial = (matIndex: number) => {
    const key = `${selectedHairstyle.id}-mat-${matIndex}`;
    setCheckedMaterials(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDownload = () => {
    if (downloadProgress !== null) return;
    setDownloadProgress(0);
    setDownloadSuccess(false);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadSuccess(true);
          setTimeout(() => setDownloadProgress(null), 3000);
          
          // Trigger a simulated text file download for credentials/materials
          const element = document.createElement("a");
          const file = new Blob([
            `=== ACESSO PORTAL DE VÍDEO AULAS - PENTEADOS JUNINOS INFANTIS ===\n\n` +
            `Parabéns por adquirir o melhor Guia prático em vídeo aulas de Festa Junina!\n\n` +
            `Este é o seu ticket de acesso ao nosso Portal de Vídeo Aulas Passo a Passo.\n` +
            `Sua filha vai ficar maravilhosa na quadrilha da escola!\n\n` +
            `Como prometido, todos os seus 4 Bônus Exclusivos com vídeo-dicas de cabelos curtos, guias práticos de tranças rápidas e materiais economizadores estão disponíveis na sua área de membros.\n\n` +
            `Desenvolvido com carinho para mães super-heroínas.\n` +
            `Em caso de dúvidas, contate nosso WhatsApp de atendimento: (11) 99999-7654`
          ], { type: 'text/plain' });
          element.href = URL.createObjectURL(file);
          element.download = "Acesso_Portal_Video_Aulas_Penteados.txt";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
          
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans" id="members-dashboard">
      {/* Top Banner Navigation */}
      <header className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/25">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[9px] font-bold text-rose-800 bg-yellow-300 rounded-sm uppercase tracking-wide">
                  Acesso Restrito
                </span>
                <span className="text-xs text-yellow-100 font-semibold">• Olá, Mãe Criativa!</span>
              </div>
              <h1 id="members-logo" className="text-xl md:text-2xl font-extrabold tracking-tight">
                Área de Membros das Mães
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={onExit}
              id="exit-to-sales-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-lg border border-white/25 transition-all text-white/95 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sair desta Área
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        
        {/* Welcome and Download Card Panel */}
        <div className="lg:col-span-12 bg-white rounded-3xl border border-rose-100 p-5 md:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50/50 rounded-full blur-2xl -z-10"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
            <img
              src={EBOOK_COVER_PATH}
              alt="Capa do Guia +35 Penteados"
              referrerPolicy="no-referrer"
              className="w-20 md:w-24 rounded-xl shadow-lg border border-slate-100 transform -rotate-1 hover:rotate-0 transition-transform duration-300"
            />
            <div>
              <h2 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight flex items-center justify-center md:justify-start gap-1.5">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                Sua Compra Foi Confirmada! Guia Liberado 🎉
              </h2>
              <p className="mt-1 text-xs md:text-sm text-slate-500 max-w-xl">
                Você acaba de economizar horas de pesquisa e estresse de salão. Veja todas as vídeo aulas detalhadas passo a passo de cada penteado e arrase nas comemorações!
              </p>
              
              {/* Stats badges */}
              <div className="flex flex-wrap gap-2 mt-3.5 justify-center md:justify-start">
                <span className="px-2.5 py-1 text-xs font-bold text-rose-700 bg-rose-50 rounded-full border border-rose-100">
                  🎥 35 Penteados em Vídeo
                </span>
                <span className="px-2.5 py-1 text-xs font-bold text-sky-700 bg-sky-50 rounded-full border border-sky-100">
                  🎁 4 Super Bônus Ativos
                </span>
                <span className="px-2.5 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-100">
                  🔑 Suporte via WhatsApp Autorizado
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={handleDownload}
              id="download-ebook-btn"
              className="w-full md:w-auto px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer text-sm"
            >
              {downloadProgress !== null ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Acessando Vídeos ({downloadProgress}%)</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-5 h-5 text-emerald-100 stroke-[3]" />
                  <span>Acesso Liberado! Aproveite as Vídeo Aulas</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 text-emerald-100 group-hover:translate-y-0.5 transition-transform" />
                  <span>Acessar Vídeo Aulas (Online)</span>
                </>
              )}
            </button>
            <p className="text-center text-[10px] text-slate-400 mt-1.5 font-medium">Assista quando e onde quiser de forma online.</p>
          </div>
        </div>

        {/* Column Left: Selector and filter panel */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-xs">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-rose-500" />
              Selecione o Penteado
            </h3>

            {/* Hair Filters */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(['Todos', 'Curto', 'Médio', 'Longo'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedCategory === cat 
                      ? 'bg-rose-500 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'Todos' ? 'Todos' : `Cabelo ${cat}`}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou fita..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 focus:border-rose-500 rounded-xl text-xs focus:outline-hidden transition-all bg-slate-50/50"
              />
            </div>

            {/* List */}
            <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1">
              {filteredHairstyles.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  Nenhum penteado correspondente encontrado.
                </div>
              ) : (
                filteredHairstyles.map(style => {
                  const isSelected = selectedHairstyle.id === style.id;
                  return (
                    <button
                      key={style.id}
                      onClick={() => {
                        setSelectedHairstyle(style);
                        // Reset checkboxes so they can play with steps
                        setCheckedSteps({});
                        setCheckedMaterials({});
                      }}
                      className={`w-full p-3 text-left rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected 
                          ? 'border-rose-500 bg-rose-50/40 shadow-xs ring-1 ring-rose-200' 
                          : 'border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      <img
                        src={style.image}
                        alt={style.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-100"
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold truncate ${isSelected ? 'text-rose-700' : 'text-slate-800'}`}>
                          {style.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-semibold text-slate-500 uppercase flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            {style.duration} min
                          </span>
                          <span className="text-[10px] font-semibold text-slate-500 uppercase">•</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase ${
                            style.difficulty === 'Iniciante' ? 'bg-emerald-50 text-emerald-700' :
                            style.difficulty === 'Fácil' ? 'bg-sky-50 text-sky-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {style.difficulty}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Quick Bonus Panel */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-3xl border border-amber-200/60 p-5 shadow-xs">
            <h3 className="text-xs font-black text-amber-900 uppercase tracking-wider mb-3 flex items-center gap-1">
              <Gift className="w-4 h-4 text-amber-700" />
              Seus 4 Bônus Exclusivos Liberados!
            </h3>
            <p className="text-xs text-amber-800 mb-4">
              Clique nos botões de bônus abaixo para acessar o conteúdo especial diretamente aqui:
            </p>
            
            <div className="grid grid-cols-2 gap-2">
              {bonuses.map((b, i) => (
                <button
                  key={b.id}
                  onClick={() => setUnlockedBonus(unlockedBonus === b.id ? null : b.id)}
                  className={`p-3 text-left rounded-xl transition-all border flex flex-col justify-between h-24 cursor-pointer ${
                    unlockedBonus === b.id 
                      ? 'bg-amber-500 text-white border-amber-600 shadow-sm' 
                      : 'bg-white text-slate-700 hover:bg-amber-200/20 border-slate-100'
                  }`}
                >
                  <span className="text-[9px] font-black uppercase tracking-wider opacity-90">Bônus {i+1}</span>
                  <span className="text-xs font-bold leading-tight line-clamp-2">{b.title.split(":")[1] || b.title}</span>
                  <span className="text-[9px] font-semibold opacity-85 underline mt-1">
                    {unlockedBonus === b.id ? "Fechar Dicas ↑" : "Revelar Dicas →"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Column Right: Active Selected Hair Braiding Details! */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            {unlockedBonus ? (
              // BONUS CONTENT DRAWER
              <motion.div
                key="bonus-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-3xl border border-amber-200 shadow-xs p-6"
              >
                <div className="flex items-center gap-2 pb-4 border-b border-amber-100">
                  <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-600 uppercase">Conteúdo do Bônus Liberado</span>
                    <h3 className="text-base font-black text-slate-800">
                      {bonuses.find(b => b.id === unlockedBonus)?.title}
                    </h3>
                  </div>
                </div>

                <div className="mt-5 space-y-4 text-sm text-slate-600">
                  <p className="font-medium text-slate-700">
                    {bonuses.find(b => b.id === unlockedBonus)?.description}
                  </p>

                  {/* Dynamic Custom educational material for each bonus */}
                  {unlockedBonus === 'b1' && (
                    <div className="space-y-3 bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                      <h4 className="font-bold text-amber-900 text-xs uppercase">10 Dicas Rápidas Para Cabelos Curtinhos:</h4>
                      <ul className="space-y-2 text-xs text-amber-900">
                        <li>💡 <strong>1. Lateral Falsa:</strong> Puxe apenas a franja para o lado, amarre com micro-elástico vermelho e coloque uma fivelinha caipira.</li>
                        <li>💡 <strong>2. Dividido em 3:</strong> Reparta a parte superior da testa em 3 quadradinhos e prenda com elásticos verde, amarelo e azul. Junta atrás num rabinho fofo.</li>
                        <li>💡 <strong>3. Chapeuzinho de Presilha:</strong> Use mini chapéus de palha colados em presilhas do tipo &quot;bico de pato&quot;, elas prendem firmemente mesmo em fios bem curtos.</li>
                        <li>💡 <strong>4. Gel com Glitter:</strong> Faça riscas bem certas no cabelo e use gel misturado com purpurina para dar um efeito de Festa Caipira iluminada nas divisões.</li>
                      </ul>
                    </div>
                  )}

                  {unlockedBonus === 'b2' && (
                    <div className="space-y-3 bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                      <h4 className="font-bold text-amber-900 text-xs uppercase">Tranças Rápidas Para Iniciantes sem Estresse:</h4>
                      <p className="text-xs text-amber-900">
                        <strong>O Truque dos Dedos:</strong> Segure sempre a mecha do meio com o polegar e o dedo médio. Deixe os indicadores livres para cruzar as laterais por cima da do meio. 
                      </p>
                      <ul className="space-y-2 text-xs text-amber-900">
                        <li>1. Nunca force trança muito colada ao couro cabeludo na primeira vez; faça a trança mais soltinha para não machucar e dar mais volume para o visual caipira.</li>
                        <li>2. Use um borrifador com água morna e meia colher de condicionador líquida. Isso elimina o estático e deixa o cabelo muito mais dócil ao pinçar as mechas.</li>
                      </ul>
                    </div>
                  )}

                  {unlockedBonus === 'b3' && (
                    <div className="space-y-3 bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                      <h4 className="font-bold text-amber-900 text-xs uppercase">A Checklist Oficial de Viagem da Papelaria:</h4>
                      <p className="text-xs text-amber-900">
                        Não gaste à toa! Só compre estes itens de altíssimo rendimento para Festa Junina:
                      </p>
                      <ul className="space-y-1 text-xs text-amber-900 list-disc list-inside">
                        <li>Fitas de Cetim nº 2 (Largura média, melhor para amarrar nas tranças)</li>
                        <li>Grampos de cabelo invisíveis curtinhos (Ideais para a cabeça de criança)</li>
                        <li>Elásticos pequenos de silicone transparentes (Disfarçam no cabelo)</li>
                        <li>Pelo menos um laço junino grande de presilha pronto com bico-de-pato</li>
                      </ul>
                    </div>
                  )}

                  {unlockedBonus === 'b4' && (
                    <div className="space-y-3 bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                      <h4 className="font-bold text-amber-900 text-xs uppercase">Táticas Flash de 5 Minutos:</h4>
                      <p className="text-xs text-amber-900">
                        A criança não gosta de sentar ou se mexe muito? Siga esse protocolo:
                      </p>
                      <ul className="space-y-1.5 text-xs text-amber-900">
                        <li>• Faça um rabo de cavalo simples e cubra as pontas de forma decorativa com o <strong>Laço de Chita Pronto</strong>. Leva segundos!</li>
                        <li>• Entretenha a criança entregando o próprio mini chapéu de palha ou o celular por 5 minutos enquanto você faz a Maria-chiquinha básica.</li>
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setUnlockedBonus(null)}
                  className="mt-6 px-4 py-2 bg-amber-650 hover:bg-amber-700 text-amber-900 border border-amber-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Fechar Bônus e Voltar para os Penteados
                </button>
              </motion.div>
            ) : (
              // ACTIVE SELECTED HAIRSTYLE DETAILED TUTORIAL
              <motion.div
                key={selectedHairstyle.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden"
              >
                {/* Banner Header for selected hair */}
                <div className="relative h-48 md:h-56 bg-slate-100">
                  <img
                    src={selectedHairstyle.image}
                    alt={selectedHairstyle.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/35 to-transparent flex flex-col justify-end p-5 md:p-6 text-white">
                    <div className="flex gap-1.5 mb-1.5">
                      <span className="px-2 py-0.5 bg-rose-500 text-[10px] font-bold rounded-sm uppercase tracking-wide">
                        Cabelo {selectedHairstyle.category}
                      </span>
                      <span className="px-2 py-0.5 bg-yellow-400 text-[10px] font-bold text-slate-900 rounded-sm uppercase tracking-wide">
                        {selectedHairstyle.difficulty}
                      </span>
                    </div>

                    <h2 className="text-lg md:text-2xl font-black tracking-tight drop-shadow-sm">
                      {selectedHairstyle.name}
                    </h2>
                  </div>
                </div>

                <div className="p-5 md:p-6 space-y-6">
                  {/* Stats line */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
                    <div className="border-r border-slate-200">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tempo Estimado</p>
                      <p className="text-sm font-black text-rose-600 flex items-center justify-center gap-1 mt-0.5">
                        <Clock className="w-4 h-4 shrink-0" />
                        {selectedHairstyle.duration} Mins
                      </p>
                    </div>
                    <div className="border-r border-slate-200">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dificuldade</p>
                      <p className="text-sm font-black text-rose-650 mt-0.5">
                        {selectedHairstyle.difficulty}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recomendação</p>
                      <p className="text-xs font-black text-rose-600 mt-0.5">
                        Mães Iniciantes
                      </p>
                    </div>
                  </div>

                  {/* Materials Checked section */}
                  <div>
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Scissors className="w-4 h-4 text-rose-500" />
                      1. Separe os materiais necessários:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedHairstyle.materials.map((material, idx) => {
                        const mKey = `${selectedHairstyle.id}-mat-${idx}`;
                        const isChecked = !!checkedMaterials[mKey];
                        return (
                          <button
                            key={idx}
                            onClick={() => toggleMaterial(idx)}
                            className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 text-xs transition-all cursor-pointer w-full ${
                              isChecked 
                                ? 'bg-rose-50 border-rose-200 text-rose-800 font-semibold' 
                                : 'bg-white border-slate-150 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-rose-600 shrink-0" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-300 shrink-0" />
                            )}
                            <span className={isChecked ? 'line-through opacity-80' : ''}>{material}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="h-px bg-slate-100"></div>

                  {/* Step-by-Step with checkable list */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckSquare className="w-4 h-4 text-rose-500" />
                        2. Siga o Passo a Passo Ilustrado:
                      </h3>
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        Marque cada passo pronto!
                      </span>
                    </div>

                    <div className="space-y-3">
                      {selectedHairstyle.steps.map((step, idx) => {
                        const sKey = `${selectedHairstyle.id}-step-${idx}`;
                        const isChecked = !!checkedSteps[sKey];
                        return (
                          <div
                            key={idx}
                            onClick={() => toggleStep(idx)}
                            className={`p-3.5 rounded-xl border text-left flex items-start gap-3 text-xs transition-all cursor-pointer ${
                              isChecked 
                                ? 'bg-emerald-50/50 border-emerald-200 text-slate-500' 
                                : 'bg-white border-slate-150 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <button className="mt-0.5 shrink-0">
                              {isChecked ? (
                                <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
                              ) : (
                                <div className="w-4.5 h-4.5 rounded-full border border-slate-300 flex items-center justify-center font-bold text-[9px] text-slate-400">
                                  {idx + 1}
                                </div>
                              )}
                            </button>
                            <span className={`leading-relaxed ${isChecked ? 'line-through opacity-70' : ''}`}>
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Golden tip area */}
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/60 text-xs">
                    <p className="font-extrabold text-amber-900 flex items-center gap-1">
                      <Award className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                      Dica de Ouro da Costura Caipira:
                    </p>
                    <p className="mt-1 text-amber-800 leading-relaxed font-medium">
                      {selectedHairstyle.tip}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>

      {/* Floating interactive feedback */}
      <footer className="text-center py-8 text-xs text-slate-400 max-w-xl mx-auto px-4 mt-6">
        <p className="font-medium">Obrigado por apoiar nosso trabalho! Todos os direitos reservados © 2026</p>
        <p className="mt-1 opacity-80">
          Oferecemos suporte técnico vitalício pelo e-mail <strong>suporte@penteadosjuninos.com.br</strong> ou pelo link do WhatsApp.
        </p>
      </footer>
    </div>
  );
}
