/**
 * CreatorPulse Dashboard Interactions & Charts Setup
 */

// Initialize lucide icons
lucide.createIcons();

// --- Sidebar Interaction ---
const sidebar = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapseBtn');
const openSidebarBtn = document.getElementById('openSidebar');
const closeSidebarBtn = document.getElementById('closeSidebar');
const overlay = document.getElementById('sidebarOverlay');

// Desktop Collapse
collapseBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  const icon = document.getElementById('collapseIcon');
  if (sidebar.classList.contains('collapsed')) {
    icon.setAttribute('data-lucide', 'panel-right-open');
    // Save to local storage conceptually
  } else {
    icon.setAttribute('data-lucide', 'panel-left-close');
  }
  lucide.createIcons();
});

// Mobile Drawer
function openMobileSidebar() {
  sidebar.classList.add('mobile-open');
  overlay.classList.add('visible');
}

function closeMobileSidebar() {
  sidebar.classList.remove('mobile-open');
  overlay.classList.remove('visible');
}

openSidebarBtn.addEventListener('click', openMobileSidebar);
closeSidebarBtn.addEventListener('click', closeMobileSidebar);
overlay.addEventListener('click', closeMobileSidebar);

// Remove loading skeleton after short delay to simulate fetch
setTimeout(() => {
  document.body.classList.remove('loading');
  initCharts();
  populateTable();
}, 800);

// --- Chart Defaults ---
Chart.defaults.color = '#94A3B8'; // text-low
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.scale.grid.color = '#334155'; // border-subtle
Chart.defaults.scale.grid.drawBorder = false;

// --- Mock Data ---
const chartColors = {
  teal: '#0F766E',
  tealLight: 'rgba(15, 118, 110, 0.2)',
  slate: '#475569',
  green: '#22C55E',
  orange: '#F59E0B',
  blue: '#3B82F6' // Slight accent for donuts if needed, but sticking to prompt palette mostly
};

