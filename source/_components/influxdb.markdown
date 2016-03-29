---
layout: page
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

The `influxdb` component makes it possible to transfer all state changes to an external [InfluxDB](https://influxdb.com/) database. For more details, [see the blog post on InfluxDB](/blog/2015/12/07/influxdb-and-grafana/).

To use the `influxdb` component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
influxdb:
  host: DB_HOST_IP_ADDRESS
  port: 20000
  database: DB_TO_STORE_EVENTS
  username: MY_USERNAME
  password: MY_PASSWORD
  ssl: true
  verify_ssl: true
  blacklist:
     - entity.id1
     - entity.id2
```

Configuration variables:

- **host** (*Required*): IP address of your database host, eg. http://192.168.1.10.
- **port** (*Optional*): Port to use. Defaults to 8086.
- **database** (*Optional*): Name of the database to use. Defaults to `home_assistant`. The database must already exist.
- **username** (*Optional*): The username of the database user.
- **password** (*Optional*): The password for the database user account.
- **ssl** (*Optional*): Use https instead of http to connect. Defaults to false.
- **verify_ssl** (*Optional*): Verify SSL certificate for https request. Defaults to false.
- **blacklist** (*Optional*): List of entities not logged to influxdb.
