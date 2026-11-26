// ---------- Каталог ----------
// Цены — из праздничной подборки ко Дню матери. Если цена не указана — «по запросу».
const CATALOG = [
  {
    id: "strawberry",
    title: "Клубника в шоколаде",
    intro: "Наборы в коробках: классика, сердце, буква «М». Молочный, белый и тёмный шоколад, посыпки, надписи.",
    photos: [
      ["box-ai", "Набор клубники в шоколаде в белой коробке"],
      ["p04", "Клубника в белом шоколаде"],
      ["p10", "Клубника с голубикой и малиной в розовой коробке"],
    ],
    items: [
      ["Нежность", "6 ягод", 1200],
      ["Комплимент", "9 ягод", 1800],
      ["Любимой маме", "12 ягод", 2000],
      ["Мамино тепло", "12 ягод", 2400],
      ["С заботой", "коробка-сердце", 2600],
      ["Обнимаю тебя", "квадратная коробка", 3200],
      ["Мамино счастье", "коробка-буква «М»", 3200],
      ["Мамина любовь", "18–22 ягоды, сердце", 4500],
      ["С любовью", "15 ягод, голубика, малина, бананы в шоколаде", 5500],
    ],
  },
  {
    id: "bouquets",
    title: "Букеты",
    intro: "Букеты из клубники в шоколаде — сами по себе или вместе с живыми розами. И фруктовая корзина для тех, кто любит свежее.",
    photos: [
      ["bouquet-ai", "Букет из клубники в шоколаде и красных роз"],
      ["p01", "Букет из клубники и ягод в чёрной упаковке"],
      ["p08", "Букет с клубникой и розами"],
    ],
    items: [
      ["Самой самой", "11 ягод", 2500],
      ["Сладкая история", "17 ягод", 3300],
      ["Мамина радость", "23 ягоды", 4400],
      ["Ты моё сердце", "17 ягод и 11 роз", 7000],
      ["Корзинка-витаминка", "микс фруктов, состав меняем", 5500],
    ],
  },
  {
    id: "nuts",
    title: "Сухофрукты и орехи",
    intro: "Для тех, кто не ест сладкое, или когда подарок должен постоять подольше. Состав можно менять.",
    photos: [
      ["p05", "Ореховый бокс с шоколадным декором"],
    ],
    items: [
      ["Комплимент", "букет из сухофруктов, ⌀ 18 см", 1900],
      ["Тепло сердца", "букет, сухофрукты и орехи", 2500],
      ["Букет объятия", "сухофрукты и орехи, 28 см + упаковка", 3400],
      ["Корзинка заботы", "сухофрукты и орехи", 2500],
      ["Ореховое настроение", "маленькое сердце / сердце / прямоугольник", "1 900 / 2 500 / 3 200"],
    ],
  },
  {
    id: "men",
    title: "Мужчинам",
    intro: "Когда клубника — не про него. Колбасные букеты и шоколад с характером.",
    photos: [
      ["p07", "Мясной букет из колбасы, сыра и томатов черри"],
      ["p06", "Шоколадные плитки с лентами"],
    ],
    items: [
      ["Колбасный букет", "колбасы, сыр, овощи, зелень", null],
      ["Шоколадные плитки", "ручной работы, с лентой", null],
      ["Мужской бокс", "состав под вкус получателя", null],
    ],
  },
  {
    id: "teachers",
    title: "Воспитателю и учителю",
    intro: "Боксы с надписью «Любимому воспитателю» — к выпускному, дню рождения, Дню воспитателя и 1 сентября.",
    photos: [
      ["p09", "Бокс сладостей воспитателю"],
      ["p05", "Ореховый бокс воспитателю"],
    ],
    items: [
      ["Бокс сладостей", "ячейки с конфетами и шоколадной надписью", null],
      ["Ореховый бокс", "орехи, сухофрукты, шоколадный декор", null],
      ["Букет к 1 сентября", "крепкий, удобно держать ребёнку", null],
    ],
  },
];

