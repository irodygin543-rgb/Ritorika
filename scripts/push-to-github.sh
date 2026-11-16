#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Использование: ./scripts/push-to-github.sh https://github.com/<ваш-логин>/Ritorika.git"
  exit 1
fi

REMOTE_URL="$1"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

git branch -M main
git push -u origin main
echo "Готово! Репозиторий Ritorika опубликован. Откройте вкладки Actions и Releases на GitHub."
