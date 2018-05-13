#!/bin/bash

set -e

REPO_INSTALL_DIR="$PWD"
SCRIPT_NAME="install.sh"

UNINSTALL_SERVICES="./uninstall-services.sh"
INSTALL_CONFIG="./install-config.sh"
INSTALL_RUN_SCRIPTS="./install-run-scripts.sh"
INSTALL_SERVICES="./install-services.sh"

if [ ! -f "./$SCRIPT_NAME" ]; then
    echo "$0 must be run from the root of the repository."
    exit 2
fi

# Uninstall Services
echo "Uninstalling Services: Starting"
$UNINSTALL_SERVICES
echo "Uninstalling Services: Completed"

# Install Config Files
echo "Installing Config Files: Starting"
$INSTALL_CONFIG
echo "Installing Config Files: Completed"

# Install Run Scripts
echo "Installing Run Scripts: Starting"
$INSTALL_RUN_SCRIPTS
echo "Installing Run Scripts: Completed"

# Install Services
echo "Installing Services: Starting"
$INSTALL_SERVICES
echo "Installing Services: Completed"

exit 0
