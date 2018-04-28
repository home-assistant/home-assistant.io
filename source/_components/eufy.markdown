---
layout: page
title: "Eufy"
description: "Instructions on how to integrate Eufy devices into Home Assistant."
date: 2018-04-09 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: eufy.png
ha_category: Hub
ha_release: 0.68
---

The `eufy` component is the main component to integrate various [eufy](http://https://www.eufylife.com/) devices with Home Assistant.

Supported devices will be discovered after the `eufy` component is configured:

```yaml
# Example configuration.yaml entry
eufy:
  username: testuser@domain
  password: p4ssw0rd
```

where username and password are the ones configured in the EufyHome app. Alternately, Eufy devices that are not discoverable can be statically configured.

```yaml
eufy:
  devices:
    - address: 192.168.1.10
      access_token: 1234567890abcdef
      type: T1012
      name: Smart Light
    - address: 192.168.1.11
      access_token: abcdef1234567890
      type: T1201
      name: Smart Switch
```

access_token can be obtained by running:

```
curl -H "Content-Type: application/json" -d '{"client_id":"eufyhome-app", "client_Secret":"GQCpr9dSp3uQpsOMgJ4xQ", "email":"USERNAME", "password":"PASSWORD"}' https://home-api.eufylife.com/v1/user/email/login | jq
```

replacing USERNAME and PASSWORD with the Eufy username and password. This will give an access_token. Then run:

```
curl -H token:TOKEN -H category:Home https://home-api.eufylife.com/v1/device/list/devices-and-groups | jq
```

replacing TOKEN with the access_token from the previous command. This will provide the local_code for each device.

