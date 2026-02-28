const fs = require('fs');
const indexContent = fs.readFileSync('index.html', 'utf-8');

function createPage(filename, navItemText, contentHtml) {
  // 1. Remove active from Overview
  let newContent = indexContent.replace(
    /class="nav-item active"([\s\S]*?)<span class="nav-label">Overview<\/span>/,
    'class="nav-item"$1<span class="nav-label">Overview</span>'
  );

  // 2. Add active to current page
  const regex = new RegExp(`class="nav-item"([\\s\\S]*?)<span class="nav-label">${navItemText}<\\/span>`);
  newContent = newContent.replace(regex, 'class="nav-item active"$1<span class="nav-label">' + navItemText + '</span>');
  
  // 3. Replace content
  const startTag = '<div class="dashboard-container">';
  const endTag = '<!-- /content-grid -->';
  const startIdx = newContent.indexOf(startTag);
  const endIdx = newContent.indexOf(endTag) + endTag.length;
  
  const header = `
      <div style="margin-bottom: 24px; padding: 0 16px;">
        <h1 class="panel-title" style="font-size: 24px;">${navItemText}</h1>
      </div>
  `;

  newContent = newContent.substring(0, startIdx + startTag.length) + header + contentHtml + newContent.substring(endIdx);
  
  fs.writeFileSync(filename, newContent);
}

const revHtml = `
            <section class="kpi-row">
              <div class="kpi-card skeleton-box loading">
                <div class="kpi-header"><span class="kpi-label">TOTAL REVENUE (LTD)</span><i data-lucide="dollar-sign" class="kpi-icon"></i></div>
                <div class="kpi-value">$345,920.00</div>
              </div>
              <div class="kpi-card skeleton-box loading">
                <div class="kpi-header"><span class="kpi-label">MONTHLY REVENUE</span><i data-lucide="calendar" class="kpi-icon"></i></div>
                <div class="kpi-value">$24,592.00</div>
              </div>
              <div class="kpi-card skeleton-box loading">
                <div class="kpi-header"><span class="kpi-label">AVERAGE ORDER VALUE</span><i data-lucide="shopping-cart" class="kpi-icon"></i></div>
                <div class="kpi-value">$48.50</div>
              </div>
            </section>
            <div class="content-grid" style="margin-top: 24px;">
              <section class="panel hero-chart-panel span-12 skeleton-box loading">
                <div class="panel-header"><h2 class="panel-title">Revenue Trend</h2></div>
                <div class="chart-container hero-chart-container"><canvas id="revenueChart"></canvas></div>
              </section>
            </div>
            <!-- /content-grid -->
`;

const audHtml = `
            <section class="kpi-row">
              <div class="kpi-card skeleton-box loading">
                <div class="kpi-header"><span class="kpi-label">TOTAL AUDIENCE</span><i data-lucide="users" class="kpi-icon"></i></div>
                <div class="kpi-value">124,592</div>
              </div>
              <div class="kpi-card skeleton-box loading">
                <div class="kpi-header"><span class="kpi-label">ACTIVE SUBSCRIBERS</span><i data-lucide="user-check" class="kpi-icon"></i></div>
                <div class="kpi-value">8,409</div>
              </div>
            </section>
            <div class="content-grid" style="margin-top: 24px;">
              <section class="panel audience-panel span-12 skeleton-box loading">
                <div class="panel-header"><h2 class="panel-title">Audience Growth over Time</h2></div>
                <div class="chart-container hero-chart-container"><canvas id="audienceChart"></canvas></div>
              </section>
              <section class="panel traffic-panel span-6 skeleton-box loading">
                <div class="panel-header"><h2 class="panel-title">Traffic Sources</h2></div>
                <div class="donut-chart-layout">
                  <div class="chart-container donut-container"><canvas id="trafficChart"></canvas></div>
                  <div id="trafficLegend" class="custom-legend"></div>
                </div>
              </section>
              <section class="panel devices-panel span-6 skeleton-box loading">
                <div class="panel-header"><h2 class="panel-title">Device Breakdown</h2></div>
                <div class="donut-chart-layout">
                  <div class="chart-container donut-container"><canvas id="deviceChart"></canvas></div>
                  <div id="deviceLegend" class="custom-legend"></div>
                </div>
              </section>
            </div>
            <!-- /content-grid -->
`;

const contHtml = `
            <div class="content-grid">
              <section class="panel table-panel span-12 skeleton-box loading">
                <div class="panel-header table-header">
                  <h2 class="panel-title">All Content</h2>
                </div>
                <div class="table-responsive">
                  <table class="data-table">
                    <thead>
                      <tr>
                        <th>Content Title</th>
                        <th class="align-right">Views</th>
                        <th class="align-right">Revenue</th>
                        <th class="align-right">Engagement</th>
                        <th>Publish Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody id="tableBody"></tbody>
                  </table>
                </div>
              </section>
            </div>
            <!-- /content-grid -->
`;

const repHtml = `
            <div class="content-grid">
              <section class="panel span-12 skeleton-box loading">
                <div class="panel-header">
                  <h2 class="panel-title">Available Reports</h2>
                  <button class="btn btn-secondary"><i data-lucide="download"></i> Generate New</button>
                </div>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                  <div style="padding: 16px; border: 1px solid var(--border-subtle); border-radius: 8px; display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface);">
                    <div>
                      <div style="font-weight: 500; color: var(--text-high);">Q3 Financial Summary</div>
                      <div style="color: var(--text-low); font-size: 13px;">Generated Oct 1, 2026</div>
                    </div>
                    <button class="icon-btn"><i data-lucide="download"></i></button>
                  </div>
                  <div style="padding: 16px; border: 1px solid var(--border-subtle); border-radius: 8px; display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface);">
                    <div>
                      <div style="font-weight: 500; color: var(--text-high);">Subscriber Demographics</div>
                      <div style="color: var(--text-low); font-size: 13px;">Generated Sep 15, 2026</div>
                    </div>
                    <button class="icon-btn"><i data-lucide="download"></i></button>
                  </div>
                </div>
              </section>
            </div>
            <!-- /content-grid -->
`;

const setHtml = `
            <div class="content-grid">
              <section class="panel span-8 skeleton-box loading">
                <div class="panel-header"><h2 class="panel-title">Profile Settings</h2></div>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                  <div>
                    <label style="display: block; margin-bottom: 8px; color: var(--text-low); font-size: 13px;">Creator Name</label>
                    <input type="text" value="Alex Carter" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--border-subtle); background: var(--bg-base); color: var(--text-high);" />
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: 8px; color: var(--text-low); font-size: 13px;">Email Address</label>
                    <input type="email" value="alex@creatorpulse.com" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--border-subtle); background: var(--bg-base); color: var(--text-high);" />
                  </div>
                  <button style="align-self: flex-start; background: var(--accent-primary); color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 500; cursor: pointer;">Save Changes</button>
                </div>
              </section>
              <section class="panel span-4 skeleton-box loading">
                <div class="panel-header"><h2 class="panel-title">Notifications</h2></div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                  <span style="color: var(--text-high); font-size: 14px;">Email Alerts</span>
                  <input type="checkbox" checked />
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span style="color: var(--text-high); font-size: 14px;">Push Notifications</span>
                  <input type="checkbox" checked />
                </div>
              </section>
            </div>
            <!-- /content-grid -->
`;

createPage('revenue.html', 'Revenue', revHtml);
createPage('audience.html', 'Audience', audHtml);
createPage('content.html', 'Content', contHtml);
createPage('reports.html', 'Reports', repHtml);
createPage('settings.html', 'Settings', setHtml);

console.log('Pages created successfully.');
