---
layout: page
title: "Authentication Providers"
description: "Guide on configuring different auth providers."
date: 2018-08-23 09:40
redirect_from: /components/auth/
sidebar: true
comments: false
sharing: true
footer: true
---

<p class='note warning'>
This page only apply to release 0.77 and above.
</p>

<p class='note warning'>
This is an advanced feature. If misconfigured, you will not be able to access Home Assistant anymore!
</p>

When a user logs in, it needs to authenticate against an auth provider. An auth provider will check the users' credentials, and if credentials are linked to a user in the system, allows the user to log in.

By default, Home Assistant has enabled an auth provider that stores the users in the configuration directory. An owner account can manage these users from the frontend.

To make the transition from API password to authentication system easier, we've added a legacy API password auth provider. This enables users to log in with the API password. This authentication provider is enabled by default if a user has an API password configured.

## {% linkable_title Configuring auth providers %}

<p class='note warning'>
By configuring your own instead of using the default configuration, you take full responsibility for the authentication of the system.
</p>

Authentication providers are configured in your `configuration.yaml` under the `homeassistant:` block:

```yaml
homeassistant:
  auth_providers:
   - type: homeassistant
   - type: legacy_api_password
```

## {% linkable_title Available auth providers %}

Below is a list of currently available auth providers.

### {% linkable_title Home Assistant auth provider %}

This is the default auth provider which stores the users in your configuration directory. All passwords are stored hashed and with a salt, making it almost impossible for an attacker to figure out the password from the storage.

Users for this auth provider can be managed via the UI by the owner. Navigate to the configuration panel and click on users.

```yaml
homeassistant:
  auth_providers:
   - type: homeassistant
```

### {% linkable_title Trusted Network %}

With the trusted network auth provider you can whitelist an IP range for which no authentication will be required. The user will be prompted to pick a user to log in as.

```yaml
homeassistant:
  auth_providers:
   - type: trusted_networks

# Temporary, this will be moved to be part of auth provider config
# https://github.com/home-assistant/home-assistant/issues/16149
http:
  trusted_networks:
    - 127.0.0.1
    - ::1
    - 192.168.0.0/24
    - fd00::/8
```

### {% linkable_title Legacy API password %}

Activating this auth provider will allow you to authenticate with the API password set in the HTTP component.

```yaml
homeassistant:
  auth_providers:
   - type: legacy_api_password

http:
  api_password: !secret http_password
```

Activating this auth provider will also allow you to provide the API password using an authentication header to make requests against the Home Assistant API. This feature will be dropped in the future in favor of long-lived access tokens.
