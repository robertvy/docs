#!/bin/bash

# Legacy helper kept for local workflows while docs remain English-only.
# For actual docs validation, use the English audit scripts in package.json.

set -euo pipefail

echo "=========================================="
echo "Documentation Locale Check"
echo "=========================================="
echo ""

locale_dirs=(de es fr it pt)

english_files=$(
  find . -name "*.mdx" \
    -not -path "./de/*" \
    -not -path "./es/*" \
    -not -path "./fr/*" \
    -not -path "./it/*" \
    -not -path "./pt/*" \
    -not -path "./node_modules/*" \
    -type f | wc -l | tr -d ' '
)

active_locales=()

for locale in "${locale_dirs[@]}"; do
  if [ -d "$locale" ] && find "$locale" -name "*.mdx" -print -quit | grep -q .; then
    active_locales+=("$locale")
  fi
done

echo "English .mdx files: $english_files"
echo ""

if [ ${#active_locales[@]} -eq 0 ]; then
  echo "Localized docs are currently disabled."
  echo "Canonical documentation is English-only."
  echo ""
  echo "Use one of these scripts for content validation:"
  echo "- npm run audit:en"
  echo "- npm run audit:en:strict"
  exit 0
fi

echo "Localized docs trees are present, but English-only mode is still assumed."
echo "Detected locale content:"

for locale in "${active_locales[@]}"; do
  locale_files=$(find "$locale" -name "*.mdx" -type f | wc -l | tr -d ' ')
  echo "- $locale: $locale_files files"
done

echo ""
echo "If you re-enable localized docs, restore locale navigation and add a dedicated completeness check before relying on translation status."
