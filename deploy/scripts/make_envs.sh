#!/bin/bash

# Check if the network argument is provided
if [ -z "$1" ]; then
   echo "No network provided. Using default network eth."
   NETWORK=eth
else
   NETWORK=$1
   echo "Using provided network: $NETWORK"
fi

node --env-file=.env.local --env-file=src/configs/envs/.env."$NETWORK" make_envs.js
