I’ll inspect the current page structure, styles, and interactions first, then reshape the layout while keeping the checklist, tracker, tips, and planner working.

Read , lines 1 to 210
Completed with input: {
"path": "C:\\Users\\Administrator\\OneDrive\\Desktop\\WellNurture\\index.html",
"view_range": [
1,
210
]
}

Read , lines 1 to 230
Completed with input: {
"path": "C:\\Users\\Administrator\\OneDrive\\Desktop\\WellNurture\\css\\style.css",
"view_range": [
1,
230
]
}

Read , lines 1 to 180
Completed with input: {
"path": "C:\\Users\\Administrator\\OneDrive\\Desktop\\WellNurture\\js\\script.js",
"view_range": [
1,
180
]
}

The current implementation has the right features, but the blue palette and tips-first/card-based layout don’t match the requested new identity or section order. I’m replacing the page structure and stylesheet with an editorial sage-and-cream design; the existing planner and checklist JavaScript will remain unchanged.

Edit ,

Edit ,

The new section order and visual system are in place: hero, checklist with a separate progress panel, editorial tips, then the planner. I’m validating all interactions and checking mobile overflow and navigation targets now.

Ran Playwright code
Completed with input: await page.goto('file:///C:/Users/Administrator/OneDrive/Desktop/WellNurture/index.html'); const initial={count:await page.locator('#progress-count').evaluate(e=>e.value),percent:await page.locator('#progress-percent').evaluate(e=>e.value)}; await page.locator('#habit-water').focus(); await page.keyboard.press('Space'); const checked={count:await page.locator('#progress-count').evaluate(e=>e.value),percent:await page.locator('#progress-percent').evaluate(e=>e.value),bar:await page.locator('#progress-track').getAttribute('aria-valuenow')}; await page.locator('#habit-water').focus(); await page.keyboard.press('Space'); const unchecked=await page.locator('#progress-percent').evaluate(e=>e.value); for(const id of ['habit-water','habit-move','habit-rest','habit-sleep','habit-relax','habit-wellbeing']) await page.locator('#'+id).check({force:true}); const full={count:await page.locator('#progress-count').evaluate(e=>e.value),percent:await page.locator('#progress-percent').evaluate(e=>e.value),bar:await page.locator('#progress-track').getAttribute('aria-valuenow')}; await page.locator('#reset-checklist').click(); const reset={count:await page.locator('#progress-count').evaluate(e=>e.value),percent:await page.locator('#progress-percent').evaluate(e=>e.value)}; await page.locator('#planner-form button').click(); const empty=await page.locator('#planner-results').innerText(); const plans={}; for(const goal of ['better-rest','more-movement','hydration','stress-management','healthy-daily-routine']){await page.locator('#wellness-goal').selectOption(goal);await page.locator('.planner-button').click();plans[goal]={heading:await page.locator('#planner-results h3').textContent(),activities:await page.locator('.planner-activity').count()};} const anchors=await page.locator('.main-nav a, .header-cta, .hero .button, .footer-top').evaluateAll(as=>as.map(a=>({href:a.getAttribute('href'),exists:!!document.querySelector(a.getAttribute('href'))}))); const widths={}; for(const width of [320,390,768,1280]){await page.setViewportSize({width,height:900});widths[width]=await page.evaluate(()=>({inner:window.innerWidth,client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));} return {initial,checked,unchecked,full,reset,empty,plans,anchors,widths};

Search for `Result: `

Redesigned WellNurture with a new editorial layout and sage, cream, olive, and charcoal palette. The hero now leads into a task-list checklist with a distinct progress area, followed by two-column editorial wellness tips and the daily planner. Headings use a local serif stack; body text and controls use a sans-serif system stack. No external fonts or other dependencies were added.

The existing checklist, progress calculations, reset action, and all five planner goals remain functional. Browser checks confirmed progress changes from **0%** to **17%** for one of six habits and **100%** for all six; reset returns it to **0%**. Each planner goal displayed its matching suggestions, and submitting with no goal showed the friendly prompt. Navigation targets resolve, and no horizontal overflow was observed at the tested widths.

Modified files: `index.html` and `css/style.css`. `js/script.js` was inspected and remains unchanged.

## `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#f7f5ed" />
    <meta
      name="description"
      content="A welcoming guide to practical everyday wellness, healthy habits, and small steps that work for you."
    />
    <title>WellNurture — A Community Health &amp; Wellness Guide</title>
    <link rel="stylesheet" href="css/style.css" />
    <script src="js/script.js" defer></script>
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="#home" aria-label="WellNurture home">
          <span class="brand-symbol" aria-hidden="true">w.</span>
          <span>WellNurture</span>
        </a>
        <nav class="main-nav" aria-label="Main navigation">
          <a href="#checklist">Daily check-in</a>
          <a href="#tips">Wellness notes</a>
          <a href="#planner">Your plan</a>
        </nav>
        <a class="header-cta" href="#checklist"
          >Start where you are <span aria-hidden="true">↘</span></a
        >
      </div>
    </header>

    <main id="main" tabindex="-1">
      <section class="hero page-shell" id="home" aria-labelledby="hero-title">
        <div class="hero-copy">
          <p class="eyebrow">
            <span class="eyebrow-rule" aria-hidden="true"></span> A kinder guide
            to everyday health
          </p>
          <h1 id="hero-title">
            Wellness is built<br />in the <em>little things.</em>
          </h1>
          <p class="hero-description">
            Small, meaningful ways to care for yourself—made for real schedules,
            real people, and wherever you are today.
          </p>
          <a class="button button-primary" href="#checklist"
            >Start Your Wellness Journey <span aria-hidden="true">→</span></a
          >
          <p class="hero-aside">
            <span aria-hidden="true">✳</span> A community health guide for
            students and neighbors.
          </p>
        </div>
        <aside class="hero-note" aria-label="A gentle reminder">
          <div class="note-orbit" aria-hidden="true">
            <span class="orbit-center">✿</span><span class="orbit-dot"></span>
          </div>
          <p class="note-label">A gentle reminder</p>
          <p class="note-quote">
            “You don't have to do everything. Just one good thing.”
          </p>
          <span class="note-signoff">Your pace is the right pace.</span>
          <span class="note-number" aria-hidden="true">01 / TODAY</span>
        </aside>
      </section>

      <section
        class="daily-section"
        id="checklist"
        aria-labelledby="checklist-title"
      >
        <div class="page-shell">
          <div class="daily-heading">
            <div>
              <p class="eyebrow">
                <span class="eyebrow-rule" aria-hidden="true"></span> A moment
                to check in
              </p>
              <h2 id="checklist-title">
                A few good things<br />for <em>today.</em>
              </h2>
            </div>
            <p class="daily-intro">
              Choose the habits you've done today. Every check-in counts, and
              there's no need to do it all.
            </p>
          </div>

          <div class="daily-layout">
            <form class="checklist" id="habit-checklist">
              <fieldset>
                <legend class="visually-hidden">Daily wellness habits</legend>
                <label class="habit-row" for="habit-water">
                  <input id="habit-water" name="habit" type="checkbox" />
                  <span class="custom-check" aria-hidden="true"></span>
                  <span class="habit-text"
                    ><strong>Drink water regularly</strong
                    ><span class="habit-category">Hydration</span
                    ><small
                      >Remember to drink water throughout the day according to
                      your needs.</small
                    ></span
                  >
                  <span class="habit-mark" aria-hidden="true">01</span>
                </label>
                <label class="habit-row" for="habit-move">
                  <input id="habit-move" name="habit" type="checkbox" />
                  <span class="custom-check" aria-hidden="true"></span>
                  <span class="habit-text"
                    ><strong>Take movement breaks</strong
                    ><span class="habit-category">Physical Activity</span
                    ><small
                      >Take short movement breaks during long periods of
                      sitting.</small
                    ></span
                  >
                  <span class="habit-mark" aria-hidden="true">02</span>
                </label>
                <label class="habit-row" for="habit-rest">
                  <input id="habit-rest" name="habit" type="checkbox" />
                  <span class="custom-check" aria-hidden="true"></span>
                  <span class="habit-text"
                    ><strong>Make time for rest</strong
                    ><span class="habit-category">Rest</span
                    ><small
                      >Pause between tasks and give yourself time to
                      recharge.</small
                    ></span
                  >
                  <span class="habit-mark" aria-hidden="true">03</span>
                </label>
                <label class="habit-row" for="habit-sleep">
                  <input id="habit-sleep" name="habit" type="checkbox" />
                  <span class="custom-check" aria-hidden="true"></span>
                  <span class="habit-text"
                    ><strong>Follow a wind-down routine</strong
                    ><span class="habit-category">Sleep Routine</span
                    ><small
                      >Choose a quiet activity that helps you get ready for
                      bed.</small
                    ></span
                  >
                  <span class="habit-mark" aria-hidden="true">04</span>
                </label>
                <label class="habit-row" for="habit-relax">
                  <input id="habit-relax" name="habit" type="checkbox" />
                  <span class="custom-check" aria-hidden="true"></span>
                  <span class="habit-text"
                    ><strong>Take a calming pause</strong
                    ><span class="habit-category">Relaxation</span
                    ><small
                      >Step away for a few minutes and take a few comfortable
                      breaths.</small
                    ></span
                  >
                  <span class="habit-mark" aria-hidden="true">05</span>
                </label>
                <label class="habit-row" for="habit-wellbeing">
                  <input id="habit-wellbeing" name="habit" type="checkbox" />
                  <span class="custom-check" aria-hidden="true"></span>
                  <span class="habit-text"
                    ><strong>Check in with yourself</strong
                    ><span class="habit-category">Personal Well-being</span
                    ><small
                      >Notice how you're feeling and choose one small supportive
                      action.</small
                    ></span
                  >
                  <span class="habit-mark" aria-hidden="true">06</span>
                </label>
              </fieldset>
              <div class="checklist-footer">
                <p
                  id="progress-announcement"
                  class="visually-hidden"
                  aria-live="polite"
                >
                  0 of 6 habits complete.
                </p>
                <span>Small steps still count.</span>
                <button class="reset-button" id="reset-checklist" type="reset">
                  Clear today's checks
                </button>
              </div>
            </form>

            <aside class="progress-panel" aria-labelledby="progress-title">
              <p class="progress-kicker">YOUR DAILY RHYTHM</p>
              <h3 id="progress-title">Progress, not perfection.</h3>
              <p class="progress-description">
                Every small choice is worth noticing.
              </p>
              <div class="progress-total">
                <output
                  id="progress-count"
                  for="habit-water habit-move habit-rest habit-sleep habit-relax habit-wellbeing"
                  >0</output
                ><span>of 6<br />habits</span>
              </div>
              <div class="progress-label">
                <span>Today's progress</span
                ><strong
                  ><output
                    id="progress-percent"
                    for="habit-water habit-move habit-rest habit-sleep habit-relax habit-wellbeing"
                    >0%</output
                  ></strong
                >
              </div>
              <div
                class="progress-track"
                id="progress-track"
                role="progressbar"
                aria-label="Daily habits completed"
                aria-valuemin="0"
                aria-valuemax="6"
                aria-valuenow="0"
                aria-valuetext="0 of 6 habits complete"
              >
                <span class="progress-fill" id="progress-fill"></span>
              </div>
              <p class="progress-count">
                <span>Keep showing up for yourself.</span
                ><span aria-hidden="true">✳</span>
              </p>
              <span class="progress-decoration" aria-hidden="true">✳</span>
            </aside>
          </div>
        </div>
      </section>

      <section
        class="tips-section page-shell"
        id="tips"
        aria-labelledby="tips-title"
      >
        <div class="tips-heading">
          <p class="eyebrow">
            <span class="eyebrow-rule" aria-hidden="true"></span> Notes for
            feeling well
          </p>
          <h2 id="tips-title">
            A little knowledge,<br /><em>lots of care.</em>
          </h2>
          <p class="tips-lede">
            Everyday ideas, not a perfect formula. Take what works for your life
            and leave the rest.
          </p>
        </div>
        <div class="tips-list">
          <article class="tip-entry">
            <span class="tip-index">01 <i> / HYDRATION</i></span>
            <div class="tip-copy">
              <h3>Keep water within reach.</h3>
              <p>
                Having a drink nearby can be a helpful reminder to hydrate
                throughout the day. Needs vary, so listen to your body and your
                care team's advice.
              </p>
            </div>
            <span class="tip-symbol" aria-hidden="true">≈</span>
          </article>
          <article class="tip-entry">
            <span class="tip-index">02 <i> / MOVEMENT</i></span>
            <div class="tip-copy">
              <h3>Move in a way that feels good.</h3>
              <p>
                A walk, a stretch, or an active trip across campus all count.
                Choose an option that suits your day and abilities.
              </p>
            </div>
            <span class="tip-symbol" aria-hidden="true">↗</span>
          </article>
          <article class="tip-entry">
            <span class="tip-index">03 <i> / REST</i></span>
            <div class="tip-copy">
              <h3>Make space to wind down.</h3>
              <p>
                A calming routine and a reasonably consistent sleep schedule may
                support restful sleep. Everyone's needs and schedules differ.
              </p>
            </div>
            <span class="tip-symbol" aria-hidden="true">☾</span>
          </article>
          <article class="tip-entry">
            <span class="tip-index">04 <i> / EVERYDAY STRESS</i></span>
            <div class="tip-copy">
              <h3>Take one thing at a time.</h3>
              <p>
                A brief pause, a few comfortable breaths, or talking with
                someone you trust can help you navigate a busy moment.
              </p>
            </div>
            <span class="tip-symbol" aria-hidden="true">⌁</span>
          </article>
          <p class="health-note">
            These tips are for general education, not diagnosis or treatment,
            and are not a substitute for professional medical advice.
          </p>
        </div>
      </section>

      <section
        class="planner-section"
        id="planner"
        aria-labelledby="planner-title"
      >
        <div class="page-shell planner-layout">
          <div class="planner-intro">
            <p class="eyebrow">
              <span class="eyebrow-rule" aria-hidden="true"></span> Make it your
              own
            </p>
            <h2 id="planner-title">Your Daily<br /><em>Wellness Plan.</em></h2>
            <p>
              Choose a goal to see a few gentle, practical ideas for your day.
              Pick what feels right for you.
            </p>
            <span class="planner-aside" aria-hidden="true"
              >A good day can begin with one small intention.</span
            >
          </div>
          <div class="planner-workspace">
            <form class="planner-form" id="planner-form">
              <label for="wellness-goal">I’d like to focus on</label>
              <div class="planner-controls">
                <select
                  id="wellness-goal"
                  name="goal"
                  aria-describedby="planner-hint"
                >
                  <option value="">Select a wellness goal</option>
                  <option value="better-rest">Better Rest</option>
                  <option value="more-movement">More Movement</option>
                  <option value="hydration">Hydration</option>
                  <option value="stress-management">Stress Management</option>
                  <option value="healthy-daily-routine">
                    Healthy Daily Routine
                  </option>
                </select>
                <button class="planner-button" type="submit">
                  Show My Plan <span aria-hidden="true">→</span>
                </button>
              </div>
              <p class="planner-hint" id="planner-hint">
                You can change your goal whenever you like.
              </p>
            </form>
            <div
              class="planner-results"
              id="planner-results"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <p class="planner-message">
                Choose a goal above, and we'll find a few small ideas for you.
              </p>
            </div>
            <p class="planner-disclaimer">
              These are general wellness suggestions. Adapt them to your needs;
              they are not a substitute for professional advice.
            </p>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="page-shell footer-inner">
        <a class="brand" href="#home" aria-label="WellNurture home"
          ><span class="brand-symbol" aria-hidden="true">w.</span
          ><span>WellNurture</span></a
        >
        <p>Take care, at your own pace.</p>
        <a class="footer-top" href="#home">Back to top ↑</a>
      </div>
    </footer>
  </body>
</html>
```

## `css/style.css`

```css
:root {
  color-scheme: light;
  --ink: #292e27;
  --muted: #596354;
  --sage: #61775e;
  --sage-dark: #405a42;
  --sage-pale: #e6ebdf;
  --olive: #8b8d63;
  --cream: #f7f5ed;
  --paper: #fffefa;
  --line: #d9ddcf;
  --serif: Georgia, "Times New Roman", serif;
  --sans: "Segoe UI", Arial, sans-serif;
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 40px;
  --space-5: 64px;
  font-family: var(--sans);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}
html {
  scroll-behavior: smooth;
  scroll-padding-top: 84px;
}
body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  line-height: 1.65;
}
a {
  color: inherit;
  text-decoration: none;
}
button,
input,
select {
  font: inherit;
}
.page-shell,
.header-inner {
  width: min(1160px, calc(100% - 64px));
  margin-inline: auto;
}
.skip-link {
  position: fixed;
  z-index: 20;
  top: 10px;
  left: 10px;
  padding: 10px 14px;
  transform: translateY(-160%);
  border-radius: 3px;
  background: var(--ink);
  color: white;
}
.skip-link:focus {
  transform: translateY(0);
}
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.site-header {
  position: sticky;
  z-index: 10;
  top: 0;
  background: rgb(247 245 237 / 96%);
  border-bottom: 1px solid var(--line);
}
.header-inner {
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 26px;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--ink);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
}
.brand-symbol {
  color: var(--sage-dark);
  font: italic 30px/1 var(--serif);
}
.main-nav {
  display: flex;
  align-items: center;
  gap: clamp(18px, 3vw, 38px);
  margin-left: auto;
}
.main-nav a,
.header-cta {
  font-size: 12px;
  font-weight: 600;
}
.main-nav a {
  color: var(--muted);
}
.main-nav a:hover,
.footer-top:hover {
  color: var(--sage-dark);
}
.header-cta {
  padding: 9px 0;
  border-bottom: 1px solid var(--sage);
  color: var(--sage-dark);
}
.header-cta span {
  padding-left: 8px;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 18px;
  color: var(--sage-dark);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.eyebrow-rule {
  width: 24px;
  height: 1px;
  display: inline-block;
  background: var(--olive);
}
h1,
h2,
h3,
h4,
p {
  margin-top: 0;
}
h1,
h2,
h3,
h4 {
  line-height: 1.2;
}
h1,
h2 {
  font-family: var(--serif);
  font-weight: 400;
}
h1 em,
h2 em {
  color: var(--sage-dark);
  font-weight: 400;
}

.hero {
  min-height: 555px;
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  align-items: center;
  gap: 8%;
  padding-block: 76px 84px;
}
.hero-copy {
  padding-left: 4%;
}
.hero h1 {
  margin-bottom: 23px;
  font-size: clamp(46px, 6vw, 70px);
  letter-spacing: -2.7px;
  line-height: 1.07;
}
.hero-description {
  max-width: 440px;
  margin-bottom: 25px;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.85;
}
.button {
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 12px 18px;
  border: 1px solid transparent;
  font-size: 12px;
  font-weight: 700;
  transition:
    background 0.18s,
    transform 0.18s;
}
.button:hover {
  transform: translateY(-1px);
}
.button-primary {
  background: var(--sage-dark);
  color: #fffefa;
}
.button-primary:hover {
  background: #304632;
}
.hero-aside {
  margin: 24px 0 0;
  color: #52604f;
  font-size: 11px;
}
.hero-aside span {
  padding-right: 6px;
  color: var(--olive);
}

.hero-note {
  min-height: 365px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding: 50px clamp(28px, 5vw, 64px);
  background: var(--sage-pale);
}
.hero-note::before {
  position: absolute;
  top: -80px;
  right: -55px;
  width: 255px;
  height: 255px;
  border: 1px solid #c5cebb;
  border-radius: 50%;
  content: "";
}
.hero-note::after {
  position: absolute;
  top: -40px;
  right: -15px;
  width: 175px;
  height: 175px;
  border: 1px solid #c5cebb;
  border-radius: 50%;
  content: "";
}
.note-orbit {
  position: relative;
  width: 55px;
  height: 55px;
  display: grid;
  place-items: center;
  margin-bottom: 26px;
  border: 1px solid #89977f;
  border-radius: 50%;
  color: var(--sage-dark);
}
.orbit-center {
  font-size: 22px;
}
.orbit-dot {
  position: absolute;
  top: 0;
  right: 1px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--olive);
}
.note-label {
  margin-bottom: 10px;
  color: var(--sage-dark);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.note-quote {
  max-width: 335px;
  margin-bottom: 17px;
  font: 27px/1.43 var(--serif);
}
.note-signoff {
  color: var(--muted);
  font-size: 11px;
}
.note-number {
  position: absolute;
  right: 25px;
  bottom: 20px;
  color: #57644f;
  font-size: 9px;
  letter-spacing: 0.12em;
}

.daily-section {
  padding-block: 82px 88px;
  background: var(--cream);
  border-block: 1px solid var(--line);
}
.daily-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 34px;
}
.daily-heading h2,
.tips-heading h2,
.planner-intro h2 {
  margin: 0;
  font-size: clamp(37px, 4.7vw, 52px);
  letter-spacing: -1.5px;
  line-height: 1.12;
}
.daily-intro {
  max-width: 350px;
  margin: 0 0 5px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.8;
}
.daily-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(250px, 0.75fr);
  align-items: start;
  gap: 44px;
}
.checklist {
  padding: 0;
  border: 0;
}
.checklist fieldset {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}
.habit-row {
  min-height: 83px;
  position: relative;
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr) 32px;
  align-items: center;
  gap: 17px;
  border-bottom: 1px solid #d9ddcf;
  cursor: pointer;
}
.habit-row:first-child {
  border-top: 1px solid #d9ddcf;
}
.habit-row input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}
.custom-check {
  width: 19px;
  height: 19px;
  display: grid;
  place-items: center;
  border: 1px solid #73816d;
  background: var(--paper);
  transition: background 0.16s;
}
.custom-check::after {
  width: 9px;
  height: 5px;
  transform: rotate(-45deg) translate(1px, -1px);
  border-bottom: 2px solid white;
  border-left: 2px solid white;
  content: "";
  opacity: 0;
}
.habit-row input:checked + .custom-check {
  border-color: var(--sage-dark);
  background: var(--sage-dark);
}
.habit-row input:checked + .custom-check::after {
  opacity: 1;
}
.habit-row input:focus-visible + .custom-check {
  outline: 3px solid var(--olive);
  outline-offset: 3px;
}
.habit-row:has(input:checked) .habit-text strong {
  color: #596354;
  text-decoration: line-through;
  text-decoration-color: #78816e;
}
.habit-text strong,
.habit-text small,
.habit-category {
  display: block;
}
.habit-text strong {
  font-size: 13px;
  font-weight: 650;
}
.habit-category {
  margin-top: 2px;
  color: var(--sage-dark);
  font-size: 10px;
  font-weight: 700;
}
.habit-text small {
  margin-top: 3px;
  color: #50594c;
  font-size: 11px;
  line-height: 1.45;
}
.habit-mark {
  color: #66725d;
  font: italic 14px var(--serif);
  text-align: right;
}
.checklist-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 15px;
  color: #50594c;
  font-size: 10px;
}
.reset-button {
  padding: 7px 0 7px 8px;
  border: 0;
  background: transparent;
  color: var(--sage-dark);
  font-size: 10px;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.progress-panel {
  position: relative;
  min-height: 340px;
  overflow: hidden;
  padding: 28px 27px;
  background: var(--sage-dark);
  color: #fffefa;
}
.progress-kicker {
  margin-bottom: 17px;
  color: #e0e7d8;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.16em;
}
.progress-panel h3 {
  max-width: 220px;
  margin-bottom: 7px;
  font: 27px/1.2 var(--serif);
}
.progress-description {
  margin-bottom: 21px;
  color: #e0e7d8;
  font-size: 11px;
}
.progress-total {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 20px;
}
.progress-total output {
  font: 60px/0.9 var(--serif);
}
.progress-total > span {
  color: #e0e7d8;
  font-size: 11px;
  line-height: 1.35;
}
.progress-label {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 9px;
  color: #f4f3e8;
  font-size: 10px;
}
.progress-label strong {
  color: white;
  font-size: 14px;
}
.progress-track {
  height: 7px;
  overflow: hidden;
  background: #758a71;
}
.progress-fill {
  width: 0;
  height: 100%;
  display: block;
  background: #e5dcae;
  transition: width 0.22s ease;
}
.progress-count {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 0;
  color: #e0e7d8;
  font-size: 9px;
}
.progress-count output {
  color: #f4f3e8;
}
.progress-decoration {
  position: absolute;
  right: 19px;
  top: 19px;
  color: #aab99e;
  font-size: 19px;
}

.tips-section {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: clamp(40px, 8vw, 110px);
  padding-block: 98px 100px;
}
.tips-heading {
  position: sticky;
  top: 115px;
  align-self: start;
}
.tips-heading h2 {
  margin-bottom: 17px;
  font-size: clamp(38px, 4.6vw, 52px);
}
.tips-lede {
  max-width: 300px;
  margin: 17px 0 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.8;
}
.tips-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-content: start;
  column-gap: 26px;
}
.tip-entry {
  min-height: 230px;
  position: relative;
  padding: 22px 10px 24px 0;
  border-top: 1px solid var(--line);
}
.tip-entry:nth-child(odd) {
  padding-right: 22px;
}
.tip-entry:nth-child(even) {
  padding-left: 22px;
  border-left: 1px solid var(--line);
}
.tip-index {
  display: block;
  margin-bottom: 24px;
  color: var(--sage-dark);
  font: italic 17px var(--serif);
}
.tip-index i {
  padding-left: 5px;
  color: #596354;
  font: 700 8px var(--sans);
  letter-spacing: 0.12em;
}
.tip-copy h3 {
  max-width: 260px;
  margin-bottom: 9px;
  font: 24px/1.2 var(--serif);
}
.tip-copy p {
  max-width: 330px;
  margin-bottom: 0;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.75;
}
.tip-symbol {
  position: absolute;
  top: 16px;
  right: 11px;
  color: #737e69;
  font: 20px var(--serif);
}
.tip-entry:nth-child(even) .tip-symbol {
  right: 8px;
}
.health-note {
  grid-column: 1 / -1;
  margin: 8px 0 0;
  color: #50594c;
  font-size: 10px;
  line-height: 1.6;
}

