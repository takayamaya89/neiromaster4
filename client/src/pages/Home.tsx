'use client';


import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Zap, Code, Rocket } from 'lucide-react';
import PopupPlaceTaken from '@/components/PopupPlaceTaken';
import PopupSystemActive from '@/components/PopupSystemActive';

// Анимации отключены для оптимизации производительности
const fadeInUp = {};

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
    // Скролл к первой кнопке CTA
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
        {/* Layer 1: Animated neural network background */}
        <motion.div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: 'url(/images/hero-neon-network.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' as const }}
        />

        {/* Layer 2: Blurred neon spheres */}
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
        {/* BLOCK 1: HERO */}
        <section
          className="min-h-screen flex items-center justify-center py-20 relative"
        >
          <div className="container max-w-5xl mx-auto px-4 text-center">
            {/* Badge */}
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-[rgba(34,211,238,0.4)] bg-[rgba(34,211,238,0.08)]">
              <span className="text-sm font-medium" style={{ color: '#22D3EE' }}>21 день до результата</span>
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

            <p
              className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              Переведи свою работу на ИИ-конвейер за 21 день.
              Освободи 30+ часов в неделю — система пашет, пока ты спишь.
            </p>


            {/* 3 ключевых буллета */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(34, 211, 238, 0.15)', border: '1px solid rgba(34, 211, 238, 0.4)' }}>
                  <Zap className="w-5 h-5" style={{ color: '#22D3EE' }} />
                </div>
                <span className="text-gray-200 text-sm md:text-base font-medium">30+ часов свободы</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.4)' }}>
                  <Rocket className="w-5 h-5" style={{ color: '#3B82F6' }} />
                </div>
                <span className="text-gray-200 text-sm md:text-base font-medium">Доход на автопилоте</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.4)' }}>
                  <Code className="w-5 h-5" style={{ color: '#8B5CF6' }} />
                </div>
                <span className="text-gray-200 text-sm md:text-base font-medium">Статус Архитектора</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-4 mb-6">
              <a
                href="https://course.takayamaya.ru/pl/lite/widget/widget/buy/891858"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-5 rounded-xl font-bold text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #22D3EE)',
                  color: '#FFFFFF',
                  boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)'
                }}
              >
                Начать за 21 день
              </a>
              <p className="text-sm text-gray-500">Доступ сразу после оплаты · обучение в своём темпе</p>
            </div>
          </div>
        </section>

        {/* BLOCK 1.5: MAYA POSITIONING */}
        <section
          className="py-20 md:py-32 relative"
        >
          <div className="container max-w-6xl mx-auto px-4">
            <div className="glass-panel rounded-lg p-8 md:p-12 border border-[rgba(34,211,238,0.35)]">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left: Photo */}
                <div className="flex justify-center order-2 md:order-1">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] rounded-xl blur-2xl opacity-60"></div>
                    <img 
                      src="/images/maya-galitskaya.png" 
                      alt="Майя Галицкая" 
                      className="relative rounded-xl w-72 h-auto object-cover border-2 border-[rgba(34,211,238,0.5)]"
                      style={{
                        boxShadow: "0 0 40px rgba(34, 211, 238, 0.4), 0 0 80px rgba(59, 130, 246, 0.3)"
                      }}
                    />
                  </div>
                </div>
                {/* Right: Text */}
                <div className="text-center md:text-left space-y-6 order-1 md:order-2">
                <h2
                  className="text-3xl md:text-4xl font-bold"
                  style={{ color: "#22D3EE", textShadow: "0 0 20px rgba(34, 211, 238, 0.3)" }}
                >
                  Меня зовут <span style={{ color: "#FFFFFF" }}>МАЙЯ ГАЛИЦКАЯ</span>!
                </h2>

                
                <div className="border-t border-[rgba(34,211,238,0.35)] pt-8 mt-8">
                  <p className="text-gray-300 mb-6 text-base md:text-lg leading-relaxed">
                    Я не учу пользоваться нейросетями, я учу <span style={{ color: "#22D3EE", fontWeight: "bold" }}>встраивать их в работу</span>, чтобы:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-[#22D3EE]" style={{ boxShadow: "0 0 8px rgba(34, 211, 238, 0.5)" }}></div>
                      <p className="text-gray-300"><span style={{ color: "#22D3EE", fontWeight: "bold" }}>Создавать стабильный рост аудитории</span></p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-[#22D3EE]" style={{ boxShadow: "0 0 8px rgba(34, 211, 238, 0.5)" }}></div>
                      <p className="text-gray-300"><span style={{ color: "#22D3EE", fontWeight: "bold" }}>Очередь из клиентов</span></p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-[#22D3EE]" style={{ boxShadow: "0 0 8px rgba(34, 211, 238, 0.5)" }}></div>
                      <p className="text-gray-300"><span style={{ color: "#22D3EE", fontWeight: "bold" }}>Кратно увеличивать заработок</span></p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-[#22D3EE]" style={{ boxShadow: "0 0 8px rgba(34, 211, 238, 0.5)" }}></div>
                      <p className="text-gray-300"><span style={{ color: "#22D3EE", fontWeight: "bold" }}>Оптимизировать затраты</span></p>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLOCK 2: WHY AI DOESN'T WORK */}
        <section
          className="py-20 md:py-32 relative"
        >
          <div className="container max-w-5xl mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              Почему нейросети не дают результата большинству специалистов
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {[
                  'инструменты есть, а результат нестабильный',
                  'ИИ используется точечно, а не в работе целиком',
                  'нет понимания, как на этом зарабатывать',
                  'всё выглядит сложным и разрозненным'
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="glass-panel rounded-lg p-4 border border-[rgba(59,130,246,0.35)]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-[#3B82F6]" style={{ boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}></div>
                      <p className="text-gray-400">{item}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="glass-panel rounded-lg p-8 border border-[rgba(34,211,238,0.35)] flex items-center justify-center"
              >
                <img src="/images/brain-circuit.png" alt="AI Brain Circuit" className="w-full h-full object-contain" />
              </div>
            </div>

            <div
              className="mt-12 glass-panel rounded-lg p-6 border border-[rgba(34,211,238,0.35)] text-center"
            >
              <p className="text-lg text-gray-300">
                <span style={{ color: '#22D3EE', fontWeight: 'bold' }}>NEIROmaster 5.0</span> — это сборка системы работы с ИИ, а не обзор сервисов и нейросетей.
              </p>
            </div>
          </div>
        </section>

        {/* BLOCK 3: FOR WHOM */}
        <section
          className="py-20 md:py-32 relative"
        >
          <div className="container max-w-4xl mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              Кому подойдёт NEIROmaster
            </h2>

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
        </section>

        {/* BLOCK 4: PROBLEMS */}
        <section
          className="py-20 md:py-32 relative"
        >
          <div className="container max-w-4xl mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              Узнаёте себя?
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                "«Я не понимаю, как применять ИИ в своей работе»",
                "«Я пробовал(а), но нет системы»",
                "«Много инструментов — мало результата»",
                "«Не знаю чего начать»",
                "«Боюсь бесполезного обучения»",
                "«Я боюсь не справиться, кажется очень сложно»"
              ].map((problem, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-lg p-4 border border-[rgba(59,130,246,0.35)]"
                >
                  <p className="text-gray-300">{problem}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://course.takayamaya.ru/pl/lite/widget/widget/buy/891858"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #22D3EE)',
                  color: '#FFFFFF',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
                }}
              >
                это точно про меня
              </a>
            </div>
          </div>
        </section>

        {/* BLOCK 5: SOLUTION */}
        <section
          className="py-20 md:py-32 relative"
        >
          <div className="container max-w-4xl mx-auto px-4">
            <div
              className="glass-panel rounded-lg p-8 border border-[rgba(34,211,238,0.35)] text-center"
            >
              <p className="text-sm text-gray-400 mb-4">У МЕНЯ ЕСТЬ РЕШЕНИЕ!</p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#22D3EE", textShadow: "0 0 20px rgba(34, 211, 238, 0.3)" }}>
                NeiroMaster 5.0: Твоя автономная операционная система — это про РЕЗУЛЬТАТ и СИСТЕМУ
              </h2>
              <p className="text-gray-400 mt-6">
                Каждый модуль построен так, чтобы закрыть одну из главных проблем
              </p>
            </div>
          </div>
        </section>

        {/* BLOCK 6: ALWAYS ON */}
        <section
          className="py-20 md:py-32 relative"
        >
          <div className="container max-w-4xl mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              ⚡ ALWAYS ON
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Zap, title: "самые актуальные материалы по рынку", desc: "" },
                { icon: Rocket, title: "постоянное обновление нейросетей и связок", desc: "" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-lg p-6 border border-[rgba(34,211,238,0.35)] text-center"
                >
                  <item.icon className="w-12 h-12 mx-auto mb-4" style={{ color: "#22D3EE", filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.5))" }} />
                  <h3 className="text-lg font-semibold text-gray-200">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLOCK 7: PROGRAM */}
        <section
          className="py-20 md:py-32 relative"
        >
          <div className="container max-w-4xl mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              Программа курса
            </h2>

            <p className="text-center text-gray-400 mb-12 text-lg">3 недели, после которых работа уже не выглядит прежней.<br/>Вы не изучаете нейросети. Вы учитесь управлять интеллектом, визуалом и продажами.</p>

            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  value: "week1",
                  title: "НЕДЕЛЯ 1 — «А ЧТО, ТАК МОЖНО БЫЛО??»",
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
                  weekResult: ["управляете ИИ, а не «общаетесь с ботом»", "создаёте профессиональные промпты", "автоматизируете тексты и аналитику", "можете брать первые оплачиваемые задачи", "анализируете рынок за минуты"],
                  weekQuote: "Вы уже быстрее 90% специалистов."
                },
                {
                  value: "week2",
                  title: "НЕДЕЛЯ 2 — «МОЙ ШОК в ШОКЕ, НЕ МОГУ ОСТАНОВИТЬСЯ»",
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
                  weekResult: ["создаёте визуал без дизайнеров", "делаете видео без съёмки", "упаковываете продукт профессионально", "создаёте продающие карточки", "создаёте цифровых аватаров и голос"],
                  weekQuote: "Вы становитесь мини-продакшеном."
                },
                {
                  value: "week3",
                  title: "НЕДЕЛЯ 3 — «ЭТО ЧТО Я СДЕЛАЛ(А)??»",
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
                  weekResult: ["создаёте чат-ботов", "автоматизируете коммуникации", "строите мини-воронки продаж", "создаёте AI-агентов", "запускаете систему, работающую без вас"],
                  weekQuote: "Вы перестаёте работать руками. Вы управляете системой."
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
                          <p className="font-semibold text-gray-200 mb-3">После 3 недель:</p>
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
                            <h4 className="font-semibold text-gray-200 mb-3">✅ МИНИ-ПРОЕКТ НЕДЕЛИ:</h4>
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

                        {/* Week result */}
                        {item.weekResult && (
                          <div className="bg-[rgba(34,211,238,0.05)] rounded-lg p-5 border border-[rgba(34,211,238,0.15)]">
                            <p className="font-semibold text-[#22D3EE] mb-3">🎯 РЕЗУЛЬТАТ НЕДЕЛИ</p>
                            <p className="text-gray-300 mb-2">Вы:</p>
                            <div className="space-y-2">
                              {item.weekResult.map((r, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <span className="text-green-400 mt-0.5">✔</span>
                                  <p className="text-gray-300">{r}</p>
                                </div>
                              ))}
                            </div>
                            {item.weekQuote && (
                              <p className="mt-4 text-[#22D3EE] font-semibold">👉 {item.weekQuote}</p>
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

        {/* BLOCK 8: BONUSES */}
        <section
          className="py-20 md:py-32 relative"
        >
          <div className="container max-w-4xl mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6 text-center"
            >
              Бонусы курса
            </h2>

            <div className="text-center mb-8 p-6 glass-panel rounded-lg border border-[rgba(59,130,246,0.35)]">
              <p className="text-xl font-semibold" style={{ color: "#22D3EE", textShadow: "0 0 20px rgba(34, 211, 238, 0.3)" }}>
                При покупке прямо сейчас ты получаешь бонусов на сумму 55.000 рублей!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                { title: "🎬 Контент-завод", desc: "Мастер-класс по созданию контента с помощью нейросетей", image: "/images/content-factory-banner.jpg" },
                { title: "🌊 Нейроворонка", desc: "Мастер-класс по построению продающих воронок с ИИ", image: "/images/masterclass-neurovoronka.jpg" },
                { title: "📈 13 000 подписчиков в месяц без таргета", desc: "Мастер-класс с проверенной стратегией роста", image: "/images/masterclass-growth.jpg", marginTop: "15mm" },
                { title: "💰 Секретный гайд", desc: "Как оплачивать нейросети со скидкой до 90%", image: null },
                { title: "🤖 Чат-боты и автоматизации", desc: "Настройка в блоге + 12 связок для заработка", image: null },
                { title: "⭐ 5 Лучших ИИ-ассистентов", desc: "Полный гайд по использованию топовых ассистентов", image: null }
              ].map((bonus, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-lg overflow-hidden border border-[rgba(34,211,238,0.35)] hover:border-[rgba(34,211,238,0.6)] transition-all duration-300"
                  style={bonus.marginTop ? { marginTop: bonus.marginTop } : {}}
                >
                  {bonus.image && (
                    <div className={`relative ${idx === 0 || idx === 1 || idx === 2 ? 'h-64' : 'h-48'} overflow-hidden`}>
                      <img 
                        src={bonus.image} 
                        alt={bonus.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-200 mb-2" style={{ color: "#22D3EE" }}>{bonus.title}</h3>
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
        </section>

        {/* BLOCK 9: PRICING */}
        <section
          className="py-20 md:py-32 relative"
        >
          <div className="container max-w-5xl mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              Выберите уровень поддержки, который вам подходит
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "самостоятельно",
                  price: "19 900 ₽",
                  startInfo: "Старт сразу после оплаты",
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
                  startInfo: "Старт каждое 1-е число месяца",
                  startNote: "Эффект группы + куратор + мастермайнды с Майей = супер мощные результаты",
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
                  startInfo: "Старт каждое 1-е число месяца",
                  startNote: "Эффект группы + куратор + мастермайнды с Майей = супер мощные результаты",
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
                <div
                  key={idx}
                  className={`glass-panel rounded-lg p-6 border transition-all ${plan.popular ? 'scale-105 border-[rgba(34,211,238,0.5)]' : 'border-[rgba(59,130,246,0.35)]'}`}
                  style={{
                    background: plan.popular ? "rgba(34, 211, 238, 0.05)" : "rgba(10, 10, 14, 0.55)"
                  }}
                >
                  {plan.popular && (
                    <div className="mb-4 inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#22D3EE] text-black">
                      Популярный
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2 text-gray-200">{plan.title}</h3>
                  <p className="text-3xl font-bold mb-2" style={{ color: plan.popular ? "#22D3EE" : "#3B82F6", textShadow: plan.popular ? "0 0 15px rgba(34, 211, 238, 0.3)" : "0 0 15px rgba(59, 130, 246, 0.3)" }}>
                    {plan.price}
                  </p>
                  {plan.startInfo && (
                    <div className="mb-1 px-3 py-1.5 rounded-md bg-[rgba(34,211,238,0.1)] border border-[rgba(34,211,238,0.25)]">
                      <p className="text-xs font-bold text-[#22D3EE]">
                        🚀 {plan.startInfo}
                      </p>
                    </div>
                  )}
                  {plan.startNote && (
                    <p className="text-[10px] text-gray-400 mb-3 italic">{plan.startNote}</p>
                  )}
                  {!plan.startNote && <div className="mb-3" />}
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
                </div>
              ))}
            </div>

            {/* URGENCY BLOCK */}
            <div className="mt-10 text-center">
              <div className="inline-block glass-panel rounded-lg px-8 py-6 border border-[rgba(239,68,68,0.4)]" style={{ background: 'rgba(239, 68, 68, 0.08)' }}>
                <p className="text-lg md:text-xl font-bold text-white mb-2">
                  ⚠️ Цена растёт каждый месяц!
                </p>
                <p className="text-base md:text-lg text-gray-300">
                  Лучшее время — <span className="font-black text-[#22D3EE] text-xl">СЕЙЧАС</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BLOCK 11: AUTHOR */}
        <section
          className="py-20 md:py-32 relative"
        >
          <div className="container max-w-4xl mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              Автор курса
            </h2>

            <div
              className="glass-panel rounded-lg p-8 border border-[rgba(34,211,238,0.35)]"
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
            </div>
          </div>
        </section>

        {/* BLOCK 11.5: STUDENT RESULTS */}
        <section
          className="py-20 md:py-32 relative overflow-hidden"
        >
          <div className="container max-w-6xl mx-auto px-4">
            <h2
              className="text-3xl md:text-5xl font-bold mb-4 text-center"
            >
              <span style={{ color: '#22D3EE' }}>РЕЗУЛЬТАТЫ</span> УЧЕНИКОВ
            </h2>
            <p className="text-gray-400 text-center mb-12 text-lg">Реальные истории тех, кто прошёл NEIROmaster</p>
            
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

        {/* BLOCK 11.6: TESTIMONIALS */}
        <section
          className="py-20 md:py-32 relative"
        >
          <div className="container max-w-6xl mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              Отзывы студентов
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { img: '/images/IMG_7676.jpg', alt: 'Отзыв 1' },
                { img: '/images/IMG_7677.jpg', alt: 'Отзыв 2' },
                { img: '/images/IMG_7704.jpg', alt: 'Отзыв 3' },
                { img: '/images/IMG_7705.jpg', alt: 'Отзыв 4' },
                { img: '/images/IMG_7707.jpg', alt: 'Отзыв 5' },
                { img: '/images/IMG_58442.JPG', alt: 'Отзыв 6' }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                  viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                >
                  {/* Glassmorphism background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Card container */}
                  <div className="relative bg-gradient-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-2xl border border-blue-500/30 rounded-2xl p-4 overflow-hidden hover:border-blue-500/60 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                    {/* Neon glow on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(59,130,246,0.2)]" />
                    </div>
                    
                    {/* Image */}
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

        {/* BLOCK 12: FAQ */}
        <section
          className="py-20 md:py-32 relative"
        >
          <div className="container max-w-4xl mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
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
