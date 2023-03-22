#!/bin/bash
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