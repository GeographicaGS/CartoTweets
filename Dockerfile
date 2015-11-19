FROM nodesource/trusty:0.10.30

ADD gettweets /app
ADD init /init

RUN	cd /app && \
	npm install

CMD /init/start.sh
