import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { ChevronDown, Zap, Code, Rocket, Users, BookOpen, Award } from "lucide-react";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true, margin: "0px 0px -100px 0px" }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO BLOCK */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background AI visualization */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/images/hero-ai-background.png" 
            alt="AI Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 container max-w-4xl mx-auto px-4 py-20 md:py-0">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold font-mono mb-6 leading-tight">
              NEIROmaster 5.0
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/90 mb-6 max-w-2xl mx-auto">
              Система работы с нейросетями для digital-специалистов
            </p>
            
            <p className="text-base md:text-lg text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Делайте задачи быстрее, качественнее и дороже — без потери экспертности и контроля
            </p>
            
            <div className="bg-card/50 backdrop-blur border border-primary/30 rounded-lg p-4 mb-12 max-w-2xl mx-auto">
              <p className="text-sm md:text-base text-foreground/80">
                Не «курс по ИИ», а рабочая система под реальные digital-профессии
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Начать обучение
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10">
                Посмотреть программу
              </Button>
            </div>
            
            <p className="text-sm text-foreground/60">
              Доступ сразу после оплаты · обучение в своём темпе
            </p>
          </motion.div>
        </div>
      </section>

      {/* BLOCK 2: WHY AI DOESN'T WORK */}
      <motion.section 
        className="py-20 md:py-32 border-t border-primary/20"
        {...fadeInUp}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 text-center">
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
            
            <div className="bg-card border border-primary/30 rounded-lg p-6 md:p-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-foreground/80">инструменты есть, а результат нестабильный</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-foreground/80">ИИ используется точечно, а не в работе целиком</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-foreground/80">нет понимания, как на этом зарабатывать</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-foreground/80">всё выглядит сложным и разрозненным</p>
              </div>
            </div>
            
            <div className="bg-primary/10 border border-primary/40 rounded-lg p-6 md:p-8">
              <p className="text-base md:text-lg font-semibold text-primary">
                NEIROmaster 5.0 — это сборка системы работы с ИИ, а не обзор сервисов и нейросетей.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* BLOCK 3: WHO IT'S FOR (ACCORDION) */}
      <motion.section 
        className="py-20 md:py-32 border-t border-primary/20"
        {...fadeInUp}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-12 text-center">
            Кому подойдёт NEIROmaster
          </h2>
          
          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="expert" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                Если вы эксперт без команды
              </AccordionTrigger>
              <AccordionContent className="pt-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Задачи:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">автоматизировать процессы</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">сократить ручную рутину</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">контролировать задачи и отчёты</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">делегировать ИИ</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">запускать продукты без выгорания</p>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/10 border border-primary/40 rounded-lg p-4">
                  <p className="text-foreground/90 font-medium">
                    Результат: Больше денег, меньше хаоса, понятная система работы вместо постоянного перегруза.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="smm" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                Если вы SMM-менеджер
              </AccordionTrigger>
              <AccordionContent className="pt-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Задачи:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">контент-план за минуты</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">тексты и идеи для постов</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">визуал и видео</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">аналитика и стратегии</p>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/10 border border-primary/40 rounded-lg p-4">
                  <p className="text-foreground/90 font-medium">
                    Результат: Скорость работы ×5, рост дохода, больше клиентов без увеличения загрузки.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="marketer" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                Если вы digital-маркетолог
              </AccordionTrigger>
              <AccordionContent className="pt-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Задачи:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">стратегии и воронки</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">офферы и упаковка</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">анализ ЦА</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">автоматизация процессов</p>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/10 border border-primary/40 rounded-lg p-4">
                  <p className="text-foreground/90 font-medium">
                    Результат: Системный подход, выше конверсии, больше запусков и проектов.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="producer" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                Если вы продюсер
              </AccordionTrigger>
              <AccordionContent className="pt-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Задачи:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">сценарии запусков</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">структура продуктов</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">контент-стратегии</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">управление ИИ-ассистентами</p>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/10 border border-primary/40 rounded-lg p-4">
                  <p className="text-foreground/90 font-medium">
                    Результат: Быстрые запуски, масштабирование, рост выручки.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="copywriter" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                Если вы копирайтер или креатор
              </AccordionTrigger>
              <AccordionContent className="pt-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Задачи:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">продающие тексты и сценарии</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">смыслы и позиционирование</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">сторис, рилсы, прогревы</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">визуальный контент</p>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/10 border border-primary/40 rounded-lg p-4">
                  <p className="text-foreground/90 font-medium">
                    Результат: Больше заказов, выше чек, меньше рутины.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </motion.section>

      {/* BLOCK 4: FAMILIAR PROBLEMS */}
      <motion.section 
        className="py-20 md:py-32 border-t border-primary/20"
        {...fadeInUp}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-12 text-center">
            Узнаёте себя?
          </h2>
          
          <div className="space-y-3 mb-12">
            <div className="flex items-start gap-4 p-4 bg-card/30 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
              <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-foreground/80">Я не понимаю, как применять ИИ в своей работе</p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-card/30 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
              <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-foreground/80">Я пробовал(а), но нет системы</p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-card/30 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
              <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-foreground/80">Инструментов много — результата мало</p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-card/30 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
              <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-foreground/80">Не знаю, с чего начать</p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-card/30 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
              <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-foreground/80">Боюсь бесполезного обучения</p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-card/30 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
              <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-foreground/80">Кажется, что это слишком сложно</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              Узнаю себя → посмотреть программу
            </Button>
          </div>
        </div>
      </motion.section>

      {/* BLOCK 5: WHAT IS NEIROMASTER */}
      <motion.section 
        className="py-20 md:py-32 border-t border-primary/20"
        {...fadeInUp}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-12 text-center">
            NEIROmaster 5.0 — это про результат и систему
          </h2>
          
          <div className="space-y-8">
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              Каждый модуль курса выстроен так, чтобы закрывать одну ключевую проблему digital-специалиста.
            </p>
            
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              Вы не просто изучаете нейросети. Вы встраиваете их в свою профессию, пересобираете рабочие процессы и начинаете использовать ИИ как инструмент роста дохода, а не как игрушку или эксперимент.
            </p>
          </div>
        </div>
      </motion.section>

      {/* BLOCK 6: ALWAYS ON */}
      <motion.section 
        className="py-20 md:py-32 border-t border-primary/20"
        {...fadeInUp}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Старт сразу после оплаты</h3>
              <p className="text-foreground/70">Получите доступ немедленно</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Доступ в любое время</h3>
              <p className="text-foreground/70">Учитесь когда удобно</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Обучение в своём темпе</h3>
              <p className="text-foreground/70">Без спешки и давления</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* BLOCK 7: COURSE PROGRAM */}
      <motion.section 
        className="py-20 md:py-32 border-t border-primary/20"
        {...fadeInUp}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-12 text-center">
            Программа курса
          </h2>
          
          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="week0" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                НЕДЕЛЯ 0 — ТЕХНИЧЕСКАЯ БАЗА
              </AccordionTrigger>
              <AccordionContent className="pt-6 space-y-6">
                <div className="bg-primary/10 border border-primary/40 rounded-lg p-4 mb-4">
                  <p className="text-foreground/90 font-medium">
                    Результат: Полностью готовая инфраструктура для работы с ИИ
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Что внутри:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">VPN и стабильные подключения</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">доступ к недоступным сервисам</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">зарубежные виртуальные карты</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">безопасная оплата подписок</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">оптимальная конфигурация устройств</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="week1" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                НЕДЕЛЯ 1 — ТЕКСТОВЫЕ ИИ, ПРОМПТИНГ, АССИСТЕНТЫ, ПЕРВЫЕ ДЕНЬГИ
              </AccordionTrigger>
              <AccordionContent className="pt-6 space-y-6">
                <div className="bg-primary/10 border border-primary/40 rounded-lg p-4 mb-4">
                  <p className="text-foreground/90 font-medium">
                    Результат: Вы умеете управлять ИИ, создавать ассистентов и понимаете, как зарабатывать на этих навыках.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Что изучаем:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">GPT, Claude, DeepSeek, Gemini, Qwen</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">профессиональный промптинг</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">тёмная промпт-инженерия</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">создание ИИ-ассистентов под задачи и монетизацию</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">анализ ЦА и конкурентов</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card border border-primary/30 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Мини-проект:</h4>
                  <p className="text-foreground/80">Команда ИИ-ассистентов под реальные задачи</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="week2" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                НЕДЕЛЯ 2 — ВИЗУАЛ, ВИДЕО, УПАКОВКА
              </AccordionTrigger>
              <AccordionContent className="pt-6 space-y-6">
                <div className="bg-primary/10 border border-primary/40 rounded-lg p-4 mb-4">
                  <p className="text-foreground/90 font-medium">
                    Результат: Вы самостоятельно создаёте визуал и видео под коммерческие задачи.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Что изучаем:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">графические нейросети</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">видео-нейросети</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">айдентика и упаковка</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">карточки маркетплейсов</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">цифровые аватары, озвучка, монтаж</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card border border-primary/30 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Мини-проект:</h4>
                  <p className="text-foreground/80">Видео или клип, созданный полностью с помощью ИИ</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="week3" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                НЕДЕЛЯ 3 — БОТЫ, НЕЙРОВОРОНКИ, СИСТЕМЫ ПРОДАЖ
              </AccordionTrigger>
              <AccordionContent className="pt-6 space-y-6">
                <div className="bg-primary/10 border border-primary/40 rounded-lg p-4 mb-4">
                  <p className="text-foreground/90 font-medium">
                    Результат: Вы умеете собирать продающие нейросистемы.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Что изучаем:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">чат-боты через SendPulse</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">чат-боты через ChatPlace</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">нейроворонка «Связка взрывного роста»</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">VibeCoding через Manus</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card border border-primary/30 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Мини-проект:</h4>
                  <p className="text-foreground/80">Готовая нейроворонка с оффером</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="final" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                ЗАКЛЮЧИТЕЛЬНЫЙ УРОК
              </AccordionTrigger>
              <AccordionContent className="pt-6">
                <div className="bg-primary/10 border border-primary/40 rounded-lg p-4">
                  <p className="text-foreground/90 font-medium">
                    Результат: Понимание, как масштабироваться, повышать чек и выбирать специализацию.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </motion.section>

      {/* BLOCK 8: BONUSES */}
      <motion.section 
        className="py-20 md:py-32 border-t border-primary/20"
        {...fadeInUp}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-12 text-center">
            Бонусы курса
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">PromptHub</h3>
              <p className="text-foreground/70">Постоянно обновляющаяся база знаний по ИИ</p>
            </div>
            
            <div className="bg-card border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">1000+ промптов</h3>
              <p className="text-foreground/70">Готовые решения для ваших задач</p>
            </div>
            
            <div className="bg-card border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Rocket className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Мастер-классы и эфиры</h3>
              <p className="text-foreground/70">Живые сессии с экспертами</p>
            </div>
            
            <div className="bg-card border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Комьюнити и поддержка</h3>
              <p className="text-foreground/70">Сообщество единомышленников</p>
            </div>
            
            <div className="bg-card border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Разборы и кейсы</h3>
              <p className="text-foreground/70">Анализ реальных проектов</p>
            </div>
            
            <div className="bg-card border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Площадка по трудоустройству</h3>
              <p className="text-foreground/70">Возможности для карьеры</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* BLOCK 9: PRICING */}
      <motion.section 
        className="py-20 md:py-32 border-t border-primary/20"
        {...fadeInUp}
      >
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-12 text-center">
            Тарифы
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-primary/20 rounded-lg p-8 hover:border-primary/40 transition-colors flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Самостоятельно</h3>
              <p className="text-foreground/70 text-sm mb-6">Без куратора и обратной связи</p>
              <div className="text-3xl font-bold mb-8">19 900 ₽</div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-auto">
                Выбрать
              </Button>
            </div>
            
            <div className="bg-card border border-primary rounded-lg p-8 ring-2 ring-primary/30 flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                ПОПУЛЯРНЫЙ
              </div>
              <h3 className="text-xl font-semibold mb-2">База с куратором</h3>
              <p className="text-foreground/70 text-sm mb-6">Проверка заданий, поддержка, все бонусы</p>
              <div className="text-3xl font-bold mb-8">24 900 ₽</div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-auto">
                Выбрать
              </Button>
            </div>
            
            <div className="bg-card border border-primary/20 rounded-lg p-8 hover:border-primary/40 transition-colors flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Куратор + Майя</h3>
              <p className="text-foreground/70 text-sm mb-6">Личная работа, разбор проектов, приоритетная поддержка</p>
              <div className="text-3xl font-bold mb-8">189 000 ₽</div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-auto">
                Выбрать
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* BLOCK 10: SPECIALIZATIONS */}
      <motion.section 
        className="py-20 md:py-32 border-t border-primary/20"
        {...fadeInUp}
      >
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8">
            А что если вам нужно больше?
          </h2>
          
          <p className="text-base md:text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">
            После прохождения базовой системы вы можете выбрать специализацию и усилить свою профессию.
          </p>
          
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            Интересно узнать
          </Button>
        </div>
      </motion.section>

      {/* BLOCK 11: AUTHOR */}
      <motion.section 
        className="py-20 md:py-32 border-t border-primary/20"
        {...fadeInUp}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-card border border-primary/20 rounded-lg p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold font-mono mb-6">
              Майя Галицкая
            </h2>
            
            <div className="space-y-3 text-foreground/80">
              <p>Маркетолог с 15+ лет опыта</p>
              <p>AI-практик</p>
              <p>Более 10 000 учеников</p>
              <p>Спикер и тренер МВА</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* BLOCK 12: FAQ */}
      <motion.section 
        className="py-20 md:py-32 border-t border-primary/20"
        {...fadeInUp}
      >
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-12 text-center">
            Часто задаваемые вопросы
          </h2>
          
          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="faq1" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-base font-semibold hover:text-primary transition-colors">
                Я новичок. Смогу ли я разобраться?
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-foreground/80">
                Да. Курс построен от простого к сложному. Мы начинаем с базы и постепенно выстраиваем систему работы с ИИ.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq2" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-base font-semibold hover:text-primary transition-colors">
                Сколько времени нужно уделять обучению?
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-foreground/80">
                В среднем 3–5 часов в неделю. Все материалы в записи, обучение в удобном темпе.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq3" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-base font-semibold hover:text-primary transition-colors">
                Это теория или практика?
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-foreground/80">
                Практика. Каждую неделю вы собираете рабочие инструменты и системы.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq4" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-base font-semibold hover:text-primary transition-colors">
                Подойдёт ли курс, если я не был(а) на вебинаре?
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-foreground/80">
                Да. Курс не привязан к вебинару и подходит всем digital-специалистам.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq5" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-base font-semibold hover:text-primary transition-colors">
                Можно ли зарабатывать во время обучения?
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-foreground/80">
                Да. Уже на первой неделе вы осваиваете навыки, которые можно монетизировать.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq6" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-base font-semibold hover:text-primary transition-colors">
                Нужны ли технические навыки?
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-foreground/80">
                Нет. Всё объясняется пошагово, без программирования.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq7" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-base font-semibold hover:text-primary transition-colors">
                Как долго доступ к материалам?
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-foreground/80">
                6 месяцев с возможностью пересмотра.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq8" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-base font-semibold hover:text-primary transition-colors">
                Есть ли поддержка?
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-foreground/80">
                Да, на тарифах с куратором.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq9" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-base font-semibold hover:text-primary transition-colors">
                Можно ли оплатить в рассрочку?
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-foreground/80">
                Да, доступна рассрочка и оплата по частям.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq10" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-base font-semibold hover:text-primary transition-colors">
                Выдаётся ли сертификат?
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-foreground/80">
                Да, после успешного завершения курса.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq11" className="border border-primary/20 rounded-lg px-6 py-4 data-[state=open]:bg-card/50">
              <AccordionTrigger className="text-base font-semibold hover:text-primary transition-colors">
                А если курс не подойдёт?
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-foreground/80">
                В течение 7 дней возможен возврат средств.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="border-t border-primary/20 py-12 md:py-16">
        <div className="container max-w-4xl mx-auto px-4 text-center text-foreground/60 text-sm">
          <p>© 2024 NEIROMASTER 5.0. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
