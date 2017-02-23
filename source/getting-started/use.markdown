---
layout: page
title: "Manage Home Assistant"
description: "Instructions about how to manage Home Assistant."
date: 2016-09-26 21:00
sidebar: true
comments: false
sharing: true
footer: true
---

If you are using Hassbian, browse to [http://hassbian.local:8123](http://hassbian.local:8123) to open the Home Assistant frontend.

To reload your configuration, [login](/docs/hassbian/common-tasks/#login-to-the-raspberry-pi) your Raspberry Pi

```bash
$ ssh pi@ip-address-of-pi
```

and [restart](/docs/hassbian/common-tasks/#startstoprestart-home-assistant) Home Assistant

```bash
$ sudo systemctl restart home-assistant@homeassistant.service
```

For tweaking your Home Assistant setup, take a look at the [documentation](/docs/), ask your questions in our [forum](https://community.home-assistant.io/), join us for a [chat](https://gitter.im/home-assistant/home-assistant), or report your [issues](https://github.com/home-assistant/home-assistant/issues).
