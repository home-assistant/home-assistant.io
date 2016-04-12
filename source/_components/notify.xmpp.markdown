---
layout: page
title: "Jabber (XMPP)"
description: "Instructions how to add Jabber (XMPP) notifications to Home Assistant."
date: 2015-05-08 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: xmpp.png
ha_category: Notifications
---


The `xmpp` platform allows you to deliver notifications from Home Assistant to a [Jabber (XMPP)](http://xmpp.org) account.

```yaml
# Example configuration.yaml entry
notify:
  name: NOTIFIER_NAME
  platform: xmpp
  sender: YOUR_JID
  password: YOUR_JABBER_ACCOUNT_PASSWORD
  recipient: YOUR_RECIPIENT
  tls: False
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **sender** (*Required*): The Jabber ID (JID) that will act as origin of the messages. Add your JID including the domain, eg. your_name@jabber.org.
- **password** (*Required*): The password for your given Jabber account.
- **priority** (*Required*): The Jabber ID (JID) that will receive the messages.
- **tls** (*Optional*): Allow to disable TLS. Defaults to true.

All Jabber IDs (JID) must include the domain. Make sure that the password matches the account provided as sender.


To use notifications, please see the [getting started with automation page]({{site_root}}/components/automation/).
