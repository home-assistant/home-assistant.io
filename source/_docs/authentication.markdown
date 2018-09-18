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

Access to Home Assistant is secured by our authentication system. Each member of your household will get their own user account to log in and access Home Assistant.

Home Assistant contains two different user types: the owner user account and normal users. The owner user account is created when you start Home Assistant for the first time. This account has some special privileges compared to the other users of the system:

 - Manage users
 - Configure integrations and other settings (soon)
 - Configure Hass.io (soon)

## {% linkable_title Authentication %}

When a user wants to use Home Assistant, they have to log in. When navigating to the frontend without authentication, the user is asked for a login. The login page will always show you the website that you're logging in to.

<img src='/images/docs/authentication/login.png' alt='Screenshot of the login screen' style='border: 0;box-shadow: none;'>

When logging in, make sure that the URL in the URL bar is showing the address of your Home Assistant instance.

## {% linkable_title Profile %}

Once you're logged in, you can access the profile page by clicking on the badge next to the Home Assistant title in the sidebar. Here you can change your preferred language or change your password. You can also log out.

<img src='/images/docs/authentication/profile.png' alt='Screenshot of the profile page' style='border: 0;box-shadow: none;'>

## {% linkable_title Multi-factor authentication  %}

As a user, you can setup multi-factor authentication with time-based one-time passwords. This is an extra challenge that you have to solve after you finish your login. You will be able to set up these challenges from the profile page once you're logged in.

<img src='/images/docs/authentication/mfa.png' alt='Screenshot of setting up multi-factor authentication' style='border: 0;box-shadow: none;'>

## {% linkable_title Troubleshooting %}

### {% linkable_title Bearer token warnings %}

Under the new authentication system you'll see the following warning logged when the [legacy API password](/docs/authentication/providers/#legacy-api-password) is supplied, but not configured in Home Assistant:

```txt
WARNING (MainThread) [homeassistant.components.http.auth] You need to use a bearer token to access /blah/blah from 192.0.2.4
```

If you see this, you need to add an [`api_password`](/components/http/#api_password) to your `http:` configuration.

### {% linkable_title Bearer token informational messages %}

If instead, you see the following, then this is a message for component developers, to tell them that they need to update how they authenticate to Home Assistant. As an end user you don't need to do anything:

```txt
INFO (MainThread) [homeassistant.components.http.auth] You need to use a bearer token to access /blah/blah from 192.0.2.4
```

### {% linkable_title Lost owner password %}

While you should hopefully be storing your passwords in a password manager, if you lose the password associated with the owner account the only way to resolve this is to delete *all* the authentication data. You do this by shutting down Home Assistant and deleting the following files from the `.storage/` folder in your [configuration folder](https://www.home-assistant.io/docs/configuration/):

* `auth`
* `auth_provider.homeassistant`
* `onboarding`

When you start Home Assistant next you'll be required to set up authentication again.

### {% linkable_title Error: invalid client id or redirect url%}

<img src='/images/docs/authentication/error-invalid-client-id.png' alt='Screenshot of Error: invalid client id or redirect url'>

You have to use a domain name, not IP address to remote access Home Assistant; otherwise you will get **Error: invalid client id or redirect url** error on the login form. However, you can use the IP address to access Home Assistant in your home network.

It because we only allow using IP address as client ID when your IP address is one of internal network address (e.g., 192.168.0.1) or loopback address (e.g., 127.0.0.1).

If you don't have a valid domain name for your Home Assistant instance, you can modify the `hosts` file on your computer to fake one. For example, if you are on Windows, edit `C:\Windows\System32\Drivers\etc\hosts` file with administrator privilege, add following entry.

```text
12.34.56.78 hassbian.home
```

(Please replace `12.34.56.78` with your Home Assistant's public IP address)

It will allow you to open Home Assistant instance by access `http://hassbian.home:8123/`

### {% linkable_title Stuck on Loading data %}

Some advert blocking software, such as Wipr, also blocks web sockets. If you're stuck on the Loading data screen, try disabling your ad blocker.

### {% linkable_title Migrating from pre 0.77 %}

If you were using the authentication system before 0.77, you'll likely have `auth:` and `auth_providers:` defined. You'll need to remove these and let Home Assistant [handle it automatically](https://www.home-assistant.io/docs/authentication/providers/#configuring-auth-providers).
