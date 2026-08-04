const appGradle = require("./appGradle");
const activity = require("./activity");
const fs = require("fs-extra");
const path = require("path");

const manifest = require("./manifest");
const gradle = require("./gradle");

async function generate(projectDir) {

    const buildDir = path.join(projectDir, "build");
    const androidDir = path.join(buildDir, "android");

    await fs.ensureDir(androidDir);

    // Создаём структуру Android

    await fs.ensureDir(path.join(androidDir, "app"));
    await fs.ensureDir(path.join(androidDir, "app", "src"));
    await fs.ensureDir(path.join(androidDir, "app", "src", "main"));
    await fs.ensureDir(path.join(androidDir, "app", "src", "main", "kotlin"));
    await fs.ensureDir(path.join(androidDir, "app", "src", "main", "assets"));
    await fs.ensureDir(path.join(androidDir, "app", "src", "main", "res"));

    const config = await fs.readJson(
        path.join(projectDir, "Android.json")
    );

    await manifest.generate(androidDir, config);
    await gradle.generate(androidDir, config);
    await activity.generate(androidDir, config);
    await appGradle.generate(androidDir, config);
    console.log("Структура Android создана");
}

module.exports = {
    generate
};