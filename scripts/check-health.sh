#!/bin/bash

echo "Account"
curl http://localhost:3000/api/account/check-health
echo $'\n--------------'

echo "Docs"
curl http://localhost:3000/api/docs/check-health
echo $'\n--------------'


echo "Shipping"
curl http://localhost:3000/api/shipping/check-health
echo $'\n--------------'


echo "Payment"
curl http://localhost:3000/api/payment/check-health
echo $'\n--------------'


echo "Order"
curl http://localhost:3000/api/order/check-health
echo $'\n--------------'