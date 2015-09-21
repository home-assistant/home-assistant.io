---
layout: page
title: "Nmap support"
description: "Instructions how to integrate Nmap into Home Assistant."
date: 2015-03-23 19:59
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/network-workgroup.png' class='brand pull-right' />
As an alternative to the router-based device tracking, it is possible to directly scan the network for devices by using Nmap. The IP addresses to scan can be specified in any format that Nmap understands, including the network-prefix notation (`192.168.1.1/24`) and the range notation (`192.168.1.1-255`).

If you're on Debian or Ubuntu, you might have to install the packages for arp and nmap. Do so by running `apt-get install net-tools nmap`.

```
# Example configuration.yaml entry
device_tracker:
  platform: nmap_tracker
  hosts: 192.168.1.1/24
  home_interval: 10
  consider_home: 1800
```

`home_interval` is an optional value set in minutes.  This will be the number of minutes to exclude devices from a scan while they are home.  This is useful for iOS users that are experiencing issues where thier iDevices drop off the network for periods in order to save battery life.

`consider_home` is another optional value set in seconds.  This will be the number of seconds to wait till marking someone as not home after not being seen on scans.

In the above example with both `home_interval` and `consider_home` being set, a device can be scanned as `home` at 1:00pm, drop off the network at 1:05pm, not be scanned again until 1:10pm (due to `home_interval:10`), seen as `not_home` at 1:10pm and then finally officially set as `not_home` at 1:30pm (due ot the 1800 seconds to wait until marking as `not_home`).  If the device reappears on the network before 1:30pm, it will never have officially been marked as away.

See the [device tracker component page](/components/device_tracker.html) for instructions how to configure the people to be tracked.
