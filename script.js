// ---------- Skyline generation ----------

function buildSkyline() {
  const svg = document.getElementById('skylineSvg');
  const width = 1600;
  const height = 260;
  let x = -20;
  let svgMarkup = '';

  while (x < width + 20) {
    const bWidth = 55 + Math.random() * 70;
    const bHeight = 60 + Math.random() * 180;
    const bY = height - bHeight;

    svgMarkup += `<rect class="bld bld-line" x="${x}" y="${bY}" width="${bWidth}" height="${bHeight + 20}"></rect>`;

    const cols = Math.max(2, Math.floor(bWidth / 14));
    const rows = Math.max(2, Math.floor(bHeight / 16));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() > 0.42) continue;
        const wx = x + 8 + c * (bWidth - 16) / cols;
        const wy = bY + 10 + r * (bHeight - 16) / rows;
        const delay = (Math.random() * 6).toFixed(2);
        svgMarkup += `<rect class="window" x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="4" height="6" style="animation-delay:${delay}s"></rect>`;
      }
    }
    x += bWidth - (8 + Math.random() * 10);
  }

  svg.innerHTML = svgMarkup;
}

buildSkyline();

// ---------- Neighbourhood suggestions (NYC boroughs) ----------

const NEIGHBOURHOODS_BY_BOROUGH = {
  Manhattan: ['Harlem', 'East Village', 'Upper West Side', 'Chelsea', 'Financial District', 'Hell\u2019s Kitchen'],
  Brooklyn: ['Williamsburg', 'Bushwick', 'Bedford-Stuyvesant', 'Park Slope', 'Greenpoint', 'Crown Heights'],
  Queens: ['Astoria', 'Long Island City', 'Flushing', 'Ridgewood', 'Jamaica'],
  Bronx: ['Fordham', 'Riverdale', 'Mott Haven', 'Kingsbridge'],
  'Staten Island': ['St. George', 'Tompkinsville', 'Stapleton']
};

const boroughSelect = document.getElementById('neighbourhood_group');
const neighbourhoodInput = document.getElementById('neighbourhood');
const neighbourhoodList = document.getElementById('neighbourhoodList');

boroughSelect.addEventListener('change', () => {
  const list = NEIGHBOURHOODS_BY_BOROUGH[boroughSelect.value] || [];
  neighbourhoodList.innerHTML = list.map(n => `<option value="${n}"></option>`).join('');
});

// ---------- Sample data ----------

const SAMPLE = {
  neighbourhood_group: 'Brooklyn',
  neighbourhood: 'Williamsburg',
  latitude: 40.71455,
  longitude: -73.95765,
  price: 145,
  minimum_nights: 2,
  number_of_reviews: 38,
  reviews_per_month: 1.85,
  calculated_host_listings_count: 1,
  availability_365: 210
};

document.getElementById('sampleBtn').addEventListener('click', () => {
  boroughSelect.value = SAMPLE.neighbourhood_group;
  boroughSelect.dispatchEvent(new Event('change'));
  neighbourhoodInput.value = SAMPLE.neighbourhood;
  document.getElementById('latitude').value = SAMPLE.latitude;
  document.getElementById('longitude').value = SAMPLE.longitude;
  document.getElementById('price').value = SAMPLE.price;
  document.getElementById('minimum_nights').value = SAMPLE.minimum_nights;
  document.getElementById('number_of_reviews').value = SAMPLE.number_of_reviews;
  document.getElementById('reviews_per_month').value = SAMPLE.reviews_per_month;
  document.getElementById('calculated_host_listings_count').value = SAMPLE.calculated_host_listings_count;
  document.getElementById('availability_365').value = SAMPLE.availability_365;
});

// ---------- API health check ----------

const apiBaseInput = document.getElementById('apiBase');
const statusDot = document.getElementById('statusDot');

async function checkHealth() {
  const base = apiBaseInput.value.replace(/\/$/, '');
  try {
    const res = await fetch(base + '/', { method: 'GET' });
    if (res.ok) {
      statusDot.classList.remove('bad');
      statusDot.classList.add('ok');
      statusDot.title = 'API reachable';
    } else {
      throw new Error('bad status');
    }
  } catch (e) {
    statusDot.classList.remove('ok');
    statusDot.classList.add('bad');
    statusDot.title = 'API not reachable';
  }
}

checkHealth();
apiBaseInput.addEventListener('change', checkHealth);

