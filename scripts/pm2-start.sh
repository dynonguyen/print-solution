#!/bin/bash

# Tương tự auto run, nhưng file này chạy những lần sau khi đã chạy auto run để cài packages.

source ./env.sh

# Kill all apps
pm2 kill

# Start all apps
for app_name in "${APPS[@]}"
do
  cd $ROOT_DIR/$app_name
  pm2 start "yarn -s dev" --name $app_name
done
