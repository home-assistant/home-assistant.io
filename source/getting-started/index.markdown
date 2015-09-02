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

<h3>Requirements</h3>
<p>Home Assistant requires at least <a href="https://www.python.org/downloads/" target="_blank">Python 3.4</a>. For the Raspberry Pi, install instructions can be found <a href="http://depado.markdownblog.com/2015-03-12-short-tutorial-raspbian-python3-4-rpi-gpio" target="_blank">here</a>. Other systems generally have this bundled or contain easy to install packages.</p>

<p>To ensure Python 3.4 is installed, type the following command into the console:</p>

```bash
python3 --version
```


<h3>Installation</h3>
<div class='install-channels-container'>
<input name='install-channels' type='radio' id='prod-channel' checked>
<input name='install-channels' type='radio' id='beta-channel'>
<input name='install-channels' type='radio' id='dev-channel'>
<label class='menu-selector prodchan' for='prod-channel'>Production Channel</label>
<label class='menu-selector betachan' for='beta-channel'>Beta Channel</label>
<label class='menu-selector devchan' for='dev-channel'>Development Channel</label>

<div class='install-channels prodchan'>
<p>Installing from the production channel is fast, easy, and will provide you with access to the newest stable builds. This is recommended for most users. To install, execute the following code in a console:</p>
```bash
pip3 install homeassistant
hass --open-ui
```
<p>Running these commands will:
<ol>
<li>Install Home Assistant</li>
<li>Launch Home Assistant and serve web interface on <a href='http://localhost:8123'>http://localhost:8123</a></li>
</ol></p>
<p>When new stable versions are released, you can upgrade to newest version by typing the following into a console:</p>
```bash
pip3 install --upgrade homeassistant
```
</div>

<div class='install-channels betachan'>
<p>The beta channel will provide you with newer features sooner but at the risk of reduced stability. The brave and curious are welcomed here. To install, execute the following code in a console:</p>
```bash
pip3 install --pre homeassistant
hass --open-ui
```
<p>Running these commands will:
<ol>
<li>Install Home Assistant</li>
<li>Launch Home Assistant and serve web interface on <a href='http://localhost:8123'>http://localhost:8123</a></li>
</ol></p>
<p>When new a new release candidate, alpha, or beta version is released, you can upgrade to newest version by typing the following into a console:</p>
```bash
pip3 install --pre --upgrade homeassistant
```
</div>

<div class='install-channels devchan'>
<p>The development channel provides builds that are on the bleeding edge. This builds have not been fully tested or used. This is best for potential contributors and tinkerers. Subscribing to this channel is not for the faint of heart and requires significant knowledge of Git and Python.</p>
```bash
# Clone repo from git, you may want to use your own fork
git clone --recursive https://github.com/balloob/home-assistant.git
cd home-assistant
# You may want to switch to a virtual environment here
# Install Home Assistant in development mode
python3 setup.py develop
# Optionally pre-emptively install all possible dependencies
pip3 install -r requirements_all.txt
```
<p>To keep up-to-date with the development channel, you will have to fetch and merge from the dev branch in the head repository. Be careful when doing this.</p>
```bash
git fetch balloob
git merge remotes/balloob/dev
```
</div>

</div><!-- install-channels-container -->


<h3>Troubleshooting</h3>

<p>If you run into any issues, please see the <a href='{{site_root}}/getting-started/troubleshooting.html'>troubleshooting page</a>. It contains solutions to many of the common issues.</p>

<p>For additional help, in addition to this site, there are three sources:
<ul>
<li><a href="https://gitter.im/balloob/home-assistant" target="_blank">Gitter Chatroom</a> for general Home Assistant discussions and questions.</li>
<li><a href="https://groups.google.com/forum/#!forum/home-assistant-dev" target="_blank">Development Mailing List</a> for development related questions and discussing new features.</li>
<li><a href="https://github.com/balloob/home-assistant" target="_blank">GitHub Page</a> for issue reporting.</li>
</ul>
</p>


<h3>What's Next</h3>
<p>If you want to see what Home Assistant can do, you can start the demo mode by running <code>hass --demo-mode</code>. Home Assistant has a few other command line flags that can be displayed by running <code>hass --help</code>.</p>
<p>From here you may now start configuring Home Assistant to your liking. For more advanced users, the <a href='{{site_root}}/getting-started/advanced.html'>advanced configuration page</a> contains brief tutorials on creating more advanced installations such as installing daemons and using Docker.</p>


###[Next step: configuring Home Assistant &raquo;](/getting-started/configuration.html)
