---
layout: page
title: "Installation on Docker"
description: "Instructions to install Home Assistant on a Docker."
date: 2016-04-16 11:36
sidebar: true
comments: false
sharing: true
footer: true
---

Installation with Docker is straightforward. Adjust the following command so that `/path/to/your/config/` points at the folder where you want to store your config and run it:

```bash
$ docker run -d --name="home-assistant" -v /path/to/your/config:/config -v /etc/localtime:/etc/localtime:ro --net=host homeassistant/home-assistant
```

This will launch Home Assistant and serve the web interface from port 8123 on your Docker host.

<p class='note'>
When using boot2docker on OS X you are unable to map the local time to your Docker container. Replace `-v /etc/localtime:/etc/localtime:ro` with `-e "TZ=America/Los_Angeles"` (replacing America/Los_Angeles with [your timezone](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones))
</p>

If you change the config you have to restart the server.
To do that you have 2 options.

 1. You can go to the <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> service developer tools, select the service `homeassistant/restart` and click "Call Service".
 2. Or you can restart it from an terminal by running `docker restart home-assistant`

### {% linkable_title Troubleshooting %}

If you run into any issues, please see [the troubleshooting page](/getting-started/troubleshooting/). It contains solutions to many of the more commonly encountered issues.

In addition to this site, check out these sources for additional help:

 - [Forum](https://community.home-assistant.io) for Home Assistant discussions and questions.
 - [Gitter Chat Room](https://gitter.im/home-assistant/home-assistant) for real-time chat about Home Assistant.
 - [GitHub Page](https://github.com/home-assistant/home-assistant/issues) for issue reporting.

### [Next step: Configuring Home Assistant &raquo;](/getting-started/configuration/)
