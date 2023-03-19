#!/bin/bash

set -e
set -u

if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
	for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
		v1='CREATE DATABASE "'
		v1+=$db
		v1+='"'
		psql --username "$POSTGRES_USER" -qAtc <<< echo "SELECT 1 FROM pg_database WHERE datname = '$db'" | if ! grep 1; then psql --username "$POSTGRES_USER" -qAtc <<< echo "$v1"; fi
	done
fi
