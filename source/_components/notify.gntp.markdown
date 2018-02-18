---
layout: page
title: "GNTP (Growl)"
description: "Instructions for adding GNTP/Growl notifications to Home Assistant."
date: 2016-03-25 18:18
sidebar: true
comments: false
sharing: true
footer: true
logo: gntp.png
ha_category: Notifications
ha_release: 0.16
---


[GNTP](http://www.growlforwindows.com/gfw/help/gntp.aspx) is a specification for sending and receiving notifications between computers. The most well known server implementations are [Growl](http://growl.info) for Mac and [Growl for Windows](http://www.growlforwindows.com/gfw/).

To use GNTP notifications, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFER_NAME
    platform: gntp
```

GNTP will attempt to connect to a local server running on port 23053 if no `hostname` is provided.

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **app_name** (*Optional*): The application name that will be displayed on every notification and will be registered with the server.
- **app_icon** (*Optional*): The icon that will be displayed on every notification. You can provide a HTTP URL or a `file://` URL. File URLs only work if Home Assistant and the GNTP server are running on the same machine. If no `app_icon` is set a local copy of the Home Assistant logo will be used. If you choose to use a HTTP URL please make the maximum image size 150 px by 150 px as Growl for Mac will sometimes timeout when registering.
- **hostname** (*Optional*): The hostname or IP address of the GNTP server to contact.
- **password** (*Optional*): The password to authenticate to the GNTP server with.
- **port** (*Optional*): The port that the GNTP server runs on. The specification states that servers should not allow users to use any port other than 23053 but `port` is provided here just in case.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
