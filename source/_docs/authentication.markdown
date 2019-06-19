---
layout: page
title: "Authentication"
description: "Guide on authentication in Home Assistant."
date: 2018-08-23 09:40
redirect_from: /components/auth/
sidebar: true
comments: false
sharing: true
footer: true
---

Our authentication system secures access to Home Assistant.

If you are starting Home Assistant for the first time, or you have logged out, you will be asked for credentials before you can log in. 

<img src='/images/docs/authentication/login.png' alt='Screenshot of the login screen' style='border: 0;box-shadow: none;'>

## {% linkable_title User accounts %}

When you start Home Assistant for the first time the _owner_ user account is created. This account has some special privileges and can:

 - Create and manage other user accounts. 
 - Configure integrations and other settings (coming soon).
 - Configure Hass.io (coming soon).

<p class='note'>
For the moment, other user accounts will have the same access as the owner account. In the future, non-owner accounts will be able to have restrictions applied.
</p>

### {% linkable_title Your Account Profile %}

Once you're logged in, you can see the details of your account at the _Profile_ page by clicking on the circular badge next to the Home Assistant title in the sidebar. 

<img src='/images/docs/authentication/profile.png' alt='Screenshot of the profile page' style='border: 0;box-shadow: none;'>

You can:

* Change the language you prefer Home Assistant to use.
* Change your password. 
* Select the [theme](/components/frontend/#defining-themes) for the interface of Home Assistant.
* Enable or disable [multi-factor authentication](/docs/authentication/multi-factor-auth/).
* Delete _Refresh Tokens_. These are created when you log in from a device. Delete them if you want to force the device to log out.
* Create [Long Lived Access Tokens](https://developers.home-assistant.io/docs/en/auth_api.html#long-lived-access-token) so scripts can securely interact with Home Assistant. 
* Log out of Home Assistant. 

### {% linkable_title Securing your login %}

_Make sure to choose a secure password!_ At some time in the future, you will probably want to access Home Assistant from outside your local network. This means you are also exposed to random black-hats trying to do the same. Treat the password like the key to your house. 


As an extra level of security, you can turn on [multi-factor authentication](/docs/authentication/multi-factor-auth/). 

## {% linkable_title Other authentication techniques %}

Home Assistant provides several ways to authenticate. See the [Auth Providers](/docs/authentication/providers/) section.

## {% linkable_title Troubleshooting %}

### {% linkable_title Authentication failures from `127.0.0.1` %}

If you're seeing authentication failures from `127.0.0.1` and you're using the `nmap` device tracker, you should [exclude the Home Assistant IP](/components/device_tracker.nmap_tracker/#exclude) from being scanned.

### {% linkable_title Bearer token warnings %}

Under the new authentication system you'll see the following warning logged when the [legacy API password](/docs/authentication/providers/#legacy-api-password) is supplied, but not configured in Home Assistant:

```txt
WARNING (MainThread) [homeassistant.components.http.auth] You need to use a bearer token to access /blah/blah from 192.0.2.4
```

If you see this, you need to add an [`api_password`](/components/http/#api_password) to your `http:` configuration.

### {% linkable_title Bearer token informational messages %}

If you see the following, then this is a message for component developers, to tell them they need to update how they authenticate to Home Assistant. As an end user you don't need to do anything:

```txt
INFO (MainThread) [homeassistant.components.http.auth] You need to use a bearer token to access /blah/blah from 192.0.2.4
```

### {% linkable_title Lost owner password %}

While you should hopefully be storing your passwords in a password manager, if you lose the password associated with the owner account the only way to resolve this is to delete *all* the authentication data. You do this by shutting down Home Assistant and deleting the following files from the `.storage/` folder in your [configuration folder](/docs/configuration/):

* `auth`
* `auth_provider.homeassistant`
* `onboarding`
* `hassio` (for hassio users)
* `cloud` (for nabucasa users)

When you start Home Assistant next, you'll be required to set up authentication again.

### {% linkable_title Error: invalid client id or redirect url%}

<img src='/images/docs/authentication/error-invalid-client-id.png' alt='Screenshot of Error: invalid client id or redirect url'>

You have to use a domain name, not IP address, to remote access Home Assistant otherwise you will get **Error: invalid client id or redirect url** error on the login form. However, you can use the IP address to access Home Assistant in your home network.

This is because we only allow an IP address as a client ID when your IP address is an internal network address (e.g., `192.168.0.1`) or loopback address (e.g., `127.0.0.1`).

If you don't have a valid domain name for your Home Assistant instance, you can modify the `hosts` file on your computer to fake one. On Windows, edit the `C:\Windows\System32\Drivers\etc\hosts` file with administrator privilege, or on Linux the `/etc/hosts` file,  and add following entry:

```text
12.34.56.78 hassbian.home
```

Replace `12.34.56.78` with your Home Assistant's public IP address.

This will allow you to open Home Assistant at `http://hassbian.home:8123/`

### {% linkable_title Stuck on Loading data %}

Some ad blocking software, such as Wipr, also blocks web sockets. If you're stuck on the Loading data screen, try disabling your ad blocker.

### {% linkable_title Migrating from pre 0.77 %}

If you were using the authentication system before 0.77, you'd likely have `auth:` and `auth_providers:` defined. You'll need to remove these and let Home Assistant [handle it automatically](/docs/authentication/providers/#configuring-auth-providers).
