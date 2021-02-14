---
title: "Remote access"
description: "Setting up remote access for Home Assistant."
---

<div class='note'>
Users of <a href="https://www.nabucasa.com">Home Assistant Cloud</a> can use the <a href="https://www.nabucasa.com/config/remote/">Remote UI</a> without requiring any configuration.
</div>

If you're interested in logging in to Home Assistant while away, you'll have to make your instance remotely accessible.

<div class='note warning'>

Remember to follow the [securing checklist](/docs/configuration/securing/) before doing this.

</div>

## Setting up remote access
<div class='note'>
Home Assistant no longer supports remote access via IP address since release 0.77, you have to use a domain name. A Domain can be obtained from several providers. 
</div>

To set up a remote instance, you will need to set up Port Forwarding on your router to port 8123 on the computer that is hosting Home Assistant. 

<div class='note'>
General Instructions on Port Forwarding can be found by searching `<router model> port forwarding instructions`. 
</div>
<div class='note warning'>
It is not advised to set up direct NAT without HTTPS enabled.  Always enable HTTPS.
</div>

One potential problem with port forwarding on a residential connection is most internet service providers use dynamic IP addresses. This offers the security of making it harder to find your IP address in the continuously moving sea of other IP addresses. However, it also makes it more difficult to find your Home Assistant within that sea. You can solve this by using a Dynamic DNS service.
<div class='note'>
 [DuckDNS](https://www.duckdns.org/) provides free Dynamic DNS. [Google Domains](https://domains.google), or [No IP](https://noip.com) provide both the Domain and the Dynamic DNS required for Home Assistant. 
</div>

If you cannot access your Home Assistant installation remotely, remember to check if your ISP provides you with a dedicated IP, instead of one shared with other users via a [CG-NAT](https://en.wikipedia.org/wiki/Carrier-grade_NAT). This is becoming fairly common nowadays due to the shortage of IPv4 addresses. Some, if not most ISPs will require you to pay an extra fee to be assigned a dedicated IPv4 address.

<div class='note'>

Just putting a port up is not secure. You should definitely consider encrypting your traffic if you are accessing your Home Assistant installation remotely. For details please check the [set up encryption using Let's Encrypt](/blog/2017/09/27/effortless-encryption-with-lets-encrypt-and-duckdns/) blog post or this [detailed guide](/docs/ecosystem/certificates/lets_encrypt/) to using Let's Encrypt with Home Assistant.

</div>


## Apache Proxy
An Apache HTTP Server Proxy can be used to  provide full access (including web socket APIs), and HTTPS security over a domain of your choosing.  Apache HTTP Server is a commonly used server software and is available on nearly all platforms capable of running Linux. 

A common Apache Proxy server for Home Assistant can be set up with the following mods enabled.
* mod_ssl
* mod_proxy
* mod_rewrite
* mod_remoteip

You may use the example below and replace the following:
* `<YOUR DOMAIN.COM>` is replaced with your domain name, eg. "homeassistant.mydomain.com".
* `<YOUR EMAIL ADDRESS>` is replaced with your email address, eg. "me@my.com".
* `<HOME ASSISTANT IP ADDRESSS>` is replaced with the local IP of your Home Assistant on your network, eg. "192.168.1.8".
* `</path/to/your/fullchain.pem>` is replaced with the certificate chain which tells your browser how to authenticate your server.
* `</path/to/your/privkey.pem>` is replaced with your private key, used to provide encryption to connected clients. 
  
```configuration

<VirtualHost *:80>
        ServerName        <YOUR DOMAIN.COM>
        ServerAdmin       <YOUR EMAIL ADDRESS>
        RewriteEngine On
        # Enable the Rewrite capabilities
        RewriteCond %{HTTPS} !=on
        # Redirect to HTTPS 
        RewriteRule ^/?(.*) https://%{SERVER_NAME}/$1 [R,L]
</VirtualHost>

<VirtualHost *:443>

        ServerName        <YOUR DOMAIN.COM>
        ServerAdmin       <YOUR EMAIL ADDRESS>

        #fix detecting incorrect login IP by proxy server if required
        RemoteIPInternalProxy <YOUR ROUTER IP ADDRESS>
        RemoteIPHeader X-Forwarded-For

        #proxy server setup
        ProxyPreserveHost On
        ProxyRequests Off
        
        #Proxy API websocket
        ProxyPass /api/websocket ws://<HOME ASSISTANT IP ADDRESSS>:8123/api/websocket
        ProxyPassReverse /api/websocket wss://<HOME ASSISTANT IP ADDRESSS>:8123/api/websocket
        
        #Proxy http access
        ProxyPass / http://<HOME ASSISTANT IP ADDRESSS>:8123/
        ProxyPassReverse / http://<HOME ASSISTANT IP ADDRESSS>:8123/

        #fix websockets for addons and apis
        RewriteEngine On
        RewriteCond %{HTTP:Upgrade} websocket [NC]
        RewriteRule ^/?(.*) "ws://<HOME ASSISTANT IP ADDRESSS>:8123/$1" [P,L]

        #HTTPS certs
        SSLProxyEngine On
        SSLCertificateFile </path/to/your/fullchain.pem>
        SSLCertificateKeyFile </path/to/your/privkey.pem>
</VirtualHost>
```




