#!/bin/bash
set -e

cd "$(dirname "$0")"
bun run package
code --install-extension vscode-line-cp-*.vsix
rm -f vscode-line-cp-*.vsix
echo "Installed successfully. Reload VS Code to activate."
