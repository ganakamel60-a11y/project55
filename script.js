
const API_KEY = "47fa04c251de0585e772a80cfbdf5f82";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const RECENT_KEY = "weatherDashboard.recentCities";
const MAX_RECENT = 3;

// ---------- DOM references ----------
const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const geoBtn = document.getElementById("geoBtn");
const recentCitiesEl = document.getElementById("recentCities");

const statusBanner = document.getElementById("statusBanner");
const loadingState = document.getElementById("loadingState");
const emptyState = document.getElementById("emptyState");

const heroCard = document.getElementById("heroCard");
const heroDate = document.getElementById("heroDate");
const heroCity = document.getElementById("heroCity");
const heroDesc = document.getElementById("heroDesc");
const heroIcon = document.getElementById("heroIcon");
const heroTemp = document.getElementById("heroTemp");
const heroFeels = document.getElementById("heroFeels");

const statHumidity = document.getElementById("statHumidity");
const statWind = document.getElementById("statWind");
const statPressure = document.getElementById("statPressure");
const statVisibility = document.getElementById("statVisibility");

const forecastSection = document.getElementById("forecastSection");
const forecastStrip = document.getElementById("forecastStrip");

// ---------- Weather icon mapping (OpenWeatherMap icon codes -> emoji) ----------
const ICON_MAP = {
  "01d": "☀", "01n": "🌕",
  "02d": "⛅", "02n": "☁",
  "03d": "☁", "03n": "☁",
  "04d": "☁", "04n": "☁",
  "09d": "🌧", "09n": "🌧",
  "10d": "🌦", "10n": "🌧",
  "11d": "⛈", "11n": "⛈",
  "13d": "❄", "13n": "❄",
  "50d": "🌫", "50n": "🌫",
};

function iconFor(code) {
  return ICON_MAP[code] || "☁";
}

// ---------- UI state helpers ----------
function showLoading() {
  statusBanner.hidden = true;
  emptyState.hidden = true;
  heroCard.hidden = true;
  forecastSection.hidden = true;
  loadingState.hidden = false;
}

function showError(message) {
  loadingState.hidden = true;
  heroCard.hidden = true;
  forecastSection.hidden = true;
  emptyState.hidden = true;
  statusBanner.textContent = message;
  statusBanner.hidden = false;
}

function showResults() {
  loadingState.hidden = true;
  statusBanner.hidden = true;
  emptyState.hidden = true;
  heroCard.hidden = false;
  forecastSection.hidden = false;
}

// ---------- Recent cities (localStorage) ----------
function getRecentCities() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveRecentCity(name) {
  let list = getRecentCities().filter(
    (c) => c.toLowerCase() !== name.toLowerCase()
  );
  list.unshift(name);
  list = list.slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  renderRecentCities();
}

function renderRecentCities() {
  const list = getRecentCities();
  recentCitiesEl.innerHTML = "";
  list.forEach((city) => {
    const btn = document.createElement("button");
    btn.className = "recent-chip";
    btn.type = "button";
    btn.textContent = city;
    btn.addEventListener("click", () => fetchWeatherByCity(city));
    recentCitiesEl.appendChild(btn);
  });
}

// ---------- Formatting helpers ----------
function formatDateArabic(date) {
  return date.toLocaleDateString("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function formatDayLabel(date) {
  return date.toLocaleDateString("ar-EG", { weekday: "short" });
}

// ---------- Fetch + render current weather ----------
async function fetchWeatherByCity(city) {
  if (!city || !city.trim()) return;
  await runFetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&lang=ar&appid=${API_KEY}`,
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&lang=ar&appid=${API_KEY}`
  );
}

async function fetchWeatherByCoords(lat, lon) {
  await runFetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&lang=ar&appid=${API_KEY}`,
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ar&appid=${API_KEY}`
  );
}

