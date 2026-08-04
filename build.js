const path = require("path");
const project = require("./generators/project");

async function main() {
    const input = process.argv[2];

    if (!input) {
        console.log("Использование:");
        console.log("node build.js <путь к проекту>");
        process.exit(1);
    }

    const projectDir = path.resolve(input);

    console.log("Проект:", projectDir);

    await project.generate(projectDir);

    console.log("Готово.");
}

main();