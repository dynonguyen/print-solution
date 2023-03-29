#!/bin/sh

if ! npm list -g | grep -q "cz-customizable"
then
  start_process "INSTALL cz-customizable package"
  npm install -g cz-customizable
  end_process
fi

cz-cust