async function runFetch(currentUrl, forecastUrl) {
  showLoading();

  if (!API_KEY || API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
    showError(
      "لازم تضيف مفتاح API الخاص بيك من OpenWeatherMap في ملف script.js (المتغيّر API_KEY) عشان الموقع يشتغل."
    );
    return;
  }

  try {
    const currentRes = await fetch(currentUrl);

    if (currentRes.status === 404) {
      showError("مفيش مدينة بالاسم ده. جرّب تتأكد من الإملاء وتحاول تاني.");
      return;
    }
    if (currentRes.status === 401) {
      showError("مفتاح API مش صحيح أو لسه مفعلش. راجع المتغيّر API_KEY.");
      return;
    }
    if (!currentRes.ok) {
      showError("حصل خطأ في جلب بيانات الطقس. حاول تاني كمان شوية.");
      return;
    }

    const current = await currentRes.json();
    const forecastRes = await fetch(forecastUrl);
    const forecast = forecastRes.ok ? await forecastRes.json() : null;

    renderCurrent(current);
    if (forecast) renderForecast(forecast);

    saveRecentCity(current.name);
  } catch (err) {
    showError(
      "مقدرناش نتصل بالإنترنت أو بخدمة الطقس. تأكد من اتصالك وحاول تاني."
    );
  }
}

function renderCurrent(data) {
  heroDate.textContent = formatDateArabic(new Date());
  heroCity.textContent = `${data.name}${data.sys?.country ? "، " + data.sys.country : ""}`;
  heroDesc.textContent = data.weather?.[0]?.description || "—";
  heroIcon.textContent = iconFor(data.weather?.[0]?.icon);
  heroTemp.textContent = `${Math.round(data.main.temp)}°`;
  heroFeels.textContent = `الإحساس الحراري: ${Math.round(data.main.feels_like)}°`;

  statHumidity.textContent = `${data.main.humidity}%`;
  statWind.textContent = `${Math.round(data.wind.speed * 3.6)} كم/س`;
  statPressure.textContent = `${data.main.pressure} hPa`;
  statVisibility.textContent = `${(data.visibility / 1000).toFixed(1)} كم`;

  showResults();
}

// The forecast endpoint returns data in 3-hour steps.
// We group by calendar day and pick midday-ish readings for a clean 5-day summary.
function renderForecast(data) {
  const days = {};

  data.list.forEach((entry) => {
    const date = new Date(entry.dt * 1000);
    const key = date.toISOString().slice(0, 10);
    if (!days[key]) days[key] = [];
    days[key].push({ date, entry });
  });

  const todayKey = new Date().toISOString().slice(0, 10);
  const dayKeys = Object.keys(days)
    .filter((k) => k !== todayKey)
    .slice(0, 5);

  forecastStrip.innerHTML = "";

  dayKeys.forEach((key) => {
    const entries = days[key];
    // Prefer the reading closest to midday for the representative icon/description
    const midday = entries.reduce((closest, cur) => {
      const curHour = cur.date.getHours();
      const closestHour = closest.date.getHours();
      return Math.abs(curHour - 12) < Math.abs(closestHour - 12) ? cur : closest;
    }, entries[0]);

    const temps = entries.map((e) => e.entry.main.temp);
    const high = Math.round(Math.max(...temps));
    const low = Math.round(Math.min(...temps));

    const card = document.createElement("div");
    card.className = "forecast-card";
    card.innerHTML = `
      <p class="forecast-day">${formatDayLabel(midday.date)}</p>
      <span class="forecast-icon">${iconFor(midday.entry.weather[0].icon)}</span>
      <p class="forecast-temps">${high}° <span class="low">${low}°</span></p>
      <p class="forecast-desc">${midday.entry.weather[0].description}</p>
    `;
    forecastStrip.appendChild(card);
  });
}

// ---------- Geolocation ----------
function useCurrentLocation() {
  if (!navigator.geolocation) {
    showError("متصفحك مش بيدعم تحديد الموقع الجغرافي.");
    return;
  }

  showLoading();

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
    },
    () => {
      showError(
        "متقدرناش نوصل لموقعك. تأكد إنك سمحت للمتصفح بالوصول للموقع الجغرافي."
      );
    },
    { timeout: 10000 }
  );
}

// ---------- Event listeners ----------
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchWeatherByCity(cityInput.value.trim());
});

geoBtn.addEventListener("click", useCurrentLocation);

// ---------- Init ----------
renderRecentCities();
