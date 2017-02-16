---
layout: page
title: "Installation"
description: "Installation"
release_date: 2016-11-13 15:00:00 -0500
sidebar: true
comments: false
sharing: true
footer: true
---

Installation can be performed using Docker (Contributed by [marijngiesen](https://github.com/marijngiesen)) or manually if Docker doesn't work for you. We also have a Raspberry PI version of Docker contributed by [snizzleorg](https://community.home-assistant.io/users/snizzleorg/activity)

## {% linkable_title Using Docker (Non Raspian) %}

Assuming you already have Docker installed, installation is fairly easy.

### {% linkable_title  Clone the Repository %}
Clone the **hadashboard** repository to the current local directory on your machine.

``` bash
$ git clone https://github.com/home-assistant/hadashboard.git
```

Change your working directory to the repository root. Moving forward, we will be working from this directory.

``` bash
$ cd hadashboard
```

### {% linkable_title Build the docker image %}

```bash
$ docker build -t hadashboard .
```

When the build completes, you can run the dashboard with the following command for unix based systems:

```bash
$ docker run --name="hadashboard" -d -v <path_to_hadashboard>/dashboards:/app/dashboards -v <path_to_hadashboard>/lib/ha_conf.rb:/app/lib/ha_conf.rb -v <path_to_hadashboard>/hapush:/app/hapush --net=host hadashboard
```

If you are running docker on windows you should not use the `--net` command and explicitly specify the port, aslo for security reason `--net=host` should not be used so the following can also be used in unix. This will also set the process to start when the docker process starts so you do not have to worry about reboots. To map the volumes make sure you have ticked the shred drives in the settings. In this example I am using `c:\hadashboard` as the location where the git clone was done and mapping to port 3030 on the host. 

```powershell
docker run --restart=always --name="hadashboard" -p 3030:3030 -d -v C:/hadashboard/dashboards:/app/dashboards -v C:/hadashboard/lib/ha_conf.rb:/app/lib/ha_conf.rb -v C:/hadashboard/hapush:/app/hapush hadashboard 
```

This will use all of the same configuration files as specified below in the configuration sections, although you will need to make a few changes to the `hapush` configuration to match the docker's filesystem, detailed below.

By default, the docker instance should pick up your timezone but if you want to explicitly set it you can add an environment variable for your specific zone as follows:

```bash
 -e "TZ=Europe/Amsterdam"
```

### {% linkable_title Docker on Raspberry Pi %}

Raspberry pi needs to use a different docker build file so the build command is slightly different:

```bash
$ docker build -f Docker-raspi/Dockerfile -t hadashboard .
```

Apart from that the other steps are identical.

*Note - this is pretty slow even on a PI3, be prepared for it to take an hour or two to build all of the extensions and install everything*

## {% linkable_title Manual Installation %}

### {% linkable_title Clone the Repository %}
Clone the **hadashboard** repository to the current local directory on your machine.

``` bash
$ git clone https://github.com/home-assistant/hadashboard.git
```

Change your working directory to the repository root. Moving forward, we will be working from this directory.

``` bash
$ cd hadashboard
```

### {% linkable_title 2. Install Dashing and prereqs %}

Essentially, you want to make sure that you have Ruby installed on your local machine. Then, install the Dashing gem:

``` bash
$ gem install dashing
```

From your repository root, make sure that all dependencies are available.

Note: on some systems you may also need to install bundler:

```bash
$ gem install bundler
```

When installed run it:

``` bash
$ bundle
```

Bundle will now install all the ruby prereqs for running dashing.

Note: Prereqs will vary across different machines. So far users have reported requirements for some additional installs to allow the bundle to complete succesfully:

- ruby-dev - `sudo apt-get install ruby-dev`
- node-js - `sudo apt-get install nodejs`
- libsqlite3-dev - `sudo apt-get install libsqlite3-dev`
- execjs gem - `gem install execjs`

You will need to research what works on your particular architecture and also bear in mind that version numbers may change over time.

Note: This is currently running on various versions of Ruby and there are no strong dependencies however your mileage may vary.

## {% linkable_title Updating configuration (Manual and Docker) %}

Next, in the `./lib` directory, copy the ha_conf.rb.example file to ha_conf.rb and edit its settings to reflect your installation, pointing to the machine Home Assistant is running on and adding your api_key.

```ruby
$ha_url = "http://192.168.1.10:8123"
$ha_apikey = "your key"
```

- `$ha_url` is a reference to your home assistant installation and must include the correct port number and scheme (`http://` or `https://` as appropriate)
- `$ha_apikey` should be set to your key if you have one, otherwise it can remain blank.

The file also contains example newsfeeds for the News widget:

```ruby
$news_feeds = {
  "Traffic" => "http://api.sr.se/api/rss/traffic/2863",
  "News" => "http://feeds.bbci.co.uk/news/rss.xml",
}
```

You can leave these alone for now or if you prefer customize them as described in the News widget section.

When you are done, you can start a local webserver like this or if you are on docker it should start when you start the container.

```bash
$ dashing start
```

Point your browser to **http://localhost:3030** to access the hadashboard on your local machine, and you should see the supplied default dashboard. If you want to access it remotely ensure you have opened any required firewall rules. 

If the page never finishes loading and shows up all white, edit the dashboard config to match your own setup, instructions in the next step.

