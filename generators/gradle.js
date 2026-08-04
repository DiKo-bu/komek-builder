const fs = require("fs-extra");
const path = require("path");

async function generate(androidDir, config) {

    const settings = `rootProject.name = "${config.name}"
include(":app")
`;

    const build = `plugins {
    id("com.android.application") version "8.12.0" apply false
    id("org.jetbrains.kotlin.android") version "2.2.20" apply false
}
`;

    await fs.writeFile(
        path.join(androidDir, "settings.gradle.kts"),
        settings
    );

    await fs.writeFile(
        path.join(androidDir, "build.gradle.kts"),
        build
    );

    console.log("Gradle создан");
}

module.exports = {
    generate
};