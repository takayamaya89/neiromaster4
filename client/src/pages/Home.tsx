'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Zap, Code, Rocket } from 'lucide-react';
import PopupPlaceTaken from '@/components/PopupPlaceTaken';
import PopupSystemActive from '@/components/PopupSystemActive';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  viewport: { once: true, margin: '0px 0px -100px 0px' }
};

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

  // Pop-up №2: Система активна (через 30 сек бездействия)
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
    if (systemActiveClosedAt && Date.now() - systemActiveClosedAt < 600000) return; // 10 минут

    const checkInactivity = setInterval(() => {
      if (Date.now() - lastInactivityTime >= 30000) {
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
    // Скролл к первой кнопке CTA
    const ctaButton = document.querySelector('[data-cta="start"]');
    if (ctaButton) {
      ctaButton.scrollIntoView({ behavior: 'smooth' });
      (ctaButton as HTMLButtonElement).click();
    }
  };
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden relative">
      {/* ANIMATED BACKGROUND LAYERS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Layer 1: Animated neural network background */}
        <motion.div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'url(/hero-neon-network.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' as const }}
        />

        {/* Layer 2: Blurred neon spheres */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
            filter: 'blur(140px)',
            mixBlendMode: 'screen'
          }}
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' as const }}
        />

        <motion.div
          className="absolute top-1/2 right-20 w-80 h-80 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)',
            filter: 'blur(160px)',
            mixBlendMode: 'screen'
          }}
          animate={{ x: [0, -40, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' as const }}
        />

        <motion.div
          className="absolute bottom-40 left-1/3 w-72 h-72 rounded-full opacity-12"
          style={{
            background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
            filter: 'blur(180px)',
            mixBlendMode: 'screen'
          }}
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' as const }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        {/* BLOCK 1: HERO */}
        <motion.section
          className="min-h-screen flex items-center justify-center py-20 relative"
          {...fadeInUp}
        >
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 font-grotesk"
              style={{
                textShadow: '0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(34, 211, 238, 0.2)'
              }}
              {...fadeInUp}
            >
              NEIROmaster 5.0
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-4"
              {...fadeInUp}
            >
              Система работы с нейросетями для digital-специалистов
            </motion.p>

            <motion.p
              className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
              {...fadeInUp}
            >
              Делайте задачи быстрее, качественнее и дороже — без потери экспертности и контроля
            </motion.p>

            <motion.p
              className="text-base md:text-lg text-gray-500 mb-12 glass-panel rounded-lg p-4 border border-[rgba(34,211,238,0.35)]"
              {...fadeInUp}
            >
              Не «курс по ИИ», а рабочая система под digital-профессии
            </motion.p>

            <motion.div
              className="flex flex-col md:flex-row gap-4 justify-center mb-6"
              {...fadeInUp}
            >
              <Button className="btn-neon-primary px-8 py-6 text-lg">
                Начать обучение
              </Button>
              <Button className="btn-neon-secondary px-8 py-6 text-lg">
                Посмотреть программу
              </Button>
            </motion.div>

            <motion.p
              className="text-sm text-gray-500"
              {...fadeInUp}
            >
              Доступ сразу после оплаты · обучение в своём темпе
            </motion.p>
          </div>
        </motion.section>

        {/* BLOCK 2: WHY AI DOESN'T WORK */}
        <motion.section
          className="py-20 md:py-32 relative"
          {...fadeInUp}
        >
          <div className="container max-w-5xl mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              {...fadeInUp}
            >
              Почему нейросети не дают результата большинству специалистов
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {[
                  'инструменты есть, а результат нестабильный',
                  'ИИ используется точечно, а не в работе целиком',
                  'нет понимания, как на этом зарабатывать',
                  'всё выглядит сложным и разрозненным'
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="glass-panel rounded-lg p-4 border border-[rgba(59,130,246,0.35)]"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-[#3B82F6]" style={{ boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}></div>
                      <p className="text-gray-400">{item}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="glass-panel rounded-lg p-8 border border-[rgba(34,211,238,0.35)] flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
              >
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  {/* Center node */}
                  <circle cx="150" cy="150" r="20" fill="#3B82F6" opacity="0.8" />
                  <circle cx="150" cy="150" r="20" fill="none" stroke="#3B82F6" strokeWidth="2" opacity="0.3">
                    <animate attributeName="r" from="20" to="40" dur="2s" repeatCount="indefinite" />
                  </circle>

                  {/* Connecting lines */}
                  <line x1="150" y1="150" x2="150" y2="80" stroke="#22D3EE" strokeWidth="1" opacity="0.5" />
                  <line x1="150" y1="150" x2="220" y2="150" stroke="#22D3EE" strokeWidth="1" opacity="0.5" />
                  <line x1="150" y1="150" x2="150" y2="220" stroke="#22D3EE" strokeWidth="1" opacity="0.5" />
                  <line x1="150" y1="150" x2="80" y2="150" stroke="#22D3EE" strokeWidth="1" opacity="0.5" />

                  {/* Peripheral nodes */}
                  <circle cx="150" cy="80" r="12" fill="#22D3EE" opacity="0.7" />
                  <circle cx="220" cy="150" r="12" fill="#22D3EE" opacity="0.7" />
                  <circle cx="150" cy="220" r="12" fill="#22D3EE" opacity="0.7" />
                  <circle cx="80" cy="150" r="12" fill="#22D3EE" opacity="0.7" />
                </svg>
              </motion.div>
            </div>

            <motion.div
              className="mt-12 glass-panel rounded-lg p-6 border border-[rgba(34,211,238,0.35)] text-center"
              {...fadeInUp}
            >
              <p className="text-lg text-gray-300">
                <span style={{ color: '#22D3EE', fontWeight: 'bold' }}>NEIROmaster 5.0</span> — это сборка системы работы с ИИ, а не обзор сервисов и нейросетей.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* BLOCK 3: FOR WHOM */}
        <motion.section
          className="py-20 md:py-32 relative"
          {...fadeInUp}
        >
          <div className="container max-w-4xl mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              {...fadeInUp}
            >
              Кому подойдёт NEIROmaster
            </motion.h2>

            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  value: "expert",
                  title: "Эксперты без команды",
                  tasks: [
                    "Процессы и автоматизация",
                    "Контроль и отчёты",
                    "Ассистенты на ИИ",
                    "Запуски без затрат"
                  ],
                  result: "Деньги, запуски без боли, легкость работы, оптимизация расходов"
                },
                {
                  value: "smm",
                  title: "SMM-менеджеры",
                  tasks: [
                    "Контент-план за минуты",
                    "Тексты и идеи для постов",
                    "Визуал и видео",
                    "Аналитика и стратегии"
                  ],
                  result: "Скорость работы × 5, рост дохода, больше клиентов"
                },
                {
                  value: "marketer",
                  title: "Digital-маркетологи",
                  tasks: [
                    "Стратегии и воронки",
                    "Офферы и упаковка",
                    "Анализ ЦА",
                    "Автоматизация процессов"
                  ],
                  result: "Системный подход, выше конверсии, больше запусков"
                },
                {
                  value: "producer",
                  title: "Продюсеры",
                  tasks: [
                    "Запуски и сценарии",
                    "Структуры продуктов",
                    "Контент-стратегии",
                    "Управление командой ИИ"
                  ],
                  result: "Быстрые запуски, масштабирование, рост выручки"
                },
                {
                  value: "copywriter",
                  title: "Копирайтеры",
                  tasks: [
                    "Продающие тексты",
                    "Смыслы и позиционирование",
                    "Скрипты и сценарии",
                    "Редактура и адаптация"
                  ],
                  result: "Больше заказов, выше чек, меньше времени на рутину"
                },
                {
                  value: "creator",
                  title: "Креаторы",
                  tasks: [
                    "Сторис и рилсы",
                    "Контент для соцсетей",
                    "Прогревы и сценарии",
                    "Визуальный контент"
                  ],
                  result: "Больше идей, быстрее создание, выше чек"
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
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">ЗАДАЧИ:</h4>
                      <div className="space-y-2">
                        {item.tasks.map((task, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#3B82F6]" style={{ boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}></div>
                            <p className="text-gray-400">{task}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-3" style={{ color: "#22D3EE" }}>Результат:</p>
                      <p className="text-gray-400">{item.result}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.section>

        {/* BLOCK 4: PROBLEMS */}
        <motion.section
          className="py-20 md:py-32 relative"
          {...fadeInUp}
        >
          <div className="container max-w-4xl mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              {...fadeInUp}
            >
              Узнаёте себя?
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                "«Я не понимаю, как применять ИИ в своей работе»",
                "«Я пробовал(а), но нет системы»",
                "«Много инструментов — мало результата»",
                "«Не знаю чего начать»",
                "«Боюсь бесполезного обучения»",
                "«Я боюсь не справиться, кажется очень сложно»"
              ].map((problem, idx) => (
                <motion.div
                  key={idx}
                  className="glass-panel rounded-lg p-4 border border-[rgba(59,130,246,0.35)]"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-gray-300">{problem}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* BLOCK 5: SOLUTION */}
        <motion.section
          className="py-20 md:py-32 relative"
          {...fadeInUp}
        >
          <div className="container max-w-4xl mx-auto px-4">
            <motion.div
              className="glass-panel rounded-lg p-8 border border-[rgba(34,211,238,0.35)] text-center"
              {...fadeInUp}
            >
              <p className="text-sm text-gray-400 mb-4">Я ЗНАЮ КАК РЕШЕНИЕ ЭТИХ ЗАДАЧ</p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#22D3EE", textShadow: "0 0 20px rgba(34, 211, 238, 0.3)" }}>
                NEIROmaster 5.0 — это про РЕЗУЛЬТАТ и СИСТЕМУ
              </h2>
              <p className="text-gray-400 mt-6">
                Каждый модуль построен так, чтобы закрыть одну из главных проблем
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* BLOCK 6: ALWAYS ON */}
        <motion.section
          className="py-20 md:py-32 relative"
          {...fadeInUp}
        >
          <div className="container max-w-4xl mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              {...fadeInUp}
            >
              ⚡ ALWAYS ON
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Zap, title: "Доступна в любое время", desc: "" },
                { icon: Code, title: "Старт сразу после оплаты", desc: "" },
                { icon: Rocket, title: "Обучение в своём темпе", desc: "" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="glass-panel rounded-lg p-6 border border-[rgba(34,211,238,0.35)] text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <item.icon className="w-12 h-12 mx-auto mb-4" style={{ color: "#22D3EE", filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.5))" }} />
                  <h3 className="text-lg font-semibold text-gray-200">{item.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* BLOCK 7: PROGRAM */}
        <motion.section
          className="py-20 md:py-32 relative"
          {...fadeInUp}
        >
          <div className="container max-w-4xl mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              {...fadeInUp}
            >
              Программа курса
            </motion.h2>

            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  value: "week0",
                  title: "НЕДЕЛЯ 0 — ВВОДНЫЙ УРОК. ТЕХНИЧЕСКАЯ БАЗА",
                  result: "Полностью готовая техническая база для работы со всеми инструментами курса",
                  content: [
                    "VPN и стабильные подключения",
                    "Доступ к недоступным ИИ-сервисам",
                    "Зарубежные виртуальные карты",
                    "Безопасная оплата подписок",
                    "Оптимальная конфигурация: ноутбук + телефон"
                  ]
                },
                {
                  value: "week1",
                  title: "НЕДЕЛЯ 1 — ТЕКСТОВЫЕ ИИ, ПРОМПТИНГ, АССИСТЕНТЫ, ПЕРВЫЕ ДЕНЬГИ",
                  result: "Участник умеет управлять ИИ, создавать ассистентов и понимает, как зарабатывать на этих навыках",
                  content: [
                    "Текстовые нейросети (GPT / Claude / DeepSeek / Gemini / Qwen)",
                    "Профессиональный промптинг",
                    "Тёмная промпт-инженерия и СОЗДАНИЕ САМЫХ МОЩНЫХ ПРОМПТОВ",
                    "Создание ИИ-ассистентов ПОД ЗАДАЧИ И МОНЕТИЗАЦИЮ",
                    "Первые задачи для заработка + ценообразование",
                    "Анализ ЦА и конкурентов (таблицы, графики)"
                  ],
                  project: "Команда ИИ-ассистентов под реальные рабочие задачи",
                  projectResult: [
                    "Несколько ассистентов (контент / аналитика / коммерция)",
                    "Система делегирования задач ИИ",
                    "Готовая основа для заработка и масштабирования"
                  ]
                },
                {
                  value: "week2",
                  title: "НЕДЕЛЯ 2 — ВИЗУАЛ, ВИДЕО, УПАКОВКА, МАРКЕТПЛЕЙСЫ, ОЗВУЧКА",
                  result: "Участник самостоятельно создаёт визуал и видео под коммерческие задачи",
                  content: [
                    "Графические нейросети (Midjourney, Krea, NanoBanana, Freepic и другие)",
                    "Видео-нейросети (Kling, Hiffsfield, VEO 3 и многие другие)",
                    "Айдентика и упаковка",
                    "Карточки маркетплейсов",
                    "Цифровые аватары, озвучка, монтаж (HeyGen, ElevenLabs, Minimax, Captions, Submagic и другие)"
                  ],
                  project: "Клип, созданный полностью с помощью нейросетей",
                  projectResult: [
                    "Видео/клип",
                    "Визуал",
                    "Озвучка",
                    "Монтаж",
                    "Готовый кейс для портфеля или клиента"
                  ]
                },
                {
                  value: "week3",
                  title: "НЕДЕЛЯ 3 — БОТЫ, МИНИ-ВОРОНКИ, ПРИКЛАДНЫЕ ИНСТРУМЕНТЫ",
                  result: "Участник умеет собирать продающие нейросистемы",
                  content: [
                    "Чат-боты через SendPulse",
                    "Чат-боты через ChatPlace",
                    "Нейроворонка «Связка взрывного роста»",
                    "VibeCoding через Manus (фирменный стиль и голос)"
                  ],
                  project: "Готовая нейроворонка с оффером",
                  projectResult: [
                    "Бот",
                    "Ассистент",
                    "Логика продаж",
                    "Оффер",
                    "Готовая система под запуск или клиента"
                  ]
                },
                {
                  value: "final",
                  title: "ЗАКЛЮЧИТЕЛЬНЫЙ УРОК",
                  result: "Интеграция всех навыков + дорожная карта роста",
                  content: [
                    "Как развиваться дальше",
                    "Как повышать чек",
                    "Как выбрать специализацию"
                  ]
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
                    <div>
                      <p className="font-semibold text-gray-200 mb-3" style={{ color: "#22D3EE" }}>🎯 Итог:</p>
                      <p className="text-gray-400">{item.result}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3">Что внутри:</h4>
                      <div className="space-y-2">
                        {item.content.map((text, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#3B82F6]" style={{ boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}></div>
                            <p className="text-gray-400">{text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {item.project && (
                      <>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-3">✅ МИНИ-ПРОЕКТ:</h4>
                          <p className="text-gray-400 font-semibold mb-3">{item.project}</p>
                          <p className="text-gray-400 mb-2 font-semibold">На выходе:</p>
                          <div className="space-y-2">
                            {item.projectResult.map((result, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#22D3EE]" style={{ boxShadow: "0 0 8px rgba(34, 211, 238, 0.5)" }}></div>
                                <p className="text-gray-400">{result}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.section>

        {/* BLOCK 8: BONUSES */}
        <motion.section
          className="py-20 md:py-32 relative"
          {...fadeInUp}
        >
          <div className="container max-w-4xl mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              {...fadeInUp}
            >
              Бонусы курса
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "PromptHub", desc: "постоянно обновляющаяся база знаний по ИИ" },
                { title: "Промпты на любые задачи", desc: "1000+" },
                { title: "Мастер-классы", desc: "Живые эфиры с Майей" },
                { title: "Комьюнити и поддержка", desc: "куратора внутри клуба" },
                { title: "Разборы", desc: "Лайфаки и кейсы" },
                { title: "Мастермайнды", desc: "с автором курса (нацеленные на формирование точного понимания о монетизации и продажах услуг в новых реалиях)" }
              ].map((bonus, idx) => (
                <motion.div
                  key={idx}
                  className="glass-panel rounded-lg p-6 border border-[rgba(34,211,238,0.35)]"
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="text-lg font-semibold text-gray-200 mb-2" style={{ color: "#22D3EE" }}>{bonus.title}</h3>
                  <p className="text-gray-400">{bonus.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 space-y-3 text-gray-400">
              <p className="flex items-start gap-3">
                <span className="text-[#22D3EE]">✓</span>
                <span>Постоянное обновление курса</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-[#22D3EE]">✓</span>
                <span>Бессрочный доступ к чатам и поддержке</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-[#22D3EE]">✓</span>
                <span>Доступ к материалам на 6 месяцев</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-[#22D3EE]">✓</span>
                <span>Работа с куратором (на тарифе с куратором и с Майей)</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-[#22D3EE]">✓</span>
                <span>Площадка по трудоустройству</span>
              </p>
            </div>
          </div>
        </motion.section>

        {/* BLOCK 9: PRICING */}
        <motion.section
          className="py-20 md:py-32 relative"
          {...fadeInUp}
        >
          <div className="container max-w-5xl mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              {...fadeInUp}
            >
              Выберите уровень поддержки, который вам подходит
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "самостоятельно",
                  price: "19 900 ₽",
                  details: [
                    { text: "Видео-уроки", included: true },
                    { text: "Чат с участниками (без куратора)", included: true },
                    { text: "Без проверки домашних заданий", included: false },
                    { text: "Без обратной связи от кураторов и автора", included: false },
                    { text: "Без бонусов курса", included: false }
                  ],
                  popular: false
                },
                {
                  title: "База — с куратором",
                  price: "24 900 ₽",
                  details: [
                    "Видео-уроки",
                    "Обучающие материалы",
                    "Секретные гайды",
                    "Все бонусы курса",
                    "Проверка домашних заданий",
                    "Обратная связь от куратора",
                    "Ответы на вопросы",
                    "Бессрочная поддержка в чате",
                    "PROMPTHub"
                  ],
                  popular: true
                },
                {
                  title: "База — куратор + Майя",
                  price: "189 000 ₽",
                  details: [
                    "Всё из тарифа «С куратором»",
                    "Личная обратная связь от Майи",
                    "Разбор ваших проектов",
                    "Индивидуальные рекомендации",
                    "Приоритетная поддержка"
                  ],
                  popular: false
                }
              ].map((plan, idx) => (
                <motion.div
                  key={idx}
                  className={`glass-panel rounded-lg p-6 border transition-all ${plan.popular ? 'scale-105 border-[rgba(34,211,238,0.5)]' : 'border-[rgba(59,130,246,0.35)]'}`}
                  style={{
                    background: plan.popular ? "rgba(34, 211, 238, 0.05)" : "rgba(10, 10, 14, 0.55)"
                  }}
                  whileHover={{ scale: plan.popular ? 1.08 : 1.02 }}
                >
                  {plan.popular && (
                    <div className="mb-4 inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#22D3EE] text-black">
                      Популярный
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2 text-gray-200">{plan.title}</h3>
                  <p className="text-3xl font-bold mb-4" style={{ color: plan.popular ? "#22D3EE" : "#3B82F6", textShadow: plan.popular ? "0 0 15px rgba(34, 211, 238, 0.3)" : "0 0 15px rgba(59, 130, 246, 0.3)" }}>
                    {plan.price}
                  </p>
                  <ul className="mb-6 space-y-2 text-xs text-gray-400">
                    {plan.details.map((detail, i) => {
                      const isObject = typeof detail === 'object';
                      const text = isObject ? detail.text : detail;
                      const included = isObject ? detail.included : true;
                      return (
                        <li key={i} className="flex items-start gap-2">
                          <span className={`mt-1 ${included ? 'text-[#22D3EE]' : 'text-red-500'}`}>
                            {included ? '✓' : '✗'}
                          </span>
                          <span>{text}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <Button className={plan.popular ? "btn-neon-primary w-full" : "btn-neon-secondary w-full"}>
                    Выбрать тариф
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* BLOCK 10: SPECIALIZATIONS */}
        <motion.section
          className="py-20 md:py-32 relative"
          {...fadeInUp}
        >
          <div className="container max-w-4xl mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6 text-center"
              {...fadeInUp}
            >
              А что если мне нужно больше?
            </motion.h2>

            <motion.div
              className="glass-panel rounded-lg p-8 border border-[rgba(34,211,238,0.35)] text-center mb-8"
              {...fadeInUp}
            >
              <p className="text-lg text-gray-300 mb-6">
                Тогда после прохождения NEIROmaster выбирай специализацию — усиление под твою роль
              </p>
              <p className="text-gray-400 mb-6">Закрытые специализации чтобы:</p>
              <div className="space-y-2 text-gray-400 mb-8">
                <p>✓ УВЕЛИЧИТЬ ДОХОД МАСШТАБНО</p>
                <p>✓ БРАТЬ БОЛЬШИЕ И СЛОЖНЫЕ ПРОЕКТЫ</p>
                <p>✓ ОБРЕСТИ НОВУЮ ПРОФЕССИЮ С НОВЫМИ МОЩНЫМИ НАВЫКАМИ</p>
              </div>
              <Button className="btn-neon-primary">
                Интересно узнать
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* BLOCK 11: AUTHOR */}
        <motion.section
          className="py-20 md:py-32 relative"
          {...fadeInUp}
        >
          <div className="container max-w-4xl mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              {...fadeInUp}
            >
              Автор курса
            </motion.h2>

            <motion.div
              className="glass-panel rounded-lg p-8 border border-[rgba(34,211,238,0.35)]"
              {...fadeInUp}
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Photo */}
                <div className="flex-shrink-0 w-full md:w-48">
                  <img
                    src="/images/author.png"
                    alt="Майя Галицкая"
                    className="w-full rounded-lg border border-[rgba(59,130,246,0.35)] shadow-lg"
                    style={{
                      boxShadow: '0 0 40px rgba(59,130,246,0.25), 0 0 20px rgba(34,211,238,0.15)'
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-gray-200" style={{ color: "#22D3EE" }}>Майя Галицкая</h3>
                  <p className="text-gray-400 mb-6">Маркетолог с 15+ лет опыта, топовый AI-практик</p>

                  <div className="space-y-3 text-gray-400">
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
            </motion.div>
          </div>
        </motion.section>

        {/* BLOCK 12: FAQ */}
        <motion.section
          className="py-20 md:py-32 relative"
          {...fadeInUp}
        >
          <div className="container max-w-4xl mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              {...fadeInUp}
            >
              Часто задаваемые вопросы
            </motion.h2>

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
                  title: "Какую специализацию выбрать?",
                  answer: "Выбирайте исходя из вашей текущей профессии и целей. Маркетинг/SMM — для тех, кто работает с контентом и продвижением. AI-Creator — для создателей визуального контента. Боты & Автоматизация — для тех, кто хочет интегрировать AI в бизнес-процессы. Можно пройти базовую часть и добавить специализацию позже."
                },
                {
                  value: "q5",
                  title: "Гарантируете ли вы результат?",
                  answer: "Мы гарантируем качество обучения и поддержку на протяжении всего курса. Ваш результат зависит от вашей вовлечённости и практики. Более 10 000 учеников уже получили реальные результаты — увеличили доход, ускорили работу, нашли новых клиентов."
                },
                {
                  value: "q6",
                  title: "Нужны ли технические навыки?",
                  answer: "Нет, технические навыки не требуются для базовой части и большинства специализаций. Для специализации \"Боты & Автоматизация\" полезны базовые знания программирования, но мы даём все необходимые инструкции и шаблоны."
                },
                {
                  value: "q7",
                  title: "Как долго доступ к материалам?",
                  answer: "Доступ к материалам курса на 6 месяцев. Вы сможете возвращаться к урокам в любое время, пересматривать нужные моменты и пользоваться всеми материалами. Обновления курса также включены (кроме самостоятельного)"
                },
                {
                  value: "q8",
                  title: "Есть ли поддержка и кураторы?",
                  answer: "Да! Конечно) кроме того, даже после окончания курса она не заканчивается) вы сможете задавать вопросы даже после обучения"
                },
                {
                  value: "q9",
                  title: "Выдаётся ли сертификат?",
                  answer: "Да, после успешного завершения курса вы получите сертификат о прохождении обучения. Это подтверждение ваших навыков, которое можно добавить в портфолио или резюме. Плюс, вы можете попасть на площадку с клиентами, если выполните условия"
                },
                {
                  value: "q10",
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
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-[rgba(59,130,246,0.35)] py-8 relative">
          <div className="container max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
            <p>© 2024 NEIROMASTER 5.0. Все права защищены.</p>
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
