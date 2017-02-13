---
layout: page
title: "Web server"
description: "Use nmap to scan your Home Assistant instance."
date: 2016-10-06 08:00
sidebar: false
comments: false
sharing: true
footer: true
---

It was only a matter of time till the first queries for tools like [https://www.shodan.io](https://www.shodan.io/search?query=Home+Assistant) to search for Home Assistant instances showed up.

To get an idea about how your Home Assistant instance looks like for network scanner, you can use `nmap`. The `nmap` tool is already available if you are using the [nmap device tracker](/components/device_tracker/). 

```yaml
$ nmap -sV -p 8123 --script=http-title,http-headers 192.168.1.3

Starting Nmap 7.12 ( https://nmap.org ) at 2016-10-06 10:01 CEST
Nmap scan report for 192.168.1.3 (192.168.1.3)
Host is up (0.00011s latency).
PORT     STATE SERVICE VERSION
8123/tcp open  http    CherryPy wsgiserver
| http-headers: 
|   Content-Type: text/html; charset=utf-8
|   Content-Length: 4309
|   Connection: close
|   Date: Thu, 06 Oct 2016 08:01:31 GMT
|   Server: Home Assistant
|
|_  (Request type: GET)
|_http-server-header: Home Assistant
|_http-title: Home Assistant

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 6.70 seconds
```