.planner-section {
  padding-block: 79px 84px;
  background: #e8ecdf;
  border-block: 1px solid #d5dbcb;
}
.planner-layout {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  align-items: start;
  gap: clamp(40px, 8vw, 100px);
}
.planner-intro h2 {
  margin-bottom: 17px;
  font-size: clamp(38px, 4.6vw, 51px);
}
.planner-intro > p:not(.eyebrow) {
  max-width: 325px;
  margin-bottom: 22px;
  color: #465346;
  font-size: 13px;
  line-height: 1.8;
}
.planner-aside {
  display: block;
  max-width: 260px;
  padding-top: 12px;
  border-top: 1px solid #aeb9a5;
  color: #405a42;
  font: italic 14px/1.5 var(--serif);
}
.planner-workspace {
  padding: 25px 0 0;
}
.planner-form > label {
  display: block;
  margin-bottom: 9px;
  color: var(--ink);
  font-size: 12px;
  font-weight: 700;
}
.planner-controls {
  display: flex;
  align-items: stretch;
  gap: 10px;
}
.planner-controls select {
  min-width: 0;
  min-height: 47px;
  flex: 1;
  padding: 10px 13px;
  border: 1px solid #86947e;
  border-radius: 0;
  background: var(--paper);
  color: var(--ink);
  font-size: 12px;
}
.planner-button {
  min-height: 47px;
  padding: 10px 17px;
  border: 1px solid var(--sage-dark);
  background: var(--sage-dark);
  color: white;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}
