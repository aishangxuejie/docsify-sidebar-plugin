/**
 * @copyright 2025
 * @name docsify-sidebar-plugin
 * @link https://github.com/aishangxuejie/docsify-sidebar-plugin
 * @version 1.3.2
 * @license MIT
 */

const fs = require('fs');
const path = require('path');

const scriptDirectory = __dirname;
const relativePath = process.argv[2] || '';

if (!relativePath) {
    console.error('》》The directive is missing the necessary parameters [path]');
    process.exit(1);
}

const directoryPath = path.join(scriptDirectory, relativePath);
const sidebarPath = path.join(directoryPath, '_sidebar.md');
console.log('》》_sidebar.md path:', sidebarPath);

const configPath = path.join(scriptDirectory, 'sidebar.config.json');
let config = {
    ignoreFiles: ['readme.md', 'README.md', 'cover.md', '_sidebar.md', 'assets'],
    emojis: ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🍍', '🥭', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥒', '🌽'],
    directoryEmoji: '📂',
    readmeContent: '# Hi! \n\n This is an auto-created README.md by docsify-sidebar-plugin\n'
};

if (fs.existsSync(configPath)) {
    const userConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    config = { ...config, ...userConfig };
}

const { ignoreFiles, emojis, directoryEmoji, readmeContent } = config;

function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

function getMarkdownFiles(dir, prefix = '') {
    let files = fs.readdirSync(dir).filter(file => !ignoreFiles.includes(file));
    let content = '';

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const relativeDirPath = path.relative(scriptDirectory, filePath) + '/';
            content += `${prefix}- [${directoryEmoji} ${file}](${relativeDirPath.replace(/\\/g, '/')})\n`;
            content += getMarkdownFiles(filePath, `${prefix}  `);
        } else if (file.endsWith('.md')) {
            const relativeFilePath = path.relative(scriptDirectory, filePath);
            const fileName = path.parse(file).name;
            const emoji = getRandomEmoji();
            content += `${prefix}- [${emoji} ${fileName}](${relativeFilePath.replace(/\\/g, '/')})\n`;
        }
    });

    return content;
}

function checkAndCreateReadme(dir) {
    let files = fs.readdirSync(dir);
    let readmeExists = files.some(file => file.toLowerCase() === 'readme.md');
    if (!readmeExists) {
        const readmePath = path.join(dir, 'README.md');
        fs.writeFileSync(readmePath, readmeContent);
        console.log(`》》README.md Write succeeded: ${dir}`);
    }
    files = files.filter(file => !ignoreFiles.includes(file));
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            checkAndCreateReadme(filePath);
        }
    });
}

function getCurrentTimestamp() {
    return new Date().toISOString();
}

async function updateSidebar() {
    try {
        checkAndCreateReadme(directoryPath, ignoreFiles);

        let newContent = getMarkdownFiles(directoryPath, '', ignoreFiles);

        if (fs.existsSync(sidebarPath)) {
            const existingContent = fs.readFileSync(sidebarPath, 'utf-8');
            const newLines = newContent.split('\n').filter(line => {
                const match = line.match(/\(([^)]+)\)/);
                return match && !existingContent.includes(match[1]);
            });

            newContent = newLines.join('\n');

            if (newContent) {
                newContent = newContent + `<!-- update on ${getCurrentTimestamp()} -->\n`;
                fs.appendFile(sidebarPath, newContent, err => {
                    if (err) {
                        console.error('》》_sidebar.md Append failed: ' + err);
                    } else {
                        console.log('》》_sidebar.md Append succeeded');
                    }
                });
            } else {
                console.log('》》_sidebar.md No new directories to append');
            }
        } else {
            newContent = `<!-- ./_sidebar.md, docsify-sidebar-plugin generated in ${getCurrentTimestamp()} -->\n\n` + newContent;
            fs.writeFile(sidebarPath, newContent, err => {
                if (err) {
                    console.error('》》_sidebar.md Unable to write: ' + err);
                } else {
                    console.log('》》_sidebar.md Write succeeded');
                }
            });
        }
    } catch (error) {
        console.error('》》An error occurred: ', error);
    }
}

async function main() {
    await updateSidebar();
}

main();