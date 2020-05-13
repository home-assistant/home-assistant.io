---
title: "Pound reverse proxy"
description: "Configure Pound as a reverse proxy to Home Assistant."
---
[Pound](https://www.apsis.ch/pound.html) is a reverse proxy, load balancer and HTTPS front-end for Web server(s). The most notable feature is that it's so small and lightweight that it's able to run stable on embedded platforms too.

The most typical usage scenario is that the user runs Pound on the main router or firewall of the network, instructing it to forward requests from the public internet to the backends like Home Assistant. Using this instead of simple port forwarding of the http(s) on the router makes the connectios more secure, as headers are parsed each time before passing to the backend, and can be filtered. Using it as an SSL wrapper can increase security dramatically and make configuration of the network more simple, as HTTPS requests coming from the internet are passed as HTTP to the backends, responses are sent as HTTPS back to the clients. Pound can do this for multiple internal backends in the network, and through different domain names called, the user can reach to different internal hosts on the same port, which is not possible using simple port fowarding.

Using Pound as a proxy for Home Assistant allows you to serve Home Assistant securely over standard ports through the public internet. In the examples below if you want to access Home Assistant from the public internet, your HTTP request will be automatically redirected to HTTPS, and then passed to your internal server as HTTP. This works both for Home Assistant and Home Assistant Core.

### 1. Get a domain name forwarded to your IP, and get SSL certificates.

Chances are, you have a dynamic IP address (your ISP changes your address periodically). If this is true, you can use a Dynamic DNS service to obtain a domain and set it up to update with you IP. 

Also prepare your SSL certificates for HTTPS access. LetsEncrypt is a free open certificate authority which allows for trusted secure communications. The certificates need to be renewed periodically. This process can be automated, but the way to do it will vary depending on your router or the platform you intend to run Pound on. In the examples below this will be `myhomeassistant.mydomain.com`.

### 2. Install Pound on your router

This will vary depending on your router. Good practices are to run Pound in a jail if possible (on systems like pfSense). Check for correct startup scripts when the router boots, and specifics to load configuration from your customized and custom located config file.

### 3. Port forwarding.

With the configuration examples below, Pound will listen to ports 7080 and 7443 on the 127.0.0.1 localhost address of the router. You will need to make port forwards of port 80 to 7080 and 443 to 7443, to address 127.0.0.1 on the router. Don't forward ports directly to Home Assistant.

### 4. Create Pound configuration.

Start with this as Pound config, change the domain name, and installation specifics to match yours.

```
## global options:
User		"nobody"
Group		"nobody"
RootJail	"/var/jail/pound/"

LogLevel	0
LogFacility deamon
IgnoreCase	1

## check backend every 15 secs:
Alive		15

## HTTP Listener
ListenHTTP
	Address 127.0.0.1
	Port    7080 #port forward this as port 80 from the internet to 127.0.0.1
	LogLevel 0
	xHTTP 2
	HeadRemove "X-Forwarded-For"
	Service
		HeadRequire "Host: myhomeassistant.mydomain.com"
		Redirect "https://myhomeassistant.mydomain.com"
	End
End

## HTTPS Listener
ListenHTTPS
	Address 127.0.0.1
	Port    7443 #port forward this as port 443 from the internet to 127.0.0.1
	Cert    "/var/jail/pound/myhomeassistant.mydomain.com.all.pem"
	LogLevel 0
	xHTTP 2
	Disable SSLv3
	Ciphers "ALL:!RC4:!ECDH:!DH"
	HeadRemove "X-Forwarded-For"
End

## Backends to both HTTP and HTTPS
Service
	HeadRequire "Host: myhomeassistant.mydomain.com"
	BackEnd
		Address 192.168.1.2 # the IP address of Home Assistant
		Port    8123
	End
End
```

### 5. Configure Home Assistant

Home Assistant will be available on the internal networks as usual, without Pound proxy, on port 8123 as HTTP. Seen from the internet, it will be accessible on port 443 as HTTPS. Any request from the internet to HTTP will be redirected to HTTPS first.

But because Pound works as a reverse proxy, Home Assistant will think every request comes from the router's internal IP, which is not correct. To fix this Pound add to the request headers `X-Forwarded-For` field containing the address of the external host originating the request. Therefore, in your `configuration.yaml` file, edit the `http` component as below:

```yaml
http:
  use_x_forwarded_for: true
  trusted_proxies:
    - 192.168.1.1 #the IP address of the router running pound seen from the inside network (as seen from Home Assistant)
```
Good luck!
