---
layout: page
title: "Mobile App"
description: "The Mobile App component allows a generic platform for integrating with mobile apps."
date: 2019-03-06 01:30
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category:
  - "Other"
ha_release: 0.89
ha_qa_scale: internal
---

The Mobile App component allows Home Assistant mobile apps to easily integrate with Home Assistant.

If you are planning to use a mobile application that integrates with Home Assistant, we recommend that you keep this component enabled.

If you are a mobile app developer, see the [developer documentation](https://developers.home-assistant.io/docs/en/app_integration_index.html) for instructions on how to build your app on top of the mobile app component.

## {% linkable_title Configuration %}

This component is by default enabled, unless you've disabled or removed the `default_config:` line from your configuration.
If that is the case, the following example shows you how to enable this component manually:

```yaml
# Example configuration.yaml entry
mobile_app:
```
