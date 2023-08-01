import { createCanvas } from 'canvas';
import fs from 'fs';
async function generateAndSaveImage() {
    const width = 800;
    const height = 400;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#331D2C';
    ctx.fillRect(0, 0, width, height);
    ctx.font = '96px Poppins';
    ctx.fillStyle = '#D9D9D9';
    ctx.fillText("Run", 400, 52);
    const out = fs.createWriteStream('public/embed.png');
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('Image saved.'));
}
generateAndSaveImage();
