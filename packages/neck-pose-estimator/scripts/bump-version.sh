#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Define the path to the package.json file
PACKAGE_JSON_PATH="./package.json"

# Get the current version from package.json using Node.js to safely parse the JSON
CURRENT_VERSION=$(node -p "require('./${PACKAGE_JSON_PATH}').version")

# Split the version string into major, minor, and patch components
IFS='.' read -r -a version_parts <<< "$CURRENT_VERSION"
major=${version_parts[0]}
minor=${version_parts[1]}
patch=${version_parts[2]}

# Increment the patch version
new_patch=$((patch + 1))

# Construct the new version string
NEW_VERSION="$major.$minor.$new_patch"

echo "Updating version from $CURRENT_VERSION to $NEW_VERSION..."

# Use pnpm to set the new version in the package.json of the neck-pose-estimator package
pnpm pkg set version="$NEW_VERSION"

echo "Successfully updated version to $NEW_VERSION in $PACKAGE_JSON_PATH"
