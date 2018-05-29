---
layout: post
title: "Home Assistant security"
description: "Open ports of a Hass.io installation with different add-ons."
date: 2018-05-30 00:01:00
date_formatted: "May 30, 2018"
author: Fabian Affolter
author_twitter: fabaff
comments: true
categories: Release-Notes
og_image: /images/blog/2018-05-security/social.png
---


There were a couple of threads in our forum with scary titles like "[I have been Hacked](https://community.home-assistant.io/t/i-have-been-hacked/53723)", "[HA security and hacking](https://community.home-assistant.io/t/ha-security-and-hacking/54322)" or "[I got hacked](https://community.home-assistant.io/t/i-got-hacked/54083)". Of course, do those long discussions contain some rumors, speculations and assumptions. 

Just to be clear: We, the Home Assistant Developer, take security, privacy and integrity very serious. 

As a large amount of users are running [Hass.io](/hassio/), I'm going to use a Raspberry Pi 3 B and Hass.io 0.70.0 to show how Home Assistant looks from the network side. This is not a full blown investigation, just a quick overview to give you some closure.

The IP address of the Home Assistant machine is 192.168.0.215. The system which is the source of the scans is a machine running Fedora 27 and Nmap 7.60 is used to preform the port scans. Both systems are in the same network. Internet access is provided by a Opnsense firewall which is connected to the cable modem of my ISP.

There is an `api_password` set but otherwise Hass.io is running with a default configuration that is created on the first launch.

The default port of Home Assistant is 8123. This is the port where the [`frontend`](/components/frontend/) and the [`API`](/components/api/) is served. Both are depending on the [`http`](/components/http/) component which contains the capability to adjust the settings like `server_host` or `server_port`.

In the next section we are going to test Hass.io with the three most popular add-ons.

## {% linkable_title Hass.io 0.70.0 with SSH server Add-on %}

To get access to Hass.io in secure way, SSH is provided by the [SSH server add-on](/addons/ssh/). 

```bash
$ sudo nmap -A -n --reason -Pn -T5 -p1-65535 192.168.0.215

Starting Nmap 7.60 ( https://nmap.org ) at 2018-05-29 15:08 CEST
Nmap scan report for 192.168.0.215
Host is up, received arp-response (0.00051s latency).
Not shown: 65532 closed ports
Reason: 65532 resets
PORT      STATE SERVICE REASON         VERSION
22/tcp    open  ssh     syn-ack ttl 63 OpenSSH 7.5 (protocol 2.0)
| ssh-hostkey: 
|   2048 e3:a2:2d:20:3a:67:68:b9:b1:9e:16:fa:48:80:82:96 (RSA)
|   256 92:f0:f4:be:4f:44:60:0e:c4:92:8a:cb:34:9e:c5:c2 (ECDSA)
|_  256 09:da:a2:14:cd:c4:69:e9:13:e6:70:64:98:d0:55:0c (EdDSA)
8123/tcp  open  http    syn-ack ttl 64 aiohttp 3.1.3 (Python 3.6)
|_http-open-proxy: Proxy might be redirecting requests
| http-robots.txt: 1 disallowed entry 
|_/
|_http-server-header: Python/3.6 aiohttp/3.1.3
|_http-title: Home Assistant
22222/tcp open  ssh     syn-ack ttl 64 Dropbear sshd 2016.74 (protocol 2.0)
MAC Address: B8:41:CD:4B:7A:5D (Raspberry Pi Foundation)
Device type: general purpose
Running: Linux 3.X|4.X
OS CPE: cpe:/o:linux:linux_kernel:3 cpe:/o:linux:linux_kernel:4
OS details: Linux 3.2 - 4.8
Network Distance: 1 hop
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE
HOP RTT     ADDRESS
1   0.51 ms 192.168.0.215

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 726.23 seconds
```

