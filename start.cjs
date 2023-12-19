const { spawn } = require('child_process');
const path = require('path');

// Get the full path to the Vite executable
const viteExecutable = path.join(__dirname, 'node_modules', '.bin', 'vite');

// Start the backend server
const serverProcess = spawn('node server/server.cjs', { stdio: 'inherit', shell: true });

// Start Vite
const viteProcess = spawn(viteExecutable, { stdio: 'inherit', shell: true });

// Handle process exit
process.on('SIGINT', () => {
    viteProcess.kill();
    serverProcess.kill();
    process.exit();
});
