---
layout: page
title: "OZWCP panel iframe"
description: " Create an Panel iframe for OZWCP."
date: 2016-12-04 00:01
sidebar: true
comments: false
sharing: true
footer: true
ha_category: User Interface
---

#### {% linkable_title Create an Panel iframe for OZWCP %}

If you're trying to run OZWCP, just create a service for it and run it 24/7! That way, you can just stop the Z-wave network inside of Home Assistant, open your browser to the OZWCP page, connect, do your thing, disconnect, and then start the Z-wave network back up in Home Assistant. 

```shell
sudo nano /etc/systemd/system/ozwcp.service
```

```shell
[Unit]
Description=OpenZWave Control Panel
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/open-zwave-control-panel
ExecStart=/root/open-zwave-control-panel/ozwcp
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
##For the All-In-One Raspberry installer the example would look like this:

```shell
[Unit]
Description=OpenZWave Control Panel
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/srv/hass/src/open-zwave-control-panel
ExecStart=/srv/hass/src/open-zwave-control-panel/ozwcp
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

```shell
sudo systemctl daemon-reload
sudo systemctl enable ozwcp.service
sudo systemctl start ozwcp.service
```
And then you're good to use it whenever you want!

To integrate the panel in Home Assistant just add a iframe in your configuration.yaml like this:


```yaml
panel_iframe:
ozwcp:
  title: Open Z-wave Control Panel
  icon: 'mdi:access-point'
  url: 'http://192.168.1.22:8090/'
```

With the initd script the OZWCP will start on boot and will be available and should look like this:
![Alt text](https://files.gitter.im/home-assistant/home-assistant/KN7a/blob "OZWCP")

To be able to wórk in the OZWCP you must stop the z-wave network e.g. in hass via service:

![Alt text](https://files.gitter.im/home-assistant/home-assistant/6D4K/blob "Stop z-wave network")

When you finished working in OWZCP hit "close" and you are done. Now you just want to start the Z-wave network in Home Assistant again.
