---
layout: page
title: "OTP Sensor"
description: "Instructions how to add One-Time Password (OTP) sensors into Home Assistant."
date: 2017-07-04 07:00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: 0.49
---

The `otp` sensor generates One-Time Passwords according to [RFC6238](https://tools.ietf.org/html/rfc6238) that is compatible with most OTP generators available, including Google Authenticator. You can use this when building custom security solutions and want to use "rolling codes", that change every 30 seconds.

To enable the OTP sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: otp
    token: SHARED_SECRET_TOKEN
```

Configuration variables:

- **name** (*Optional*): Name of the sensor to use in the frontend. Defaults to `OTP Sensor`.
- **token** (*Required*): The shared secret you use in your OTP generator (e.g., Google Authenticator on your phone)

## Generating a token

A simple way to generate a `token` for a new sensor is to run this snippet of python code in your Home Assistant virtual environment:

```shell
$ pip3 install pyotp
$ python3 -c 'import pyotp; print("Token:", pyotp.random_base32())'
Token: IHEDPEBEVA2WVHB7
```

To run in a Docker container:

```shell
$ docker exec -it home-assistant python -c 'import pyotp; print("Token:", pyotp.random_base32())'
Token: IHEDPEBEVA2WVHB7
```
Copy and paste the token into your Home Assistant configuration and add it to your OTP generator. Verify that they generate the same code.

<p class='note warning'>
It is vital that your system clock is correct both on your Home Assistant server and on your OTP generator device (e.g., your phone). If not, the generated codes will not match! Make sure NTP is running and syncing your time correctly before creating an issue.
</p>
