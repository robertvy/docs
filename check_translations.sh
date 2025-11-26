#!/bin/bash

# Script to check if English pages are translated to German
# Compares line counts to ballpark translation completeness

echo "=========================================="
echo "Translation Completeness Check (EN → DE)"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
total_files=0
translated_files=0
missing_files=0
incomplete_files=0

# Find all English .mdx files (excluding de/ directory)
while IFS= read -r en_file; do
    # Get relative path from root
    rel_path="${en_file}"

    # Skip if already in de/ directory
    if [[ "$rel_path" == de/* ]]; then
        continue
    fi

    total_files=$((total_files + 1))

    # Corresponding German file path
    de_file="de/${rel_path}"

    # Check if German translation exists
    if [ -f "$de_file" ]; then
        # Get line counts
        en_lines=$(wc -l < "$en_file")
        de_lines=$(wc -l < "$de_file")

        # Calculate percentage (allow 10% variance for translation differences)
        if [ $en_lines -gt 0 ]; then
            percentage=$((de_lines * 100 / en_lines))

            if [ $percentage -ge 90 ] && [ $percentage -le 110 ]; then
                echo -e "${GREEN}✓${NC} $rel_path (EN: $en_lines, DE: $de_lines)"
                translated_files=$((translated_files + 1))
            else
                echo -e "${YELLOW}⚠${NC} $rel_path (EN: $en_lines, DE: $de_lines) - Size mismatch: ${percentage}%"
                incomplete_files=$((incomplete_files + 1))
            fi
        fi
    else
        echo -e "${RED}✗${NC} $rel_path - MISSING German translation"
        missing_files=$((missing_files + 1))
    fi
done < <(find . -name "*.mdx" -not -path "./de/*" -not -path "./node_modules/*" -type f)

echo ""
echo "=========================================="
echo "Summary"
echo "=========================================="
echo "Total English files: $total_files"
echo -e "${GREEN}Fully translated: $translated_files${NC}"
echo -e "${YELLOW}Potentially incomplete: $incomplete_files${NC}"
echo -e "${RED}Missing translations: $missing_files${NC}"
echo ""

completion_rate=$((translated_files * 100 / total_files))
echo "Translation completion rate: ${completion_rate}%"
echo ""

if [ $missing_files -gt 0 ]; then
    echo "=========================================="
    echo "Missing Translations (details)"
    echo "=========================================="
    while IFS= read -r en_file; do
        rel_path="${en_file}"
        if [[ "$rel_path" == de/* ]]; then
            continue
        fi
        de_file="de/${rel_path}"
        if [ ! -f "$de_file" ]; then
            echo "$rel_path"
        fi
    done < <(find . -name "*.mdx" -not -path "./de/*" -not -path "./node_modules/*" -type f)
fi
