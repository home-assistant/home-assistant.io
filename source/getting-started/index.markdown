---
layout: page
title: "Getting Started"
date: 2014-12-18 22:57
sidebar: false
comments: true
sharing: true
footer: true
---

Installing Home Assistant and running it is easy. Make sure you have [Python 3](https://www.python.org/downloads/) installed and execute the following code in your console:

```bash
git clone --recursive https://github.com/balloob/home-assistant.git
cd home-assistant
pip3 install -r requirements.txt

python3 -m homeassistant
```

This will start the Home Assistant server and create an initial configuration file in `config/home-assistant.conf` that is setup for demo mode. It will launch its web interface on [http://127.0.0.1:8123](http://127.0.0.1:8123). The default password is 'password'.

If you're using Docker, you can use

```bash
docker run -d --name="home-assistant" -v /path/to/homeassistant/config:/config -v /etc/localtime:/etc/localtime:ro -p 8123:8123 balloob/home-assistant
```

After you got the demo mode running it is time to enable some real components and get started. An example configuration file has been provided in [/config/home-assistant.conf.example](https://github.com/balloob/home-assistant/blob/master/config/home-assistant.conf.example).

<div class='note'><p class='title'>Note</p><p class='content'>
You can append `?api_password=YOUR_PASSWORD` to the url of the web interface to log in automatically.
</p></div>

<div class='note'><p class='title'>Note</p><p class='content'>
For the light and switch component, you can specify multiple platforms by using sequential sections: [switch], [switch 2], [switch 3] etc
</p></div>

### Philips Hue
To get Philips Hue working you will have to connect Home Assistant to the Hue bridge.

Run the following command from your config dir and follow the instructions:

```bash
python3 -m phue --host HUE_BRIDGE_IP_ADDRESS --config-file-path phue.conf
```

After that add the following lines to your `home-assistant.conf`:

```
[light]
platform=hue
```

### Wireless router

Your wireless router is used to track which devices are connected. Three different types of wireless routers are currently supported: tomato, netgear and luci (OpenWRT). To get started add the following lines to your `home-assistant.conf` (example for Netgear):

```
[device_tracker]
platform=netgear
host=192.168.1.1
username=admin
password=MY_PASSWORD
```

<div class='note'><p class='title'>Note on Tomato</p><p class='content'>
Tomato requires an extra config variable called `http_id`. The value can be obtained by logging in to the Tomato admin interface and search for `http_id` in the page source code.
</p></div>

<div class='note'><p class='title'>Note on Luci</p><p class='content'>
Before the Luci scanner can be used you have to install the luci RPC package on OpenWRT: `opkg install luci-mod-rpc`.
</p></div>

Once tracking, the `device_tracker` component will maintain a file in your config dir called `known_devices.csv`. Edit this file to adjust which devices have to be tracked.

As an alternative to the router-based device tracking, it is possible to directly scan the network for devices by using nmap. The IP addresses to scan can be specified in any format that nmap understands, including the network-prefix notation (`192.168.1.1/24`) and the range notation (`192.168.1.1-255`).

```
[device_tracker]
platform=nmap_tracker
hosts=192.168.1.1/24
```