---
title: "HAProxy"
description: "Documentation about setting up Home Assistant with HAProxy"
---

Using HAProxy to proxy for Home Assistant allows you to serve Home Assistant securely over standard ports with HTTP to HTTPS redirection.

### Install HAProxy on your server

This will vary depending on your OS. Check out Google for this.

### Obtain an SSL certificate

There are multiple ways of obtaining an SSL certificate. Let’s Encrypt is one method.
Use Google for this, but a good example of using Certbot can be found [here](https://www.digitalocean.com/community/tutorials/how-to-secure-haproxy-with-let-s-encrypt-on-ubuntu-14-04).

### HAPRoxy Configuration

The following configuration updates HAProxy defaults for more secure ciphers for SSL and logging and connection
timeouts.

Items to update for your deployment:

 * `bind`: Update the ports HAProxy listens on for forwarding.
 * `subdomain.domain.com`: Your domain to use
 * `ssl crt`: The path to your SSL certificate.
 * `server hass 127.0.0.1:8123`: The IP and port location of your Home Assistant instance.

```text
global
	log /dev/log	local0
	log /dev/log	local1 notice
	chroot /var/lib/haproxy
	stats socket /run/haproxy/admin.sock mode 660 level admin
	stats timeout 30s
	user haproxy
	group haproxy
	daemon

	# Default SSL material locations
	ca-base /etc/ssl/certs
	crt-base /etc/ssl/private

	# Default ciphers to use on SSL-enabled listening sockets.
	# For more information, see ciphers(1SSL). This list is from:
	#  https://hynek.me/articles/hardening-your-web-servers-ssl-ciphers/
	ssl-default-bind-ciphers ECDH+AESGCM:DH+AESGCM:ECDH+AES256:DH+AES256:ECDH+AES128:DH+AES:ECDH+3DES:DH+3DES:RSA+AESGCM:RSA+AES:RSA+3DES:!aNULL:!MD5:!DSS
	ssl-default-bind-options no-sslv3
	maxconn 2048
	tune.ssl.default-dh-param 2048

defaults
	log	global
	mode	http
	option	httplog
	option	dontlognull
	timeout connect 5000
	timeout client  50000
	timeout server  50000
	timeout tunnel  60000    # long enough for websocket pings every 55 seconds
	timeout http-request 5s  # protection from Slowloris attacks

frontend www-http
	bind *:80
	redirect scheme https

frontend www-https
	log /dev/log	local0 debug
	bind *:443 ssl crt /etc/haproxy/certs/MYCERT.pem
	acl hass-acl hdr(host) -i SUBDOMAIN.DOMAIN.COM
	use_backend hass-backend if hass-acl

backend hass-backend
	server hass <Home Assistant Server IP>:8123

	mode http
	option forwardfor
	http-request add-header X-Forwarded-Proto https
	http-request add-header X-Forwarded-Port 443
```

### Forward Ports

Forward ports 443 and (optionally) 80 to your server on your router.

Do not forward port 8123, HAProxy takes care of securing the connection with HTTPS on 443.
If 8123 is forwarded then it will not be secured.

Replace 443 with whatever port you chose to bind to in the configuration if different.

### Configure Home Assistant HTTP Component

In your `configuration.yaml` file, edit the [HTTP component](/integrations/http/).

```text
http:
  # For extra security set this to only accept connection on localhost if HAProxy is on the same machine
  # server_host: 127.0.0.1
  use_x_forwarded_for: true
  # You must set the trusted proxy IP address so that Home Assistant will properly accept connections
  # Set this to your HAProxy machine IP, or localhost if hosted on the same machine.
  trusted_proxies: <HAProxy IP address here, 127.0.0.1 if same machine>
```

### Restart or Reload HAProxy

Use your OS method of restarting or reloading HAProxy. Use Google for this.
