import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Zap, Code, Rocket, Users, BookOpen, Award } from "lucide-react";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true, margin: "0px 0px -100px 0px" }
  };

  const neonGlowVariants = {
    initial: { opacity: 0.5 },
    animate: { 
      opacity: [0.5, 1, 0.5],
      transition: { duration: 3, repeat: Infinity }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* HERO BLOCK WITH NEON ANIMATION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated neon network background */}
        <div className="absolute inset-0 opacity-40">
          <img 
            src="/images/hero-neon-network.png" 
            alt="Neon Network" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Parallax animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        
        <div className="relative z-10 container max-w-4xl mx-auto px-4 py-20 md:py-0">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main heading with neon effect */}
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight neon-text"
              variants={neonGlowVariants}
              initial="initial"
              animate="animate"
            >
              NEIROmaster 5.0
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-2xl text-foreground/90 mb-6 max-w-2xl mx-auto font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Система работы с нейросетями для digital-специалистов
            </motion.p>
            
            <motion.p 
              className="text-base md:text-lg text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Делайте задачи быстрее, качественнее и дороже — без потери экспертности и контроля
            </motion.p>
            
            {/* Neon bordered info box */}
            <motion.div 
              className="neon-border bg-dark-surface/50 backdrop-blur rounded-lg p-4 mb-12 max-w-2xl mx-auto border-2"
              style={{ borderColor: "var(--neon-blue)" }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <p className="text-sm md:text-base text-foreground/80">
                Не «курс по ИИ», а рабочая система под реальные digital-профессии
              </p>
            </motion.div>
            
            {/* CTA Buttons with neon glow */}
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
            
            <motion.p 
              className="text-sm text-foreground/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              Доступ сразу после оплаты · обучение в своём темпе
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* BLOCK 2: WHY AI DOESN'T WORK */}
      <motion.section 
        className="py-20 md:py-32 border-t-2"
        style={{ borderColor: "var(--neon-blue)" }}
        {...fadeInUp}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Почему нейросети не дают результата большинству специалистов
          </h2>
          
          <div className="space-y-8">
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              Сегодня нейросети есть почти у всех. ChatGPT, Midjourney, боты, автоматизация — инструменты доступны.
            </p>
            
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              Но у большинства специалистов это не приводит ни к росту дохода, ни к сокращению нагрузки, ни к ощущению контроля над работой.
            </p>
            
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              Причина не в нейросетях. Причина в том, что используются отдельные инструменты, а не выстроена система их применения в профессии.
            </p>
            
            {/* System panel with neon border */}
            <div 
              className="neon-border bg-dark-surface/50 backdrop-blur rounded-lg p-6 md:p-8 space-y-4 border-2"
              style={{ borderColor: "var(--neon-blue)" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0 neon-glow" style={{ backgroundColor: "var(--neon-blue)" }}></div>
                <p className="text-foreground/80">инструменты есть, а результат нестабильный</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0 neon-glow" style={{ backgroundColor: "var(--neon-blue)" }}></div>
                <p className="text-foreground/80">ИИ используется точечно, а не в работе целиком</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0 neon-glow" style={{ backgroundColor: "var(--neon-blue)" }}></div>
                <p className="text-foreground/80">нет понимания, как на этом зарабатывать</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0 neon-glow" style={{ backgroundColor: "var(--neon-blue)" }}></div>
                <p className="text-foreground/80">всё выглядит сложным и разрозненным</p>
              </div>
            </div>
            
            {/* Neon highlight box */}
            <motion.div 
              className="neon-glow rounded-lg p-6 md:p-8 border-l-4"
              style={{ 
                borderColor: "var(--neon-cyan)",
                backgroundColor: "rgba(34, 211, 238, 0.05)"
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-base md:text-lg font-semibold" style={{ color: "var(--neon-cyan)" }}>
                NEIROmaster 5.0 — это сборка системы работы с ИИ, а не обзор сервисов и нейросетей.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* BLOCK 3: WHO IT'S FOR (ACCORDION) */}
      <motion.section 
        className="py-20 md:py-32 border-t-2"
        style={{ borderColor: "var(--neon-blue)" }}
        {...fadeInUp}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Кому подойдёт NEIROmaster
          </h2>
          
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
                className="accordion-neon border-2 rounded-lg px-6 py-4 data-[state=open]:bg-dark-surface/50"
                style={{ borderColor: "var(--neon-blue)" }}
              >
                <AccordionTrigger className="text-lg font-semibold hover:text-neon-blue transition-colors" style={{ color: "inherit" }}>
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="pt-6 space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Задачи:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 neon-glow" style={{ backgroundColor: "var(--neon-cyan)" }}></div>
                        <p className="text-foreground/80">автоматизировать процессы</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 neon-glow" style={{ backgroundColor: "var(--neon-cyan)" }}></div>
                        <p className="text-foreground/80">сократить ручную рутину</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 neon-glow" style={{ backgroundColor: "var(--neon-cyan)" }}></div>
                        <p className="text-foreground/80">контролировать задачи и отчёты</p>
                      </div>
                    </div>
                  </div>
                  <motion.div 
                    className="rounded-lg p-4 border-l-4"
                    style={{ 
                      borderColor: "var(--neon-violet)",
                      backgroundColor: "rgba(139, 92, 246, 0.05)"
                    }}
                  >
                    <p className="text-foreground/90 font-medium" style={{ color: "var(--neon-violet)" }}>
                      Результат: Больше денег, меньше хаоса, понятная система работы.
                    </p>
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.section>

      {/* BLOCK 4: KNOW YOURSELF */}
      <motion.section 
        className="py-20 md:py-32 border-t-2"
        style={{ borderColor: "var(--neon-blue)" }}
        {...fadeInUp}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Узнаёте себя?
          </h2>
          
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
                className="neon-border rounded-lg p-4 border-2"
                style={{ borderColor: "var(--neon-cyan)" }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 neon-glow" style={{ backgroundColor: "var(--neon-cyan)" }}></div>
                  <p className="text-foreground/80">{item}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* BLOCK 5: WHAT IS NEIROMASTER */}
      <motion.section 
        className="py-20 md:py-32 border-t-2"
        style={{ borderColor: "var(--neon-blue)" }}
        {...fadeInUp}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            NEIROmaster 5.0 — это про результат и систему
          </h2>
          
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-8">
            Каждый модуль курса выстроен так, чтобы закрывать одну ключевую проблему digital-специалиста.
          </p>
          
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
            Вы не просто изучаете нейросети. Вы встраиваете их в свою профессию, пересобираете рабочие процессы и начинаете использовать ИИ как инструмент роста дохода, а не как игрушку или эксперимент.
          </p>
        </div>
      </motion.section>

      {/* BLOCK 6: ALWAYS ON */}
      <motion.section 
        className="py-20 md:py-32 border-t-2"
        style={{ borderColor: "var(--neon-blue)" }}
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
                  className="neon-border rounded-lg p-6 border-2 text-center"
                  style={{ borderColor: "var(--neon-violet)" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className="w-8 h-8 mx-auto mb-4 neon-glow" style={{ color: "var(--neon-violet)" }} />
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-foreground/70 text-sm">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* BLOCK 7: PROGRAM */}
      <motion.section 
        className="py-20 md:py-32 border-t-2"
        style={{ borderColor: "var(--neon-blue)" }}
        {...fadeInUp}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Программа курса
          </h2>
          
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
                className="accordion-neon border-2 rounded-lg px-6 py-4 data-[state=open]:bg-dark-surface/50"
                style={{ borderColor: "var(--neon-cyan)" }}
              >
                <AccordionTrigger className="text-lg font-semibold hover:text-neon-cyan transition-colors">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <p className="text-foreground/80">Содержание модуля...</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.section>

      {/* BLOCK 8: BONUSES */}
      <motion.section 
        className="py-20 md:py-32 border-t-2"
        style={{ borderColor: "var(--neon-blue)" }}
        {...fadeInUp}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Бонусы курса
          </h2>
          
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
                  className="neon-border rounded-lg p-6 border-2"
                  style={{ borderColor: "var(--neon-blue)" }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Icon className="w-6 h-6 mb-3 neon-glow" style={{ color: "var(--neon-blue)" }} />
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-foreground/70 text-sm">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* BLOCK 9: PRICING */}
      <motion.section 
        className="py-20 md:py-32 border-t-2"
        style={{ borderColor: "var(--neon-blue)" }}
        {...fadeInUp}
      >
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Тарифы
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Самостоятельно", price: "19 900 ₽", desc: "Без куратора и обратной связи", popular: false },
              { title: "База с куратором", price: "24 900 ₽", desc: "Проверка заданий, поддержка, все бонусы", popular: true },
              { title: "Куратор + Майя", price: "189 000 ₽", desc: "Личная работа, разбор проектов, приоритетная поддержка", popular: false }
            ].map((plan, idx) => (
              <motion.div 
                key={idx}
                className={`rounded-lg p-6 border-2 transition-all ${plan.popular ? 'scale-105' : ''}`}
                style={{ 
                  borderColor: plan.popular ? "var(--neon-cyan)" : "var(--neon-blue)",
                  backgroundColor: plan.popular ? "rgba(34, 211, 238, 0.05)" : "transparent"
                }}
                whileHover={{ scale: 1.02 }}
              >
                {plan.popular && (
                  <div className="mb-4 inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "var(--neon-cyan)", color: "#000" }}>
                    ПОПУЛЯРНЫЙ
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <p className="text-3xl font-bold mb-4" style={{ color: plan.popular ? "var(--neon-cyan)" : "var(--neon-blue)" }}>
                  {plan.price}
                </p>
                <p className="text-foreground/70 mb-6 text-sm">{plan.desc}</p>
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
        className="py-20 md:py-32 border-t-2"
        style={{ borderColor: "var(--neon-blue)" }}
        {...fadeInUp}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            А что если вам нужно больше?
          </h2>
          
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed text-center">
            После прохождения базовой системы вы можете выбрать специализацию и усилить свою профессию.
          </p>
        </div>
      </motion.section>

      {/* BLOCK 11: AUTHOR */}
      <motion.section 
        className="py-20 md:py-32 border-t-2"
        style={{ borderColor: "var(--neon-blue)" }}
        {...fadeInUp}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Майя Галицкая
            </h2>
            
            <div className="space-y-3 text-foreground/80">
              <p className="text-lg font-semibold">Маркетолог с 15+ лет опыта</p>
              <p className="text-base">AI-практик</p>
              <p className="text-base">Более 10 000 учеников</p>
              <p className="text-base">Спикер и тренер МВА</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* BLOCK 12: FAQ */}
      <motion.section 
        className="py-20 md:py-32 border-t-2"
        style={{ borderColor: "var(--neon-blue)" }}
        {...fadeInUp}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Часто задаваемые вопросы
          </h2>
          
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
                className="accordion-neon border-2 rounded-lg px-6 py-4 data-[state=open]:bg-dark-surface/50"
                style={{ borderColor: "var(--neon-blue)" }}
              >
                <AccordionTrigger className="text-base md:text-lg font-semibold hover:text-neon-blue transition-colors">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <p className="text-foreground/80">Ответ на вопрос...</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t-2 py-8" style={{ borderColor: "var(--neon-blue)" }}>
        <div className="container max-w-4xl mx-auto px-4 text-center text-foreground/60 text-sm">
          <p>© 2024 NEIROMASTER 5.0. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
