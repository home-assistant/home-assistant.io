---
layout: page
title: "Jabber (XMPP) notification support"
description: "Instructions how to add Jabber (XMPP) notifications to Home Assistant."
date: 2015-05-08 18:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/xmpp.png' class='brand pull-right' />
The xmpp platform allows you to deliver notifications from Home Assistant to a Jabber (XMPP) account.

```yaml
# Example configuration.yaml entry
notify:
    platform: xmpp
    sender: YOUR_JID
    password: YOUR_JABBER_ACCOUNT_PASSWORD
    recipient: YOUR_RECIPIENT
```

All Jabber IDs (JID) must include the domain. Make sure that the password matches the account provided as sender. 

To use notifications, please see the [getting started with automation page]({{site_root}}/components/automation.html).
