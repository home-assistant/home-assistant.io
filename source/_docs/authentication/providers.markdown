---
title: "Authentication Providers"
description: "Guide on configuring different auth providers."
---

<div class='note warning'>
  This is an advanced feature.
</div>

When you log in, an _auth provider_ checks your credentials to make sure you are an authorized user.

## Configuring auth providers

<div class='note warning'>

Home Assistant automatically configures the standard auth providers so you don't need to specify `auth_providers` in your `configuration.yaml` file unless you are configuring more than one. Specifying `auth_providers` will disable all auth providers that are not listed, so you could reduce your security or create difficulties logging in if it is not configured correctly.

If you decide to use `trusted_networks` as your `auth_provider` there won't be a way to authenticate for a device outside of your listed trusted network. To overcome this ensure you add the default `auth_provider``type: homeassistant` back in manually. This will then present you with the default auth login screen when trusted network authentication fails as expected from outside your LAN.

</div>

Authentication providers are configured in your `configuration.yaml` under the `homeassistant:` block. You can supply more than one, for example:

```yaml
homeassistant:
  auth_providers:
    - type: homeassistant
    - type: legacy_api_password
      api_password: !secret http_password
```

## Available auth providers

### Home Assistant auth provider

This is the default auth provider. The first user created is designated as the _owner_ and can create other users.

User details are stored in the `[your config]/.storage`  directory. All passwords are stored hashed and with a salt, making it almost impossible for an attacker to figure out the password even if they have access to the file.

Users can be managed in Home Assistant by the owner. Go to the configuration panel and click on _{% my users %}_.

This is the entry in `configuration.yaml` for Home Assistant auth:

```yaml
homeassistant:
  auth_providers:
    - type: homeassistant
```

If you don't specify any `auth_providers` section in the `configuration.yaml` file then this provider will be set up automatically.

### Trusted Networks

The Trusted Networks auth provider defines a range of IP addresses for which no authentication will be required (also known as "whitelisting"). For example, you can whitelist your local network so you won't be prompted for a password if you access Home Assistant from inside your home.

When you log in from one of these networks, you will be asked which user account to use and won't need to enter a password.

<div class='note info'>

The [multi-factor authentication module](/docs/authentication/multi-factor-auth/) will not participate in the login process if you are using this auth provider.

</div>

Here is an example in `configuration.yaml` to set up Trusted Networks:

```yaml
homeassistant:
  auth_providers:
    - type: trusted_networks
      trusted_networks:
        - 192.168.0.0/24
        - fd00::/8
```

{% configuration %}
trusted_networks:
  description: A list of IP address or IP network you want to whitelisted. It accepts both IPv4 and IPv6 IP address or network
  required: true
  type: list
trusted_users:
  description: You can also assign which users are available to select when user access login page from certain IP address or network.
  required: false
  type: map
  keys:
    USER_ID:
      description: List of user ids available to select on this IP address or network.
      required: false
      type: [list, string]
allow_bypass_login:
  description: You can bypass login page if you have only one user available for selection.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

#### Trusted Users Examples

```yaml
homeassistant:
  auth_providers:
    - type: trusted_networks
      trusted_networks:
        - 192.168.0.0/24
        - 192.168.10.0/24
        - fd00::/8
      trusted_users:
        192.168.0.1: user1_id
        192.168.0.0/24:
          - user1_id
          - user2_id
        "fd00::/8":
          - user1_id
          - group: system-users
```

First note, for `trusted_users` configuration you need to use `user id`, which you can find through {% my users title="Configuration -> Users" %} -> View User Detail. The `trusted_users` configuration will not validate the existence of the user, so please make sure you have put in the correct user id by yourself.

Second note, a trusted user with an IPv6 address must put the IPv6 address in quotes as shown.

In above example, if user try to access Home Assistant from 192.168.0.1, they will have only one user available to choose. They will have two users available if access from 192.168.0.38 (from 192.168.0.0/24 network). If they access from 192.168.10.0/24 network, they can choose from all available users (non-system and active users).

Specially, you can use `group: GROUP_ID` to assign all users in certain `user group` to be available to choose. Group and users can be mix and match.

#### Skip Login Page Examples

This is a feature to allow you bring back some of the experience before the user system was implemented. You can directly jump to main page if you are accessing from trusted networks, the `allow_bypass_login` is on, and you have ONLY ONE available user to choose in the login form.

```yaml
# assuming you have only one non-system user
homeassistant:
  auth_providers:
    - type: trusted_networks
      trusted_networks:
        - 192.168.0.0/24
        - 127.0.0.1
        - ::1
      allow_bypass_login: true
    - type: homeassistant
```

Assuming you have only the owner created though onboarding process, no other users ever created. The above example configuration will allow you directly access Home Assistant main page if you access from your internal network (192.168.0.0/24) or from localhost (127.0.0.1). If you get a login abort error, then you can change to use Home Assistant Authentication Provider to login, if you access your Home Assistant instance from outside network.

### Command Line

The Command Line auth provider executes a configurable shell command to perform user authentication. Two environment variables, `username` and `password`, are passed to the command. Access is granted when the command exits successfully (with exit code 0).

This provider can be used to integrate Home Assistant with arbitrary external authentication services, from plaintext databases over LDAP to RADIUS. A compatible script for LDAP authentication is [this one](https://github.com/efficiosoft/ldap-auth-sh), for instance. Please note, this will only work when using the Home Assistant Core installation type.

Here is a configuration example:

```yaml
homeassistant:
  auth_providers:
    - type: command_line
      command: /absolute/path/to/command
      # Optionally, define a list of arguments to pass to the command.
      #args: ["--first", "--second"]
      # Uncomment to enable parsing of meta variables (see below).
      #meta: true
```

When `meta: true` is set in the auth provider's configuration, your command can write some variables to standard output to populate the user account created in Home Assistant with additional data. These variables have to be printed in the form:

```txt
name = John Doe
```

Leading and trailing whitespace, as well as lines starting with `#` are ignored. The following variables are supported. More may be added in the future.

* `name`: The real name of the user to be displayed in their profile.

Stderr is not read at all and just passed through to that of the Home Assistant process, hence you can use it for status messages or suchlike.

<div class='note'>
Any leading and trailing whitespace is stripped from usernames before they're passed to the configured command. For instance, " hello  " will be rewritten to just "hello".
</div>

<div class='note'>
For now, meta variables are only respected the first time a particular user is authenticated. Upon subsequent authentications of the same user, the previously created user object with the old values is reused.
</div>

### Legacy API password

<div class='note warning'>
This is a legacy feature for backwards compatibility and will be dropped in a future release. You should move to one of the other auth providers.
</div>

Activating this auth provider will allow you to authenticate with the API password set in the HTTP component.

```yaml
homeassistant:
  auth_providers:
   - type: legacy_api_password
     api_password: !secret http_password
```

`api_password` is required option since 0.90 release.

Activating this auth provider will also allow you to provide the API password using an authentication header to make requests against the Home Assistant API. This feature will be dropped in the future in favor of long-lived access tokens.

If you don't specify any `auth_providers` section in the `configuration.yaml` file then this provider will be set up automatically if `api_password` was configured under `http` section.

<div class='note warning'>

[Issue 16441](https://github.com/home-assistant/home-assistant/issues/16441): the legacy API password auth provider, won't be automatically configured if your API password is located in a package. This is because Home Assistant processes the `auth_provider` during the `core` section loading, which is earlier than the `packages` processing.

</div>
