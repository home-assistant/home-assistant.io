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
ha_release: 0.9
---

The `influxdb` component makes it possible to transfer all state changes to an external [InfluxDB](https://influxdb.com/) database. For more details, [see the blog post on InfluxDB](/blog/2015/12/07/influxdb-and-grafana/).

To use the `influxdb` component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
influxdb:
```

Configuration variables:

- **host** (*Optional*): IP address of your database host, eg. http://192.168.1.10. Defaults to `localhost`.
- **port** (*Optional*): Port to use. Defaults to 8086.
- **username** (*Optional*): The username of the database user.
- **password** (*Optional*): The password for the database user account.
- **database** (*Optional*): Name of the database to use. Defaults to `home_assistant`. The database must already exist.
- **ssl** (*Optional*): Use https instead of http to connect. Defaults to false.
- **verify_ssl** (*Optional*): Verify SSL certificate for https request. Defaults to false.
- **blacklist** (*Optional*): List of entities not logged to InfluxDB.
- **whitelist** (*Optional*): List of the entities (only) that will be logged to InfluxDB. If not set, all entities will be logged. Values set by the **blacklist** option will prevail.
- **tags** (*Optional*): Tags to mark the data.


## {% linkable_title Examples %}

In this section you find some real life examples of how to use this component.

### {% linkable_title Full configuration %}

```yaml
influxdb:
  host: 192.168.1.190
  port: 20000
  database: DB_TO_STORE_EVENTS
  username: MY_USERNAME
  password: MY_PASSWORD
  ssl: true
  verify_ssl: true
  blacklist:
     - entity.id1
     - entity.id2
  whitelist:
     - entity.id3
     - entity.id4
  tags:
    instance: prod
    source: hass
```
