import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\Lenovo\\.gemini\\antigravity-ide\\brain\\057f9890-6df3-4a70-ae1c-9a1f57bbb073';

async function runAudit() {
  console.log('Launching headless Chrome via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  
  // Listen for console logs and errors
  page.on('console', msg => console.log(`[Browser ${msg.type()}]: ${msg.text()}`));
  page.on('pageerror', err => console.error('PAGE ERROR:', err));

  // Set desktop viewport
  await page.setViewport({ width: 1536, height: 826, deviceScaleFactor: 2 });

  console.log('Navigating to http://localhost:3000/...');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });

  // Wait for WebGL and fonts to settle
  await new Promise(r => setTimeout(r, 2000));

  // 1. Capture Desktop Hero
  const heroPath = path.join(ARTIFACT_DIR, '01_hero_desktop.png');
  await page.screenshot({ path: heroPath });
  console.log(`Saved: ${heroPath}`);

  // 2. Scroll to About Us and capture
  await page.evaluate(() => {
    const el = document.getElementById('manifesto-stage');
    if (el) window.scrollTo(0, el.offsetTop);
  });
  await new Promise(r => setTimeout(r, 800));
  const aboutPath = path.join(ARTIFACT_DIR, '02_about_pillars.png');
  await page.screenshot({ path: aboutPath });
  console.log(`Saved: ${aboutPath}`);

  // 3. Scroll to Services and capture
  await page.evaluate(() => {
    const el = document.getElementById('disciplines-stage');
    if (el) window.scrollTo(0, el.offsetTop);
    if (window.setActiveServiceIndex) window.setActiveServiceIndex(1);
  });
  await new Promise(r => setTimeout(r, 800));
  const servicesPath = path.join(ARTIFACT_DIR, '03_services_interactive.png');
  await page.screenshot({ path: servicesPath });
  console.log(`Saved: ${servicesPath}`);

  // 4. Open Modal for Service
  await page.evaluate(() => {
    if (window.openServiceModalById) window.openServiceModalById('brand-strategy');
  });
  await new Promise(r => setTimeout(r, 600));
  const modalServicePath = path.join(ARTIFACT_DIR, '04_modal_service.png');
  await page.screenshot({ path: modalServicePath });
  console.log(`Saved: ${modalServicePath}`);

  // Close Modal
  await page.evaluate(() => {
    if (window.closeDetailModal) window.closeDetailModal();
  });
  await new Promise(r => setTimeout(r, 400));

  // 5. Scroll to Case Studies
  await page.evaluate(() => {
    const el = document.getElementById('dossiers-stage');
    if (el) window.scrollTo(0, el.offsetTop);
  });
  await new Promise(r => setTimeout(r, 800));
  const casesPath = path.join(ARTIFACT_DIR, '05_case_studies.png');
  await page.screenshot({ path: casesPath });
  console.log(`Saved: ${casesPath}`);

  // 5b. Scroll to Insights
  await page.evaluate(() => {
    const el = document.getElementById('ideas-lab-stage');
    if (el) window.scrollTo(0, el.offsetTop);
  });
  await new Promise(r => setTimeout(r, 800));
  const insightsPath = path.join(ARTIFACT_DIR, '05b_insights.png');
  await page.screenshot({ path: insightsPath });
  console.log(`Saved: ${insightsPath}`);

  // 6. Scroll to Contact section
  await page.evaluate(() => {
    const el = document.getElementById('concierge-stage');
    if (el) window.scrollTo(0, el.offsetTop);
  });
  await new Promise(r => setTimeout(r, 800));
  const contactPath = path.join(ARTIFACT_DIR, '06_contact_section.png');
  await page.screenshot({ path: contactPath });
  console.log(`Saved: ${contactPath}`);

  // 7. Mobile Viewport
  await page.setViewport({ width: 414, height: 896, deviceScaleFactor: 2 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 600));
  const mobileHeroPath = path.join(ARTIFACT_DIR, '07_mobile_hero.png');
  await page.screenshot({ path: mobileHeroPath });
  console.log(`Saved: ${mobileHeroPath}`);

  // 8. Open Mobile Drawer
  await page.evaluate(() => {
    const toggle = document.getElementById('mobile-nav-toggle');
    if (toggle) toggle.click();
  });
  await new Promise(r => setTimeout(r, 600));
  const mobileDrawerPath = path.join(ARTIFACT_DIR, '08_mobile_drawer.png');
  await page.screenshot({ path: mobileDrawerPath });
  console.log(`Saved: ${mobileDrawerPath}`);

  await browser.close();
  console.log('Audit completed successfully.');
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
