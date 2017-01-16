---
layout: page
title: "Frontend"
description: "Offers a web framework to serve files."
date: 2015-12-06 21:35
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: "Other"
---

The `http` component serves all files and data required for the Home Assistant frontend. You only need to add this to your configuration file if you want to change any of the default settings.

<p class='note warning'>
It's HIGHLY recommended that you set the `api_password`, especially if you are planning to expose your installation to the internet.
</p>

```yaml
# Example configuration.yaml entry
frontend:
```

