---
layout: page
title: "Dyson"
description: "Instructions how to integrate Dyson into Home Assistant."
date: 2017-05-27 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: dyson.png
ha_category: Hub
featured: false
ha_release: 0.46
---

The Dyson component is the main component to integrate all [Dyson](https://dyson.com) related platforms (only Cool Link Purifier at this time).

### {% linkable_title Configuration %}

```yaml
dyson:
  username: <dyson_account_user_email>
  password: <dyson_acount_password>
  language: <dyson_account_language>
  devices:
    - device_id: <device_id_1>
      device_ip: <device_ip_1>
    - device_id: <device_id_2>
      device_ip: <device_ip_2>
    ...
```

Configuration variables:

- **username** (*Required*): Dyson account username (email address)
- **password** (*Required*): Dyson account password
- **language** (*Required*): Dyson account language country code. Known working codes: `FR`, `NL`, `UK`, `AU`. But others codes should work.
- **devices** (*Optional*): List of devices
  - **device_id** (*Required*): Device ID. Available in the mobiles applications (*Settings* page)
  - **device_ip** (*Required*): Device IP address

`devices` list is optional but you'll have to provide them if discovery is not working (warnings in the logs and the devices are not available in Home Assistant web interface).
To find devices IP address, you can use your router or `nmap`:
```
$ nmap -p 1883 XXX.XXX.XXX.XXX/YY -- open
```
Where:
- **XXX.XXX.XXX.XXX** is your network address
- **YY** is your network mask

For example:
```
$ nmap -p 1883 192.168.0.0/24 -- open
```
