#!/bin/bash

# Script này để tự động hóa quá trình chạy các service thủ công, quản lý qua pm2
# Tuy nhiên nếu chạy qua cách này cần cài thủ công Mongodb, postgres, keycloak, nginx, ...
# Thích hợp chạy solution-sketch

source ./env.sh

# Add pm2 package
if ! npm list -g | grep -q "pm2"
then
  start_process "INSTALL pm2 package"
  npm install -g yarn
  yarn global add pm2
  end_process
fi

# Install package & add .env
for app_name in "${APPS[@]}"
do
  start_process "INSTALL PACKAGES FOR $app_name"
  cd $ROOT_DIR/$app_name
  copy_env
  yarn install
  end_process
done

# Run all services
cd $ROOT_DIR/scripts
chmod +x pm2-start.sh
./pm2-start.sh