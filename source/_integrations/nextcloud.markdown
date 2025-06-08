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
| Amount of active users last 5 minutes | yes |
| Amount of active users last day | yes |
| Amount of active users last hour | yes |
| Amount of files | yes |
| Amount of group shares | yes |
| Amount of link shares | yes |
| Amount of local storages | yes |
| Amount of mail shares | yes |
| Amount of other storages | yes |
| Amount of passwordless link shares | yes |
| Amount of room shares | yes |
| Amount of shares | yes |
| Amount of shares received | yes |
| Amount of shares sent | yes |
| Amount of storages | yes |
| Amount of storages at home | yes |
| Amount of user | yes |
| Amount of user shares | yes |
| Apps installed | yes |
| Avatars enabled | yes |
| CPU load last 1 minute | yes |
| CPU load last 15 minutes | yes |
| CPU load last 5 minutes | yes |
| Cache TTL | no |
| Cache expunges | no |
| Cache memory | no |
| Cache memory size | yes |
| Cache number of entries | no |
| Cache number of hits | no |
| Cache number of inserts | no |
| Cache number of misses | no |
| Cache number of slots | no |
| Cache start time | no |
| Database size | yes |
| Database type | yes |
| Database version | yes |
| Debug enabled | yes |
| Filelocking enabled | yes |
| Free memory | yes |
| Free space | yes |
| Free swap memory | yes |
| Interned buffer size | no |
| Interned free memory | no |
| Interned number of strings | no |
| Interned used memory | no |
| JIT active | no |
| JIT buffer free | no |
| JIT buffer size | no |
| JIT enabled | no |
| JIT kind | no |
| JIT opt flags | no |
| JIT opt level | no |
| Opcache blacklist miss ratio | no |
| Opcache blacklist misses | no |
| Opcache cached keys | no |
| Opcache cached scripts | no |
| Opcache current wasted percentage | no |
| Opcache free memory | no |
| Opcache hash restarts | no |
| Opcache hit rate | no |
| Opcache hits | no |
| Opcache last restart time | no |
| Opcache manual restarts | no |
| Opcache max cached keys | no |
| Opcache misses | no |
| Opcache out of memory restarts | no |
| Opcache start time | no |
| Opcache used memory | no |
| Opcache wasted memory | no |
| PHP max execution time | yes |
| PHP memory limit | yes |
| PHP upload maximum filesize | yes |
| PHP version | yes |
| Previews enabled | yes |
| SMA available memory | no |
| SMA number of segments | no |
| SMA segment size | no |
| System memcache distributed | no |
| System memcache local | no |
| System memcache locking | no |
| System theme | yes |
| System version | yes |
| Total memory | yes |
| Total swap memory | yes |
| Updates available | yes |
| Webserver | yes |

## Update entity

An {% term update %} entity will be created for each entry.
