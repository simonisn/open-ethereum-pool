#!/bin/bash

API_SERVICE="ubiqpool-api.service"
PROXY_SERVICE="ubiqpool-proxy.service"
PAYOUTS_SERVICE="ubiqpool-payouts.service"
UNLOCKER_SERVICE="ubiqpool-unlocker.service"

SERVICE_FILE_DIR="/etc/systemd/system"

set -e

# Shared Functions
execute_service_uninstall () {
   service_name=$1
   
   echo "Executing service uninstall for $service_name"
   
   # Verify that the service is currently installed
   if is_service_installed $service_name; then
      # Check if the service is running
      if is_service_running $service_name; then
         # Stop the service
         stop_service $service_name
      fi
      
      # Check if the service is enabled and disable if so
      if is_service_enabled "$service_name"; then
         disable_service $service_name
      fi
   fi
   
   
   # Remove the service file from /etc/systemd/system
   if service_file_exists $service_name; then
      remove_service_file $service_name
   fi
}

is_service_installed () {
   service_name=$1
   
   echo "Checking if $service_name is installed."
   
   # Verify that systemctl returns data about the requested service
   grep_line=$(systemctl list-units --all $service_name | grep $service_name)
   
   # We don't care about the ActiveState or SubState at this point, just need to confirm that the service exists
   if [[ $grep_line == *"$service_name"* ]]; then
      echo "$service_name is currently installed."      
      return 0
   else
      echo "$service_name is NOT currently installed."      
      return 1
   fi
}

is_service_running () {
   service_name=$1
   
   echo "Checking if $service_name is running."
   
   substate=$(systemctl show -p SubState $service_name | grep -oP '(?<=SubState\=).*')
   
   echo "Substate=$substate"
   
   if [[ "$substate" == "running" ]]; then
      echo "$service_name is currently running."
      return 0
   else      
      echo "$service_name is not currently running."      
      return 1
   fi
}

is_service_enabled () {
   service_name=$1
   
   echo "Checking if $service_name is enabled."
  
   enabled=$(systemctl is-enabled $service_name)
   
   echo "Enabled=$enabled"
  
   if [[ "$enabled" == "enabled" ]]; then
      echo "$service_name is currently enabled."
      return 0
   else  
      echo "$service_name is NOT currently enabled."
      return 1
   fi
}

service_file_exists () {
   service_name=$1
   file_path="$SERVICE_FILE_DIR/$service_name"
   
   if [ -e $file_path ]; then
      echo "File $file_path exists."
      return 0
   else      
      echo "File $file_path does NOT exist."
      return 1
   fi
}

stop_service () {
   service_name=$1
   
   echo "Stopping service $service_name"
   
   $(systemctl stop $service_name)
   
   return 0
}

disable_service () {
   service_name=$1
   
   echo "Disabling service $service_name"
   
   $(systemctl disable $service_name)
   
   return 0
}

remove_service_file () {
   service_name=$1
   file_path="$SERVICE_FILE_DIR/$service_name"
   
   echo "Removing $service_name file from $SERVICE_FILE_DIR"
   
   $(rm $file_path)
   
   return 0
}

execute_service_uninstall $API_SERVICE
execute_service_uninstall $PROXY_SERVICE
execute_service_uninstall $UNLOCKER_SERVICE
execute_service_uninstall $PAYOUTS_SERVICE

$(systemctl daemon-reload)

exit 0