.planner-button span {
  padding-left: 9px;
}
.planner-button:hover {
  background: #304632;
}
.planner-hint {
  margin: 7px 0 0;
  color: #465346;
  font-size: 10px;
}
.planner-results {
  min-height: 66px;
  margin-top: 21px;
  padding: 16px 0;
  border-top: 1px solid #aeb9a5;
  border-bottom: 1px solid #aeb9a5;
}
.planner-message {
  margin: 0;
  color: #465346;
  font-size: 12px;
}
.planner-results h3 {
  margin: 0 0 13px;
  color: var(--sage-dark);
  font: 22px var(--serif);
}
.planner-activity-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}
.planner-activity {
  padding-right: 10px;
}
.planner-activity h4 {
  margin: 0 0 7px;
  color: var(--ink);
  font-size: 12px;
}
.planner-activity p {
  margin: 0;
  color: #465346;
  font-size: 11px;
  line-height: 1.7;
}
.planner-disclaimer {
  margin: 12px 0 0;
  color: #465346;
  font-size: 10px;
  line-height: 1.55;
}

.site-footer {
  background: var(--cream);
}
.footer-inner {
  min-height: 77px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-top: 1px solid var(--line);
}
.footer-inner .brand {
  font-size: 14px;
}
.footer-inner .brand-symbol {
  font-size: 25px;
}
.footer-inner > p,
.footer-top {
  margin: 0;
  color: var(--muted);
  font-size: 10px;
}
.footer-top {
  font-weight: 700;
}
a:focus-visible,
button:focus-visible,
select:focus-visible {
  outline: 3px solid #596f45;
  outline-offset: 3px;
}

