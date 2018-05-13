#!/bin/bash

set -e

REPO_INSTALL_DIR="$PWD"
SCRIPT_NAME="install-services.sh"

API_SERVICE="ubiqpool-api.service"
PROXY_SERVICE="ubiqpool-proxy.service"
PAYOUTS_SERVICE="ubiqpool-payouts.service"
UNLOCKER_SERVICE="ubiqpool-unlocker.service"

SERVICE_FILE_SRC_DIR="$REPO_INSTALL_DIR/services"
SERVICE_FILE_DEST_DIR="/etc/systemd/system"

if [ ! -f "./$SCRIPT_NAME" ]; then
    echo "$0 must be run from the root of the repository."
    exit 2
fi

if [ ! -d "$SERVICE_FILE_SRC_DIR" ]; then
    echo "$0 must be run from the root of the repository."
    exit 2
fi

execute_service_install () {
   service_name=$1
   src_filepath="$SERVICE_FILE_SRC_DIR/$service_name"
   dest_filepath="$SERVICE_FILE_DEST_DIR/$service_name"   
   
   # Copy service file to /etc/systemd/system.  Overwrite if it already exists.
   $(cp -rf $src_filepath $dest_filepath)
   
   # systemctl daemon-reload
   $(systemctl daemon-reload)
   
   # enable service
   $(systemctl enable $service_name)
   
   # start service   
   $(systemctl start $service_name)
   
   return 0
}

execute_service_install $API_SERVICE
execute_service_install $PROXY_SERVICE
execute_service_install $UNLOCKER_SERVICE
execute_service_install $PAYOUTS_SERVICE

exit 0