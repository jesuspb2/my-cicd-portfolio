#!/bin/bash -e

echo "[INFO] Deploying redirect: jprianbaena.com → jesuspb.dev"
cd ./cicd/deployment/redirect || exit
terragrunt run-all apply --terragrunt-non-interactive -no-color

echo "[INFO] Done! If the Route53 zone was just created, update the nameservers at your domain registrar."
