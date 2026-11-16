#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT_DIR/web"
DST="$ROOT_DIR/android/app/src/main/assets/www"

rm -rf "$DST"
mkdir -p "$DST"
cp -R "$SRC"/. "$DST"/

echo "Synced web/ -> android/app/src/main/assets/www/"
