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
hass --open-ui
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
docker run -d --name="home-assistant" -v /path/to/your/config:/config -v /etc/localtime:/etc/localtime:ro --net=host balloob/home-assistant
```

<p>This will launch Home Assistant and serve its web interface from port 8123 on your Docker host.</p>

<p class='note'>
When using boot2docker on OS X you are unable to map the local time to your Docker container. Replace <code>-v /etc/localtime:/etc/localtime:ro</code> with <code>-e "TZ=America/Los_Angeles"</code> (replacing America/Los_Angeles with <a href='http://en.wikipedia.org/wiki/List_of_tz_database_time_zones' target="_blank">your timezone</a>)
</p>
</div> <!-- INSTALL-INSTRUCTIONS DOCKER -->


<div class='install-instructions raspberry'>
<p>Home Assistant uses Python 3.4 which is not shipped with the current Raspbian distibution for the Raspberry Pi. Before installing Home Assistant, you will have to <a href="http://depado.markdownblog.com/2015-03-12-short-tutorial-raspbian-python3-4-rpi-gpio"> target="_blank"install Python 3.4</a>.

Once that is complete, installing and running Home Assistant on your local machine is easy. Make sure you have <a href='https://www.python.org/downloads/' target="_blank">Python 3.4</a> installed and execute the following code in a console:

<p>
```bash
pip3 install homeassistant
hass --open-ui
```
</p>
<p>Running these commands will:</p>
<ol>
<li>Install Home Assistant</li>
<li>Launch Home Assistant and serve web interface on <a href='http://localhost:8123' target="_blank">http://localhost:8123</a></li>
</ol>
</div> <!-- INSTALL-INSTRUCTIONS RASPBERRY -->


<h3>Troubleshooting</h3>

<p>If you run into any issues, please see the <a href='{{site_root}}/getting-started/troubleshooting.html'>troubleshooting page</a>. It contains solutions to many of the common issues.</p>

<p>For additional help, in addition to this site, there are three sources:
<ul>
<li><a href="https://gitter.im/balloob/home-assistant" target="_blank">Gitter Chatroom</a> for general Home Assistant discussions and questions.</li>
<li><a href="https://groups.google.com/forum/#!forum/home-assistant-dev" target="_blank">Development Mailing List</a> for development related questions and discussing new features.</li>
<li><a href="https://github.com/balloob/home-assistant" target="_blank">GitHub Page</a> for issue reporting.</li>
</ul>
</p>

<h3>Staying Up to Date</h3>
<p>In order to update Home Assistant to the latest stable release, simply type the following into a console:</p>
```bash
pip install --upgrade homeassistant
```
<p>If you would like to stay up to date with the newest unstable builds (alphas, betas, and release candidates), use this command:</p>
```bash
pip install --upgrade --pre homeassistant
```

<h3>What's Next</h3>
<p>If you want to see what Home Assistant can do, you can start the demo mode by running <code>hass --demo-mode</code>. Home Assistant has a few other command line flags that can be displayed by running <code>hass --help</code>.</p>
<p>From here you may now start configuring Home Assistant to your liking. For more advanced users, the <a href='{{site_root}}/getting-started/advanced.html'>advanced configuration page</a> contains brief tutorials on creating more advanced installations.</p>


###[Next step: configuring Home Assistant &raquo;](/getting-started/configuration.html)
