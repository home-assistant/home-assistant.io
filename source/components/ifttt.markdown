---
layout: page
title: "IFTTT"
description: "Instructions how to setup IFTTT within Home Assistant."
date: 2015-09-07 18:00
sidebar: false
comments: false
sharing: true
footer: true
---
<img src='/images/supported_brands/ifttt.png' class='brand pull-right' />
[IFTTT](https://ifttt.com) is a web service that allows users to create chains of simple conditional statements, so called "recipes". With the ifttt component you can trigger recipes through the "maker" channel.

To integrate IFTTT into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ifttt:
  key: xxxxx-x-xxxxxxxxxxxxx
```

