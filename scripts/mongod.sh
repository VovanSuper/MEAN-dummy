#!/bin/sh

mongod --bind_ip=$IP --dbpath=data --nojournal
