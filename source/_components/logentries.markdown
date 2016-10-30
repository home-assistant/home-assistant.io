---
layout: page
title: "Logentries"
description: "Send events to Logentries."
date: 2016-04-29 16:50
sidebar: true
comments: false
sharing: true
logo: logentries.png
footer: true
ha_category: "History"
---

The `logentries` component makes it possible to log all state changes to [your Logentries account](http://logentries.com/) using Logentries Webhook endpoint and a token based log

To use the `logentries` component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
logentries:
  token: TOKEN
```

Configuration variables:

- **token** (*Required*): Your Logentries log token.
