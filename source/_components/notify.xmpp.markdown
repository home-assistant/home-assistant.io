---
layout: page
title: "Jabber (XMPP)"
description: "Instructions on how to add Jabber (XMPP) notifications to Home Assistant."
date: 2015-05-08 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: xmpp.png
ha_category: Notifications
ha_release: pre 0.7
---


The `xmpp` notification platform allows you to deliver notifications from Home Assistant to a [Jabber (XMPP)](http://xmpp.org) account.

## {% linkable_title Configuration %}

To enable Jabber notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: xmpp
    sender: YOUR_JID
    password: YOUR_JABBER_ACCOUNT_PASSWORD
    recipient: YOUR_RECIPIENT
```

{% configuration %}
name:
  description: "Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`."
  required: false
  type: string
  default: Random Sensor
sender:
  description: "The Jabber ID (JID) that will act as origin of the messages. Add your JID including the domain, e.g. your_name@jabber.org."
  required: true
  type: string
resource:
  description: "Resource part of JID, e.g., your_name@jabber.org/`HA-cabin`."
  required: false
  type: string
  default: home-assistant
password:
  description: The password for your given Jabber account.
  required: true
recipient:
  description: The Jabber ID (JID) that will receive the messages.
  required: true
tls:
  description: Force TLS.
  required: false
  type: boolean
  default: true
verify:
  description: Allow disabling SSL certificate validity check, e.g., self-signed certificate.
  required: false
  type: boolean
  default: true
room:
  description: Room's name (e.g., example@conference.jabber.org). If set, send a message to chatroom instead of the recipient.
  required: false
  type: string
{% endconfiguration %}

<p class='note'>
  Pre Home Assistant 0.81 `sleekxmpp` was used to connect to XMPP servers. `sleekxmpp` as of version 1.3.2, does not support > TLS v1. If you are running your own XMPP server (e.g., Prosody, ejabberd) make sure to allow using TLS v1.

  Home Assistant after 0.81 uses `slixmpp`, which also supports TLS v1.1 and TLS v1.2.
</p>

All Jabber IDs (JID) must include the domain. Make sure that the password matches the account provided as sender.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
