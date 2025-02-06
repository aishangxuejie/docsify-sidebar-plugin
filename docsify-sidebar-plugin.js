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

const filterFiles = ['readme.md', 'README.md', 'cover.md', '_sidebar.md', 'assets'];
const emojis = ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🍍', '🥭', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥒', '🌽'];

function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

function getMarkdownFiles(dir, prefix = '') {
    let files = fs.readdirSync(dir).filter(file => !filterFiles.includes(file));
    let content = '';

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const relativeDirPath = path.relative(scriptDirectory, filePath) + '/';
            const emoji = getRandomEmoji();
            content += `${prefix}- [${emoji} ${file}](${relativeDirPath.replace(/\\/g, '/')})\n`;
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
    let files = fs.readdirSync(dir).filter(file => !filterFiles.includes(file));
    let readmeExists = files.some(file => file.toLowerCase() === 'readme.md');

    if (!readmeExists) {
        const readmePath = path.join(dir, 'README.md');
        const readmeContent = '# Welcome! docsify-sidebar-plugin\n\n This is an auto-created README.md\n\n';
        fs.writeFileSync(readmePath, readmeContent);
        console.log(`》》README.md Write succeeded: ${dir}`);
    }

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

async function main() {
    try {
        checkAndCreateReadme(directoryPath);

        let newContent = getMarkdownFiles(directoryPath);

        if (fs.existsSync(sidebarPath)) {
            const existingContent = fs.readFileSync(sidebarPath, 'utf-8');
            const newLines = newContent.split('\n').filter(line => {
                const match = line.match(/\(([^)]+)\)/);
                return match && !existingContent.includes(match[1]);
            });

            newContent = newLines.join('\n');

            if (newContent) {
                newContent = `\n<!-- update on ${getCurrentTimestamp()} -->\n` + newContent;
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
            newContent = `<!-- ./_sidebar.md -->\n\n<!-- Welcome! docsify-sidebar-plugin generated in ${getCurrentTimestamp()} -->\n\n` + newContent;
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

main();