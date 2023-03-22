#!/bin/bash
source ./env.sh

for app_name in "${APPS[@]}"
do
  cd $ROOT_DIR/$app_name
  copy_env
done