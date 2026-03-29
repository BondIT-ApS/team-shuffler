#!/bin/bash
# Version increment script for team-shuffler
# Calculates next patch version based on existing git tags (YY.MM.PATCH format)

set -euo pipefail

get_current_month() {
    date +"%y.%-m"
}

get_latest_version() {
    local current_month=$1
    local tags
    tags=$(git tag -l "${current_month}.*" | sort -V | tail -1)
    if [[ -z "$tags" ]]; then
        echo "${current_month}.0"
    else
        echo "$tags"
    fi
}

increment_patch() {
    local version=$1
    local year_month
    year_month=$(echo "$version" | cut -d. -f1,2)
    local patch
    patch=$(echo "$version" | cut -d. -f3)
    local new_patch=$((patch + 1))
    echo "${year_month}.${new_patch}"
}

echo "🔍 Calculating next version..."

CURRENT_MONTH=$(get_current_month)
echo "📅 Current month: $CURRENT_MONTH"

LATEST_VERSION=$(get_latest_version "$CURRENT_MONTH")
echo "📋 Latest version: $LATEST_VERSION"

LATEST_MONTH=$(echo "$LATEST_VERSION" | cut -d. -f1,2)

if [[ "$CURRENT_MONTH" == "$LATEST_MONTH" ]]; then
    NEW_VERSION=$(increment_patch "$LATEST_VERSION")
    echo "⬆️ Incrementing patch version"
else
    NEW_VERSION="${CURRENT_MONTH}.0"
    echo "📅 New month — starting fresh"
fi

echo "🎯 Next version: $NEW_VERSION"

if ! [[ "$NEW_VERSION" =~ ^[0-9]{2}\.[0-9]{1,2}\.[0-9]+$ ]]; then
    echo "❌ Invalid version format: $NEW_VERSION"
    exit 1
fi

if [[ "${GITHUB_ACTIONS:-false}" == "true" ]]; then
    echo "new_version=$NEW_VERSION" >> "$GITHUB_OUTPUT"
    echo "latest_version=$LATEST_VERSION" >> "$GITHUB_OUTPUT"
    echo "current_month=$CURRENT_MONTH" >> "$GITHUB_OUTPUT"
fi

echo "✅ Version calculation complete: $LATEST_VERSION → $NEW_VERSION"
