#!/bin/bash

set -m

# Start the primary process and put it in the background
npm run start &

# Start the helper process
cd ./client && npm run start
#
fg %1