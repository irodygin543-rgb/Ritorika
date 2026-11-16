#!/usr/bin/env node
"use strict";

/**
 * «Красноречие / Ritorika» — локальный сервер предпросмотра и раздачи APK.
 * Слушает 0.0.0.0 и отдаёт ./web (SPA) + ./releases/retorika.apk.
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";
const ROOT = __dirname;
const WEB_DIR = path.join(ROOT, "web");

const DOWNLOADS = [
  {
    route: "/downloads/retorika.apk",
    file: path.join(ROOT, "releases", "retorika.apk"),
    contentType: "application/vnd.android.package-archive",
    filename: "retorika.apk"
  }
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".apk": "application/vnd.android.package-archive"
};

function send(res, status, headers, body) {
  res.writeHead(status, Object.assign({
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "no-cache"
  }, headers));
  res.end(body);
}

const server = http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  } catch (_) {
    return send(res, 400, { "Content-Type": "text/plain; charset=utf-8" }, "Bad request");
  }

  for (const dl of DOWNLOADS) {
    if (urlPath === dl.route) {
      if (!fs.existsSync(dl.file)) {
        return send(res, 404, { "Content-Type": "text/plain; charset=utf-8" }, "Файл не найден.");
      }
      const stat = fs.statSync(dl.file);
      res.writeHead(200, {
        "Content-Type": dl.contentType,
        "Content-Length": stat.size,
        "Content-Disposition": `attachment; filename="${dl.filename}"`,
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff"
      });
      fs.createReadStream(dl.file).pipe(res);
      return;
    }
  }

  let relPath = urlPath === "/" ? "/index.html" : urlPath;
  const safePath = path.normalize(relPath).replace(/^(\.\.[/\\])+/, "");
  let fullPath = path.join(WEB_DIR, safePath);

  if (!fullPath.startsWith(WEB_DIR + path.sep) && fullPath !== WEB_DIR) {
    return send(res, 403, { "Content-Type": "text/plain; charset=utf-8" }, "Forbidden");
  }

  if (!fs.existsSync(fullPath) || fs.statSync(fullPath).isDirectory()) {
    // SPA fallback
    fullPath = path.join(WEB_DIR, "index.html");
  }

  const ext = path.extname(fullPath).toLowerCase();
  res.writeHead(200, {
    "Content-Type": MIME[ext] || "application/octet-stream",
    "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=3600",
    "X-Content-Type-Options": "nosniff"
  });
  fs.createReadStream(fullPath).pipe(res);
});

server.listen(PORT, HOST, () => {
  console.log(`Ritorika (Mate XT) preview listening on http://${HOST}:${PORT}`);
});
