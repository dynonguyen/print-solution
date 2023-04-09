#!/bin/sh

mongoimport --host mongo:27017 --db catalog --collection categories --file /mongo-export/categories.json
mongoimport --host mongo:27017 --db catalog --collection products --file /mongo-export/products.json