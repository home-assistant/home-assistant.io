---
layout: page
title: "StatsD"
description: "Record events in StatsD."
date: 2016-01-25 08:00
sidebar: true
comments: false
sharing: true
logo: statsd.png
footer: true
ha_category: "History"
ha_release: 0.12
---

The `statsd` component makes it possible to transfer all state changes to an external [StatsD](https://github.com/etsy/statsd) instance.

To use the `statsd` component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
statsd:
```

Configuration variables:

- **host** (*Optional*): IP address of your StatsD host, eg. 192.168.1.10. Defaults to `localhost`.
- **port** (*Optional*): Port to use. Defaults to 8125.
- **prefix** (*Optional*): Prefix to use. Defaults to `hass`.
- **rate** (*Optional*): The sample rate. Defaults to 1.
- **log_attributes** (*Optional*): Log state and attribute changes. This changes the default stats path.
- **value_mapping** (*Optional*): Map non-numerical values to numerical ones.

Full example:

```yaml
# Example configuration.yaml entry
statsd:
  prefix: home
  rate: 5
  value_mapping:
    cooling: 1
    heating: 10
```

StatsD supports various [backends](https://github.com/etsy/statsd/blob/master/docs/backend.md).
