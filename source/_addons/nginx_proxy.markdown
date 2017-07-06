---
layout: page
title: "Nginx SSL proxy"
description: "Nginx HomeAssistant SSL proxy"
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Setup a SSL proxy with nginx and redirect port 80 to 443. Make sure you have generate certificate before you start this add-on.



```json
{
  "domain": "home.example.com"
}
```

Configuration variables:

- **domain** (*Required*): Domain they will proxy run with it.

