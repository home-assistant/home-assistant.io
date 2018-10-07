FROM alpine:3.7

ENV HUGO_VERSION 0.49
ENV HUGO_BINARY hugo_${HUGO_VERSION}_linux-64bit
ENV HUGO_BASE_URL http://localhost:1313

RUN cd /tmp \
    && wget https://github.com/spf13/hugo/releases/download/v${HUGO_VERSION}/${HUGO_BINARY}.tar.gz \
    && tar -xf /tmp/${HUGO_BINARY}.tar.gz -C /tmp \
    && mkdir -p /usr/local/sbin \
    && mv /tmp/hugo /usr/local/sbin/hugo \
    && rm -rf /tmp/* \
    && apk --update add --no-cache git

VOLUME /src
WORKDIR /src

EXPOSE 1313
CMD hugo server -b ${HUGO_BASE_URL} --bind=0.0.0.0
