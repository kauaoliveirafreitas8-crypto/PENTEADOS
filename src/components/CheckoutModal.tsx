import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, CreditCard, QrCode, FileText, CheckCircle, Copy, AlertCircle, ShoppingCart } from 'lucide-react';
import { CheckoutDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CheckoutModal({ isOpen, onClose, onSuccess }: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [details, setDetails] = useState<CheckoutDetails>({
    fullName: '',
    email: '',
    phone: '',
    paymentMethod: null
  });
  const [copiedText, setCopiedText] = useState<'pix' | 'boleto' | null>(null);
  const [countdown, setCountdown] = useState(15 * 60); // 15 mins for PIX
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Countdown timer for Pix
  useEffect(() => {
    if (step === 3 && details.paymentMethod === 'pix' && countdown > 0) {
      const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, details.paymentMethod, countdown]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!details.fullName.trim()) newErrors.fullName = 'Por favor, digite seu nome completo.';
    if (!details.email.trim() || !details.email.includes('@')) newErrors.email = 'Insira um e-mail válido para receber o Guia.';
    if (!details.phone.trim() || details.phone.length < 9) newErrors.phone = 'Digite um telefone celular com WhatsApp.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    }
  };

  const selectPayment = (method: 'pix' | 'card' | 'boleto') => {
    setDetails(prev => ({ ...prev, paymentMethod: method }));
    setStep(3);
    setCountdown(15 * 60); // reset clock for Pix
  };

  const handleSimulatedPayment = () => {
    setIsProcessing(true);
    // Simulate transaction delay
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  const copyToClipboard = (text: string, type: 'pix' | 'boleto') => {
    try {
      navigator.clipboard.writeText(text);
    } catch (e) {
      // Fallback for iframe sandbox restrictions
    }
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 3000);
  };

  const pixKeyOriginal = "00020101021226830014br.gov.bcb.pix0136penteadosjuninos10reais2026";

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg overflow-hidden bg-white rounded-2xl shadow-2xl border border-rose-100"
          id="checkout-modal-container"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-amber-300" />
              <h3 id="checkout-title" className="text-lg font-bold tracking-tight">Checkout Seguro — R$ 10,00</h3>
            </div>
            <button
              onClick={onClose}
              id="checkout-close-btn"
              className="p-1 text-white/80 transition-colors rounded-full hover:bg-white/20 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Secure bar */}
          <div className="flex items-center justify-center gap-1.5 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold border-b border-emerald-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Ambiente Seguro 256-bit SSL • Acesso Imediato
          </div>

          {/* Content Area */}
          <div className="p-6">
            {/* Step Progress indicators */}
            <div className="flex justify-between items-center mb-6 text-xs font-medium text-slate-400">
              <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-rose-600 font-semibold' : ''}`}>
                <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] ${step >= 1 ? 'bg-rose-500 text-white' : 'bg-slate-200'}`}>1</span>
                Seus Dados
              </div>
              <div className="h-0.5 flex-1 mx-2 bg-slate-100"></div>
              <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-rose-600 font-semibold' : ''}`}>
                <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] ${step >= 2 ? 'bg-rose-500 text-white' : 'bg-slate-200'}`}>2</span>
                Pagamento
              </div>
              <div className="h-0.5 flex-1 mx-2 bg-slate-100"></div>
              <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-rose-600 font-semibold' : ''}`}>
                <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] ${step >= 3 ? 'bg-rose-500 text-white' : 'bg-slate-200'}`}>3</span>
                Confirmação
              </div>
            </div>

            {isProcessing ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                <h4 className="mt-4 text-base font-bold text-slate-800">Processando Pagamento...</h4>
                <p className="mt-1 text-sm text-slate-500">Estamos validando os dados no servidor seguro. Não feche esta janela.</p>
              </div>
            ) : (
              <>
                {/* STEP 1: CONTACT INFO */}
                {step === 1 && (
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-slate-600">
                      Preencha os dados abaixo onde quer receber o seu material digital da Festa Junina:
                    </p>
                    <div>
                      <label className="block mb-1 text-xs font-bold text-slate-700">Seu Nome Completo</label>
                      <input
                        type="text"
                        name="fullName"
                        value={details.fullName}
                        onChange={handleInputChange}
                        placeholder="Ex: Maria Souza Silva"
                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.fullName ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-500' : 'border-slate-200 focus:ring-rose-500 focus:border-rose-500'} focus:outline-hidden text-sm transition-all shadow-xs`}
                      />
                      {errors.fullName && <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block mb-1 text-xs font-bold text-slate-700">Seu Melhor E-mail (Onde receberá o Guia)</label>
                      <input
                        type="email"
                        name="email"
                        value={details.email}
                        onChange={handleInputChange}
                        placeholder="Ex: mae.amorosa@email.com"
                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.email ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-500' : 'border-slate-200 focus:ring-rose-500 focus:border-rose-500'} focus:outline-hidden text-sm transition-all shadow-xs`}
                      />
                      {errors.email && <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.email}</p>}
                      <p className="mt-1.5 text-[10px] text-slate-400">Insira seu e-mail correto para receber os bônus e o link de acesso.</p>
                    </div>

                    <div>
                      <label className="block mb-1 text-xs font-bold text-slate-700">WhatsApp / Celular com DDD</label>
                      <input
                        type="tel"
                        name="phone"
                        value={details.phone}
                        onChange={handleInputChange}
                        placeholder="Ex: (11) 98765-4321"
                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.phone ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-500' : 'border-slate-200 focus:ring-rose-500 focus:border-rose-500'} focus:outline-hidden text-sm transition-all shadow-xs`}
                      />
                      {errors.phone && <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.phone}</p>}
                      <p className="mt-1.5 text-[10px] text-slate-400">Usamos apenas para mandar mensagens de suporte e o link de acesso direto do WhatsApp.</p>
                    </div>

                    <button
                      onClick={handleNextStep}
                      id="next-step-btn"
                      className="w-full py-3.5 mt-2 font-bold text-white bg-rose-600 rounded-xl hover:bg-rose-700 transition-colors shadow-md hover:shadow-lg transition-transform focus:ring-3 focus:ring-rose-100 flex items-center justify-center gap-1 text-base cursor-pointer"
                    >
                      CONTINUAR PARA O PAGAMENTO
                    </button>
                  </div>
                )}

                {/* STEP 2: SELECT PAYMENT METHOD */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-800">Escolha a melhor opção de pagamento:</h4>
                    
                    {/* PIX Option */}
                    <button
                      onClick={() => selectPayment('pix')}
                      className="w-full p-4 text-left border-2 border-slate-100 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50/30 transition-all flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl group-hover:bg-emerald-200 transition-colors">
                          <QrCode className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm md:text-base">Pagar com PIX — R$ 10,00</p>
                          <p className="text-xs text-emerald-700 font-semibold">⚡ Aprovação e liberação imediata em 10 segundos!</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 rounded-md">MAIS RÁPIDO</span>
                    </button>

                    {/* Credit Card Option */}
                    <button
                      onClick={() => selectPayment('card')}
                      className="w-full p-4 text-left border-2 border-slate-100 rounded-2xl hover:border-sky-500 hover:bg-sky-50/30 transition-all flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-sky-100 text-sky-700 rounded-xl group-hover:bg-sky-200 transition-colors">
                          <CreditCard className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm md:text-base">Cartão de Crédito</p>
                          <p className="text-xs text-slate-500">Parcele em até 2x no seu cartão de preferência.</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-[10px] font-bold text-sky-700 bg-sky-100 rounded-md">IMEDIATO</span>
                    </button>

                    {/* Boleto Option */}
                    <button
                      onClick={() => selectPayment('boleto')}
                      className="w-full p-4 text-left border-2 border-slate-100 rounded-2xl hover:border-amber-500 hover:bg-amber-50/30 transition-all flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-100 text-amber-700 rounded-xl group-hover:bg-amber-200 transition-colors">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm md:text-base">Boleto Bancário</p>
                          <p className="text-xs text-slate-500">Venda à vista. Compensação bancária de 1 a 2 dias.</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-[10px] font-bold text-amber-700 bg-amber-100 rounded-md">BOLETO</span>
                    </button>

                    <button
                      onClick={() => setStep(1)}
                      className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-700 font-bold text-center underline bg-transparent cursor-pointer"
                    >
                      ← Voltar para dados cadastrais
                    </button>
                  </div>
                )}

                {/* STEP 3: MOCK PROCESSING (PIX / CARD / BOLETO INSTANCE) */}
                {step === 3 && (
                  <div className="space-y-4">
                    {/* PIX GRAPHICS */}
                    {details.paymentMethod === 'pix' && (
                      <div className="text-center space-y-3.5">
                        <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 animate-pulse" />
                          PIX Gerado! Pague e Libere o Guia Instantaneamente.
                        </div>

                        {/* Dummy QR image with lovely June accents */}
                        <div className="relative inline-block p-4 border border-slate-100 bg-white rounded-2xl shadow-xs">
                          {/* Simulated QR Code via pixels */}
                          <div className="w-44 h-44 bg-slate-50 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center overflow-hidden">
                            <span className="text-[10px] font-mono text-slate-400">QR CODE SIMULADO PIX</span>
                            {/* A cute grid of points to look like real QR Code */}
                            <div className="grid grid-cols-6 gap-1 w-32 h-32 mt-2 opacity-80">
                              {Array.from({ length: 36 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`rounded-xs ${
                                    (i % 2 === 0 && i % 3 === 0) || i < 7 || i === 12 || i === 23 || i >= 30
                                      ? 'bg-slate-800'
                                      : 'bg-transparent'
                                  }`}
                                ></div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Small stamp in center */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-400 text-[9px] font-black text-rose-800 px-1.5 py-0.5 rounded-md border border-white shadow-xs">
                            PIX
                          </div>
                        </div>

                        <div className="text-xs font-bold text-slate-500">
                          Tempo limite para pagamento: <span className="text-rose-600 text-sm font-black font-mono">{formatTime(countdown)}</span>
                        </div>

                        {/* Copy Code Section */}
                        <div className="text-left bg-slate-50 p-3.5 rounded-xl border border-slate-100 relative">
                          <div className="text-[10px] font-bold text-slate-400 mb-1">CÓDIGO PIX (COPIA E COLA)</div>
                          <p className="text-xs font-mono break-all pr-8 overflow-hidden text-slate-600 font-semibold line-clamp-2 h-8">
                            {pixKeyOriginal}
                          </p>
                          <button
                            onClick={() => copyToClipboard(pixKeyOriginal, 'pix')}
                            className="absolute right-2.5 top-1/2 transform -translate-y-1/2 bg-white hover:bg-slate-100 text-rose-600 p-2 rounded-lg border border-slate-150 transition-colors shadow-xs cursor-pointer"
                            title="Copiar Código"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>

                        {copiedText === 'pix' && (
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-800 bg-emerald-100 rounded-full animate-bounce">
                            ✓ Código Copia e Cola copiado!
                          </span>
                        )}

                        <div className="pt-2 text-left text-xs text-slate-400 leading-relaxed border-t border-slate-100">
                          <strong>Como pagar:</strong> Abra o aplicativo do seu Banco, vá no menu de <strong>PIX</strong>, selecione <strong>PIX Copia e Cola</strong> ou aponte a câmera para o QR Code acima, finalize o pagamento de R$ 10,00 e clique abaixo para liberar.
                        </div>

                        {/* Active confirmation bypass to unlock */}
                        <button
                          onClick={handleSimulatedPayment}
                          className="w-full py-4 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer pulse-cta"
                        >
                          CONFIRMAR PAGAMENTO SIMULADO (Acesso imediato!)
                        </button>
                      </div>
                    )}

                    {/* CREDIT CARD GRAPHICS */}
                    {details.paymentMethod === 'card' && (
                      <div className="space-y-3.5">
                        <div className="bg-sky-50 text-sky-800 p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
                          <CreditCard className="w-4 h-4 text-sky-600" />
                          Formulário de Pagamento via Cartão de Crédito
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-left">
                          <div className="col-span-2">
                            <label className="block mb-1 text-[10px] font-bold text-slate-700">NÚMERO DO CARTÃO</label>
                            <input
                              type="text"
                              placeholder="4544 8765 2415 9812"
                              maxLength={19}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:ring-1 focus:ring-sky-500 focus:outline-hidden"
                            />
                          </div>

                          <div className="col-span-2">
                            <label className="block mb-1 text-[10px] font-bold text-slate-700">NOME DO TITULAR (Igual escrito no cartão)</label>
                            <input
                              type="text"
                              placeholder="MARIA S SILVA"
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs uppercase focus:ring-1 focus:ring-sky-500 focus:outline-hidden"
                            />
                          </div>

                          <div>
                            <label className="block mb-1 text-[10px] font-bold text-slate-700">VALIDADE (MM/AA)</label>
                            <input
                              type="text"
                              placeholder="06/30"
                              maxLength={5}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono text-center focus:ring-1 focus:ring-sky-500 focus:outline-hidden"
                            />
                          </div>

                          <div>
                            <label className="block mb-1 text-[10px] font-bold text-slate-700">CÓDIGO (CVV)</label>
                            <input
                              type="text"
                              placeholder="123"
                              maxLength={3}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono text-center focus:ring-1 focus:ring-sky-500 focus:outline-hidden"
                            />
                          </div>

                          <div className="col-span-2">
                            <label className="block mb-1 text-[10px] font-bold text-slate-700">PARCELAS</label>
                            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-sky-500 focus:outline-hidden bg-white">
                              <option>1x de R$ 10,00 sem juros (Recomendado)</option>
                              <option>2x de R$ 5,00 sem juros</option>
                            </select>
                          </div>
                        </div>

                        <button
                          onClick={handleSimulatedPayment}
                          className="w-full py-4 text-base font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                        >
                          PAGAR R$ 10,00 COM SEGURANÇA
                        </button>
                      </div>
                    )}

                    {/* BOLETO BANKING GRAPHICS */}
                    {details.paymentMethod === 'boleto' && (
                      <div className="text-center space-y-3.5">
                        <div className="bg-amber-50 text-amber-800 p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
                          <FileText className="w-4 h-4 text-amber-600" />
                          Boleto Bancário de Compensação Rápida Gerado!
                        </div>

                        <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-3 text-left">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="text-xs font-bold text-slate-500">Validade:</span>
                            <span className="text-xs font-black text-rose-600">Daqui a 3 dias úteis</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="text-xs font-bold text-slate-500">Valor total:</span>
                            <span className="text-xs font-black text-slate-800">R$ 10,00</span>
                          </div>

                          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 relative mt-2">
                            <div className="text-[9px] font-bold text-slate-400 mb-1">CÓDIGO DE BARRAS</div>
                            <p className="text-xs font-mono break-all pr-8 text-slate-600 font-semibold h-8 line-clamp-2">
                              34191.79001 01043.513184 91020.150008 7 96840000001000
                            </p>
                            <button
                              onClick={() => copyToClipboard('34191.79001 01043.513184 91020.150008 7 96840000001000', 'boleto')}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-rose-600 p-1.5 rounded-md border border-slate-200 shadow-2xs hover:bg-slate-50 cursor-pointer"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {copiedText === 'boleto' && (
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-800 bg-amber-100 rounded-full animate-bounce">
                            ✓ Código do Boleto copiado para pagar na sua conta!
                          </span>
                        )}

                        <div className="text-xs text-slate-400 text-left leading-relaxed">
                          *A compensação de Boleto pode demorar até 48 horas úteis nas redes bancárias tradicionais. Para testar o Guia simulado agora, clique no botão abaixo para aprovação instantânea de teste!
                        </div>

                        <button
                          onClick={handleSimulatedPayment}
                          className="w-full py-4 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
                        >
                          CONFIRMAR PAGAMENTO DO BOLETO (Simulação)
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => setStep(2)}
                      className="w-full py-2 text-xs text-rose-600 hover:text-rose-800 font-bold text-center underline bg-transparent cursor-pointer"
                    >
                      ← Mudar forma de pagamento
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer security flags */}
          <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[10px]">
            <span className="flex items-center gap-1">🛡️ Seus dados estão completamente protegidos pela nossa criptografia.</span>
            <span className="font-semibold text-slate-500">Transação 100% Segura • R$ 10,00</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
