FROM ubuntu:latest
MAINTAINER Willian de Morais <williandmorais@gmail.com>

RUN apt-get update && apt-get install -y nodejs npm
RUN ln -s /usr/bin/nodejs /usr/bin/node

ADD . /code
WORKDIR /code