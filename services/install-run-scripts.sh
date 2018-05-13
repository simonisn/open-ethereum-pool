#!/bin/bash

set -e

REPO_INSTALL_DIR="$PWD"
SCRIPT_NAME="install-run-scripts.sh"

RUN_SCRIPT_SRC_DIR="$REPO_INSTALL_DIR/scripts"
RUN_SCRIPT_DEST_DIR="/etc/ubiqpool/scripts"

API_RUN_SCRIPT="run-ubiqpool-api.sh"
PROXY_RUN_SCRIPT="run-ubiqpool-proxy.sh"
PAYOUTS_RUN_SCRIPT="run-ubiqpool-payouts.sh"
UNLOCKER_RUN_SCRIPT="run-ubiqpool-unlocker.sh"

if [ ! -f "./$SCRIPT_NAME" ]; then
    echo "$0 must be run from the root of the repository."
    exit 2
fi

if [ ! -d "$RUN_SCRIPT_SRC_DIR" ]; then
    echo "$0 must be run from the root of the repository."
    exit 2
fi

install_run_script () {
   script_name=$1
   src_filepath="$RUN_SCRIPT_SRC_DIR/$script_name"
   dest_filepath="$RUN_SCRIPT_DEST_DIR/$script_name"
   
   echo "Installing Run Script $script_name"
   
   # Create the Run Script folder if needed.
   if [ ! -d $RUN_SCRIPT_DEST_DIR ]; then
      # "-p" indicates that  parent folders will be created if needed.
      $(mkdir -p $RUN_SCRIPT_DEST_DIR)
      
      echo "Created Run Script destination directory: $RUN_SCRIPT_DEST_DIR"
   fi
   
   # Copy the Run Script and overwrite an existing file.  
   # "-rf" indicates that the file should be replaced (if it already exists) without prompting for input.
   $(cp -rf $src_filepath $dest_filepath)
   
   echo "Installed Run Script $script_name to $dest_filepath"
   
   return 0
}

install_run_script $API_RUN_SCRIPT
install_run_script $PROXY_RUN_SCRIPT
install_run_script $PAYOUTS_RUN_SCRIPT
install_run_script $UNLOCKER_RUN_SCRIPT

exit 0