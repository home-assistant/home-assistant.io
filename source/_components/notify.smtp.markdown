---
layout: component
title: "SMTP"
description: "Instructions how to add e-mail notifications to Home Assistant."
date: 2015-06-03 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: smtp.png
ha_category: Notifications
---


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

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **server** (*Required*): SMTP server which is used to end the notifications. For Google Mail, eg. smtp.gmail.com. Keep in mind that Google has some extra layers of protection which need special attention (Hint: 'Less secure apps').
- **port** (*Required*): The port that the SMTP server is using, eg. 587 for Google Mail and STARTTLS or 465/993 depending on your SMTP servers.
- **sender** (*Required*): E-Mail address of the sender.
- **username** (*Required*): Username for the SMTP account.
- **password** (*Required*):Password for the SMTP server that belongs to the given username. If the password contains a colon it need to be wrapped in apostrophes.
- **recipient** (*Required*): Recipient of the notification.
- **starttls** (*Optional*): Enables STARTTLS, eg. 1 or 0.


This platform is fragile and not able to catch all exceptions in a smart way because of the large number of possible configuration combinations.

A combination that will work properly is port 587 and STARTTLS. It's recommanded to enable STARTTLS, if possible.

Keep in mind that if the password contains a colon, it needs to be wrapped in apostrophes in the `configuration.yaml` file.

For Google Mail (smtp.gmail.com) an additional step in the setup process is needed. Google has some extra layers of protection
which need special attention. By default, the usage by external applications, especially scripts, is limited. Visit the [Less secure apps](https://www.google.com/settings/security/lesssecureapps) page and enable it.

To use notifications, please see the [getting started with automation page]({{site_root}}/components/automation/).
