---
title: "Multi-factor authentication"
description: "Guide on configuring different multi-factor authentication modules."
---

The Multi-factor Authentication (MFA) modules require you to solve a second challenge after you provide your password.

A password can be compromised in a number of ways, for example, it can be guessed if it is a simple password. MFA provides a second level of defense by requiring:

- something you know, like your username and password, and
- something you have, like a one-time password sent to your phone.

You can use MFA with any of the other authentication providers. If more than one MFA module is enabled, you can choose one when you log in.

You can turn MFA on and off in the [profile page](/docs/authentication/#your-account-profile) for your user account.

## Available MFA modules

### Time-based One-Time Password MFA module

[Time-based One-Time Password](https://en.wikipedia.org/wiki/Time-based_One-time_Password_algorithm) (TOTP) is widely adopted in modern authentication systems.

Home Assistant generates a secret key which is synchronized with an app on your phone. Every thirty seconds or so the phone app generates a random six digit number. Because Home Assistant knows the secret key, it knows which number will be generated. If you enter the correct digits, then you're in.

#### Setting up TOTP

Enable TOTP in your {% term "`configuration.yaml`" %} like this:

```yaml
homeassistant:
  auth_mfa_modules:
    - type: totp
```

If no `auth_mfa_modules` configuration section is defined in `configuration.yaml` a TOTP module named "Authenticator app" will be autoloaded.

You will need an authenticator app on your phone. We recommend either [Google Authenticator](https://support.google.com/accounts/answer/1066447) or [Authy](https://authy.com/). Both are available for iOS or Android.

After restarting Home Assistant, go to your {% my profile %} and there should be a "Multi-factor Authentication Modules" section.

Click _Enable_ and a new secret key will be generated. Go to your phone app and enter the key, either by scanning the QR code or typing in the key below the QR code manually.

<img src='/images/docs/authentication/mfa.png' alt='Screenshot of setting up multi-factor authentication' style='border: 0;box-shadow: none;'>

{% caution %}
Please treat the secret key like a password - never expose it to others.
{% endcaution %}

Your phone app will now start generating a different six-digit code every thirty seconds or so. Enter one of these into Home Assistant under the QR code where it asks for a _Code_. Home Assistant and your phone app are now in sync and you can now use the code displayed in the app to log in.

#### Using TOTP

Once TOTP is enabled, Home Assistant requires the latest code from your phone app before you can log in. 

{% note %}
TOTP is _time based_ so it relies on your Home Assistant clock being accurate. If the verification keeps failing, make sure the clock on Home Assistant is correct.
{% endnote %}

### Notify multi-factor authentication module

The Notify MFA module uses the [notify integration](/integrations/notify/) to send you an [HMAC-based One-Time Password](https://en.wikipedia.org/wiki/HMAC-based_One-time_Password_algorithm). It is typically sent to your phone, but can be sent to any destination supported by a `notify` action. You use this password to log in.

#### Setting up MFA notify

Add Notify MFA to your {% term "`configuration.yaml`" %} file like this:

```yaml
homeassistant:
  auth_mfa_modules:
    - type: notify
      include:
        - notify_entity
```

{% configuration %}
exclude:
  description: The list of notifying entities you want to exclude.
  required: false
  type: list
include:
  description: The list of notifying entities you want to include.
  required: false
  type: list
message:
  description: The message template.
  required: false
  type: template
{% endconfiguration %}

```yaml
# Example configuration, with a message template.
homeassistant:
  auth_mfa_modules:
    - type: totp
      name: "Authenticator app"
    - type: notify
      message: "I almost forget, to get into my clubhouse, you need to say {}"
```

After restarting Home Assistant, go to your {% my profile %} and there should be a "Multi-factor Authentication Modules" section. Click _Enable_ on the _Notify One-Time Password_ option.

Try logging out, then logging in again. You will be asked for the six-digit one-time password that was sent to your notify entity. Enter the password to log in.

If the validation failed, a new one-time password will be sent again.

{% note %}
The Notify MFA module can't tell if the one-time password was delivered successfully. If you don't get the notification, you won't be able to log in.

You can disable the Notify MFA module by editing or removing the file `[your_config_dir]/.storage/auth_module.notify`.
{% endnote %}
