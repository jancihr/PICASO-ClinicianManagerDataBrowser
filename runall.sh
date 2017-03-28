#!/usr/bin/env bash

lsof -t -i tcp:9005 | xargs kill -9

lsof -t -i tcp:9004 | xargs kill -9

npm install

ng serve --port 9005 > /dev/null &

json-server -port 9004 --watch fakeODS/db.json > /dev/null &

