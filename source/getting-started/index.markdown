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

###[Next step: configuring Home Assistant &raquo;](/getting-started/configuration.html)
