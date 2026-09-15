import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

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
  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => console.error('PAGE ERROR:', err));

  // Set desktop viewport
  await page.setViewport({ width: 1536, height: 826, deviceScaleFactor: 2 });

  console.log('Navigating to http://localhost:3000/...');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });

  // Wait for WebGL and clocks to initialize
  await new Promise(r => setTimeout(r, 2000));

  // 1. Capture Desktop Hero
  const heroPath = path.join(ARTIFACT_DIR, '01_hero_desktop.png');
  await page.screenshot({ path: heroPath });
  console.log(`Saved: ${heroPath}`);

  // 2. Scroll to Manifesto and capture
  await page.evaluate(() => {
    const el = document.getElementById('manifesto-stage');
    if (el) {
      window.scrollTo(0, el.offsetTop);
      // Simulate scrub progress
      const words = el.querySelectorAll('.scrub-word');
      words.forEach((w, i) => {
        if (i < words.length * 0.8) {
          w.classList.add('illuminated');
        }
      });
    }
  });
  await new Promise(r => setTimeout(r, 600));
  const manifestoPath = path.join(ARTIFACT_DIR, '02_manifesto_scrub.png');
  await page.screenshot({ path: manifestoPath });
  console.log(`Saved: ${manifestoPath}`);

  // 3. Scroll to Disciplines, click blade 2 (Storytelling)
  await page.evaluate(() => {
    const el = document.getElementById('disciplines-stage');
    if (el) window.scrollTo(0, el.offsetTop);
    if (window.setActiveDisciplineIndex) window.setActiveDisciplineIndex(1, false);
  });
  await new Promise(r => setTimeout(r, 600));
  const disciplinesPath = path.join(ARTIFACT_DIR, '03_disciplines_stage.png');
  await page.screenshot({ path: disciplinesPath });
  console.log(`Saved: ${disciplinesPath}`);

  // 4. Open Universal Modal for Service
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

  // 5. Scroll to Dossiers and expand drawer
  await page.evaluate(() => {
    const el = document.getElementById('dossiers-stage');
    if (el) window.scrollTo(0, el.offsetTop);
    const firstDrawerBtn = document.querySelector('.toggle-dossier-drawer-btn');
    if (firstDrawerBtn) firstDrawerBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  const dossiersPath = path.join(ARTIFACT_DIR, '05_dossiers_drawer.png');
  await page.screenshot({ path: dossiersPath });
  console.log(`Saved: ${dossiersPath}`);

  // 5b. Scroll to Ideas Lab and expand blueprint
  await page.evaluate(() => {
    const el = document.getElementById('ideas-lab-stage');
    if (el) window.scrollTo(0, el.offsetTop);
    const firstLabBtn = document.querySelector('.toggle-lab-drawer-btn');
    if (firstLabBtn) firstLabBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  const labPath = path.join(ARTIFACT_DIR, '05b_ideas_lab.png');
  await page.screenshot({ path: labPath });
  console.log(`Saved: ${labPath}`);

  // 6. Scroll to Concierge, select choices and submit test form
  await page.evaluate(() => {
    const el = document.getElementById('concierge-stage');
    if (el) window.scrollTo(0, el.offsetTop);
    
    // Fill form
    const nameInput = document.getElementById('brief-name');
    const emailInput = document.getElementById('brief-email');
    const summaryInput = document.getElementById('brief-summary');
    if (nameInput) nameInput.value = 'Evelyn Reed, Managing Director';
    if (emailInput) emailInput.value = 'evelyn@reedventures.com';
    if (summaryInput) summaryInput.value = 'Seeking sovereign market positioning and AI workflow automation across Singapore and Australasia.';

    const form = document.getElementById('strategic-brief-form');
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  });
  await new Promise(r => setTimeout(r, 600));
  const conciergePath = path.join(ARTIFACT_DIR, '06_concierge_terminal.png');
  await page.screenshot({ path: conciergePath });
  console.log(`Saved: ${conciergePath}`);

  // 7. Mobile Viewport Audit (504x754)
  await page.setViewport({ width: 504, height: 754, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  const mobileHeroPath = path.join(ARTIFACT_DIR, '07_mobile_hero.png');
  await page.screenshot({ path: mobileHeroPath });
  console.log(`Saved: ${mobileHeroPath}`);

  // Open mobile drawer
  await page.evaluate(() => {
    const toggle = document.getElementById('mobile-nav-toggle');
    if (toggle) toggle.click();
  });
  await new Promise(r => setTimeout(r, 400));
  const mobileDrawerPath = path.join(ARTIFACT_DIR, '08_mobile_drawer.png');
  await page.screenshot({ path: mobileDrawerPath });
  console.log(`Saved: ${mobileDrawerPath}`);

  await browser.close();
  console.log('Audit completed successfully. All screenshots saved to artifact directory.');
  console.log('Console Logs count:', consoleLogs.length);
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
