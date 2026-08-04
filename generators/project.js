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

    const configFile = path.join(projectDir, "Android.json");

// Создаём папку проекта
await fs.ensureDir(projectDir);

// Если Android.json отсутствует — создаём его
if (!(await fs.pathExists(configFile))) {

    const defaultConfig = {
        package: "kz.komek.demo",
        name: "Komek Demo",
        versionCode: 1,
        versionName: "1.0"
    };

    await fs.writeJson(configFile, defaultConfig, {
        spaces: 4
    });

    console.log("Android.json создан");
}

const config = await fs.readJson(configFile);

    await manifest.generate(androidDir, config);
    await gradle.generate(androidDir, config);
    await activity.generate(androidDir, config);
    await appGradle.generate(androidDir, config);
    console.log("Структура Android создана");
}

module.exports = {
    generate
};