---
layout: page
title: "Multi-factor authentication"
description: "Guide on configuring different multi-factor authentication modules."
date: 2018-08-23 09:40
redirect_from: /components/auth/
sidebar: true
comments: false
sharing: true
footer: true
---

<p class='note warning'>
This is an advanced feature. If misconfigured, you will not be able to access Home Assistant anymore!
</p>

Besides the authentication providers, it's also possible to configure multi-factor authentication modules. These authentication modules will require the user to solve a second challenge besides just logging in. The idea is that you ask the user for something they know, their username/password, and something they have, like a time-based authentication token from their phone.

The multi-factor authentication module can be used mixed-matched with authentication providers. After the normal authentication provider validation, the login flow will ask the user for additional challenge(s) if there are multi-factor authentication modules enabled for this user. If more than one mutli-factor authentication module is enabled, the user can select one of them during the login.

The multi-factor authentication module has to be enabled for the user before it can be used in the login process. The user can go to the profile page enable it by himself.

## {% linkable_title Configuring mutli-factor authentication modules %}

<p class='note warning'>
By configuring your own instead of using the default configuration, you take full responsibility for the authentication of the system.
</p>

Multi-factor authentication modules are configured in your `configuration.yaml` file under the `homeassistant:` block:

```yaml
homeassistant:
  auth_mfa_modules:
    - type: totp
```

## {% linkable_title Available mutli-factor authentication modules %}

Below is a list of the currently available auth providers.

### {% linkable_title Time-based One-Time Password mutli-factor authentication module %}

[Time-based One-Time Password](https://en.wikipedia.org/wiki/Time-based_One-time_Password_algorithm) is widely adopted in modern authencation system, it combines a secret key with the current timestamp using a cryptographic hash function to generate a one-time password. Whoever possessed the secret key will get same one-time password in certain time period. By verifying that password, Home Assistant knows the user have the right secrt key.

When trying to set up TOTP module, a QR code will show up. The user can scan it by an authenticator app, or set it up manually using the code showed in the UI. After setup, the user needs to input a six digit number generated in the authenticator app to verify the setup is good. If the verification keeps failing, you need to check whether the clock on Home Assistant is accurate.

There are several authenticator apps on the market, we recommend either [Google Authenticator](https://support.google.com/accounts/answer/1066447) or [Authy](https://authy.com/).

<p class='note warning'>
Please treat the secret key like a password, never expose it to others.
</p>

By default, one TOTP multi-factor named "Authenticator app" will be auto loaded if no `auth_mfa_modules` configuration section defined in the `configuration.yaml` file.

By default one TOTP multi-factor auth module named "Authenticator app" will be auto loaded if no `auth_mfa_modules` config section defined in `configuration.yaml`.

Example of configuration:

```yaml
homeassistant:
  auth_mfa_modules:
    - type: totp
```

### {% linkable_title Notify mutli-factor authentication module %}

Notify MFA module using [notify component](https://www.home-assistant.io/components/notify/) to delivery a [HMAC-based One-Time Password](https://en.wikipedia.org/wiki/HMAC-based_One-time_Password_algorithm) to user configured target.

User need first set up the MFA module by select one of the aviliable notify service. A 6 digit one-time password will be sent by this notify service, user need to input it to verify the setup.

During the login process, an 8 digit one-time password will be sent again, user need to input it to verify his/her identity. If the validation failed, a new one-time password will be sent again.

<p class='note'>
Notify MFA module would not verify the one-time password deliveried success, so that if user cannot received the message due any reason, he/she may not be login again. Edit or remove `[your_config_dir]/.storage/auth_module.notify` can disable nofiy MFA module to resolve the issue.
</p>

Example of configuration

```yaml
homeassistant:
  auth_mfa_modules:
    - type: notify
```

Optional configuration variables:

- **exclude** (*Optional*): The list of notify services you do not want to include in.
- **include** (*Optional*): The list of notify services you want to include in.
- **message** (*Optional*): The message template

```yaml
# Example configure with message template
homeassistant:
  auth_mfa_modules:
    - type: totp
      name: Authenticator app
    - type: notify
      message: 'I almost forget, to get into my clubhouse, you need to say {}'
```
