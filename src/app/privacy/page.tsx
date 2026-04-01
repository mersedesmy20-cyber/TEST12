import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
    return (
        <main className="bg-slate-950 min-h-screen">
            <Navigation />

            <div className="relative pt-32 pb-16 px-4 mb-8 overflow-hidden">
                {/* Background blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />

                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg">
                        Політика конфіденційності
                    </h1>
                    <p className="text-xl text-slate-300">
                        Остання редакція: 9 лютого 2026 року
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 md:px-8 pb-24">
                <div className="prose prose-invert prose-lg max-w-none">

                    <section className="mb-12 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                        <h2 className="text-3xl font-bold text-white mb-4">1. Загальні положення</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Glorious Travel ("ми", "нас", "наш") поважає вашу конфіденційність. Ця Політика конфіденційності
                            пояснює, як ми збираємо, використовуємо, зберігаємо та захищаємо вашу особисту інформацію при
                            використанні нашого веб-сайту <strong>glorious-travel.vercel.app</strong> та наших послуг.
                        </p>
                    </section>

                    <section className="mb-12 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                        <h2 className="text-3xl font-bold text-white mb-4">2. Які дані ми збираємо</h2>
                        <p className="text-slate-300 mb-4">Ми можемо збирати наступну інформацію:</p>
                        <ul className="space-y-3 text-slate-300">
                            <li className="flex items-start gap-3">
                                <span className="text-indigo-400 shrink-0">✓</span>
                                <span><strong>Контактна інформація:</strong> ім'я, прізвище, номер телефону, Telegram username, електронна пошта</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-indigo-400 shrink-0">✓</span>
                                <span><strong>Дані про подорожі:</strong> бажані напрямки, дати, бюджет, кількість туристів</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-indigo-400 shrink-0">✓</span>
                                <span><strong>Технічні дані:</strong> IP-адреса, тип браузера, час відвідування, сторінки перегляду (через Google Analytics та Facebook Pixel)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-indigo-400 shrink-0">✓</span>
                                <span><strong>Cookies:</strong> невеликі файли, які зберігаються на вашому пристрої для покращення роботи сайту</span>
                            </li>
                        </ul>
                    </section>

                    <section className="mb-12 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                        <h2 className="text-3xl font-bold text-white mb-4">3. Як ми використовуємо ваші дані</h2>
                        <p className="text-slate-300 mb-4">Ваша інформація використовується для:</p>
                        <ul className="space-y-3 text-slate-300">
                            <li className="flex items-start gap-3">
                                <span className="text-purple-400 shrink-0">•</span>
                                <span>Обробки ваших запитів на бронювання турів</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-purple-400 shrink-0">•</span>
                                <span>Зв'язку з вами через Telegram, телефон або email</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-purple-400 shrink-0">•</span>
                                <span>Надсилання персоналізованих пропозицій (тільки з вашої згоди)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-purple-400 shrink-0">•</span>
                                <span>Покращення роботи сайту та аналізу поведінки користувачів</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-purple-400 shrink-0">•</span>
                                <span>Забезпечення безпеки та запобігання шахрайству</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-purple-400 shrink-0">•</span>
                                <span>Таргетування реклами (Google Ads, Facebook Ads)</span>
                            </li>
                        </ul>
                    </section>

                    <section className="mb-12 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                        <h2 className="text-3xl font-bold text-white mb-4">4. Cookies та технології відстеження</h2>
                        <p className="text-slate-300 mb-4">
                            Ми використовуємо cookies для покращення вашого досвіду. Типи cookies:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-black/30 p-4 rounded-lg">
                                <h3 className="text-white font-bold mb-2">🔧 Необхідні</h3>
                                <p className="text-slate-400 text-sm">Потрібні для базової роботи сайту (сесії, безпека)</p>
                            </div>
                            <div className="bg-black/30 p-4 rounded-lg">
                                <h3 className="text-white font-bold mb-2">📊 Аналітичні</h3>
                                <p className="text-slate-400 text-sm">Google Analytics — для розуміння поведінки користувачів</p>
                            </div>
                            <div className="bg-black/30 p-4 rounded-lg">
                                <h3 className="text-white font-bold mb-2">📢 Рекламні</h3>
                                <p className="text-slate-400 text-sm">Facebook Pixel, Google Ads — для таргетованої реклами</p>
                            </div>
                            <div className="bg-black/30 p-4 rounded-lg">
                                <h3 className="text-white font-bold mb-2">⚙️ Функціональні</h3>
                                <p className="text-slate-400 text-sm">Збереження вподобань та налаштувань</p>
                            </div>
                        </div>
                        <p className="text-slate-300 mt-4 text-sm">
                            Ви можете керувати cookies через налаштування браузера або відхилити їх у банері на сайті.
                        </p>
                    </section>

                    <section className="mb-12 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                        <h2 className="text-3xl font-bold text-white mb-4">5. Розкриття даних третім особам</h2>
                        <p className="text-slate-300 mb-4">
                            Ми <strong>НЕ продаємо</strong> ваші особисті дані. Ми можемо передавати інформацію:
                        </p>
                        <ul className="space-y-3 text-slate-300">
                            <li className="flex items-start gap-3">
                                <span className="text-indigo-400 shrink-0">→</span>
                                <span><strong>Туроператорам та готелям</strong> — для бронювання вашої подорожі</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-indigo-400 shrink-0">→</span>
                                <span><strong>Google, Facebook</strong> — анонімні дані для аналітики та реклами</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-indigo-400 shrink-0">→</span>
                                <span><strong>Правоохоронним органам</strong> — якщо це вимагається законом</span>
                            </li>
                        </ul>
                    </section>

                    <section className="mb-12 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                        <h2 className="text-3xl font-bold text-white mb-4">6. Захист ваших даних</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Ми використовуємо сучасні методи захисту: SSL-шифрування (HTTPS), захищені сервери Vercel,
                            обмежений доступ до даних. Проте, жоден метод передачі через інтернет не є 100% безпечним.
                            Ми докладаємо максимальних зусиль для захисту вашої інформації.
                        </p>
                    </section>

                    <section className="mb-12 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                        <h2 className="text-3xl font-bold text-white mb-4">7. Ваші права (GDPR)</h2>
                        <p className="text-slate-300 mb-4">Ви маєте право:</p>
                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="flex items-center gap-3 bg-indigo-900/20 p-3 rounded-lg">
                                <span className="text-2xl">🔍</span>
                                <span className="text-white font-medium">Доступ до ваших даних</span>
                            </div>
                            <div className="flex items-center gap-3 bg-indigo-900/20 p-3 rounded-lg">
                                <span className="text-2xl">✏️</span>
                                <span className="text-white font-medium">Виправлення даних</span>
                            </div>
                            <div className="flex items-center gap-3 bg-indigo-900/20 p-3 rounded-lg">
                                <span className="text-2xl">🗑️</span>
                                <span className="text-white font-medium">Видалення даних</span>
                            </div>
                            <div className="flex items-center gap-3 bg-indigo-900/20 p-3 rounded-lg">
                                <span className="text-2xl">⛔</span>
                                <span className="text-white font-medium">Обмеження обробки</span>
                            </div>
                            <div className="flex items-center gap-3 bg-indigo-900/20 p-3 rounded-lg">
                                <span className="text-2xl">📤</span>
                                <span className="text-white font-medium">Переносимість даних</span>
                            </div>
                            <div className="flex items-center gap-3 bg-indigo-900/20 p-3 rounded-lg">
                                <span className="text-2xl">🚫</span>
                                <span className="text-white font-medium">Відкликання згоди</span>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                        <h2 className="text-3xl font-bold text-white mb-4">8. Зберігання даних</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Ми зберігаємо ваші особисті дані лише стільки, скільки це необхідно для надання послуг
                            або відповідно до законодавчих вимог. Після завершення подорожі ваші дані можуть зберігатися
                            до 3 років для надання підтримки та покращення сервісу. Ви можете запросити видалення в будь-який час.
                        </p>
                    </section>

                    <section className="mb-12 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                        <h2 className="text-3xl font-bold text-white mb-4">9. Посилання на інші сайти</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Наш сайт може містити посилання на зовнішні ресурси (Instagram, Telegram, сайти готелів).
                            Ми не несемо відповідальності за політику конфіденційності цих сайтів.
                            Радимо ознайомитися з їхніми умовами окремо.
                        </p>
                    </section>

                    <section className="mb-12 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                        <h2 className="text-3xl font-bold text-white mb-4">10. Зміни в Політиці</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Ми залишаємо за собою право оновлювати цю Політику конфіденційності. Всі зміни будуть
                            опубліковані на цій сторінці з оновленою датою. При суттєвих змінах ми сповістимо вас
                            через email або повідомлення на сайті.
                        </p>
                    </section>

                    <section className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                        <h2 className="text-3xl font-bold text-white mb-4">📧 Контакти</h2>
                        <p className="text-slate-300 mb-4">
                            Якщо у вас є питання щодо цієї Політики конфіденційності або ви хочете скористатися своїми правами, зв'яжіться з нами:
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">📱</span>
                                <span className="text-white font-medium">Telegram: @lizazakharchenko</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">📷</span>
                                <a
                                    href="https://www.instagram.com/lizazakharchenko?igsh=Nnl4MG9tcjVxMzcw"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-400 hover:text-indigo-300 font-medium underline"
                                >
                                    Instagram: @lizazakharchenko
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🌐</span>
                                <span className="text-white font-medium">Сайт: glorious-travel.vercel.app</span>
                            </div>
                        </div>
                    </section>

                </div>
            </div>

            <Footer />
        </main>
    )
}
