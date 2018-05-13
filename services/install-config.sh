#!/bin/bash

set -e

REPO_INSTALL_DIR="$PWD"
SCRIPT_NAME="install-config.sh"

CONFIG_SRC_DIR="$REPO_INSTALL_DIR/config"
CONFIG_DEST_DIR="/etc/ubiqpool/config"

API_CONFIG="ubiqpool-api.json"
PROXY_CONFIG="ubiqpool-proxy.json"
PAYOUTS_CONFIG="ubiqpool-payouts.json"
UNLOCKER_CONFIG="ubiqpool-unlocker.json"

if [ ! -f "./$SCRIPT_NAME" ]; then
    echo "$0 must be run from the root of the repository."
    exit 2
fi

if [ ! -d "$CONFIG_SRC_DIR" ]; then
    echo "$0 must be run from the root of the repository."
    exit 2
fi

install_run_script () {
   config_name=$1
   src_filepath="$CONFIG_SRC_DIR/$config_name"
   dest_filepath="$CONFIG_DEST_DIR/$config_name"
   
   echo "Installing Config File $config_name"
   
   # Create the Config File folder if needed.
   if [ ! -d $CONFIG_DEST_DIR ]; then
      # "-p" indicates that  parent folders will be created if needed.
      $(mkdir -p $CONFIG_DEST_DIR)
      
      echo "Created Config File destination directory: $CONFIG_DEST_DIR"
   fi
   
   # Copy the Config File and prompt for overwrite (don't want to cause data loss).
   $(cp $src_filepath $dest_filepath)
   
   echo "Installed Config File $config_name to $dest_filepath"
   
   return 0
}

install_run_script $API_CONFIG
install_run_script $PROXY_CONFIG
install_run_script $PAYOUTS_CONFIG
install_run_script $UNLOCKER_CONFIG

exit 0