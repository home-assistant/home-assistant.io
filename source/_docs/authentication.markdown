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

Home Assistant contains two different user types: the owner user account and normal users. The owner user account is created when you start Home Assitant for the first time. This account has some special privileges compared to the other users of the system:

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
