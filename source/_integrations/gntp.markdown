---
title: Growl (GnGNTP)
description: Instructions for adding GNTP/Growl notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Local Push
ha_release: 0.16
ha_domain: gntp
ha_platforms:
  - notify
---

<div class='note warning'>

The Growl (GnGNTP) integration has been deprecated and is going to be removed
in Home Assistant Core 2021.6. The Growl project
[has retired](https://growl.github.io/growl/).

</div>

[GNTP](http://growl.info/documentation/developer/gntp.php) is a specification for sending and receiving notifications between computers. The most well known server implementations are [Growl](http://growl.info) for Mac and [Growl for Windows](http://www.growlforwindows.com/).

To use GNTP notifications, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFER_NAME
    platform: gntp
```

GNTP will attempt to connect to a local server running on port 23053 if no `hostname` is provided.

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
app_name:
  description: The application name that will be displayed on every notification and will be registered with the server.
  required: false
  default: HomeAssistant
  type: string
app_icon:
  description: "The icon that will be displayed on every notification. You can provide an HTTP URL or a `file://` URL. File URLs only work if Home Assistant and the GNTP server are running on the same machine. If no `app_icon` is set a local copy of the Home Assistant logo will be used. If you choose to use an HTTP URL please make the maximum image size 150 px by 150 px as Growl for Mac will sometimes timeout when registering."
  required: false
  type: string
hostname:
  description: The hostname or IP address of the GNTP server to contact.
  required: false
  default: localhost
  type: string
password:
  description: The password to authenticate to the GNTP server with.
  required: false
  type: string
port:
  description: The port that the GNTP server runs on. The specification states that servers should not allow users to use any port other than 23053 but `port` is provided here just in case.
  required: false
  default: 23053
  type: integer
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
