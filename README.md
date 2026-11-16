# Ritorika — «Красноречие» для Huawei Mate XT Ultimate Design

Продвинутый тренажёр по русской речи и риторике для дипломатов, политиков, преподавателей и публичных ораторов — короткие уроки в духе Duolingo по **10 минут в день**.

Спроектирован специально под **Huawei Mate XT Ultimate Design** (HarmonyOS 4.2 / EMUI 14.2) и работает **полностью офлайн, без Google Play Services (100% GMS-free)**.

## Адаптация под тройной экран Huawei Mate XT Ultimate Design

| Режим | Разрешение Mate XT | Интерфейс |
|---|---|---|
| **1 экран (6.4")** | `1008 × 2232` | Компактный режим для одной руки с нижней навигацией |
| **2 экрана (7.9")** | `2048 × 2232` | «Разворот книги»: контекст слева, варианты ответа справа |
| **3 экрана (10.2")** | `3184 × 2232` | «Кабинет оратора»: 3 колонки + постоянный «Советник по риторике» |

Переключение режимов — без перезапуска Activity: `onConfigurationChanged` перехватывает складывание/раскладывание и отдаёт posture в веб-слой через мост `MateXTBridge` (без Activity recreation). В браузерном предпросмотре posture можно переключать вручную (`Авто / 6.4" / 7.9" / 10.2"`).

## Что внутри

- **64 выражения** с ударениями, значениями, литературным происхождением и советами оратору (6 модулей).
- **4 типа заданий**: *Точный смысл*, *В контексте речи*, *Усильте фразу*, *Собери оборот*.
- **Словарь с поиском** и «Моим репертуаром», **флеш-карты** для репетиции речи.
- Тёмная OLED-тема **«Вечерний кабинет»**, озвучка через `TextToSpeech` (`ru-RU`) и виброотклик на линейном моторе Mate XT.
- Экспорт прогресса в JSON, ежедневные цели, стрик и XP.

## Структура репозитория

```
├── web/                    # Веб-приложение (PWA) — единый источник truth UI/UX
├── android/                # Android/HarmonyOS-оболочка (WebView, 100% GMS-free)
│   └── app/src/main/assets/www/   # Синхронизируется из web/ скриптом sync-web-to-android.sh
├── releases/retorika.apk   # Готовый APK (собирается локально или через CI)
├── scripts/
│   ├── sync-web-to-android.sh     # Копирует web/ -> android assets
│   └── push-to-github.sh          # Публикация в GitHub (main)
├── server.js               # Локальный предпросмотр (node server.js, порт $PORT, default 3000)
└── .github/workflows/
    ├── build-apk.yml              # Сборка APK + публикация в GitHub Releases (release `latest`)
    └── deploy-pages.yml           # Публикация PWA в GitHub Pages
```

## Быстрый старт (веб-предпросмотр)

```bash
node server.js            # http://localhost:3000 (PORT=8080 node server.js)
```

Откройте на Mate XT в режиме «ПК/браузер» или в мобильном Chrome/Яндекс.Браузере — будет полноценный PWA (офлайн через `sw.js`).

## Сборка Android APK

### Требования
JDK 11+, Android SDK (compileSdk 33), либо просто GitHub Actions.

### Локально
```bash
./scripts/sync-web-to-android.sh   # свежий веб-бандл в assets
cd android && ./gradlew :app:assembleRelease
```
Без ключа подписи release собирается debug-ключом; для update-safe релизов задайте secrets `SIGNING_KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD` (см. ниже).

### Через CI (рекомендуется)
Пуш в `main` → workflow **Build Retorika APK (Huawei Mate XT)** соберёт и приложит APK в **Releases** → тег `latest`.

**Подписание (чтобы обновления ставились поверх без удаления):**
1. Сгенерируйте ключ: `keytool -genkeypair -v -keystore retorika.jks -keyalg RSA -keysize 2048 -validity 10000 -alias retorika`
2. Закодируйте: `base64 -w0 retorika.jks`
3. Добавьте в Secrets репозитория: `SIGNING_KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS` (`retorika`), `KEY_PASSWORD`.

## Установка на Huawei Mate XT Ultimate Design
1. Скачайте `releases/retorika.apk` или APK из **Releases** на GitHub.
2. Откройте файл на устройстве, разрешите установку из неизвестных источников.
3. Приложение работает 100% офлайн и адаптируется под 1/2/3 экрана автоматически.

## Данные и прогресс
Прогресс хранится локально в `localStorage` (ключ `krasnorechie_matext_v1`). Экспорт/импорт — в разделе **Профиль → Экспорт прогресса**.

## Лицензия
MIT — см. `LICENSE`.
