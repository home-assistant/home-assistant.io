---
layout: component
title: "StatsD"
description: "Record events in StatsD."
date: 2016-01-25 08:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: "History"
---

The `statsd` component makes it possible to transfer all state changes to an external [StatsD](https://github.com/etsy/statsd) instance.

To use the `statsd` component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
statsd:
  host: DB_HOST_IP_ADDRESS
  port: 20000
  prefix: DB_TO_STORE_EVENTS
  rate: 1
```

Configuration variables:

- **host** (*Optional*): IP address of your StatsD host, eg. 192.168.1.10. Defaults to `localhost`.
- **port** (*Optional*): Port to use. Defaults to 8125.
- **prefix** (*Optional*): Prefix to use. Defaults to `hass`.
- **rate** (*Optional*): The sample rate. Defaults to 1.

StatsD supports various [backends](https://github.com/etsy/statsd/blob/master/docs/backend.md).

