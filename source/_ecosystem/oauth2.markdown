---
layout: page
title: "Oauth2"
description: "Documentation about setting up Home Assistant with an oauth2 Auth provider using nginx and bitly/oauth2_proxy."
release_date: 2017-01-22 12:00:00 -0600
sidebar: true
comments: true
sharing: true
footer: true
---

Once you have [NGINX](https://home-assistant.io/ecosystem/nginx/) set up with Home Assistant, your own domain, and an SSL Certificate, you can set up authentication to require sign in with an oauth2 authentication provider suchas Google, Github, Linkedin, and others using [bitly/oauth2_proxy](https://github.com/bitly/oauth2_proxy).

This also allows 2-factor authentication when using an oauth2 providers that support it.

These instructions will walk you through modifying your nginx configuration to support one of these providers by setting up your own oauth2_proxy and using the auth_request directive.

### {% linkable_title 1. Pick your oauth provider and acquire the authentication keys. %}

This is taken directly from the oauth2_proxy [Github Page](https://github.com/bitly/oauth2_proxy). For other providers, visit that page as it has more detailed instructions.

For Google, the registration steps are:

1. Create a new project: [https://console.developers.google.com/project](https://console.developers.google.com/project)
2. Choose the new project from the top right project dropdown (only if another project is selected)
3. In the project Dashboard center pane, choose **"Enable and manage APIs"**
4. In the left Nav pane, choose **"Credentials"**
5. In the center pane, choose **"OAuth consent screen"** tab. Fill in **"Product name shown to users"** and hit save.
6. In the center pane, choose **"Credentials"** tab.
   * Open the **"New credentials"** drop down
   * Choose **"OAuth client ID"**
   * Choose **"Web application"**
   * Application name is freeform, choose something appropriate
   * Authorized JavaScript origins is your domain ex: `https://internal.yourcompany.com`
   * Authorized redirect URIs is the location of oath2/callback ex: `https://internal.yourcompany.com/oauth2/callback`
   * Choose **"Create"**
4. Take note of the **Client ID** and **Client Secret**

### {% linkable_title 2. Install oauth2_proxy %}

I am going to take the cheap route and send you directly to the [Github Page](https://github.com/bitly/oauth2_proxy) for oauth2_proxy for general installation of the product.

If you are using docker, you can use this command to run it and reference the configuration files we create in the next step:

```
docker run -d --name="oauth2_proxy" --net="bridge" -e -p 8095:8095/tcp -v "/path/to/appdata/oauth2_proxy":"/config":rw bitly/oauth2_proxy -config="/config/oauth2_proxy.cfg"
```

### {% linkable_title 3. Configure oauth2_proxy %}

We are going to create 2 files, `oauth2_proxy.cfg` and `auth_emails`, which will contain a list of email addresses that will be allowed in.

In `oauth2_proxy.cfg`, the biggest non-standard thing we are going to do is to proxy it to `file:///dev/null` so that it doesn't attempt to return anything other than the 200 OK response to nginx because oauth2_proxy is only being used to auth, not to proxy.

```
http_address = "0.0.0.0:8095"
upstreams = [
    "file:///dev/null"
 ]
client_id = "Client_ID"
client_secret = "Client_Secret"
authenticated_emails_file = "/config/auth_emails"
cookie_name = "_home_assistant"
cookie_secret = "4C4F1B247E837B62"
cookie_domain = "example.com"
cookie_expire = "72h"
cookie_refresh = "4h"
cookie_secure = false
```

### {% linkable_title 4. Edit your nginx configuration %}

We need to add several things to the nginx configuration. If you are currently using basic authentication with nginx, you probably want to disable them at this point or you are going to have several separate layers to sign in.

### {% linkable_title Oauth2 Locations %}

We need to create locations to proxy the `/oauth2` commands through nginx when they are requested.
```
  location = /oauth2/auth {
      internal;
      proxy_pass http://10.10.10.200:8095;
      proxy_set_header Host $host;
      proxy_pass_request_body off;
      proxy_set_header Content-Length "";
  }

  location = /oauth2/start {
      internal;
      proxy_pass http://10.10.10.200:8095;
      proxy_set_header Host $host;
      proxy_pass_request_body off;
      proxy_set_header Content-Length "";
  }
  
  location = /oauth2/callback {
      auth_request off;
      proxy_pass http://10.10.10.200:8095;
      proxy_set_header Host $host;
  }
```  

### {% linkable_title Home Assistant API %}

Most external uses of the Home Assistant API are not going to be able to authenticate through the oauth2 layer. To get around this, we need to configure nginx to recognize the Home Assistant `api_password` and skip the oauth layer if that happens.

To accomplish this, we need to add 2 location definitions in your nginx configuration to process the `/api` requests. Keep in mind that the api_password is statically coded into the nginx configuration and would need to be updated here if you change it in Home Assistant. Or you can disable it altogether, but you need to uncomment the section in the `/_api` location

```
  location /api {
      ### Check for API Password and use /_api for processing of this request
      if ($args ~ api_password=abc123) {
            rewrite ^/api/(.*?)/?$ /_api/$1 last;
      }
      expires off;
      auth_request /oauth2/auth;
      proxy_pass http://10.10.10.108:8123/api;
      error_page 401 = /oauth2/start?rd=$uri;
      proxy_set_header X-Real-IP  $remote_addr;
      proxy_set_header X-Forwarded-For $remote_addr;
      proxy_set_header Host $host;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
  }
### Redirect to _api that can only be accessed by a redirect because of the interal setting
  location /_api {
      internal;

      ### This section will strip the api_password from the end of the URL. Uncomment this if you want to remove the password in the Home Assistant interface and use ONLY the oauth2 layer for signing into your Home Assistant.
      #if ($args ~* ^(.*)(&?)api_password=abc123$) {
      #      set $stripped_params $1;
      #      rewrite ^(.*)$ $1?$stripped_params?;
      #}
      ### Rewrite /_api to /api before we proxy to Home-Assistant
      rewrite ^/_api/(.*?)/?$ /api/$1 break;
      proxy_pass http://10.10.10.108:8123/api;
      proxy_set_header X-Real-IP  $remote_addr;
      proxy_set_header X-Forwarded-For $remote_addr;
      proxy_set_header Host $host;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
  }
```

### {% linkable_title notify.html5 platform%}

If you are using the notify.html5 platform, you have to add 2 special locations before the `/api` location. The `/api/notify.html5/callback` uses its own authentication, and is safe to skip the oauth2 auth step, and `/manifest.json` needs to be available with no authentication.

```
  location /manifest.json {
      proxy_pass http://10.111.111.108:8123/manifest.json;
      proxy_set_header X-Real-IP  $remote_addr;
      proxy_set_header X-Forwarded-For $remote_addr;
      proxy_set_header Host $host;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
  }
  
  location /api/notify.html5/callback {
      proxy_pass http://10.111.111.108:8123/api/notify.html5/callback;
      proxy_set_header X-Real-IP  $remote_addr;
      proxy_set_header X-Forwarded-For $remote_addr;
      proxy_set_header Host $host;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
  }

```

### {% linkable_title location / %}

We need to add a few lines to the root location for your home-assistant proxy. We need to add these lines:

```
      expires off;
      auth_request /oauth2/auth;
      error_page 401 = /oauth2/start?rd=$uri;
```

So that it will look something like this:

```
  location / {
      expires off;
      auth_request /oauth2/auth;
      proxy_pass http://10.10.10.108:8123/;
      error_page 401 = /oauth2/start?rd=$uri;
      proxy_set_header X-Real-IP  $remote_addr;
      proxy_set_header X-Forwarded-For $remote_addr;
      proxy_set_header Host $host;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
  }
```

Please let me know if you know of any improvements to this setup or any caveats I left out.
