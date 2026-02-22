#!/usr/bin/env bash
set -euo pipefail

# Package Track Me Bro for Chrome Web Store submission
# Output: store-listing/track-me-bro.zip

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
OUT="$SCRIPT_DIR/track-me-bro.zip"

rm -f "$OUT"

cd "$ROOT_DIR"

zip -j9 "$OUT" manifest.json
zip -r9 "$OUT" \
  src/background.js \
  src/content.js \
  src/quips.js \
  src/popup/popup.html \
  src/popup/popup.js \
  src/popup/popup.css \
  icons/icon-16.png \
  icons/icon-32.png \
  icons/icon-48.png \
  icons/icon-128.png

echo ""
echo "Packaged: $OUT"
echo "Files:"
unzip -l "$OUT"
