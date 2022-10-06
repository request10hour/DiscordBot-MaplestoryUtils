#!/bin/sh

pm2 start index.js --watch --ignore-watch='logs err node_modules' -o log -e err --time
