#!/bin/bash

# Script này để copy file .env.example thành .env
# Việc này sẽ override lại file .env hiện có

source ./env.sh

for app_name in "${APPS[@]}"
do
  cd $ROOT_DIR/$app_name
  copy_env
done