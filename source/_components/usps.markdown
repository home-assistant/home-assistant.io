---
layout: page
title: USPS
description: "Interface USPS mail and package information to Home Assistant."
date: 2017-07-28 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: usps.png
ha_category: Hub
ha_release: 0.52
ha_iot_class: "Cloud Polling"
---

The `usps` platform allows one to track deliveries and inbound mail from the [US Postal Service (USPS)](https://www.usps.com/).
In addition to having a USPS account, you will need to complete the "Opt-In" process for packages by clicking "Get Started Now" on [this page](https://my.usps.com/mobileWeb/pages/intro/start.action). You must also "Opt-In" to [Informed Delivery](https://informeddelivery.usps.com/box/pages/intro/start.action) to see inbound mail.

## Prerequisites

This component requires that a headless-capable web browser is installed on your system - either PhantomJS or Google Chrome. Preferably use Chrome if your operating system supports it, since PhantomJS is deprecated.

<p class='note warning'>
  If you are using a Raspberry Pi, you must use PhantomJS.
</p>

### PhantomJS

Install the latest version of [PhantomJS]( http://phantomjs.org/download.html). Ensure the executable is on your `PATH`. `phantomjs --version` should work and report the correct version. This is the default option and requires no further configuration.

<p class='note warning'>
  Don't use apt-get to install PhantomJS. This version is not compatible.
</p>


### Chrome

Install Chrome 59 or greater (preferably the most recent). Install the latest [Chromedriver](https://sites.google.com/a/chromium.org/chromedriver/downloads). Ensure both executables are on your `PATH`. `google-chrome --version` and `chromedriver --version` should work and report the correct version.

OS-specific instructions:
- [Ubuntu 16](https://gist.github.com/ziadoz/3e8ab7e944d02fe872c3454d17af31a5) (Selenium server portion *not* necessary)
- [RHEL/Centos 7](https://stackoverflow.com/a/46686621) 

If you use the Chrome option, specify `driver: chrome` in your `usps` configuration.

## Configuration

To enable this component, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
usps:
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

You will see two new sensors, one for packages and one for mail and a camera to rotate through images of incoming mail for the current day.

Configuration options for the USPS component:

- **username** (*Required*): The username to access the MyUSPS service.
- **password** (*Required*): The password for the given username.
- **name** (*Optional*): Prefix for sensor names (defaults to "USPS")

<p class='note warning'>
The USPS sensor logs into the MyUSPS website to scrape package data. It does not use an API.
</p>
