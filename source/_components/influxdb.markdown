---
layout: component
title: "InfluxDB"
description: "Record events in InfluxDB."
date: 2015-12-06 13:08
sidebar: true
comments: false
sharing: true
footer: true
logo: influxdb.png
ha_category: "History"
---

The `influx` component makes it possible to transfer all state changes to an external [InfluxDB](https://influxdb.com/) database.

To use the `influx` component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
influxdb:
  host: DB_HOST_IP_ADDRESS
  # Optional, default: 8086
  port: 20000
  # Optional, default: home_assistant
  database: DB_TO_STORE_EVENTS
  # Optional
  username: MY_USERNAME
  password: MY_PASSWORD
```

Configuration variables:

- **host** (*Required*): IP address of your database host, eg. http://192.168.1.10.
- **port** (*Optional*): Port to use. Defaults to 8086.
- **database** (*Optional*): Name of the database to use. Defaults to `home_assistant`
- **username** (*Optional*): The username of the database user.
- **password** (*Optional*): The password for the database user account.

