---
title: "Home Assistant/Hass.io porosity"
description: "Use nmap to scan your Home Assistant instance."
---

As a large amount of users are running [Hass.io](/hassio/), here we are using a Raspberry Pi 3 B and Hass.io 0.70.0 to show how Home Assistant looks from the network side. This is not a full blown investigation, just a quick overview.

The IP address of the Home Assistant machine is 192.168.0.215. The system which is the source of the scans is a machine running Fedora 27 and Nmap 7.60 is used to perform the port scans. Both systems are in the same network.

## SSH server Add-on

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

## Mosquitto MQTT broker Add-on

While setting up the [Mosquitto MQTT broker add-on](/addons/mosquitto/) no settings were modified, the add-on was running with the default settings.

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

To secure MQTT to consider to use certificates and to specify users with password under `logins:` at least. Use port 1883 only in your local network.

## Samba Add-on

The [Samba add-on](/addons/samba/) enables one to use a Windows system to access the configuration and other shares. Per default there is no user set. To increase your local security we strongly suggest that you set a username and a password and don't allow guests. A sample configuration could look like the one below.

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
IPC Service (Samba Home Assistant config share)
Reconnecting with SMB1 for workgroup listing.

	Server               Comment
	---------            -------

	Workgroup            Master
	---------            -------
	WORKGROUP            HASSIO
```

But without username and password you can't get access to the configuration file with the settings shown here.

```json
[...]
  "guest": false,
  "username": "homeassistant",
  "password": "homeassistant",
  "interface": "eth0"
}
```
