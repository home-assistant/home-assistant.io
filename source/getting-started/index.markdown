---
layout: page
title: "Getting Started"
description: "Step by step guide to get started with Home Assistant."
date: 2014-12-18 22:57
sidebar: false
comments: false
sharing: true
footer: true
---

<div class='install-instructions-container'>
<input name='install-instructions' type='radio' id='normal-install' checked>
<input name='install-instructions' type='radio' id='raspberry-install'>
<input name='install-instructions' type='radio' id='docker-install'>
<label class='menu-selector normal' for='normal-install'>Install on local machine</label>
<label class='menu-selector raspberry' for='raspberry-install'>Install on a Raspberry Pi</label>
<label class='menu-selector docker' for='docker-install'>Install using Docker</label>


<h3>Installation</h3>


<div class='install-instructions normal'>
Installing and running Home Assistant on your local machine is easy. Make sure you have <a href='https://www.python.org/downloads/' target="_blank">Python 3.4</a> installed and execute the following code in a console:

<p>
```bash
pip3 install homeassistant
hass \-\-open-ui
```
</p>
<p>Running these commands will:</p>
<ol>
<li>Install Home Assistant</li>
<li>Launch Home Assistant and serve web interface on <a href='http://localhost:8123' target="_blank">http://localhost:8123</a></li>
</ol>
</div> <!-- INSTALL-INSTRUCTIONS NORMAL -->


<div class='install-instructions docker'>
<p>Installation with Docker is straightforward. Adjust the following command so that <code>/path/to/your/config/</code> points at the folder where you want to store your config and run it:</p>

```bash
docker run -d \-\-name="home-assistant" -v /path/to/your/config:/config -v /etc/localtime:/etc/localtime:ro \-\-net=host balloob/home-assistant
```

<p>This will launch Home Assistant and serve its web interface from port 8123 on your Docker host.</p>

<p class='note'>
When using boot2docker on OS X you are unable to map the local time to your Docker container. Replace <code>-v /etc/localtime:/etc/localtime:ro</code> with <code>-e "TZ=America/Los_Angeles"</code> (replacing America/Los_Angeles with <a href='http://en.wikipedia.org/wiki/List_of_tz_database_time_zones' target="_blank">your timezone</a>)
</p>
</div> <!-- INSTALL-INSTRUCTIONS DOCKER -->


<div class='install-instructions raspberry'>
<p>Home Assistant uses Python 3.4 which is not shipped with the current Raspbian distibution for the Raspberry Pi. Before installing Home Assistant, you will have to <a href="https://www.raspberrypi.org/forums/viewtopic.php?f=32&t=113961#p779265" target="_blank">install Python 3.4</a>.

Once that is complete, installing and running Home Assistant on your local machine is easy. Make sure you have <a href='https://www.python.org/downloads/' target="_blank">Python 3.4</a> installed and execute the following code in a console:

<p>
```bash
pip3 install homeassistant
hass \-\-open-ui
```
</p>
<p>Running these commands will:</p>
<ol>
<li>Install Home Assistant</li>
<li>Launch Home Assistant and serve web interface on <a href='http://localhost:8123' target="_blank">http://localhost:8123</a></li>
</ol>
</div> <!-- INSTALL-INSTRUCTIONS RASPBERRY -->


### {% linkable_title Troubleshooting %}

If you run into any issues, please see [the troubleshooting page](/getting-started/troubleshooting.html). It contains solutions to many of the more commonly encountered issues.

For additional help, in addition to this site, there are three sources:

 - [Gitter Chatroom](https://gitter.im/balloob/home-assistant) for general Home Assistant discussions and questions.
 - [Development Mailing List](https://groups.google.com/forum/#!forum/home-assistant-dev) for development related questions and discussing new features.
 - [GitHub Page](https://github.com/balloob/home-assistant) for issue reporting.

### {% linkable_title What's next %}
If you want to have Home Assistant start on boot, [autostart instructions](/getting-started/autostart.html) can be found here.

To see what Home Assistant can do, launch demo mode:
```bash
hass \-\-demo-mode
```

To update Home Assistant to the latest release:
```bash
pip3 install \-\-upgrade homeassistant
```

###[Next step: Configuring Home Assistant &raquo;](/getting-started/configuration.html)