function initCharts() {
  // 1. Hero Revenue Chart (Line)
  const revCanvas = document.getElementById('revenueChart');
  if (revCanvas) {
    const ctxRev = revCanvas.getContext('2d');
  
  // Creates a subtle gradient for the line chart fill
  const gradient = ctxRev.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(15, 118, 110, 0.3)');
  gradient.addColorStop(1, 'rgba(15, 118, 110, 0.0)');

  new Chart(ctxRev, {
    type: 'line',
    data: {
      labels: ['1', '5', '10', '15', '20', '25', '30'],
      datasets: [{
        label: 'Revenue',
        data: [1200, 1900, 1500, 2200, 2800, 2600, 3400],
        borderColor: chartColors.teal,
        backgroundColor: gradient,
        borderWidth: 2,
        pointBackgroundColor: '#161D2F',
        pointBorderColor: chartColors.teal,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1E293B',
          titleColor: '#F8FAFC',
          bodyColor: '#F8FAFC',
          borderColor: '#334155',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return '$' + context.parsed.y.toLocaleString();
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          border: { display: false },
          ticks: {
            callback: function(value) {
              return '$' + value;
            },
            maxTicksLimit: 5
          }
        },
        x: {
          border: { display: false },
          grid: { display: false }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false,
      },
    }
  });
  }

  // 2. Audience Growth (Bar/Line combo representation)
  const audCanvas = document.getElementById('audienceChart');
  if (audCanvas) {
    const ctxAud = audCanvas.getContext('2d');
  new Chart(ctxAud, {
    type: 'bar',
    data: {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      datasets: [{
        data: [45, 60, 30, 80, 50, 95, 110],
        backgroundColor: chartColors.teal,
        borderRadius: 4,
        barPercentage: 0.6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, border: {display: false} },
        y: { display: false, border: {display: false} } // hide y-axis for clean look
      }
    }
  });
  }

  // 3. Traffic Sources (Doughnut)
  const trafCanvas = document.getElementById('trafficChart');
  if (trafCanvas) {
    const ctxTraf = trafCanvas.getContext('2d');
    const trafficData = [45, 25, 20, 10];
    const trafficLabels = ['YouTube', 'Email', 'Direct', 'Referral'];
    const trafficBgColors = [
      chartColors.teal,
      '#0D5B55', // darker teal
      '#334155', // slate
      '#475569'
    ];

    new Chart(ctxTraf, {
      type: 'doughnut',
      data: {
        labels: trafficLabels,
        datasets: [{
          data: trafficData,
          backgroundColor: trafficBgColors,
          borderWidth: 2,
          borderColor: '#161D2F' // matches surface background
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
          legend: { display: false }, // we use custom legend
          tooltip: {
            backgroundColor: '#1E293B',
            bodyColor: '#F8FAFC',
            borderColor: '#334155',
            borderWidth: 1,
            padding: 10
          }
        }
      }
    });
    input 
    // Render Custom Legend for Traffic
    renderCustomLegend('trafficLegend', trafficLabels, trafficData, trafficBgColors);
  }

  // 4. Device Breakdown (Doughnut)
  const devCanvas = document.getElementById('deviceChart');
  if (devCanvas) {
    const ctxDev = devCanvas.getContext('2d');
    const deviceData = [55, 35, 10];
    const deviceLabels = ['Mobile', 'Desktop', 'Tablet'];
    const deviceBgColors = [
      chartColors.teal,
      '#334155',
      '#1E293B'
    ];

    new Chart(ctxDev, {
      type: 'doughnut',
      data: {
        labels: deviceLabels,
        datasets: [{
          data: deviceData,
          backgroundColor: deviceBgColors,
          borderWidth: 2,
          borderColor: '#161D2F'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: { legend: { display: false } }
      }
    });

    renderCustomLegend('deviceLegend', deviceLabels, deviceData, deviceBgColors);
  }
}

function renderCustomLegend(containerId, labels, data, colors) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  
  labels.forEach((label, i) => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    
    item.innerHTML = `
      <div class="legend-label-group">
        <span class="legend-color" style="background-color: ${colors[i]}"></span>
        <span>${label}</span>
      </div>
      <span class="legend-value">${data[i]}%</span>
    `;
    container.appendChild(item);
  });
}

// --- Populate Content Table ---
function populateTable() {
  const tableData = [
    { title: "Mastering FCPX 2026", type: "Video Course", views: "142,300", rev: "$12,450.00", eng: "8.2%", date: "Oct 24, 2026", status: "Published" },
    { title: "Creator Setup Tour", type: "YouTube", views: "89,120", rev: "$3,210.50", eng: "12.4%", date: "Oct 20, 2026", status: "Published" },
    { title: " LUT Pack Vol. 3", type: "Digital Product", views: "12,050", rev: "$8,900.00", eng: "4.5%", date: "Oct 15, 2026", status: "Published" },
    { title: "Q4 Strategy Guide", type: "Newsletter", views: "8,400", rev: "$450.00", eng: "22.1%", date: "Oct 12, 2026", status: "Published" },
    { title: "Color Grading Basics", type: "Patreon Exclusive", views: "-", rev: "-", eng: "-", date: "Draft", status: "Draft" }
  ];

  const tbody = document.getElementById('tableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  tableData.forEach(row => {
    const tr = document.createElement('tr');
    
    // Status formatting
    const statusClass = row.status === 'Published' ? 'status-published' : 'status-draft';
    
    tr.innerHTML = `
      <td>
        <div class="content-cell">
          <div class="content-thumb">
            <svg width="40" height="28" viewBox="0 0 40 28" fill="#1E293B" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="28" rx="4"/>
              <circle cx="20" cy="14" r="6" fill="#334155"/>
            </svg>
          </div>
          <div class="content-meta">
            <span class="content-title">${row.title}</span>
            <span class="content-type">${row.type}</span>
          </div>
        </div>
      </td>
      <td class="tabular-nums align-right">${row.views}</td>
      <td class="tabular-nums align-right">${row.rev}</td>
      <td class="tabular-nums align-right">${row.eng}</td>
      <td><span class="text-low">${row.date}</span></td>
      <td><span class="status-badge ${statusClass}">${row.status}</span></td>
    `;
    
    tbody.appendChild(tr);
  });
}
