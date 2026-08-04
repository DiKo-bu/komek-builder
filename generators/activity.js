const fs = require("fs-extra");
const path = require("path");

async function generate(androidDir, config) {

    const packageDir = path.join(
        androidDir,
        "app",
        "src",
        "main",
        "kotlin",
        ...config.package.split(".")
    );

    await fs.ensureDir(packageDir);

    const source = `package ${config.package}

import android.app.Activity
import android.os.Bundle

class MainActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

}
`;

    await fs.writeFile(
        path.join(packageDir, "MainActivity.kt"),
        source
    );

    console.log("MainActivity создан");
}

module.exports = {
    generate
};