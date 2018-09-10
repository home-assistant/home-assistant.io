---
layout: page
title: "Yesss SMS"
description: "Instructions on how to add user notifications to Home Assistant."
date: 2017-10-27 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: yesssat.png
ha_category: Notifications
ha_release: 0.57
---

The `yessssms` platform is using the Austrian mobile operator [Yesss.at](https://yesss.at) to send SMS via its web-site.

<p class='note warning'>
Regular charges apply and a contract or prepaid plan is needed.
</p>

<p class='note warning'>
Do not use this for high frequency notifications. The web-SMS page is rate limited and sending more than 45 SMS/h might get you blocked.
</p>

You can send to any number, but your phone number will appear as sender.

To enable SMS notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: yessssms
    username: YOUR_PHONE_NUMBER
    password: YOUR_PASSWORD
    recipient: PHONE_NUMBER_TO_NOTIFY
```

Configuration variables:

- **username** (*Required*): This is your login name (usually your phone number). Veryfy that you can use your credentials on the Yesss.at website.
- **password** (*Required*): This is the password you use to login to Yesss.at.
- **recipient** (*Required*): This is the phone number you want to send the SMS notification to.

<p class='note warning'>
Verify that your credentials work on [Yesss.at's website](https://yesss.at). Using the wrong credentials three times in a row will get you blocked for one hour.
</p>
