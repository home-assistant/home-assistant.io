---
title: Nextcloud
description: Instructions on how to integrate Nextcloud monitor api data into Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
  - Update
ha_iot_class: Cloud Polling
ha_release: 0.108
ha_domain: nextcloud
ha_config_flow: true
ha_codeowners:
  - '@mib1185'
ha_platforms:
  - binary_sensor
  - sensor
  - update
ha_integration_type: integration
---

The `nextcloud` integration pulls summary [Nextcloud](https://nextcloud.com/) information into Home Assistant.

The integration provides sensors and binary sensors for most of the data points that the built-in Nextcloud [serverinfo app](https://github.com/nextcloud/serverinfo) provides.

To see which datapoints your nextcloud instance exposes, browse to this url: `https://<your_nextcloud_url>/ocs/v2.php/apps/serverinfo/api/v1/info?format=json&skipUpdate=false`.

![Nextcloud Example Sensor](/images/screenshots/nextcloud-sample-sensor.png)

## Configuration

This integration has the following Nextcloud Server prerequisites:

- The user must be in the Nextcloud `admin` group (__*Nextcloud*__ > __*Users*__)
- The Nextcloud 'Monitoring' app must be installed (__*Nextcloud*__ > __*Apps*__ > 🔍(Search Icon) > __*Monitoring*__ > __*Enable*__)
- (Recommended) A Nextcloud App password should be generated for use in Home Assistant (__*Nextcloud*__ > __*Settings*__ > __*Personal*__ > __*Security*__ > __*Devices & sessions*__ > __*Create new app password*__)

{% include integrations/config_flow.md %}

## Sensors

For each entry, the integration will create the following {% term sensors %}:

| Sensor | Enabled by default |
| ------ | ------------------ |
| Amount of active users last 5 minutes | ✅ |
| Amount of active users last day | ✅ |
| Amount of active users last hour | ✅ |
| Amount of files | ✅ |
| Amount of group shares | ✅ |
| Amount of link shares | ✅ |
| Amount of local storages | ✅ |
| Amount of mail shares | ✅ |
| Amount of other storages | ✅ |
| Amount of passwordless link shares | ✅ |
| Amount of room shares | ✅ |
| Amount of shares | ✅ |
| Amount of shares received | ✅ |
| Amount of shares sent | ✅ |
| Amount of storages | ✅ |
| Amount of storages at home | ✅ |
| Amount of user | ✅ |
| Amount of user shares | ✅ |
| Apps installed | ✅ |
| Avatars enabled | ✅ |
| CPU load last 1 minute | ✅ |
| CPU load last 15 minutes | ✅ |
| CPU load last 5 minutes | ✅ |
| Cache TTL | ❌ |
| Cache expunges | ❌ |
| Cache memory | ❌ |
| Cache memory size | ✅ |
| Cache number of entries | ❌ |
| Cache number of hits | ❌ |
| Cache number of inserts | ❌ |
| Cache number of misses | ❌ |
| Cache number of slots | ❌ |
| Cache start time | ❌ |
| Database size | ✅ |
| Database type | ✅ |
| Database version | ✅ |
| Debug enabled | ✅ |
| Filelocking enabled | ✅ |
| Free memory | ✅ |
| Free space | ✅ |
| Free swap memory | ✅ |
| Interned buffer size | ❌ |
| Interned free memory | ❌ |
| Interned number of strings | ❌ |
| Interned used memory | ❌ |
| JIT active | ❌ |
| JIT buffer free | ❌ |
| JIT buffer size | ❌ |
| JIT enabled | ❌ |
| JIT kind | ❌ |
| JIT opt flags | ❌ |
| JIT opt level | ❌ |
| Opcache blacklist miss ratio | ❌ |
| Opcache blacklist misses | ❌ |
| Opcache cached keys | ❌ |
| Opcache cached scripts | ❌ |
| Opcache current wasted percentage | ❌ |
| Opcache free memory | ❌ |
| Opcache hash restarts | ❌ |
| Opcache hit rate | ❌ |
| Opcache hits | ❌ |
| Opcache last restart time | ❌ |
| Opcache manual restarts | ❌ |
| Opcache max cached keys | ❌ |
| Opcache misses | ❌ |
| Opcache out of memory restarts | ❌ |
| Opcache start time | ❌ |
| Opcache used memory | ❌ |
| Opcache wasted memory | ❌ |
| PHP max execution time | ✅ |
| PHP memory limit | ✅ |
| PHP upload maximum filesize | ✅ |
| PHP version | ✅ |
| Previews enabled | ✅ |
| SMA available memory | ❌ |
| SMA number of segments | ❌ |
| SMA segment size | ❌ |
| System memcache distributed | ❌ |
| System memcache local | ❌ |
| System memcache locking | ❌ |
| System theme | ✅ |
| System version | ✅ |
| Total memory | ✅ |
| Total swap memory | ✅ |
| Updates available | ✅ |
| Webserver | ✅ |

## Update entity

An {% term update %} entity will be created for each entry.