const rub = (v) =>
  v == null ? "по запросу" : typeof v === "number" ? v.toLocaleString("ru-RU") + " ₽" : v + " ₽";

const tabsEl = document.getElementById("tabs");
const panelsEl = document.getElementById("panels");

function renderPanel(cat) {
  const gallery = cat.photos
    .map(([src, alt]) => `<figure><img src="assets/img/${src}.webp" alt="${alt}" loading="lazy"></figure>`)
    .join("");
  const rows = cat.items
    .map(([name, desc, price]) => {
      const label = `${cat.title}: «${name}»`;
      return `<div class="row">
        <div><h4>${name}</h4><small>${desc}</small></div>
        <span class="row__price">${rub(price)}</span>
        <button class="row__btn js-order" data-item="${label.replace(/"/g, "&quot;")}" aria-label="Заказать ${name}">+</button>
      </div>`;
    })
    .join("");
  return `<div class="panel" role="tabpanel" id="panel-${cat.id}" aria-labelledby="tab-${cat.id}">
    <div class="panel__gallery">${gallery}</div>
    <div class="panel__list"><p class="panel__intro">${cat.intro}</p>${rows}</div>
  </div>`;
}

function selectTab(id, focus) {
  const cat = CATALOG.find((c) => c.id === id);
  tabsEl.querySelectorAll(".tab").forEach((t) => {
    const on = t.dataset.id === id;
    t.setAttribute("aria-selected", on);
    t.tabIndex = on ? 0 : -1;
    if (on && focus) t.focus();
  });
  panelsEl.innerHTML = renderPanel(cat);
}

tabsEl.innerHTML = CATALOG.map(
  (c) => `<button class="tab" role="tab" id="tab-${c.id}" data-id="${c.id}" aria-controls="panel-${c.id}">${c.title}</button>`
).join("");
tabsEl.addEventListener("click", (e) => {
  const t = e.target.closest(".tab");
  if (t) selectTab(t.dataset.id);
});
tabsEl.addEventListener("keydown", (e) => {
  if (!["ArrowRight", "ArrowLeft"].includes(e.key)) return;
  const ids = CATALOG.map((c) => c.id);
  const cur = ids.indexOf(document.activeElement.dataset.id);
  const next = ids[(cur + (e.key === "ArrowRight" ? 1 : -1) + ids.length) % ids.length];
  selectTab(next, true);
});
selectTab(CATALOG[0].id);

// ---------- Окно заказа ----------
const PHONE = "79178071985";
const modal = document.getElementById("modal");
const mTitle = document.getElementById("modal-title");
const mWa = document.getElementById("m-wa");
const mIg = document.getElementById("m-ig");
const mCopied = document.getElementById("m-copied");
let lastFocus = null;
let orderText = "";

function openOrder(item) {
  orderText = `Здравствуйте, Яна! Хочу заказать: ${item}. Дата и время: … Пожелания: …`;
  mTitle.textContent = item;
  mWa.href = `https://wa.me/${PHONE}?text=${encodeURIComponent(orderText)}`;
  mCopied.hidden = true;
  lastFocus = document.activeElement;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  mWa.focus();
}
function closeOrder() {
  modal.hidden = true;
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}
document.addEventListener("click", (e) => {
  const b = e.target.closest(".js-order");
  if (b) openOrder(b.dataset.item);
  if (e.target.closest("[data-close]")) closeOrder();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeOrder();
});
// В Instagram нельзя передать текст ссылкой — копируем его в буфер
mIg.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(orderText);
    mCopied.hidden = false;
  } catch (_) {}
});

// ---------- Шапка и меню ----------
const topbar = document.querySelector(".topbar");
const onScroll = () => topbar.classList.toggle("is-scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
burger.addEventListener("click", () => {
  const open = burger.getAttribute("aria-expanded") !== "true";
  burger.setAttribute("aria-expanded", open);
  nav.classList.toggle("is-open", open);
  topbar.classList.add("is-scrolled");
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    burger.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }
});

// ---------- Плавное появление ----------
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      }),
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
}
