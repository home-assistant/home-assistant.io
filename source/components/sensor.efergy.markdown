---
layout: page
title: "Efergy support"
description: "Instructions how to integrate Efergy devices within Home Assistant."
date: 2015-07-11 0:15
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/efergy.png' class='brand pull-right' />
Integrate your [Efergy](https://efergy.com) meter information into Home Assistant. To get an app token, log in to your efergy account, go to the Settings page, click on App tokens, and click "Add token".

```yaml
# Example configuration.yaml entry
sensor:
  platform: efergy
  app_token: APP_TOKEN
  utc_offset: UTC_OFFSET
  monitored_variables:
    - type: instant_readings
    - type: budget
    - type: cost
      period: day
      currency: $
```
