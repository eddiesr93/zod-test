import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

// Define the input and output directories
const typesDir = path.join('src/types');
const schemasDir = path.join('src/schemas');

// Ensure the output directory exists
if (!fs.existsSync(schemasDir)) {
    fs.mkdirSync(schemasDir, { recursive: true });
}

// Read all .ts files from the types directory
fs.readdir(typesDir, (err, files) => {
    if (err) {
        console.error('Error reading the types directory:', err);
        return;
    }

    // Filter out only .ts files (excluding .d.ts)
    const tsFiles = files.filter(file => file.endsWith('.ts') && !file.endsWith('.d.ts'));

    tsFiles.forEach(file => {
        const fileNameWithoutExt = path.basename(file, '.ts');
        const inputPath = path.join(typesDir, file);
        const outputPath = path.join(schemasDir, `${fileNameWithoutExt}.zod.ts`);

        // Log the paths for debugging
        console.log(`Input Path: ${inputPath}, Output Path: ${outputPath}`);

        // Wrap paths in quotes to handle spaces
        const command = `npx ts-to-zod "${inputPath}" "${outputPath}"`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error generating schema for ${file}:`, error);
                return;
            }
            if (stderr) {
                console.error(`stderr for ${file}:`, stderr);
                return;
            }
            console.log(`Schema generated for ${file}: ${stdout}`);
        });
    });
});