// ---------- Form submission ----------

const form = document.getElementById('predictForm');
const submitBtn = document.getElementById('submitBtn');
const errorBanner = document.getElementById('errorBanner');
const resultEmpty = document.getElementById('resultEmpty');
const resultBody = document.getElementById('resultBody');
const resultClass = document.getElementById('resultClass');
const confidenceValue = document.getElementById('confidenceValue');
const confidenceFill = document.getElementById('confidenceFill');
const probBars = document.getElementById('probBars');
const timestampEl = document.getElementById('timestamp');

function showError(message) {
  errorBanner.textContent = message;
  errorBanner.hidden = false;
}

function clearError() {
  errorBanner.hidden = true;
  errorBanner.textContent = '';
}

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.classList.toggle('loading', isLoading);
}

function renderResult(data) {
  const prediction = data.prediction;
  const probabilities = Array.isArray(data.probability) ? data.probability[0] : data.probability;

  resultEmpty.hidden = true;
  resultBody.hidden = false;

  resultClass.textContent = typeof prediction === 'number'
    ? `Class ${prediction}`
    : String(prediction);

  let maxProb = 0;
  let maxIndex = -1;
  if (Array.isArray(probabilities)) {
    probabilities.forEach((p, i) => {
      if (p > maxProb) { maxProb = p; maxIndex = i; }
    });
  } else {
    maxProb = 1;
  }

  const confidencePct = Math.round(maxProb * 100);
  confidenceValue.textContent = `${confidencePct}%`;
  requestAnimationFrame(() => { confidenceFill.style.width = `${confidencePct}%`; });

  probBars.innerHTML = '';
  if (Array.isArray(probabilities)) {
    probabilities.forEach((p, i) => {
      const pct = Math.round(p * 100);
      const row = document.createElement('div');
      row.className = 'prob-row' + (i === maxIndex ? ' leading' : '');
      row.innerHTML = `
        <span class="prob-label">Class ${i}</span>
        <span class="prob-track"><span class="prob-fill" style="width:0%"></span></span>
        <span class="prob-value">${pct}%</span>
      `;
      probBars.appendChild(row);
      requestAnimationFrame(() => {
        row.querySelector('.prob-fill').style.width = `${pct}%`;
      });
    });
  }

  const now = new Date();
  timestampEl.textContent = `Predicted at ${now.toLocaleTimeString()}`;
}

document.getElementById('resetBtn').addEventListener('click', () => {
  resultBody.hidden = true;
  resultEmpty.hidden = false;
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearError();

  if (!boroughSelect.value) {
    showError('Choose a borough before running the prediction.');
    return;
  }

  const payload = {
    latitude: parseFloat(document.getElementById('latitude').value),
    longitude: parseFloat(document.getElementById('longitude').value),
    price: parseFloat(document.getElementById('price').value),
    minimum_nights: parseInt(document.getElementById('minimum_nights').value, 10),
    number_of_reviews: parseInt(document.getElementById('number_of_reviews').value, 10),
    reviews_per_month: parseFloat(document.getElementById('reviews_per_month').value),
    calculated_host_listings_count: parseInt(document.getElementById('calculated_host_listings_count').value, 10),
    availability_365: parseInt(document.getElementById('availability_365').value, 10),
    neighbourhood_group: boroughSelect.value,
    neighbourhood: neighbourhoodInput.value.trim()
  };

  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === 'number' && Number.isNaN(value)) {
      showError(`Check the "${key.replace(/_/g, ' ')}" field \u2014 it needs a valid number.`);
      return;
    }
    if (typeof value === 'string' && value === '') {
      showError(`Check the "${key.replace(/_/g, ' ')}" field \u2014 it can't be empty.`);
      return;
    }
  }

  const base = apiBaseInput.value.replace(/\/$/, '');
  setLoading(true);

  try {
    const res = await fetch(base + '/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Server responded ${res.status}: ${errText.slice(0, 200)}`);
    }

    const data = await res.json();
    renderResult(data);
    statusDot.classList.remove('bad');
    statusDot.classList.add('ok');
  } catch (err) {
    showError(
      err.message.includes('Failed to fetch')
        ? `Couldn't reach the API at ${base}. Confirm your FastAPI server is running and the address above is correct.`
        : err.message
    );
    statusDot.classList.remove('ok');
    statusDot.classList.add('bad');
  } finally {
    setLoading(false);
  }
});
