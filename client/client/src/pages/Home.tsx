'use client';

import { useState, useEffect } from 'react';
import { useUtmLinks } from '@/hooks/useUtmLinks';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import PopupPlaceTaken from '@/components/PopupPlaceTaken';
import PopupSystemActive from '@/components/PopupSystemActive';

const NAMES_AND_CITIES = [
  { name: 'Дмитрий', city: 'Екатеринбург' },
  { name: 'Анна', city: 'Москва' },
  { name: 'Ирина', city: 'Санкт-Петербург' },
  { name: 'Алексей', city: 'Казань' },
  { name: 'Мария', city: 'Новосибирск' },
  { name: 'Павел', city: 'Краснодар' },
  { name: 'Ольга', city: 'Ростов-на-Дону' },
  { name: 'Сергей', city: 'Тюмень' },
  { name: 'Наталья', city: 'Самара' },
  { name: 'Артём', city: 'Минск' }
];

export default function Home() {
  const { buildUrl } = useUtmLinks();
  const [showPlaceTaken, setShowPlaceTaken] = useState(false);
  const [showSystemActive, setShowSystemActive] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(NAMES_AND_CITIES[0]);
  const [lastPersonIndex, setLastPersonIndex] = useState(-1);
  const [systemActiveShown, setSystemActiveShown] = useState(false);
  const [systemActiveClosedAt, setSystemActiveClosedAt] = useState<number | null>(null);
  const [hasClickedStartButton, setHasClickedStartButton] = useState(false);
  const [lastInactivityTime, setLastInactivityTime] = useState(Date.now());

  // Pop-up №1: Место занято (каждые 25-45 сек)
  useEffect(() => {
    const interval = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * NAMES_AND_CITIES.length);
      while (randomIndex === lastPersonIndex) {
        randomIndex = Math.floor(Math.random() * NAMES_AND_CITIES.length);
      }
      setLastPersonIndex(randomIndex);
      setCurrentPerson(NAMES_AND_CITIES[randomIndex]);
      setShowPlaceTaken(true);

      const timer = setTimeout(() => {
        setShowPlaceTaken(false);
      }, 5000);

      return () => clearTimeout(timer);
    }, 25000 + Math.random() * 20000);

    return () => clearInterval(interval);
  }, [lastPersonIndex]);

  // Pop-up №2: Система активна (через 40 сек бездействия)
  useEffect(() => {
    const handleActivity = () => {
      setLastInactivityTime(Date.now());
    };

    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('keydown', handleActivity);

    return () => {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, []);

  useEffect(() => {
    if (hasClickedStartButton) return;
    if (systemActiveShown) return;
    if (systemActiveClosedAt && Date.now() - systemActiveClosedAt < 600000) return;

    const checkInactivity = setInterval(() => {
      if (Date.now() - lastInactivityTime >= 40000) {
        setShowSystemActive(true);
        setSystemActiveShown(true);
        clearInterval(checkInactivity);
      }
    }, 1000);

    return () => clearInterval(checkInactivity);
  }, [lastInactivityTime, systemActiveShown, systemActiveClosedAt, hasClickedStartButton]);

  const handleCloseSystemActive = () => {
    setShowSystemActive(false);
    setSystemActiveClosedAt(Date.now());
  };

  const handleSystemActiveCTA = () => {
    setHasClickedStartButton(true);
    setShowSystemActive(false);
    const ctaButton = document.querySelector('[data-cta="start"]');
    if (ctaButton) {
      ctaButton.scrollIntoView({ behavior: 'smooth' });
      (ctaButton as HTMLButtonElement).click();
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden relative">
      {/* FLOATING GETCOURSE LOGO */}
      <div className="fixed bottom-6 right-6 z-50" style={{
        animation: 'float 4s ease-in-out infinite'
      }}>
        <img
          src="/images/getcourse-full.jpg"
          alt="GetCourse"
          className="w-24 h-24 hover:scale-125 transition-transform duration-300 cursor-pointer rounded-lg"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(34, 211, 238, 0.8)) drop-shadow(0 0 60px rgba(59, 130, 246, 0.5))'
          }}
        />
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
        }
      `}</style>

      {/* ANIMATED BACKGROUND LAYERS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663142814497/GzwjeCZycrVN4yCYzVRxGA/hero-neon-network_beae272f.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
            filter: 'blur(140px)',
            mixBlendMode: 'screen'
          }}
          animate={{ x: [0, 80, 0], y: [0, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-80 h-80 rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)',
            filter: 'blur(160px)',
            mixBlendMode: 'screen'
          }}
          animate={{ x: [0, -60, 0], y: [0, -70, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        <motion.div
          className="absolute bottom-40 left-1/3 w-72 h-72 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
            filter: 'blur(180px)',
            mixBlendMode: 'screen'
          }}
          animate={{ x: [0, 90, 0], y: [0, -60, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' as const }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">

        {/* ===== BLOCK 1: HERO ===== */}
        <section className="min-h-screen flex items-center justify-center py-20 relative">
          <div className="container max-w-5xl mx-auto px-4 text-center">
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-[rgba(34,211,238,0.4)] bg-[rgba(34,211,238,0.08)]">
              <span className="text-sm font-medium" style={{ color: '#22D3EE' }}>система внедрения ИИ</span>
            </div>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-grotesk leading-tight"
              style={{
                textShadow: '0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(34, 211, 238, 0.2)'
              }}
            >
              Масштабируй доход,<br />
              <span style={{ color: '#22D3EE' }}>а не выгорание</span>
            </h1>

            <div className="max-w-2xl mx-auto mb-8">
              <p className="text-xl md:text-2xl text-gray-200 font-semibold mb-3">
                Перестань изучать нейросети
              </p>
              <p className="text-xl md:text-2xl font-bold" style={{ color: '#22D3EE' }}>
                Внедри систему, которая делает деньги
              </p>
            </div>

            <div className="glass-panel rounded-lg px-6 py-4 inline-block border border-[rgba(34,211,238,0.25)] mb-10">
              <p className="text-base md:text-lg text-gray-300">
                Если ИИ не даёт тебе денег —<br />
                значит у тебя нет системы
              </p>
              <p className="text-sm mt-2 font-semibold" style={{ color: '#22D3EE' }}>
                Здесь ты её внедришь
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center mb-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full flex-shrink-0 bg-[#22D3EE]" style={{ boxShadow: '0 0 8px rgba(34, 211, 238, 0.6)' }}></div>
                <span className="text-gray-200 text-sm md:text-base">цифровая команда вместо рутины</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full flex-shrink-0 bg-[#3B82F6]" style={{ boxShadow: '0 0 8px rgba(59, 130, 246, 0.6)' }}></div>
                <span className="text-gray-200 text-sm md:text-base">контент, который работает на тебя</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full flex-shrink-0 bg-[#8B5CF6]" style={{ boxShadow: '0 0 8px rgba(139, 92, 246, 0.6)' }}></div>
                <span className="text-gray-200 text-sm md:text-base">система, которая превращает внимание в деньги</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 mb-6">
              <a
                href={buildUrl("https://course.takayamaya.ru/neiromaster_hot")}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="start"
                className="inline-block px-10 py-5 rounded-xl font-bold text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #22D3EE)',
                  color: '#FFFFFF',
                  boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)'
                }}
              >
                Внедрить систему
              </a>
              <p className="text-sm text-gray-500">Доступ сразу после оплаты · обучение в своём темпе</p>
            </div>
          </div>
        </section>

        {/* ===== BLOCK 2: РЕЗУЛЬТАТЫ В ЦИФРАХ ===== */}
        <section className="py-16 md:py-24 relative">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { number: '840 000 ₽', label: 'за 3 дня' },
                { number: '1,5 млн', label: 'просмотров' },
                { number: '+50 000$', label: 'заявок' },
                { number: '4,3 млн ₽', label: 'на воронке' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="glass-panel rounded-xl p-5 md:p-6 border border-[rgba(34,211,238,0.3)] text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#22D3EE', textShadow: '0 0 20px rgba(34, 211, 238, 0.3)' }}>
                    {stat.number}
                  </p>
                  <p className="text-xs md:text-sm text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">Результаты учеников NEIROmaster</p>
          </div>
        </section>

        {/* ===== BLOCK 3: БОЛЬ ===== */}
        <section className="py-20 md:py-32 relative">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Ты уже пробовал ИИ… <span style={{ color: '#22D3EE' }}>но результата нет?</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {[
                'сохраняешь десятки промптов, но используешь 2–3',
                'скачал гайды, но не внедрил',
                'открыл ChatGPT → закрыл',
                'делаешь больше, но зарабатываешь так же',
                'куча идей, но нет контроля'
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-lg p-4 border border-[rgba(59,130,246,0.35)]"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 mt-0.5 text-lg">—</span>
                    <p className="text-gray-300">{item}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mb-8">
              <p className="text-lg text-gray-400 mb-6">Это нормально</p>
              <div className="glass-panel rounded-lg p-6 border border-[rgba(34,211,238,0.35)] inline-block">
                <p className="text-lg text-gray-300">
                  Проблема не в тебе<br />
                  Проблема в том, что тебе показали инструменты<br />
                  <span className="font-bold" style={{ color: '#22D3EE' }}>вместо системы</span>
                </p>
              </div>
            </div>

            <div className="text-center">
              <a
                href={buildUrl("https://course.takayamaya.ru/neiromaster_hot")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #22D3EE)',
                  color: '#FFFFFF',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
                }}
              >
                Да, это про меня
              </a>
            </div>
          </div>
        </section>

        {/* ===== BLOCK 4: РАЗВОРОТ МЫШЛЕНИЯ ===== */}
        <section className="py-20 md:py-32 relative">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Почему ИИ <span style={{ color: '#22D3EE' }}>не даёт результат</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="glass-panel rounded-xl p-8 border border-[rgba(239,68,68,0.3)]" style={{ background: 'rgba(239, 68, 68, 0.05)' }}>
                <p className="text-lg text-gray-300 mb-4">Ты изучаешь инструменты</p>
                <p className="text-lg text-gray-300 mb-6">Но не меняешь процессы</p>
                <p className="text-2xl font-bold text-red-400">Поэтому результат = 0</p>
              </div>

              <div className="glass-panel rounded-xl p-8 border border-[rgba(34,211,238,0.4)]" style={{ background: 'rgba(34, 211, 238, 0.05)' }}>
                <p className="text-lg font-bold mb-4" style={{ color: '#22D3EE', textShadow: '0 0 15px rgba(34, 211, 238, 0.3)' }}>
                  ИИ начинает работать
                </p>
                <p className="text-lg font-bold" style={{ color: '#22D3EE', textShadow: '0 0 15px rgba(34, 211, 238, 0.3)' }}>
                  только когда встроен в систему
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="glass-panel rounded-lg px-8 py-6 inline-block border border-[rgba(34,211,238,0.35)]">
                <p className="text-xl md:text-2xl font-bold text-white">
                  Ты покупаешь не курс
                </p>
                <p className="text-xl md:text-2xl font-bold mt-2" style={{ color: '#22D3EE' }}>
                  Ты внедряешь систему
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== BLOCK 5: АВТОР ===== */}
        <section className="py-20 md:py-32 relative">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="glass-panel rounded-lg p-8 md:p-12 border border-[rgba(34,211,238,0.35)]">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="flex justify-center order-2 md:order-1">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] rounded-xl blur-2xl opacity-60"></div>
                    <img
                      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663142814497/GzwjeCZycrVN4yCYzVRxGA/maya-galitskaya_514531d9.png"
                      alt="Майя Галицкая"
                      className="relative rounded-xl w-72 h-auto object-cover border-2 border-[rgba(34,211,238,0.5)]"
                      style={{
                        boxShadow: "0 0 40px rgba(34, 211, 238, 0.4), 0 0 80px rgba(59, 130, 246, 0.3)"
                      }}
                    />
                  </div>
                </div>
                <div className="text-center md:text-left space-y-6 order-1 md:order-2">
                  <h2
                    className="text-3xl md:text-4xl font-bold"
                    style={{ color: "#22D3EE", textShadow: "0 0 20px rgba(34, 211, 238, 0.3)" }}
                  >
                    <span style={{ color: "#FFFFFF" }}>МАЙЯ ГАЛИЦКАЯ</span>
                  </h2>
                  <p className="text-gray-400 text-lg">Маркетолог с 15+ лет опыта, топовый AI-практик</p>

                  <div className="space-y-3 text-gray-300">
                    <p className="flex items-start gap-3">
                      <span className="text-[#22D3EE]">✓</span>
                      <span>Создатель самых продающих курсов по нейросетям в СНГ</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="text-[#22D3EE]">✓</span>
                      <span>Более 10 000 учеников прошли обучения</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="text-[#22D3EE]">✓</span>
                      <span>Тренер МВА, СМО</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="text-[#22D3EE]">✓</span>
                      <span>Спикер форумов и мастер-классов для гос. структур</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== BLOCK 6: СТРУКТУРА ПРОДУКТА — 3 ЭТАПА ===== */}
        <section className="py-20 md:py-32 relative">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Система внедрения ИИ
            </h2>
            <p className="text-center text-gray-400 mb-16 text-lg">3 этапа, которые превращают хаос в работающую систему</p>

            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#3B82F6] via-[#22D3EE] to-[#8B5CF6] opacity-30"></div>

              <div className="space-y-12 md:space-y-16">
                {/* Этап 1 */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                    <div className="glass-panel rounded-xl p-8 border border-[rgba(59,130,246,0.4)]">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold bg-[rgba(59,130,246,0.2)] border border-[rgba(59,130,246,0.5)]" style={{ color: '#3B82F6', textShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}>
                          1
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white">ОЦИФРУЙ ГОЛОВУ</h3>
                      </div>
                      <div className="space-y-3 mb-6">
                        {['личный бизнес-ассистент', 'команда ассистентов', 'паспорт проекта', 'система мышления'].map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#3B82F6]" style={{ boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)' }}></div>
                            <p className="text-gray-300">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 md:mt-0 glass-panel rounded-xl p-6 border border-[rgba(59,130,246,0.25)]" style={{ background: 'rgba(59, 130, 246, 0.05)' }}>
                      <p className="text-sm text-gray-400 mb-2">Результат:</p>
                      <p className="text-lg font-semibold" style={{ color: '#3B82F6' }}>ИИ работает как сотрудник</p>
                    </div>
                  </div>
                </motion.div>

                {/* Этап 2 */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                    <div className="order-2 md:order-1 mt-6 md:mt-0 glass-panel rounded-xl p-6 border border-[rgba(34,211,238,0.25)]" style={{ background: 'rgba(34, 211, 238, 0.05)' }}>
                      <p className="text-sm text-gray-400 mb-2">Результат:</p>
                      <p className="text-lg font-semibold" style={{ color: '#22D3EE' }}>контент начинает приводить людей</p>
                    </div>
                    <div className="order-1 md:order-2 glass-panel rounded-xl p-8 border border-[rgba(34,211,238,0.4)]">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold bg-[rgba(34,211,238,0.2)] border border-[rgba(34,211,238,0.5)]" style={{ color: '#22D3EE', textShadow: '0 0 10px rgba(34, 211, 238, 0.5)' }}>
                          2
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white">ОЦИФРУЙ ПРИСУТСТВИЕ</h3>
                      </div>
                      <div className="space-y-3 mb-6">
                        {['позиционирование', 'контент-система', 'модель 1 → 16', 'тёплая комната'].map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#22D3EE]" style={{ boxShadow: '0 0 8px rgba(34, 211, 238, 0.5)' }}></div>
                            <p className="text-gray-300">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Этап 3 */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                    <div className="glass-panel rounded-xl p-8 border border-[rgba(139,92,246,0.4)]">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold bg-[rgba(139,92,246,0.2)] border border-[rgba(139,92,246,0.5)]" style={{ color: '#8B5CF6', textShadow: '0 0 10px rgba(139, 92, 246, 0.5)' }}>
                          3
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white">ОЦИФРУЙ ДЕНЬГИ</h3>
                      </div>
                      <div className="space-y-3 mb-6">
                        {['CJM', 'нейроворонка', 'автоматизация', 'прогрев'].map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#8B5CF6]" style={{ boxShadow: '0 0 8px rgba(139, 92, 246, 0.5)' }}></div>
                            <p className="text-gray-300">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 md:mt-0 glass-panel rounded-xl p-6 border border-[rgba(139,92,246,0.25)]" style={{ background: 'rgba(139, 92, 246, 0.05)' }}>
                      <p className="text-sm text-gray-400 mb-2">Результат:</p>
                      <p className="text-lg font-semibold" style={{ color: '#8B5CF6' }}>внимание превращается в деньги</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== BLOCK 6.5: ПОДРОБНАЯ ПРОГРАММА ===== */}
        <section className="py-20 md:py-32 relative">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Программа внедрения
            </h2>

            <p className="text-center text-gray-400 mb-12 text-lg">3 этапа, после которых работа уже не выглядит прежней.<br/>Вы не изучаете нейросети. Вы учитесь управлять интеллектом, визуалом и продажами.</p>

            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  value: "stage1",
                  title: "ЭТАП 1 — «А ЧТО, ТАК МОЖНО БЫЛО??»",
                  subtitle: "Текстовые ИИ • Промптинг • Ассистенты • Первые деньги",
                  sections: [
                    { heading: "Текстовые нейросети", items: ["ChatGPT (глубокая работа + GPTs)", "Claude", "DeepSeek", "Gemini", "Qwen и другие"] },
                    { heading: "Профессиональный промптинг", items: ["архитектура запроса", "экспертные и аналитические промпты", "«тёмная магия» промптинга", "реверсивный промптинг", "разбиение сложных задач на систему промптов", "использование ролей и многоуровневых диалогов"] },
                    { heading: "Создание ИИ-ассистентов", items: ["контент-ассистент", "аналитик или личный помощник", "коммерческий ассистент", "как прописывать систему и тестировать"] },
                    { heading: "Первые деньги", items: ["20 быстрых задач, за которые платят", "тексты, анализ, мини-проекты", "ценообразование", "ускорение выполнения через ассистентов"] },
                    { heading: "Анализ ЦА и конкурентов", items: ["JTBD и еще 5 способов анализа ЦА", "поиск болей и инсайтов", "гипотезы и таблицы", "визуализация данных", "Анализ конкурентов и конкурентная разведка"] }
                  ],
                  tools: "Google Sheets AI • Perplexity • PromptHub",
                  project: "Команда ИИ-ассистентов под реальные рабочие задачи",
                  projectResult: ["несколько ассистентов (контент / аналитика / коммерция)", "система делегирования задач ИИ", "база быстрых платных услуг", "готовая основа для заработка"],
                  stageResult: ["управляете ИИ, а не «общаетесь с ботом»", "создаёте профессиональные промпты", "автоматизируете тексты и аналитику", "можете брать первые оплачиваемые задачи", "анализируете рынок за минуты"],
                  stageQuote: "Вы уже быстрее 90% специалистов."
                },
                {
                  value: "stage2",
                  title: "ЭТАП 2 — «МОЙ ШОК в ШОКЕ, НЕ МОГУ ОСТАНОВИТЬСЯ»",
                  subtitle: "Визуал • Видео • Упаковка • Маркетплейсы • Озвучка",
                  sections: [
                    { heading: "Графические нейросети", items: ["Midjourney", "Krea", "Leonardo AI", "Recraft", "NanoBanana", "Freepik AI"] },
                    { heading: "Видео-нейросети", items: ["Kling", "Runway", "Pika", "Higgsfield", "VEO"] },
                    { heading: "Айдентика и упаковка", items: ["создание фирменного стиля", "визуальная система бренда", "упаковка продукта"] },
                    { heading: "Карточки маркетплейсов", items: ["улучшение фото товаров", "создание продающих изображений", "визуальное позиционирование продукта"] },
                    { heading: "Цифровой аватар и озвучка", items: ["HeyGen", "ElevenLabs", "Suno", "Minimax", "Captions / Submagic", "клонирование голоса", "сборка видео"] }
                  ],
                  project: "Клип, созданный полностью с помощью нейросетей",
                  projectResult: ["видео/клип", "визуал", "озвучка", "монтаж", "готовый кейс для портфеля или клиента"],
                  stageResult: ["создаёте визуал без дизайнеров", "делаете видео без съёмки", "упаковываете продукт профессионально", "создаёте продающие карточки", "создаёте цифровых аватаров и голос"],
                  stageQuote: "Вы становитесь мини-продакшеном."
                },
                {
                  value: "stage3",
                  title: "ЭТАП 3 — «ЭТО ЧТО Я СДЕЛАЛ(А)??»",
                  subtitle: "Боты • Мини-воронки • AI-агенты • Автоматизация продаж",
                  sections: [
                    { heading: "Чат-боты через SendPulse", items: ["логика", "цепочки сообщений", "выдача материалов", "автоматизация общения"] },
                    { heading: "Чат-боты через ChatPlace", items: ["Выдача по кодовому слову", "сценарии диалогов", "тестирование"] },
                    { heading: "Нейроворонка ВЗРЫВНОГО РОСТА", items: ["путь клиента", "автопрогрев", "вовлечение и дожим", "система продаж 24/7", "Создание мини продукта"] },
                    { heading: "Vibe-coding и AI-агенты", items: ["Manus", "Make (Integromat)", "автоматизация задач", "агенты для бизнеса и личной работы"] }
                  ],
                  tools: "Viral — для создания контентной матрицы",
                  project: "Готовая нейроворонка с оффером",
                  projectResult: ["чат-бот", "контент матрица с готовым контентом", "логика продаж", "оффер", "система под запуск или клиента"],
                  stageResult: ["создаёте чат-ботов", "автоматизируете коммуникации", "строите мини-воронки продаж", "создаёте AI-агентов", "запускаете систему, работающую без вас"],
                  stageQuote: "Вы перестаёте работать руками. Вы управляете системой."
                },
                {
                  value: "final",
                  title: "ФИНАЛ",
                  subtitle: "",
                  sections: [],
                  finalBlock: true,
                  finalResults: ["скорость работы ↑ в 5–10 раз", "появляется новый источник дохода", "задачи решаются за минуты", "появляется портфель кейсов", "формируется система продаж"],
                  finalQuote: "И самое интересное: возврат к прежнему способу работы вызывает лёгкое недоумение."
                }
              ].map((item) => (
                <AccordionItem
                  key={item.value}
                  value={item.value}
                  className="accordion-neon border border-[rgba(34,211,238,0.35)] rounded-lg px-6 py-4 data-[state=open]:bg-[rgba(10,10,14,0.7)]"
                >
                  <AccordionTrigger className="text-lg font-semibold hover:text-[#22D3EE] transition-colors">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="pt-6 space-y-6">
                    {item.subtitle && (
                      <p className="text-[#22D3EE] font-medium text-base">{item.subtitle}</p>
                    )}

                    {item.finalBlock ? (
                      <>
                        <div>
                          <p className="font-semibold text-gray-200 mb-3">После 3 этапов:</p>
                          <div className="space-y-2">
                            {item.finalResults.map((r, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <span className="text-green-400 mt-0.5">✔</span>
                                <p className="text-gray-300">{r}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-400 italic border-l-2 border-[#22D3EE] pl-4">{item.finalQuote}</p>
                      </>
                    ) : (
                      <>
                        {/* Sections */}
                        <div className="space-y-5">
                          <h4 className="font-semibold text-gray-200">Что внутри:</h4>
                          {item.sections.map((section, sIdx) => (
                            <div key={sIdx}>
                              <p className="font-semibold text-gray-300 mb-2">{section.heading}</p>
                              <div className="space-y-1.5 pl-4">
                                {section.items.map((text, idx) => (
                                  <div key={idx} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#3B82F6]" style={{ boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}></div>
                                    <p className="text-gray-400">{text}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Tools */}
                        {item.tools && (
                          <div className="bg-[rgba(34,211,238,0.08)] rounded-lg p-4 border border-[rgba(34,211,238,0.2)]">
                            <p className="text-sm text-gray-400"><span className="text-[#22D3EE]">🤖 Дополнительно используемые инструменты:</span> {item.tools}</p>
                          </div>
                        )}

                        {/* Mini-project */}
                        {item.project && (
                          <div>
                            <h4 className="font-semibold text-gray-200 mb-3">✅ МИНИ-ПРОЕКТ ЭТАПА:</h4>
                            <p className="text-gray-300 font-semibold mb-3">{item.project}</p>
                            <p className="text-gray-400 mb-2 font-semibold">На выходе:</p>
                            <div className="space-y-2">
                              {item.projectResult.map((result, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <span className="text-green-400 mt-0.5">✔</span>
                                  <p className="text-gray-400">{result}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Stage result */}
                        {item.stageResult && (
                          <div className="bg-[rgba(34,211,238,0.05)] rounded-lg p-5 border border-[rgba(34,211,238,0.15)]">
                            <p className="font-semibold text-[#22D3EE] mb-3">🎯 РЕЗУЛЬТАТ ЭТАПА</p>
                            <p className="text-gray-300 mb-2">Вы:</p>
                            <div className="space-y-2">
                              {item.stageResult.map((r, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <span className="text-green-400 mt-0.5">✔</span>
                                  <p className="text-gray-300">{r}</p>
                                </div>
                              ))}
                            </div>
                            {item.stageQuote && (
                              <p className="mt-4 text-[#22D3EE] font-semibold">👉 {item.stageQuote}</p>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ===== BLOCK 7: КОМУ ПОДОЙДЁТ ===== */}
        <section className="py-20 md:py-32 relative">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Кому подойдёт
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                'если нет системы',
                'если нет стабильного контента',
                'если продажи вручную',
                'если пробовал ИИ и не получилось'
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="glass-panel rounded-lg p-5 border border-[rgba(34,211,238,0.35)] hover:border-[rgba(34,211,238,0.6)] transition-all duration-300"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-[rgba(34,211,238,0.15)] border border-[rgba(34,211,238,0.4)]">
                      <span style={{ color: '#22D3EE' }}>✓</span>
                    </div>
                    <p className="text-gray-200 text-base md:text-lg">{item}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BLOCK 8: БОНУСЫ ===== */}
        <section className="py-20 md:py-32 relative">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Бонусы
            </h2>
            <p className="text-center text-gray-400 mb-12 text-lg">
              При покупке прямо сейчас ты получаешь бонусов на сумму 55 000 рублей!
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                { title: "🎬 Контент-завод", desc: "Мастер-класс по созданию контента с помощью нейросетей", image: "/images/content-factory-banner.jpg" },
                { title: "🌊 Нейроворонка", desc: "Мастер-класс по построению продающих воронок с ИИ", image: "/images/masterclass-neurovoronka.jpg" },
                { title: "📈 13 000 подписчиков в месяц без таргета", desc: "Мастер-класс с проверенной стратегией роста", image: "/images/masterclass-growth.jpg" },
                { title: "💰 Секретный гайд", desc: "Как оплачивать нейросети со скидкой до 90%", image: null },
                { title: "🤖 Чат-боты и автоматизации", desc: "Настройка в блоге + 12 связок для заработка", image: null },
                { title: "⭐ 5 Лучших ИИ-ассистентов", desc: "Полный гайд по использованию топовых ассистентов", image: null }
              ].map((bonus, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-lg overflow-hidden border border-[rgba(34,211,238,0.35)] hover:border-[rgba(34,211,238,0.6)] transition-all duration-300"
                >
                  {bonus.image && (
                    <div className="relative h-48 md:h-64 overflow-hidden">
                      <img
                        src={bonus.image}
                        alt={bonus.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2" style={{ color: "#22D3EE" }}>{bonus.title}</h3>
                    <p className="text-gray-400">{bonus.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-panel rounded-lg p-8 border border-[rgba(59,130,246,0.35)]">
              <h3 className="text-xl font-semibold text-gray-200 mb-6 text-center">Дополнительно включено:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold mb-2" style={{ color: "#3B82F6" }}>PromptHub</p>
                  <p className="text-gray-400">постоянно обновляющаяся база знаний по ИИ</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold mb-2" style={{ color: "#3B82F6" }}>1000+</p>
                  <p className="text-gray-400">промптов на любые задачи</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== BLOCK 9: ТАРИФЫ ===== */}
        <section className="py-20 md:py-32 relative">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Ты покупаешь не курс — ты внедряешь систему
            </h2>
            <p className="text-center text-gray-400 mb-12 text-lg">👉 Это система + инструменты внедрения ИИ, а не просто обучение</p>

            {/* Тарифы 1 и 2 */}
            <div className="grid md:grid-cols-2 gap-6 mb-6 max-w-4xl mx-auto">
              {/* Тариф 1 — Базовый */}
              <div className="glass-panel rounded-xl p-6 md:p-8 border border-[rgba(59,130,246,0.35)]">
                <h3 className="text-xl font-bold mb-1 text-gray-200">Самостоятельное внедрение</h3>
                <p className="text-sm text-gray-500 mb-4">3 недели</p>
                <p className="text-3xl font-bold mb-6" style={{ color: '#3B82F6', textShadow: '0 0 15px rgba(59, 130, 246, 0.3)' }}>
                  24 900 ₽
                </p>
                <ul className="mb-8 space-y-3 text-sm text-gray-400">
                  {[
                    'полный протокол внедрения ИИ',
                    'все обучающие материалы',
                    'шаблоны',
                    'инструкции',
                    'PromptHub',
                    'доступ в чат без обратной связи'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#3B82F6] mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="glass-panel rounded-md p-3 border border-[rgba(59,130,246,0.2)] mb-6">
                  <p className="text-xs text-gray-500 mb-1">Результат:</p>
                  <p className="text-sm text-gray-300">Разобрался в системе и внедряешь сам</p>
                </div>
                <a href={buildUrl("https://course.takayamaya.ru/neiromaster_hot")} target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="btn-neon-secondary w-full">Внедрить систему</Button>
                </a>
              </div>

              {/* Тариф 2 — Популярный */}
              <div className="glass-panel rounded-xl p-6 md:p-8 border-2 border-[rgba(34,211,238,0.5)]" style={{ background: 'rgba(34, 211, 238, 0.05)' }}>
                <div className="mb-4 inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#22D3EE] text-black">
                  Популярный
                </div>
                <h3 className="text-xl font-bold mb-1 text-gray-200">Внедрение с трекером</h3>
                <p className="text-sm text-gray-500 mb-4">4 недели</p>
                <p className="text-3xl font-bold mb-6" style={{ color: '#22D3EE', textShadow: '0 0 15px rgba(34, 211, 238, 0.3)' }}>
                  31 900 ₽
                </p>
                <ul className="mb-8 space-y-3 text-sm text-gray-300">
                  {[
                    'весь материал тарифа 1',
                    'проверка домашних заданий',
                    'обратная связь',
                    'трекер',
                    'контроль внедрения',
                    'помощь в настройке ассистентов и системы'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#22D3EE] mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="glass-panel rounded-md p-3 border border-[rgba(34,211,238,0.3)] mb-6" style={{ background: 'rgba(34, 211, 238, 0.08)' }}>
                  <p className="text-xs text-gray-400 mb-2">Результат:</p>
                  <div className="space-y-1 text-sm text-gray-200">
                    <p>— внедрена система ассистентов</p>
                    <p>— собрана база контента</p>
                    <p>— есть базовая воронка</p>
                  </div>
                </div>
                <a href={buildUrl("https://course.takayamaya.ru/neiromaster_hot")} target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="btn-neon-primary w-full">Внедрить систему</Button>
                </a>
              </div>
            </div>

            {/* Тариф 3 — VIP (полная ширина) */}
            <div className="max-w-4xl mx-auto">
              <div
                className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(34, 211, 238, 0.08), rgba(59, 130, 246, 0.08))',
                  border: '2px solid rgba(139, 92, 246, 0.5)',
                  boxShadow: '0 0 60px rgba(139, 92, 246, 0.25), 0 0 120px rgba(139, 92, 246, 0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                {/* VIP glow effects */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-40"></div>
                <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#8B5CF6] to-transparent opacity-30"></div>
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#8B5CF6] to-transparent opacity-30"></div>

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                  {/* Левая часть — заголовок и цена */}
                  <div className="md:w-1/3">
                    <div className="mb-4 inline-block px-4 py-1.5 rounded-full text-xs font-bold" style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', color: '#FFFFFF', boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' }}>
                      ⚡ VIP
                    </div>
                    <h3 className="text-2xl font-bold mb-1 text-white">Внедрение с Майей и командой</h3>
                    <p className="text-sm text-gray-400 mb-4">8 недель</p>
                    <p className="text-4xl font-bold mb-3" style={{ color: '#8B5CF6', textShadow: '0 0 20px rgba(139, 92, 246, 0.4)' }}>
                      149 000 ₽
                    </p>
                    <p className="text-sm text-gray-300 italic mb-6 font-medium" style={{ color: '#C4B5FD' }}>Это не обучение — это внедрение системы ИИ в твой бизнес</p>

                    {/* Результат */}
                    <div className="rounded-lg p-4 mb-6 border border-[rgba(139,92,246,0.3)]" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                      <p className="text-xs text-gray-400 mb-2">Результат:</p>
                      <div className="space-y-1.5 text-sm text-gray-200">
                        <p>— внедрена система ИИ в бизнес</p>
                        <p>— настроены процессы</p>
                        <p>— есть поток клиентов</p>
                        <p>— автоматизированы ключевые задачи</p>
                      </div>
                    </div>

                    <a href={buildUrl("https://course.takayamaya.ru/neiromaster_hot")} target="_blank" rel="noopener noreferrer" className="block">
                      <button
                        className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 text-lg"
                        style={{
                          background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
                          boxShadow: '0 0 30px rgba(139, 92, 246, 0.4), 0 4px 15px rgba(0,0,0,0.3)'
                        }}
                      >
                        Внедрить систему
                      </button>
                    </a>
                    <a href={buildUrl("https://course.takayamaya.ru/neiromaster_hot")} target="_blank" rel="noopener noreferrer" className="block mt-3">
                      <button
                        className="w-full py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-base"
                        style={{
                          background: 'transparent',
                          border: '2px solid rgba(139, 92, 246, 0.6)',
                          color: '#A78BFA',
                          boxShadow: '0 0 15px rgba(139, 92, 246, 0.15)'
                        }}
                      >
                        Созвон с Майей
                      </button>
                    </a>
                  </div>

                  {/* Правая часть — наполнение */}
                  <div className="md:w-2/3">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { title: 'Аудит', items: ['разбор процессов', 'поиск точек потерь', 'стратегия внедрения'] },
                        { title: 'Внедрение протокола', items: ['создание ассистентов', 'внедрение системы работы', 'оцифровка мышления'] },
                        { title: 'Контент-система', items: ['позиционирование', 'структура контента', 'внедрение модели 1 → 16'] },
                        { title: 'Нейроворонка', items: ['CJM', 'сценарии', 'прогрев', 'структура продаж'] },
                        { title: 'Работа с командой', items: ['обучение команды', 'внедрение процессов', 'обучение работе с ИИ'] },
                        { title: 'Запуск', items: ['создание структуры запуска', 'подготовка материалов', 'помощь в запуске'] },
                        { title: 'Автоматизация', items: ['внедрение инструментов', 'настройка автоматизации'] }
                      ].map((section, i) => (
                        <div key={i} className="rounded-lg p-4 border border-[rgba(139,92,246,0.2)]" style={{ background: 'rgba(139, 92, 246, 0.06)' }}>
                          <p className="text-sm font-semibold mb-2" style={{ color: '#A78BFA' }}>{section.title}</p>
                          <div className="space-y-1.5">
                            {section.items.map((item, j) => (
                              <p key={j} className="text-xs text-gray-400">— {item}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 italic mt-4">(сложные разработки автоматизации выполняются отдельно по желанию клиента)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* URGENCY */}
            <div className="mt-10 text-center">
              <div className="inline-block glass-panel rounded-lg px-8 py-6 border border-[rgba(239,68,68,0.4)]" style={{ background: 'rgba(239, 68, 68, 0.08)' }}>
                <p className="text-lg md:text-xl font-bold text-white mb-2">
                  ⚠️ Цена растёт каждый месяц!
                </p>
                <p className="text-base md:text-lg text-gray-300">
                  Лучшее время — <span className="font-black text-xl" style={{ color: '#22D3EE' }}>СЕЙЧАС</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== BLOCK 10: КЕЙСЫ УЧЕНИКОВ ===== */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
              <span style={{ color: '#22D3EE' }}>РЕЗУЛЬТАТЫ</span> УЧЕНИКОВ
            </h2>
            <p className="text-gray-400 text-center mb-12 text-lg">Реальные истории тех, кто внедрил систему</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { img: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663142814497/nuRoXFbADBTEKrdp.JPG', alt: 'Кейс Алиса' },
                { img: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663142814497/schfoHLMIpTWlKMV.JPG', alt: 'Кейс Алена' },
                { img: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663142814497/TnPHKLFYAiytVtdQ.JPG', alt: 'Кейс Вика' },
                { img: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663142814497/mXmzjgoYoxILfYsG.JPG', alt: 'Кейс Маша' },
                { img: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663142814497/uKAZykQXojbSQovs.JPG', alt: 'Кейс Яна' },
                { img: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663142814497/yTjdRxBmCGSoSzax.JPG', alt: 'Кейс Вероника' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                  viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                >
                  <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02]">
                    <img
                      src={item.img}
                      alt={item.alt}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BLOCK 11: ОТЗЫВЫ ===== */}
        <section className="py-20 md:py-32 relative">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Отзывы студентов
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { img: '/images/IMG_7676.jpg', alt: 'Отзыв 1' },
                { img: '/images/IMG_7677.jpg', alt: 'Отзыв 2' },
                { img: '/images/IMG_7704.jpg', alt: 'Отзыв 3' },
                { img: '/images/IMG_7705.jpg', alt: 'Отзыв 4' },
                { img: '/images/IMG_7707.jpg', alt: 'Отзыв 5' },
                { img: '/images/IMG_58442.JPG', alt: 'Отзыв 6' },
                { img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663142814497/GzwjeCZycrVN4yCYzVRxGA/IMG_9155_e092eb0d.jpg', alt: 'Отзыв Галия' },
                { img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663142814497/GzwjeCZycrVN4yCYzVRxGA/IMG_9154_df35b57c.jpg', alt: 'Отзыв Яна Коробова' },
                { img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663142814497/GzwjeCZycrVN4yCYzVRxGA/IMG_9153_f5a76844.jpg', alt: 'Отзыв Анна Кузнецова' }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                  viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-2xl border border-blue-500/30 rounded-2xl p-4 overflow-hidden hover:border-blue-500/60 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(59,130,246,0.2)]" />
                    </div>
                    <img
                      src={testimonial.img}
                      alt={testimonial.alt}
                      className="w-full h-auto rounded-xl object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BLOCK 12: FAQ ===== */}
        <section className="py-20 md:py-32 relative">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Часто задаваемые вопросы
            </h2>

            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  value: "q1",
                  title: "Я новичок, смогу ли я разобраться?",
                  answer: "Да! Курс построен от простого к сложному. Базовая часть специально разработана для тех, кто никогда не работал с нейросетями. Мы начинаем с самых основ, и вы постепенно освоите все необходимые навыки. Более 10 000 учеников уже прошли этот путь обучения у меня!"
                },
                {
                  value: "q2",
                  title: "Сколько времени нужно уделять обучению?",
                  answer: "Минимум 3-5 часов в неделю. Курс рассчитан на занятых людей — все материалы в записи, можно учиться в своём темпе. Главное — регулярность и практика. Чем больше времени уделяете, тем быстрее увидите результаты. На тарифе с куратором есть динамика для результата, надо пройти за три недели, но есть и заморозка (если не успеваете)"
                },
                {
                  value: "q3",
                  title: "Можно ли оплатить частями?",
                  answer: "Да, доступна рассрочка. От банка или от школы. При оформлении заказа выберите удобный вариант оплаты. Также доступна оплата по частям — свяжитесь с нами для уточнения деталей. (создайте заказ, менеджер свяжется и расскажет подробности)"
                },
                {
                  value: "q4",
                  title: "Гарантируете ли вы результат?",
                  answer: "Мы гарантируем качество обучения и поддержку на протяжении всего курса. Ваш результат зависит от вашей вовлечённости и практики. Более 10 000 учеников уже получили реальные результаты — увеличили доход, ускорили работу, нашли новых клиентов."
                },
                {
                  value: "q5",
                  title: "Нужны ли технические навыки?",
                  answer: "Нет, технические навыки не требуются для базовой части и большинства специализаций. Для специализации \"Боты & Автоматизация\" полезны базовые знания программирования, но мы даём все необходимые инструкции и шаблоны."
                },
                {
                  value: "q6",
                  title: "Как долго доступ к материалам?",
                  answer: "Доступ к материалам курса на 6 месяцев. Вы сможете возвращаться к урокам в любое время, пересматривать нужные моменты и пользоваться всеми материалами. Обновления курса также включены (кроме самостоятельного)"
                },
                {
                  value: "q7",
                  title: "Есть ли поддержка и кураторы?",
                  answer: "Да! Конечно) кроме того, даже после окончания курса она не заканчивается) вы сможете задавать вопросы даже после обучения"
                },
                {
                  value: "q8",
                  title: "Выдаётся ли сертификат?",
                  answer: "Да, после успешного завершения курса вы получите сертификат о прохождении обучения. Это подтверждение ваших навыков, которое можно добавить в портфолио или резюме. Плюс, вы можете попасть на площадку с клиентами, если выполните условия"
                },
                {
                  value: "q9",
                  title: "Что если мне не подойдёт?",
                  answer: "Мы уверены в качестве курса, но если в течение первых 7 дней вы поймёте, что курс вам не подходит, мы вернём деньги без вопросов. Просто напишите в поддержку. Один момент, мы навсегда блокируем вас от любых продуктов школы"
                }
              ].map((item) => (
                <AccordionItem
                  key={item.value}
                  value={item.value}
                  className="accordion-neon border border-[rgba(59,130,246,0.35)] rounded-lg px-6 py-4 data-[state=open]:bg-[rgba(10,10,14,0.7)]"
                >
                  <AccordionTrigger className="text-base md:text-lg font-semibold hover:text-[#3B82F6] transition-colors">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <p className="text-gray-400">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ===== ФИНАЛЬНЫЙ CTA ===== */}
        <section className="py-20 md:py-32 relative">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <div className="glass-panel rounded-xl p-8 md:p-12 border border-[rgba(34,211,238,0.4)]">
              <p className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ты покупаешь не курс
              </p>
              <p className="text-2xl md:text-3xl font-bold mb-8" style={{ color: '#22D3EE', textShadow: '0 0 20px rgba(34, 211, 238, 0.3)' }}>
                Ты внедряешь систему
              </p>
              <a
                href={buildUrl("https://course.takayamaya.ru/neiromaster_hot")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-5 rounded-xl font-bold text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #22D3EE)',
                  color: '#FFFFFF',
                  boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)'
                }}
              >
                Внедрить систему
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[rgba(59,130,246,0.35)] py-8 relative">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center text-gray-500 text-sm space-y-3">
              <p>© 2024 NEIROMASTER 5.0. Все права защищены.</p>
              <p>ИП Галицкая М.В.</p>
              <p>
                <a
                  href="https://course.takayamaya.ru/oferta_neiro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3B82F6] hover:text-[#22D3EE] transition-colors underline"
                >
                  Договор оферты и политика конфиденциальности
                </a>
              </p>
            </div>
          </div>
        </footer>

      {/* Pop-ups */}
      <PopupPlaceTaken
        isVisible={showPlaceTaken}
        onClose={() => setShowPlaceTaken(false)}
        name={currentPerson.name}
        city={currentPerson.city}
      />
      <PopupSystemActive
        isVisible={showSystemActive}
        onClose={handleCloseSystemActive}
        onCTA={handleSystemActiveCTA}
      />
      </div>
    </div>
  );
}
