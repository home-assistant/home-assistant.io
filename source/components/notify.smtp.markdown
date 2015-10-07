---
layout: page
title: "SMTP notification support"
description: "Instructions how to add e-mail notifications to Home Assistant."
date: 2015-06-03 18:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/smtp.png' class='brand pull-right' />
The smtp platform allows you to deliver notifications from Home Assistant to an e-mail recipient.

To enable notification by e-mail in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  name: NOTIFIER_NAME
  platform: smtp
  server: MAIL_SERVER
  port: YOUR_SMTP_PORT
  sender: SENDER_EMAIL_ADDRESS
  starttls: 1 or 0
  username: YOUR_SMTP_USERNAME
  password: YOUR_SMTP_PASSWORD
  recipient: YOUR_RECIPIENT
```

Setting the optional parameter `name` allows multiple notifiers to be created.
The default value is `notify`. The notifier will bind to the service
`notify.NOTIFIER_NAME`.

This platform is fragile and not able to catch all exceptions in a smart way because of the large number of possible configuration combinations.

A combination that will work properly is port 587 and STARTTLS. It's recommanded to enable STARTTLS, if possible.

Keep in mind that if the password contains a colon, it needs to be wrapped in apostrophes in the `configuration.yaml` file.

For Google Mail (smtp.gmail.com) an additional step in the setup process is needed. Google has some extra layers of protection
which need special attention. By default, the usage by external applications, especially scripts, is limited. Visit the [Less secure apps](https://www.google.com/settings/security/lesssecureapps) page and enable it.

To use notifications, please see the [getting started with automation page]({{site_root}}/components/automation.html).
