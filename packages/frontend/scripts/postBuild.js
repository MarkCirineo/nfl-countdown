import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const adsenseScript = `
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.ADSENSE_ID}" crossorigin="anonymous"></script>
`;

const indexPath = path.resolve("./build/index.html");

let html = await fs.readFile(indexPath, { encoding: "utf-8" });
html = html.replace("<head>", `<head>${adsenseScript}`);

await fs.writeFile(indexPath, html, { encoding: "utf-8" });
console.log("Injected AdSense script into index.html");
