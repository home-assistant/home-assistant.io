---
layout: page
title: "Deluge Switch"
description: "Instructions on how to integrate Deluge within Home Assistant."
date: 2017-10-19 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: deluge.png
ha_category: Downloading
ha_release: 0.57
ha_iot_class: "Local Polling"
---


The `deluge` switch platform allows you to control your [Deluge](http://deluge-torrent.org/) client from within Home Assistant. The platform enables you switch all your torrents in pause, and then unpause them all.

To add Deluge to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: deluge
  host: IP_ADDRESS
  username : USERNAME
  password : PASSWORD
```

Configuration variables:

- **host** (*Required*): This is the IP address of your Deluge daemon, eg. 192.168.1.32.
- **username** (*Required*): Your Deluge username, if you use authentication.
- **password** (*Required*): Your Deluge password, if you use authentication.
- **port** (*Optional*): The port your Deluge daemon uses, defaults to 58846. Warning,this is not the port of the WebUI
- **name** (*Optional*): The name to use when displaying this Deluge instance.
