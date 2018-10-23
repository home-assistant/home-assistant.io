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

The Multi-factor Authentication (MFA) modules require you to solve a second challenge after you provide your password. A password can be compromised in a number of ways, for example it can be guessed if it is a simple password. MFA provides a second level of defence.

The idea is that you need to provide: 
* Something you know, like your username and password, and 
* something you have, like an authentication token from your phone.

You can use MFA with any of the other authentication providers. If more than one MFA module is enabled, you can choose one when you log in.

You can turn MFA on and off in the [profile page](/docs/authentication/#your-account-profile) for your user account.


## {% linkable_title Available multi-factor authentication modules %}



### {% linkable_title Time-based One-Time Password multi-factor authentication module %}

[Time-based One-Time Password](https://en.wikipedia.org/wiki/Time-based_One-time_Password_algorithm) (TOTP) is widely adopted in modern authentication systems. 

Home Assistant generates a secret key which is synchronised with an app on your phone.  Every thirty seconds or so the phone app generates a random, six digit number. Because Home Assistant knows the secret key, it knows which number will be generated. If you enter the correct digits then you're in. 

#### {% linkable_title Setting up TOTP %}

Enable TOTP in your `configuration.yaml` like this:

```yaml
homeassistant:
  auth_mfa_modules:
    - type: totp
```

If no `auth_mfa_modules` config section defined in `configuration.yaml` a TOTP module named "Authenticator app" will be auto loaded.

You will need an authenticator app on your phone. We recommend either [Google Authenticator](https://support.google.com/accounts/answer/1066447) or [Authy](https://authy.com/). Both are available for iOS or Android.

After restarting Home Assistant, go to your [profile page](/docs/authentication/#your-account-profile) andthere should be a "Multi-factor Authentication Modules" section. 

Click _Enable_and a new secret key will be generated. Go to your app and enter the key, either by scanning the QR code or typing in the key at the bottom of the screen manually. 

<img src='/images/docs/authentication/mfa.png' alt='Screenshot of setting up multi-factor authentication' style='border: 0;box-shadow: none;'>


<p class='note warning'>
Please treat the secret key like a password, never expose it to others.
</p>

#### {% linkable_title Using TOTP %}

Your phone app will now start generating a different six digit code every thirty seconds. Enter one of these into Home Assistant under the QR code where it asks for a _Code_. Home Assistant and your phone app are now in sync and you can now use the code displayed in the app to log in.

<p class='note'>
TOTP is _time based_ so it relies on your Home Assistant clock being accurate. If the verification keeps failing, check the clock on Home Assistant.
</p>

### {% linkable_title Notify multi-factor authentication module %}

The Notify MFA module uses the [notify component](https://www.home-assistant.io/components/notify/) to deliver a [HMAC-based One-Time Password](https://en.wikipedia.org/wiki/HMAC-based_One-time_Password_algorithm). It is typically sent to your phone, but can be sent to any destination supported by a `notify` service.

#### {% linkable_title Setting up TOTP %}

Add Notify MFA to your `configuration.yaml` file like this:

```yaml
homeassistant:
  auth_mfa_modules:
    - type: notify
```

Optional configuration variables:

- **exclude** (*Optional*): The list of notify services you do not want to include.
- **include** (*Optional*): The list of notify services you want to include.
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

User need first set up the MFA module by select one of the available notify service. A 6 digit one-time password will be sent by this notify service, user need to input it to verify the setup.

During the login process, a 6 digit one-time password will be sent again, user need to input it to verify his/her identity. If the validation failed, a new one-time password will be sent again.

<p class='note'>
Notify MFA module would not verify the one-time password delivery success, so that if user cannot received the message due any reason, he/she may not be login again. Edit or remove `[your_config_dir]/.storage/auth_module.notify` can disable notify MFA module to resolve the issue.
</p>

