#!/usr/bin/env bash

npm install

ng serve > /dev/null &

json-server -p 3000 --watch db.json > /dev/null &

