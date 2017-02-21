---
layout: page
title: "Installation on Docker"
description: "Instructions to install Home Assistant on a Docker."
date: 2016-04-16 11:36
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/installation-docker/
---

Installation with Docker is straightforward. Adjust the following command so that `/path/to/your/config/` points at the folder where you want to store your config and run it:

### {% linkable_title Linux %}

```bash
$ docker run -d --name="home-assistant" -v /path/to/your/config:/config -v /etc/localtime:/etc/localtime:ro --net=host homeassistant/home-assistant
```

### {% linkable_title macOS %}

When using `boot2docker` on macOS you are unable to map the local time to your Docker container. Use `-e "TZ=America/Los_Angeles"` instead of `-v /etc/localtime:/etc/localtime:ro`. Replace "America/Los_Angeles" with [your timezone](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

Additionally, if your expectation is that you will be able to browse directly to `http://localhost:8123` on your macOS host, then you will also need to replace the `--net=host` switch with `-p 8123:8123`. This is currently the only way to forward ports on to your actual host (macOS) machine instead of the virtual machine inside `xhyve`. More detail on this can be found in [the docker forums](https://forums.docker.com/t/should-docker-run-net-host-work/14215/10).

```bash
$ docker run -d --name="home-assistant" -v /path/to/your/config:/config -e "TZ=America/Los_Angeles" -p 8123:8123 homeassistant/home-assistant
```

### {% linkable_title Restart %}

This will launch Home Assistant and serve the web interface from port 8123 on your Docker host.

If you change the configuration you have to restart the server. To do that you have 2 options.

 1. You can go to the <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> service developer tools, select the service `homeassistant/restart` and click "Call Service".
 2. Or you can restart it from an terminal by running `docker restart home-assistant`
