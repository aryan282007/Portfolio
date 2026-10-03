import fs from 'fs';
import { Jimp } from 'jimp';

async function generateIcons() {
  try {
    // try pfp.jpg first, or image.png
    let sourceImage = 'public/pfp.jpg';
    if (!fs.existsSync(sourceImage)) {
      sourceImage = 'public/image.png';
    }

    const image = await Jimp.read(sourceImage);
    
    // Create 192x192
    const img192 = image.clone();
    img192.cover({ w: 192, h: 192 });
    await img192.write('public/pwa-192x192.png');
    console.log('Generated pwa-192x192.png');

    // Create 512x512
    const img512 = image.clone();
    img512.cover({ w: 512, h: 512 });
    await img512.write('public/pwa-512x512.png');
    console.log('Generated pwa-512x512.png');
    
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