That port 22 and 8123 are open was expected. On port 22222 is an additional SSH server running. This port is for [debugging](https://developers.home-assistant.io/docs/en/hassio_debugging.html) and supports only a login with a key. This means that you would need to remove the SD card from your Raspberry Pi, create an `authorized_keys` with your SSH public key in it and put the SD Card back in your Pi to get access.

## {% linkable_title Hass.io 0.70.0 with Mosquitto MQTT broker Add-on %}

While setting up the [Mosquitto MQTT broker add-on](/addons/mosquitto/) no settings very modified. The add-on will run with the default settings.

```bash
$ sudo nmap -A -n --reason -Pn -T5 -p1-65535 192.168.0.215

Starting Nmap 7.60 ( https://nmap.org ) at 2018-05-29 15:52 CEST
Nmap scan report for 192.168.0.215
Host is up, received arp-response (0.0011s latency).
Not shown: 65532 closed ports
Reason: 65532 resets
PORT      STATE SERVICE                  REASON         VERSION
1883/tcp  open  mosquitto version 1.4.12 syn-ack ttl 63
| mqtt-subscribe: 
|   Topics and their most recent payloads: 
|     $SYS/broker/load/connections/5min: 0.39
[...]
|     $SYS/broker/load/connections/15min: 0.13
|_    $SYS/broker/clients/total: 2
8123/tcp  open  http                     syn-ack ttl 64 aiohttp 3.1.3 (Python 3.6)
|_http-open-proxy: Proxy might be redirecting requests
| http-robots.txt: 1 disallowed entry 
|_/
|_http-server-header: Python/3.6 aiohttp/3.1.3
|_http-title: Home Assistant
22222/tcp open  ssh                      syn-ack ttl 64 Dropbear sshd 2016.74 (protocol 2.0)
MAC Address: B8:41:CD:4B:7A:5D (Raspberry Pi Foundation)
Device type: general purpose
Running: Linux 3.X|4.X
OS CPE: cpe:/o:linux:linux_kernel:3 cpe:/o:linux:linux_kernel:4
OS details: Linux 3.2 - 4.8
Network Distance: 1 hop
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE
HOP RTT     ADDRESS
1   1.13 ms 192.168.0.215

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 223.76 seconds
```

Instead of port 22 is now port 1883 open. To secure MQTT to consider to use certificates and to specify users with password under `logins:` at least.

## {% linkable_title Hass.io 0.70.0 with Samba Add-on %}

The [Samba add-on](/addons/samba/) enables one to use a Windows system to access the configuration and other shares. Per default there is no user set. To increase your local security we strongly suggest that you set a username and a password and don't allow guests. A sample configuration could look like the one below.

```json
[...]
  "guest": false,
  "username": "homeassistant",
  "password": "homeassistant",
  "interface": "eth0"
}
```

A port scan for Hass.io with this add-on will give you the details.

```bash
$ sudo nmap -A -n --reason -Pn -T5 -p1-65535 192.168.0.215

Starting Nmap 7.60 ( https://nmap.org ) at 2018-05-29 16:29 CEST
Host is up, received arp-response (0.00045s latency).
Not shown: 65523 closed ports
Reason: 65523 resets
PORT      STATE    SERVICE     REASON         VERSION
139/tcp   open     netbios-ssn syn-ack ttl 64 Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp   open     netbios-ssn syn-ack ttl 64 Samba smbd 4.7.3 (workgroup: WORKGROUP)
7044/tcp  filtered unknown     no-response
8123/tcp  open     http        syn-ack ttl 64 aiohttp 3.1.3 (Python 3.6)
|_http-open-proxy: Proxy might be redirecting requests
| http-robots.txt: 1 disallowed entry 
|_/
|_http-server-header: Python/3.6 aiohttp/3.1.3
|_http-title: Home Assistant
22222/tcp open     ssh         syn-ack ttl 64 Dropbear sshd 2016.74 (protocol 2.0)
MAC Address: B8:41:CD:4B:7A:5D (Raspberry Pi Foundation)
Device type: general purpose
Running: Linux 3.X|4.X
OS CPE: cpe:/o:linux:linux_kernel:3 cpe:/o:linux:linux_kernel:4
OS details: Linux 3.2 - 4.8
Network Distance: 1 hop
Service Info: Host: HASSIO; OS: Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
|_nbstat: NetBIOS name: HASSIO, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| smb-os-discovery: 
|   OS: Windows 6.1 (Samba 4.7.3)
|   Computer name: \x00
|   NetBIOS computer name: HASSIO\x00
|   Workgroup: WORKGROUP\x00
|_  System time: 2018-05-29T16:41:05+02:00
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode: 
|   2.02: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2018-05-29 16:41:05
|_  start_date: 1601-01-01 00:53:28

TRACEROUTE
HOP RTT     ADDRESS
1   0.46 ms 192.168.0.215

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 727.43 seconds
```

139 and 445 are open and it's possible to enumerate the shares. With different tools you will get pretty much the same information.

```bash
$ smbclient -L //192.168.0.215 -U%

	Sharename       Type      Comment
	---------       ----      -------
	config          Disk      
	addons          Disk      
	share           Disk      
	backup          Disk      
	IPC$            IPC       
IPC Service (Samba HomeAssistant config share)
Reconnecting with SMB1 for workgroup listing.

	Server               Comment
	---------            -------

	Workgroup            Master
	---------            -------
	WORKGROUP            HASSIO
```

But without username and password you can't get access to the configuration file with the settings shown here.

<p class='img'>
  <img
    src='/images/blog/2018-05-security/shares.png'
    alt='Accessing Hass.io shares with GNOME' />
  Accessing SMB shares on Hass.io
</p>

## {% linkable_title Allowing remote access %}

Home Assistant is NOT able to change the configuration of your router or firewall. This means that you need to setup port-forwarding and adjusting firewall rules if you want to allow access from the internet. By default your frontend, Mosquitto, SSH and your Samba shares are only accessible from your local network.

Beside the recommandation in the [Securing checklist](/docs/configuration/securing/) for remote access also check those points:

- Don't use forward the ports used by the Samba add-on.
- Use `ip_ban_enabled` and `login_attempts_threshold`. A brute force attack on the frontend or SSH is a treat.
- Disable `trusted_networks`.
- Limit the access to the Home Assistant frontend. Don't allow access to the [Configurator add-on](/addons/configurator/) for the internet.
- Check the [UPnP](https://en.wikipedia.org/wiki/Universal_Plug_and_Play) settings of your router/firewall and disable it when not needed.
- Review your router/firewall logs on a regular base.
- If possible, use the VPN feature of your router or firewall to get access to your home network and Home Assistant. 

## {% linkable_title Summary %}

As you can see in the results of the scans only the ports which are needed by a running services are open. If you stop an add-on then the port is no longer accessible and the porosity of your Hass.io machine will decrease.

We don't have an unique server banner but in combination with the HTML title `Home Assistant`, is it simple to identiy Home Assistant instances.

```bash
$ nc 192.168.0.215 8123
GET / HTTP/1.1
host: localhost

HTTP/1.1 200 OK
Server: Python/3.6 aiohttp/3.1.3
[...]
```

One option to avoid this exposure is using a [reverse proxy](/docs/ecosystem/nginx/).

If you are unsure about your current state, check our [documentation](/docs/), the documentation of your router/firewall and use the [forum](https://community.home-assistant.io/) and the [chat](https://discord.gg/c5DvZ4e) for questions.