@media (max-width: 850px) {
  .page-shell,
  .header-inner {
    width: min(100% - 44px, 720px);
  }
  .hero {
    min-height: 480px;
    gap: 5%;
    padding-block: 62px;
  }
  .hero-copy {
    padding-left: 0;
  }
  .hero-note {
    min-height: 320px;
    padding-inline: 32px;
  }
  .daily-layout {
    grid-template-columns: minmax(0, 1.3fr) minmax(220px, 0.7fr);
    gap: 25px;
  }
  .progress-panel {
    padding: 25px 21px;
  }
  .tips-section,
  .planner-layout {
    gap: 40px;
  }
}
@media (max-width: 620px) {
  html {
    scroll-padding-top: 75px;
  }
  .page-shell,
  .header-inner {
    width: calc(100% - 36px);
  }
  .header-inner {
    min-height: 68px;
    flex-wrap: wrap;
    gap: 8px 18px;
    padding-block: 11px;
  }
  .brand {
    font-size: 14px;
  }
  .main-nav {
    gap: 13px;
    margin-left: auto;
  }
  .main-nav a {
    font-size: 10px;
  }
  .header-cta {
    display: none;
  }
  .hero {
    grid-template-columns: 1fr;
    gap: 30px;
    padding-block: 49px 55px;
  }
  .hero h1 {
    font-size: clamp(43px, 11vw, 58px);
    letter-spacing: -1.8px;
  }
  .hero-description {
    max-width: 450px;
    font-size: 13px;
  }
  .hero-note {
    min-height: 275px;
    padding: 35px 29px;
  }
  .note-quote {
    font-size: 25px;
  }
  .daily-section {
    padding-block: 58px 63px;
  }
  .daily-heading {
    display: block;
    margin-bottom: 25px;
  }
  .daily-heading h2,
  .tips-heading h2,
  .planner-intro h2 {
    font-size: 39px;
  }
  .daily-intro {
    margin-top: 13px;
    font-size: 12px;
  }
  .daily-layout {
    grid-template-columns: 1fr;
    gap: 27px;
  }
  .habit-row {
    min-height: 79px;
    grid-template-columns: 19px minmax(0, 1fr) 23px;
    gap: 12px;
  }
  .habit-text strong {
    font-size: 12px;
  }
  .habit-text small {
    font-size: 10px;
  }
  .habit-mark {
    font-size: 12px;
  }
  .checklist-footer {
    font-size: 9px;
  }
  .reset-button {
    font-size: 9px;
  }
  .progress-panel {
    min-height: 300px;
    padding: 25px;
  }
  .progress-total output {
    font-size: 54px;
  }
  .tips-section {
    grid-template-columns: 1fr;
    gap: 27px;
    padding-block: 66px 69px;
  }
  .tips-heading {
    position: static;
  }
  .tips-heading h2 {
    margin-bottom: 10px;
  }
  .tips-lede {
    margin-top: 10px;
    font-size: 12px;
  }
  .tips-list {
    column-gap: 16px;
  }
  .tip-entry {
    min-height: 220px;
    padding-top: 17px;
  }
  .tip-entry:nth-child(odd) {
    padding-right: 10px;
  }
  .tip-entry:nth-child(even) {
    padding-left: 13px;
  }
  .tip-index {
    margin-bottom: 18px;
    font-size: 15px;
  }
  .tip-copy h3 {
    font-size: 21px;
  }
  .tip-copy p {
    font-size: 10px;
  }
  .planner-section {
    padding-block: 60px;
  }
  .planner-layout {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .planner-intro h2 {
    margin-bottom: 12px;
  }
  .planner-intro > p:not(.eyebrow) {
    max-width: 450px;
    font-size: 12px;
  }
  .planner-aside {
    display: none;
  }
  .planner-workspace {
    padding-top: 0;
  }
  .planner-controls {
    flex-direction: column;
  }
  .planner-controls select,
  .planner-button {
    width: 100%;
  }
  .planner-activity-list {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .footer-inner {
    min-height: 68px;
    gap: 8px;
  }
  .footer-inner .brand {
    font-size: 12px;
  }
  .footer-inner > p,
  .footer-top {
    font-size: 9px;
  }
}
@media (max-width: 370px) {
  .page-shell,
  .header-inner {
    width: calc(100% - 28px);
  }
  .header-inner {
    justify-content: space-between;
  }
  .brand {
    gap: 6px;
    font-size: 12px;
  }
  .main-nav {
    gap: 9px;
  }
  .main-nav a {
    font-size: 9px;
  }
  .tips-list {
    grid-template-columns: 1fr;
  }
  .tip-entry,
  .tip-entry:nth-child(odd),
  .tip-entry:nth-child(even) {
    min-height: auto;
    padding: 17px 20px 20px 0;
    border-left: 0;
  }
  .tip-copy h3 {
    max-width: 280px;
  }
  .health-note {
    margin-top: 15px;
  }
  .footer-inner > p {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

## `js/script.js` (unchanged)

```js
const checklist = document.querySelector("#habit-checklist");
const habitCheckboxes = checklist
  ? Array.from(checklist.querySelectorAll('input[name="habit"]'))
  : [];
const progressCount = document.querySelector("#progress-count");
const progressPercent = document.querySelector("#progress-percent");
const progressFill = document.querySelector("#progress-fill");
const progressTrack = document.querySelector("#progress-track");
const progressAnnouncement = document.querySelector("#progress-announcement");

function updateProgress() {
  const completed = habitCheckboxes.filter(
    (checkbox) => checkbox.checked,
  ).length;
  const total = habitCheckboxes.length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  const progressText = `${completed} of ${total} habits complete`;

  if (progressCount) progressCount.value = String(completed);
  if (progressPercent) progressPercent.value = `${percentage}%`;
  if (progressFill) progressFill.style.width = `${percentage}%`;
  if (progressTrack) {
    progressTrack.setAttribute("aria-valuemax", String(total));
    progressTrack.setAttribute("aria-valuenow", String(completed));
    progressTrack.setAttribute("aria-valuetext", progressText);
  }
  if (progressAnnouncement)
    progressAnnouncement.textContent = `${progressText}.`;
}

if (checklist) {
  checklist.addEventListener("change", (event) => {
    if (
      event.target instanceof HTMLInputElement &&
      event.target.name === "habit"
    ) {
      updateProgress();
    }
  });

  checklist.addEventListener("reset", () => {
    window.requestAnimationFrame(updateProgress);
  });
}

updateProgress();

const plannerForm = document.querySelector("#planner-form");
const wellnessGoal = document.querySelector("#wellness-goal");
const plannerResults = document.querySelector("#planner-results");

const wellnessPlans = {
  "better-rest": {
    title: "Better Rest",
    activities: [
      {
        activity: "Establish a relaxing bedtime routine.",
        description:
          "Set aside time for a calm activity before going to sleep.",
      },
      {
        activity: "Make your wind-down time screen-light.",
        description:
          "Try putting devices aside for a while and choosing a quiet activity instead.",
      },
    ],
  },
  "more-movement": {
    title: "More Movement",
    activities: [
      {
        activity: "Take a movement break.",
        description:
          "Choose a convenient time to stand, stretch, or walk for a few minutes.",
      },
      {
        activity: "Add movement to something you already do.",
        description:
          "If it suits your day, take a short walk while heading to class or meeting a friend.",
      },
    ],
  },
  hydration: {
    title: "Hydration",
    activities: [
      {
        activity: "Keep a drink within reach.",
        description:
          "Having water nearby can remind you to drink throughout the day according to your needs.",
      },
      {
        activity: "Pair a drink with a daily routine.",
        description:
          "Take a moment for water when you sit down to study or pause between activities.",
      },
    ],
  },
  "stress-management": {
    title: "Stress Management",
    activities: [
      {
        activity: "Pause for a few comfortable breaths.",
        description:
          "Take a brief pause between tasks and focus on breathing at a pace that feels comfortable.",
      },
      {
        activity: "Break a big task into a first step.",
        description:
          "Write down one small next action, then give yourself time to work on just that.",
      },
    ],
  },
  "healthy-daily-routine": {
    title: "Healthy Daily Routine",
    activities: [
      {
        activity: "Choose one steady start to your day.",
        description:
          "Pick a simple first step that works for you, such as getting ready or having breakfast.",
      },
      {
        activity: "Make space for a pause in your schedule.",
        description:
          "Choose a natural break between activities to rest, hydrate, or check in with yourself.",
      },
    ],
  },
};

if (plannerForm && wellnessGoal && plannerResults) {
  plannerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedPlan = wellnessPlans[wellnessGoal.value];

    if (!selectedPlan) {
      const message = document.createElement("p");
      message.className = "planner-message";
      message.textContent =
        "Choose a wellness goal first, and we'll find a few ideas for you.";
      plannerResults.replaceChildren(message);
      wellnessGoal.focus();
      return;
    }

    const heading = document.createElement("h3");
    heading.textContent = `A few ideas for ${selectedPlan.title}`;

    const activityList = document.createElement("div");
    activityList.className = "planner-activity-list";

    selectedPlan.activities.forEach(({ activity, description }) => {
      const card = document.createElement("article");
      card.className = "planner-activity";

      const activityHeading = document.createElement("h4");
      activityHeading.textContent = activity;

      const activityDescription = document.createElement("p");
      activityDescription.textContent = description;

      card.append(activityHeading, activityDescription);
      activityList.append(card);
    });

    plannerResults.replaceChildren(heading, activityList);
  });
}
```

### Manual testing checklist

- [ ] Use the navigation and hero button to reach checklist, tips, and planner sections.
- [ ] Check and uncheck habits with mouse and keyboard; confirm count, percentage, and progress bar update.
- [ ] Clear the checklist and confirm progress resets.
- [ ] Submit the planner without selecting a goal; confirm friendly feedback.
- [ ] Select each of the five goals and confirm the matching activities appear.
- [ ] Tab through the page and confirm focus indicators are visible.
- [ ] Check the stacked mobile layout and confirm no horizontal scrolling at narrow widths.
