const fs = require("fs-extra");
const path = require("path");

async function generate(androidDir, config) {

    const manifestDir = path.join(
        androidDir,
        "app",
        "src",
        "main"
    );

    await fs.ensureDir(manifestDir);

    const manifest = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <application
        android:label="${config.name}">

        <activity
            android:name=".MainActivity"
            android:exported="true">

            <intent-filter>

                <action android:name="android.intent.action.MAIN"/>

                <category
                    android:name="android.intent.category.LAUNCHER"/>

            </intent-filter>

        </activity>

    </application>

</manifest>
`;

    await fs.writeFile(
        path.join(manifestDir, "AndroidManifest.xml"),
        manifest
    );

    console.log("AndroidManifest.xml создан");
}

module.exports = {
    generate
};