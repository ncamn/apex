#!/usr/bin/env bash

CERTS_DIR=tls

mkdir -p $CERTS_DIR

openssl req -x509 -newkey ec:<(openssl ecparam -name prime256v1) -nodes -sha256 -subj '/CN=localhost' \
  -keyout $CERTS_DIR/localhost-privkey.pem -out $CERTS_DIR/localhost-cert.pem
