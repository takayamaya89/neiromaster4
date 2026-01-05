import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Zap, Code, Rocket, Users, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true, margin: "0px 0px -100px 0px" }
  };

  const floatingAnimation = {
    animate: {
      y: [0, -30, 0],
      x: [0, 20, 0],
      transition: { duration: 20, repeat: Infinity, ease: "easeInOut" as any }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* LAYER 1: ANIMATED BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `url('/images/hero-neon-network.png')`,
            backgroundSize: "200%",
            backgroundPosition: "0% 0%"
          }}
        />
        {/* Parallax overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)"
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* LAYER 2: NEON GLOW OBJECTS */}
      <div className="fixed inset-0 z-1 pointer-events-none overflow-hidden">
        {/* Blue sphere */}
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
            filter: "blur(140px)",
            mixBlendMode: "screen",
            opacity: 0.2,
            top: "10%",
            left: "10%"
          }}
          {...floatingAnimation}
        />
        {/* Cyan sphere */}
        <motion.div
          className="absolute w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, #22D3EE 0%, transparent 70%)",
            filter: "blur(160px)",
            mixBlendMode: "screen",
            opacity: 0.15,
            top: "50%",
            right: "5%"
          }}
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
            transition: { duration: 25, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        {/* Violet sphere */}
        <motion.div
          className="absolute w-72 h-72 rounded-full"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
            filter: "blur(150px)",
            mixBlendMode: "lighten",
            opacity: 0.12,
            bottom: "10%",
            left: "50%"
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 40, 0],
            transition: { duration: 22, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      {/* LAYER 3 & 4: CONTENT */}
      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <circle cx="200" cy="100" r="3" fill="#3B82F6" filter="url(#glow)" opacity="0.8"/>
              <circle cx="400" cy="200" r="2" fill="#22D3EE" filter="url(#glow)" opacity="0.6"/>
              <circle cx="600" cy="150" r="3" fill="#3B82F6" filter="url(#glow)" opacity="0.7"/>
              <circle cx="800" cy="250" r="2" fill="#8B5CF6" filter="url(#glow)" opacity="0.5"/>
              <circle cx="1000" cy="120" r="3" fill="#22D3EE" filter="url(#glow)" opacity="0.6"/>
              <line x1="200" y1="100" x2="400" y2="200" stroke="#3B82F6" strokeWidth="1" opacity="0.3"/>
              <line x1="400" y1="200" x2="600" y2="150" stroke="#22D3EE" strokeWidth="1" opacity="0.2"/>
              <line x1="600" y1="150" x2="800" y2="250" stroke="#3B82F6" strokeWidth="1" opacity="0.3"/>
            </svg>
          </div>

          <div className="container max-w-4xl mx-auto px-4 py-20 md:py-0 relative z-20">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight neon-text"
                animate={{
                  textShadow: [
                    "0 0 28px rgba(59, 130, 246, 0.45)",
                    "0 0 40px rgba(59, 130, 246, 0.6)",
                    "0 0 28px rgba(59, 130, 246, 0.45)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as any }}
              >
                NEIROmaster 5.0
              </motion.h1>

              <motion.p
                className="text-lg md:text-2xl text-gray-300 mb-6 max-w-2xl mx-auto font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Система работы с нейросетями для digital-специалистов
              </motion.p>

              <motion.p
                className="text-base md:text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Делайте задачи быстрее, качественнее и дороже — без потери экспертности и контроля
              </motion.p>

              <motion.div
                className="glass-panel bg-[rgba(10,10,14,0.55)] backdrop-blur-[18px] rounded-lg p-4 mb-12 max-w-2xl mx-auto border border-[rgba(59,130,246,0.35)]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <p className="text-sm md:text-base text-gray-300">
                  Не «курс по ИИ», а рабочая система под реальные digital-профессии
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col md:flex-row gap-4 justify-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Button
                  size="lg"
                  className="btn-neon-primary font-semibold text-lg px-8 py-6"
                >
                  Начать обучение
                </Button>
                <Button
                  size="lg"
                  className="btn-neon-secondary font-semibold text-lg px-8 py-6"
                >
                  Посмотреть программу
                </Button>
              </motion.div>

              <p className="text-gray-500 text-sm">
                Доступ сразу после оплаты · обучение в своём темпе
              </p>
            </motion.div>
          </div>
        </section>

        {/* BLOCK 2: WHY AI DOESN'T WORK */}
        <motion.section
          className="py-20 md:py-32 relative"
          {...fadeInUp}
        >
          <div className="container max-w-6xl mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              {...fadeInUp}
            >
              Почему нейросети не дают результата большинству специалистов
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Text blocks */}
              <div className="space-y-4">
                {[
                  "инструменты есть, а результат нестабильный",
                  "ИИ используется точечно, а не в работе целиком",
                  "нет понимания, как на этом зарабатывать",
                  "всё выглядит сложным и разрозненным"
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="glass-panel p-4 border border-[rgba(59,130,246,0.35)] rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#22D3EE]" style={{ boxShadow: "0 0 10px rgba(34, 211, 238, 0.6)" }}></div>
                      <p className="text-gray-300">{item}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right: Animated diagram */}
              <motion.div
                className="glass-panel p-8 border border-[rgba(59,130,246,0.35)] rounded-lg h-96 flex items-center justify-center relative overflow-hidden"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.2)",
                    "0 0 40px rgba(59, 130, 246, 0.3)",
                    "0 0 20px rgba(59, 130, 246, 0.2)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as any }}
              >
                <svg className="w-full h-full" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <filter id="glow2">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Central node */}
                  <circle cx="150" cy="150" r="20" fill="#3B82F6" filter="url(#glow2)" opacity="0.9"/>
                  {/* Surrounding nodes */}
                  {[0, 90, 180, 270].map((angle) => {
                    const rad = (angle * Math.PI) / 180;
                    const x = 150 + 80 * Math.cos(rad);
                    const y = 150 + 80 * Math.sin(rad);
                    return (
                      <g key={angle}>
                        <line x1="150" y1="150" x2={x} y2={y} stroke="#22D3EE" strokeWidth="1" opacity="0.4"/>
                        <circle cx={x} cy={y} r="12" fill="#22D3EE" filter="url(#glow2)" opacity="0.7"/>
                      </g>
                    );
                  })}
                </svg>
              </motion.div>
            </div>

            <motion.div
              className="mt-12 glass-panel p-6 border border-[rgba(139,92,246,0.35)] rounded-lg bg-[rgba(139,92,246,0.05)]"
              {...fadeInUp}
            >
              <p className="text-center text-gray-300">
                <span style={{ color: "#8B5CF6", textShadow: "0 0 15px rgba(139, 92, 246, 0.4)" }}>NEIROmaster 5.0</span> — это сборка системы работы с ИИ, а не обзор сервисов и нейросетей.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* BLOCK 3: WHO IS IT FOR */}
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
                { value: "expert", title: "Если вы эксперт без команды" },
                { value: "smm", title: "Если вы SMM-менеджер" },
                { value: "marketer", title: "Если вы digital-маркетолог" },
                { value: "producer", title: "Если вы продюсер" },
                { value: "copywriter", title: "Если вы копирайтер или креатор" }
              ].map((item) => (
                <AccordionItem
                  key={item.value}
                  value={item.value}
                  className="accordion-neon border border-[rgba(59,130,246,0.35)] rounded-lg px-6 py-4 data-[state=open]:bg-[rgba(10,10,14,0.7)]"
                >
                  <AccordionTrigger className="text-lg font-semibold hover:text-[#3B82F6] transition-colors">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="pt-6 space-y-6">
                    {item.value === "expert" && (
                      <>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-3">Задачи:</h4>
                          <div className="space-y-2">
                            {["автоматизировать процессы", "сократить ручную рутину", "контролировать задачи и отчёты", "делегировать ИИ", "запускать продукты без выгорания"].map((task, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#22D3EE]" style={{ boxShadow: "0 0 8px rgba(34, 211, 238, 0.5)" }}></div>
                                <p className="text-gray-400">{task}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <motion.div
                          className="rounded-lg p-4 border-l-4 border-[#8B5CF6] bg-[rgba(139,92,246,0.05)]"
                        >
                          <p className="text-gray-300 font-medium" style={{ color: "#8B5CF6", textShadow: "0 0 10px rgba(139, 92, 246, 0.3)" }}>
                            Результат: Больше денег, меньше хаоса, понятная система работы вместо постоянного перегруза.
                          </p>
                        </motion.div>
                      </>
                    )}
                    {item.value === "smm" && (
                      <>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-3">Задачи:</h4>
                          <div className="space-y-2">
                            {["контент-план за минуты", "тексты и идеи для постов", "визуал и видео", "аналитика и стратегии"].map((task, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#22D3EE]" style={{ boxShadow: "0 0 8px rgba(34, 211, 238, 0.5)" }}></div>
                                <p className="text-gray-400">{task}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <motion.div
                          className="rounded-lg p-4 border-l-4 border-[#8B5CF6] bg-[rgba(139,92,246,0.05)]"
                        >
                          <p className="text-gray-300 font-medium" style={{ color: "#8B5CF6", textShadow: "0 0 10px rgba(139, 92, 246, 0.3)" }}>
                            Результат: Скорость работы ×5, рост дохода, больше клиентов без увеличения загрузки.
                          </p>
                        </motion.div>
                      </>
                    )}
                    {item.value === "marketer" && (
                      <>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-3">Задачи:</h4>
                          <div className="space-y-2">
                            {["стратегии и воронки", "офферы и упаковка", "анализ ЦА", "автоматизация процессов"].map((task, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#22D3EE]" style={{ boxShadow: "0 0 8px rgba(34, 211, 238, 0.5)" }}></div>
                                <p className="text-gray-400">{task}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <motion.div
                          className="rounded-lg p-4 border-l-4 border-[#8B5CF6] bg-[rgba(139,92,246,0.05)]"
                        >
                          <p className="text-gray-300 font-medium" style={{ color: "#8B5CF6", textShadow: "0 0 10px rgba(139, 92, 246, 0.3)" }}>
                            Результат: Системный подход, выше конверсии, больше запусков и проектов.
                          </p>
                        </motion.div>
                      </>
                    )}
                    {item.value === "producer" && (
                      <>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-3">Задачи:</h4>
                          <div className="space-y-2">
                            {["сценарии запусков", "структура продуктов", "контент-стратегии", "управление ИИ-ассистентами"].map((task, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#22D3EE]" style={{ boxShadow: "0 0 8px rgba(34, 211, 238, 0.5)" }}></div>
                                <p className="text-gray-400">{task}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <motion.div
                          className="rounded-lg p-4 border-l-4 border-[#8B5CF6] bg-[rgba(139,92,246,0.05)]"
                        >
                          <p className="text-gray-300 font-medium" style={{ color: "#8B5CF6", textShadow: "0 0 10px rgba(139, 92, 246, 0.3)" }}>
                            Результат: Быстрые запуски, масштабирование, рост выручки.
                          </p>
                        </motion.div>
                      </>
                    )}
                    {item.value === "copywriter" && (
                      <>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-3">Задачи:</h4>
                          <div className="space-y-2">
                            {["продающие тексты и сценарии", "смыслы и позиционирование", "стори, рилс, прогревы", "визуальный контент"].map((task, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#22D3EE]" style={{ boxShadow: "0 0 8px rgba(34, 211, 238, 0.5)" }}></div>
                                <p className="text-gray-400">{task}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <motion.div
                          className="rounded-lg p-4 border-l-4 border-[#8B5CF6] bg-[rgba(139,92,246,0.05)]"
                        >
                          <p className="text-gray-300 font-medium" style={{ color: "#8B5CF6", textShadow: "0 0 10px rgba(139, 92, 246, 0.3)" }}>
                            Результат: Больше заказов, выше чек, меньше рутины.
                          </p>
                        </motion.div>
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.section>

        {/* BLOCK 4: KNOW YOURSELF */}
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
                "Я не понимаю, как применять ИИ в своей работе",
                "Я пробовал(а), но нет системы",
                "Инструментов много — результата мало",
                "Боюсь бесполезного обучения",
                "Кажется, что это слишком сложно"
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="glass-panel rounded-lg p-4 border border-[rgba(59,130,246,0.35)]"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-[#22D3EE]" style={{ boxShadow: "0 0 8px rgba(34, 211, 238, 0.5)" }}></div>
                    <p className="text-gray-400">{item}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* BLOCK 5: WHAT IS NEIROMASTER */}
        <motion.section
          className="py-20 md:py-32 relative"
          {...fadeInUp}
        >
          <div className="container max-w-4xl mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              {...fadeInUp}
            >
              NEIROmaster 5.0 — это про результат и систему
            </motion.h2>

            <motion.div
              className="glass-panel p-8 border border-[rgba(59,130,246,0.35)] rounded-lg space-y-6"
              {...fadeInUp}
            >
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Каждый модуль курса выстроен так, чтобы закрывать одну ключевую проблему digital-специалиста.
              </p>

              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Вы не просто изучаете нейросети. Вы встраиваете их в свою профессию, пересобираете рабочие процессы и начинаете использовать ИИ как инструмент роста дохода, а не как игрушку или эксперимент.
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
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Zap, title: "Старт сразу после оплаты", desc: "Получите доступ немедленно" },
                { icon: Code, title: "Доступ в любое время", desc: "Учитесь когда удобно" },
                { icon: Rocket, title: "Обучение в своём темпе", desc: "Без спешки и давления" }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    className="glass-panel rounded-lg p-6 border border-[rgba(139,92,246,0.35)] text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-4" style={{ color: "#8B5CF6", filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))" }} />
                    <h3 className="font-semibold text-lg mb-2 text-gray-200">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </motion.div>
                );
              })}
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
                { value: "week0", title: "НЕДЕЛЯ 0 — ТЕХНИЧЕСКАЯ БАЗА" },
                { value: "week1", title: "НЕДЕЛЯ 1 — ТЕКСТОВЫЕ ИИ, ПРОМПТИНГ, АССИСТЕНТЫ, ПЕРВЫЕ ДЕНЬГИ" },
                { value: "week2", title: "НЕДЕЛЯ 2 — ВИЗУАЛ, ВИДЕО, УПАКОВКА" },
                { value: "week3", title: "НЕДЕЛЯ 3 — БОТЫ, НЕЙРОВОРОНКИ, СИСТЕМЫ ПРОДАЖ" },
                { value: "final", title: "ЗАКЛЮЧИТЕЛЬНЫЙ УРОК" }
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
                    {item.value === "week0" && (
                      <>
                        <div>
                          <p className="font-semibold text-gray-200 mb-3" style={{ color: "#22D3EE" }}>Результат:</p>
                          <p className="text-gray-400 mb-4">Полностью готовая инфраструктура для работы с ИИ</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-3">Что внутри:</h4>
                          <div className="space-y-2">
                            {["VPN и стабильные подключения", "доступ к недоступным сервисам", "зарубежные виртуальные карты", "безопасная оплата подписок", "оптимальная конфигурация устройств"].map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#3B82F6]" style={{ boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}></div>
                                <p className="text-gray-400">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                    {item.value === "week1" && (
                      <>
                        <div>
                          <p className="font-semibold text-gray-200 mb-3" style={{ color: "#22D3EE" }}>Результат:</p>
                          <p className="text-gray-400 mb-4">Вы умеете управлять ИИ, создавать ассистентов и понимаете, как зарабатывать на этих навыках.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-3">Что изучаем:</h4>
                          <div className="space-y-2">
                            {["GPT, Claude, DeepSeek, Gemini, Qwen", "профессиональный промптинг", "тёмная промпт-инженерия", "создание ИИ-ассистентов под задачи и монетизацию", "анализ ЦА и конкурентов"].map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#3B82F6]" style={{ boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}></div>
                                <p className="text-gray-400">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-3">Мини-проект:</h4>
                          <p className="text-gray-400">Команда ИИ-ассистентов под реальные задачи</p>
                        </div>
                      </>
                    )}
                    {item.value === "week2" && (
                      <>
                        <div>
                          <p className="font-semibold text-gray-200 mb-3" style={{ color: "#22D3EE" }}>Результат:</p>
                          <p className="text-gray-400 mb-4">Вы самостоятельно создаёте визуал и видео под коммерческие задачи.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-3">Что изучаем:</h4>
                          <div className="space-y-2">
                            {["графические нейросети", "видео-нейросети", "айдентика и упаковка", "карточки маркетплейсов", "цифровые аватары, озвучка, монтаж"].map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#3B82F6]" style={{ boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}></div>
                                <p className="text-gray-400">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-3">Мини-проект:</h4>
                          <p className="text-gray-400">Видео или клип, созданный полностью с помощью ИИ</p>
                        </div>
                      </>
                    )}
                    {item.value === "week3" && (
                      <>
                        <div>
                          <p className="font-semibold text-gray-200 mb-3" style={{ color: "#22D3EE" }}>Результат:</p>
                          <p className="text-gray-400 mb-4">Вы умеете собирать продающие нейросистемы.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-3">Что изучаем:</h4>
                          <div className="space-y-2">
                            {["чат-боты через SendPulse", "чат-боты через ChatPlace", "нейроворонка 'Связка взрывного роста'", "VibeCoding через Manus"].map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#3B82F6]" style={{ boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}></div>
                                <p className="text-gray-400">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-3">Мини-проект:</h4>
                          <p className="text-gray-400">Готовая нейроворонка с оффером</p>
                        </div>
                      </>
                    )}
                    {item.value === "final" && (
                      <div>
                        <p className="font-semibold text-gray-200 mb-3" style={{ color: "#22D3EE" }}>Результат:</p>
                        <p className="text-gray-400">Понимание, как масштабироваться, повышать чек и выбирать специализацию.</p>
                      </div>
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
                { icon: BookOpen, title: "PromptHub", desc: "Постоянно обновляющаяся база знаний по ИИ" },
                { icon: Award, title: "1000+ промптов", desc: "Готовые решения для ваших задач" },
                { icon: Users, title: "Мастер-классы и эфиры", desc: "Живые сессии с экспертами" },
                { icon: Rocket, title: "Комьюнити и поддержка", desc: "Сообщество единомышленников" },
                { icon: Code, title: "Разборы и кейсы", desc: "Анализ реальных проектов" },
                { icon: Zap, title: "Площадка по трудоустройству", desc: "Возможности для карьеры" }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    className="glass-panel rounded-lg p-6 border border-[rgba(59,130,246,0.35)]"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Icon className="w-6 h-6 mb-3" style={{ color: "#3B82F6", filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))" }} />
                    <h3 className="font-semibold text-lg mb-2 text-gray-200">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </motion.div>
                );
              })}
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
              Тарифы
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  title: "Самостоятельно", 
                  price: "19 900 ₽", 
                  desc: "Без куратора и обратной связи",
                  details: [
                    "Доступ ко всем материалам",
                    "Видео-уроки в записи",
                    "Все бонусы (PromptHub, 1000+ промптов)",
                    "Комьюнити"
                  ],
                  popular: false 
                },
                { 
                  title: "База с куратором", 
                  price: "24 900 ₽", 
                  desc: "Проверка заданий, поддержка, все бонусы",
                  details: [
                    "Всё из тарифа Самостоятельно",
                    "Проверка мини-проектов",
                    "Обратная связь от куратора",
                    "Поддержка в чате",
                    "Приоритет в вопросах"
                  ],
                  popular: true 
                },
                { 
                  title: "Куратор + Майя", 
                  price: "189 000 ₽", 
                  desc: "Личная работа, разбор проектов, приоритетная поддержка",
                  details: [
                    "Всё из тарифа База с куратором",
                    "Личная работа с Майей",
                    "Разбор ваших проектов",
                    "Приоритетная поддержка 24/7",
                    "Консультации по специализациям",
                    "Помощь с монетизацией"
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
                      ПОПУЛЯРНЫЙ
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2 text-gray-200">{plan.title}</h3>
                  <p className="text-3xl font-bold mb-4" style={{ color: plan.popular ? "#22D3EE" : "#3B82F6", textShadow: plan.popular ? "0 0 15px rgba(34, 211, 238, 0.3)" : "0 0 15px rgba(59, 130, 246, 0.3)" }}>
                    {plan.price}
                  </p>
                  <p className="text-gray-400 mb-6 text-sm">{plan.desc}</p>
                  <ul className="mb-6 space-y-2 text-xs text-gray-400">
                    {plan.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#22D3EE] mt-1">✓</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={plan.popular ? "btn-neon-primary w-full" : "btn-neon-secondary w-full"}>
                    Выбрать
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
              className="text-3xl md:text-4xl font-bold mb-8 text-center"
              {...fadeInUp}
            >
              А что если вам нужно больше?
            </motion.h2>

            <motion.p
              className="text-base md:text-lg text-gray-300 leading-relaxed text-center glass-panel p-6 border border-[rgba(59,130,246,0.35)] rounded-lg"
              {...fadeInUp}
            >
              После прохождения базовой системы вы можете выбрать специализацию и усилить свою профессию.
            </motion.p>
          </div>
        </motion.section>

        {/* BLOCK 11: AUTHOR */}
        <motion.section
          className="py-20 md:py-32 relative"
          {...fadeInUp}
        >
          <div className="container max-w-4xl mx-auto px-4">
            <motion.div
              className="text-center glass-panel p-8 border border-[rgba(59,130,246,0.35)] rounded-lg"
              {...fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-200">
                Майя Галицкая
              </h2>

              <div className="space-y-3 text-gray-400">
                <p className="text-lg font-semibold text-gray-300">Маркетолог с 15+ лет опыта</p>
                <p className="text-base">AI-практик</p>
                <p className="text-base">Более 10 000 учеников</p>
                <p className="text-base">Спикер и тренер МВА</p>
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
                { value: "q1", title: "Я новичок. Смогу ли я разобраться?" },
                { value: "q2", title: "Сколько времени нужно уделять обучению?" },
                { value: "q3", title: "Это теория или практика?" },
                { value: "q4", title: "Подойдёт ли курс, если я не был(а) на вебинаре?" },
                { value: "q5", title: "Можно ли зарабатывать во время обучения?" },
                { value: "q6", title: "Нужны ли технические навыки?" },
                { value: "q7", title: "Как долго доступ к материалам?" },
                { value: "q8", title: "Есть ли поддержка?" },
                { value: "q9", title: "Можно ли оплатить в рассрочку?" },
                { value: "q10", title: "Выдаётся ли сертификат?" },
                { value: "q11", title: "А если курс не подойдёт?" }
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
                      {item.value === "q1" && "Да. Курс построен от простого к сложному. Мы начинаем с базы и постепенно выстраиваем систему работы с ИИ."}
                      {item.value === "q2" && "В среднем 3–5 часов в неделю. Все материалы в записи, обучение в удобном темпе."}
                      {item.value === "q3" && "Практика. Каждую неделю вы собираете рабочие инструменты и системы."}
                      {item.value === "q4" && "Да. Курс не привязан к вебинару и подходит всем digital-специалистам."}
                      {item.value === "q5" && "Да. Уже на первой неделе вы осваиваете навыки, которые можно монетизировать."}
                      {item.value === "q6" && "Нет. Всё объясняется пошагово, без программирования."}
                      {item.value === "q7" && "6 месяцев с возможностью пересмотра."}
                      {item.value === "q8" && "Да, на тарифах с куратором."}
                      {item.value === "q9" && "Да, доступна рассрочка и оплата по частям."}
                      {item.value === "q10" && "Да, после успешного завершения курса."}
                      {item.value === "q11" && "В течение 7 дней возможен возврат средств."}
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
      </div>
    </div>
  );
}
