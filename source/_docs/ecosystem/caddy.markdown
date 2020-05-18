---
title: "Caddy Server reverse proxy"
description: "Configure Caddy Server as a reverse proxy to Home Assistant."
---
[Caddy Server](https://caddyserver.com/) is a powerful HTTP/2 server, that enables HTTPS by default with automatically generated Let's Encrypt certificates, which allows a simple configuration procces.

Using Caddy as a proxy for Home Assistant allows you to serve Home Assistant securely over standard ports. This configuration file and instructions will walk you through setting up Home Assistant over a secure connection.

### 1. Get a domain name forwarded to your IP

Chances are, you have a dynamic IP address (your ISP changes your address periodically). If this is true, you can use a Dynamic DNS service to obtain a domain and set it up to update with you IP. If you purchase your own domain name, you will be able to easily get a trusted SSL certificate later.

### 2. Install Caddy on your server

This will vary depending on your OS. Caddy has a [nice utillity](https://caddyserver.com/download) that generates an installer script.

<div class='note'>
    Make sure you include the `hook.service` plugin if you want to run Caddy as a service
</div>

### 3. Port forwarding.

Forward ports 443 and 80 to your server on your router. Do not forward port 8123.

### 4. Create Caddyfile.

Use this as your Caddyfile, change the domain name to match yours.

```text
example.com {
    proxy / localhost:8123 {
        websocket
        transparent
    }
}
```

### 5. Configure Home Assistant

Home Assistant is still available without using the Caddy proxy. Restricting it to only listen to `127.0.0.1` will forbid direct accesses. Also, Home Assistant should be told to trust headers coming from Caddy proxy only. Otherwise, incoming requests will always come from `127.0.0.1` and not the real IP address.

On your `configuration.yaml` file, edit the `http` component.

```yaml
http:
  # For extra security set this to only accept connections on localhost if Caddy is on the same machine
  # server_host: 127.0.0.1
  use_x_forwarded_for: true
  # You must set the trusted proxy IP address so that Home Assistant will properly accept connections
  # Set this to your Caddy machine IP, or localhost if hosted on the same machine.
  trusted_proxies: <Caddy IP address here, or 127.0.0.1 if hosted on the same machine>
```

### 6. Start Caddy

You can either start Caddy or [install it as a service](https://github.com/mholt/caddy/wiki/Caddy-as-a-service-examples), pass the Caddyfile path as a `conf` parameter.
Home Assistant will be listening on port 443 (HTTPS) and all insecure traffic on port 80 will be redirected.
