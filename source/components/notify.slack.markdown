---
layout: page
title: "Slack notification support"
description: "Instructions how to add Slack notifications to Home Assistant."
date: 2015-08-06 18:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/slack.png' class='brand pull-right' />
The slack platform allows you to deliver notifications from Home Assistant to [Slack](https://slack.com/).

You need to obtain the [Slack API token](https://api.slack.com/web?sudo=1) to be able to send notifications.

To enable the slack notification in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  platform: slack
  api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
  default_channel: '#general'
```

