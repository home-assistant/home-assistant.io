---
title: "Web server fingerprint"
description: "Use nmap to scan your Home Assistant instance."
redirect_from: /docs/frontend/webserver/
---

It was only a matter of time until the first queries for tools like [https://www.shodan.io](https://www.shodan.io/search?query=Home+Assistant) to search for Home Assistant instances showed up.

To get an idea about how your Home Assistant instance looks to a network scanner, you can use `nmap`. The `nmap` tool is already available if you are using the [Nmap device tracker](/integrations/device_tracker/). 

```bash
$ nmap -sV -p 8123 --script=http-title,http-headers 192.168.0.3

Starting Nmap 7.60 ( https://nmap.org ) at 2018-05-29 18:16 CEST
Nmap scan report for 192.168.0.3
Host is up (0.0058s latency).

PORT     STATE SERVICE VERSION
8123/tcp open  http    aiohttp 3.1.3 (Python 3.6)
| http-headers: 
|   Content-Type: text/html; charset=utf-8
|   Content-Length: 3073
|   Date: Tue, 29 May 2018 16:16:50 GMT
|   Server: Python/3.6 aiohttp/3.1.3
|   Connection: close
|   
|_  (Request type: GET)
|_http-server-header: Python/3.6 aiohttp/3.1.3
|_http-title: Home Assistant

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 12.13 seconds
```

We don't have an unique server banner but in combination with the HTML title `Home Assistant`, is it simple to identify Home Assistant instances.

```bash
$ nc 192.168.0.3 8123
GET / HTTP/1.1
host: localhost

HTTP/1.1 200 OK
Server: Python/3.6 aiohttp/3.1.3
[...]
```

One option to avoid this exposure is using a [reverse proxy](/docs/ecosystem/nginx/).

