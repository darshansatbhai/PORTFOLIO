const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
    console.log('🎬 Starting Launch Video Frame Capture (Headless)...\n');
    
    const outputDir = path.join(__dirname, 'launch-video-output');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const browser = await puppeteer.launch({
        headless: 'new',
        defaultViewport: { width: 1080, height: 1920, deviceScaleFactor: 1 },
    });

    const page = await browser.newPage();
    
    const htmlPath = path.resolve(__dirname, 'public', 'launch-video.html');
    await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'load' });
    console.log('  ✅ Page loaded\n');

    // Key moments to capture
    const keyMoments = [
        { waitMs: 2500, name: '01_intro' },
        { waitMs: 2000, name: '02_name_reveal' },
        { waitMs: 3000, name: '03_tech_stack' },
        { waitMs: 3000, name: '04_windeck' },
        { waitMs: 2500, name: '05_windeck_features' },
        { waitMs: 2500, name: '06_spiddy' },
        { waitMs: 2000, name: '07_spiddy_features' },
        { waitMs: 2500, name: '08_workflow' },
        { waitMs: 2500, name: '09_workflow_steps' },
        { waitMs: 2500, name: '10_final_cta' },
    ];

    for (const moment of keyMoments) {
        await new Promise(r => setTimeout(r, moment.waitMs));
        await page.screenshot({
            path: path.join(outputDir, `${moment.name}.png`),
            type: 'png'
        });
        console.log(`  ✅ Captured: ${moment.name}.png`);
    }

    // Save poster (the final CTA frame)
    await page.screenshot({
        path: path.join(outputDir, 'poster.png'),
        type: 'png'
    });
    console.log(`  ✅ Captured: poster.png`);

    console.log('\n🎬 Done! All frames saved to:', outputDir);
    
    await browser.close();
    process.exit(0);
})();
