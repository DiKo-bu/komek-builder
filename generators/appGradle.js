const fs = require("fs-extra");
const path = require("path");

async function generate(androidDir) {

    const text = `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {

    namespace = "kz.komek.demo"

    compileSdk = 36

    defaultConfig {

        applicationId = "kz.komek.demo"

        minSdk = 24

        targetSdk = 36

        versionCode = 1

        versionName = "1.0"

    }

}

dependencies {

}
`;

    await fs.writeFile(
        path.join(androidDir, "app", "build.gradle.kts"),
        text
    );

    console.log("app/build.gradle.kts создан");
}

module.exports = {
    generate
};