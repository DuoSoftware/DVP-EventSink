#FROM ubuntu
#RUN apt-get update
#RUN apt-get install -y git nodejs npm
#RUN git clone https://github.com/DuoSoftware/DVP-EventSink.git /usr/local/src/eventsink
#RUN cd /usr/local/src/eventsink; npm install
#CMD ["nodejs", "/usr/local/src/eventsink/app.js"]

#EXPOSE 8838

FROM node:5.10.0
RUN git clone https://github.com/DuoSoftware/DVP-EventSink.git /usr/local/src/eventsink
RUN cd /usr/local/src/eventsink;
WORKDIR /usr/local/src/eventsink
RUN npm install
EXPOSE 8838
CMD [ "node", "/usr/local/src/eventsink/app.js" ]
