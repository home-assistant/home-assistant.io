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
<div class='install-instructions normal'>

Installing and running Home Assistant on your local machine is easy. Make sure you have <a href='https://www.python.org/downloads/'>Python 3.4</a> and <a href='http://git-scm.com/downloads'>git</a> installed and execute the following code in a console:

<p>
```bash
git clone --recursive https://github.com/balloob/home-assistant.git
cd home-assistant
python3 -m pip install -r requirements.txt
python3 -m homeassistant --open-ui
```
</p>
<p>Running these commands will:</p>
<ol>
<li>Download Home Assistant</li>
<li>Navigate to downloaded files</li>
<li>Install the dependencies</li>
<li>Launch Home Assistant and serve web interface on <a href='http://localhost:8123'>http://localhost:8123</a></li>
</ol>
<p>If you run into any issues, please see the <a href='{{site_root}}/getting-started/troubleshooting.html'>troubleshooting page</a>.</p>

<p class='note'>
  You can run Home Assistant in demo mode by appending <code>--demo-mode</code> to line 4.
</p>

<p class='note'>
  If you want to update to the latest version in the future, run: <code>scripts/update</code>.
</p>

</div>

<div class='install-instructions docker'>
<p>Installation with Docker is straightforward. Adjust the following command so that <code>/path/to/your/config/</code> points at the folder where you want to store your config and run it:</p>

```bash
docker run -d --name="home-assistant" -v /path/to/your/config:/config -v /etc/localtime:/etc/localtime:ro --net=host balloob/home-assistant
```

<p>This will launch Home Assistant and serve its web interface from port 8123 on your Docker host.</p>

<p class='note'>
When using boot2docker on OS X you are unable to map the local time to your Docker container. Replace <code>-v /etc/localtime:/etc/localtime:ro</code> with <code>-e "TZ=America/Los_Angeles"</code> (replacing America/Los_Angeles with <a href='http://en.wikipedia.org/wiki/List_of_tz_database_time_zones'>your timezone</a>)
</p>
</div>

<div class='install-instructions raspberry'>

<p>Home Assistant uses Python 3.4. This makes installation on a Raspberry Pi a bit more difficult as it is not available in the package repository. Please follow the following instructions to get it up and running.</p>

<p><b>Step 1. Install pyenv</b></p>

```bash
curl -L https://raw.githubusercontent.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash
```

<p>After the installation is done, run:</p>

```bash
nano ~/.bashrc
```
 
<p>Then add these lines to the end of the file and save:</p>
```
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```

<p><b>Step 2. Install requirements</b></p>

```bash
sudo apt-get install python3-dev
sudo apt-get install libsqlite3-dev libreadline-dev
```

<p>Log out and then back in so your bashrc is reloaded.</p>

<p class='note'>
NOTE: the rest of the commands are not being run as sudo and will install python etc under you user's home directory.
</p>

<p><b>Step 3. Install python 3.4.2 (this will take a few hours)</b></p>

```bash
pyenv install 3.4.2
```

<p><b>Step 4. Create Python Virtual Environment</b></p>
```bash
pyenv virtualenv 3.4.2 homeassistant
```

<p><b>Step 5. Clone the source</b></p>
```bash
git clone --recursive https://github.com/balloob/home-assistant.git
```

<p><b>Step 6. Set the virtual environment</b></p>
```bash
cd home-assistant
pyenv local homeassistant
```

<p><b>Step 6. Finish the install</b></p>
```bash
python3 -m pip install -r requirements.txt
```

<p><b>Step 7. Start it up</b></p>
```bash
python3 -m homeassistant
```

<p>It will be up and running on port 8123</p>

<p class='note'>
  You can run Home Assistant in demo mode by appending <code>--demo-mode</code> to line 4.
</p>

<p class='note'>
  If you want to update to the latest version in the future, run: <code>scripts/update</code>.
</p>

</div>

</div>

## {% linkable_title Configuring Home Assistant %}

The configuration for Home Assistant lives by default in the `config` folder. The file `home-assistant.conf` is the main file that contains which components will be loaded and what their configuration is. An example configuration file is located at [`config/home-assistant.conf.example`](https://github.com/balloob/home-assistant/blob/master/config/home-assistant.conf.example).

When launched for the first time, Home Assistant will write a default configuration enabling the web interface and device discovery. It can take up to a minute for your devices to be discovered and show up in the interface.

<p class='note'>
  You will have to restart Home Assistant for changes in <code>home-assistant.conf</code> to take effect.
</p>

### Password protecting the web interface

The first thing you want to add is a password for the web interface. Use your favourite text editor to open the file `/config/home-assistant.conf`. Look for the line that says `[http]` and add the line `api_password=YOUR_PASSWORD` below. Your configuration should now look like this:

```
[http]
api_password=YOUR_PASSWORD

[discovery]
```

<p class='note'>
You can append <code>?api_password=YOUR_PASSWORD</code> to any url to log in automatically.
</p>

### {% linkable_title Adding devices and services %}

Home Assistant will be able to automatically discover and configure any Google Chromecasts, Belkin WeMo switches and Philips Hue bridges in your network if you have [the discovery component]({{site_root}}/components/discovery.html) enabled (which is by default).

Not all devices can be discovered, so if you hae any of the following devices or services, please see their respective pages for installation instructions:

 * [Nest thermostat]({{site_root}}/components/thermostat.html)
 * [Wink hub]({{site_root}}/components/wink.html)
 * [PushBullet]({{site_root}}/components/notify.html)
 * [Device tracking]({{site_root}}/components/device_tracker.html)
 * [Sun]({{site_root}}/components/sun.html)
 * [Add support for your own device or service]({{site_root}}/developers/add_new_platform.html)

### {% linkable_title Setting up Home Automation %}

When all your devices are set up it's time to put the cherry on the pie: automation. There are many ways to automate your home with Home Assistant so we have divided it into a couple of topics:

 * [Automatic light control based on the sun and if people are home]({{site_root}}/components/device_sun_light_trigger.html) (built-in component)
 * [Intruder alerts]({{site_root}}/components/simple_alarm.html) (built-in component)
 * [Setup your own automation rules]({{site_root}}/components/automation.html) (using configuration file)
 * [Create your own automation component]({{site_root}}/developers/creating_components.html) (writing Python code)
