#!/bin/bash

# Script này dùng để install các packages trong quá trình dev khi chạy qua docker compose
# Nếu không chạy script này sẽ không ảnh hưởng đến kết quả do trong container đã có node_modules. Tuy nhiên, VScode sẽ không autosuggest code

source ./env.sh

for app_name in "${APPS[@]}"
do
  cd $ROOT_DIR/$app_name
  yarn install
done