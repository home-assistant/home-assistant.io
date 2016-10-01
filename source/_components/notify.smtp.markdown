---
layout: page
title: "SMTP"
description: "Instructions how to add e-mail notifications to Home Assistant."
date: 2015-06-03 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: smtp.png
ha_category: Notifications
ha_release: pre 0.7
---


The `smtp` platform allows you to deliver notifications from Home Assistant to an e-mail recipient.

To enable notification by e-mail in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: smtp
    server: MAIL_SERVER
    recipient: YOUR_RECIPIENT
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **server** (*Optional*): SMTP server which is used to end the notifications. Defaults to `localhost`.
- **port** (*Optional*): The port that the SMTP server is using. Defaults to 25.
- **sender** (*Optional*): E-mail address of the sender.
- **username** (*Optional*): Username for the SMTP account.
- **password** (*Optional*): Password for the SMTP server that belongs to the given username. If the password contains a colon it need to be wrapped in apostrophes.
- **recipient** (*Required*): Recipient of the notification.
- **starttls** (*Optional*): Enables STARTTLS, eg. True or False. Defaults to False.
- **debug** (*Optional*): Enables Debug, eg. True or False. Defaults to False.

A sample configuration entry for Google Mail.

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: smtp
    server: smtp.gmail.com
    port: 587
    sender: john@gmail.com
    starttls: true
    username: john@gmail.com
    password: thePassword
    recipient: james@gmail.com
```

Keep in mind that Google has some extra layers of protection which need special attention (Hint: 'Less secure apps').

To use the SMTP notification, refer to it in an automation or script like in this example:

```yaml
  burglar: 
    alias: Burglar Alarm
    sequence:
      - service: shell_command.snapshot
      - delay:
            seconds: 1
      - service: notify.NOTIFIER_NAME
        data:
            title: 'Intruder alert'
            message: 'Intruder alert at apartment!!'
            data:
                images: 
                    - /home/pi/snapshot1.jpg
                    - /home/pi/snapshot2.jpg
```

The optional `images` field adds in-line image attachments to the email. This sends a text/HTML multi-part message instead of the plain text default.

This platform is fragile and not able to catch all exceptions in a smart way because of the large number of possible configuration combinations.

A combination that will work properly is port 587 and STARTTLS. It's recommended to enable STARTTLS, if possible.

Keep in mind that if the password contains a colon, it needs to be wrapped in apostrophes in the `configuration.yaml` file.

For Google Mail (smtp.gmail.com) an additional step in the setup process is needed. Google has some extra layers of protection
which need special attention. By default, the usage by external applications, especially scripts, is limited. Visit the [Less secure apps](https://www.google.com/settings/security/lesssecureapps) page and enable it.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
