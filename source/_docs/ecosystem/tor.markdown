---
title: "Tor Onion Service Configuration"
description: "Configure Tor to work with Home Assistant to provide secure remote access without opening your firewall"
redirect_from: /cookbook/tor_configuration/
---

This article guides your through the configuration of Tor to provide a secure access to your Home Assistant instance as an Onion site, through [Tor's Hidden Service](https://www.torproject.org/docs/hidden-services.html.en) feature, from remote. With this enabled, you do not need to open your firewall ports or setup HTTPS to enable secure remote access.

This is useful if you want to have:

 * Access your Home Assistant instance remotely without opening a firewall port or setting up a VPN.
 * Don't want to or know how to get an SSL/TLS certificate and HTTPS configuration setup.
 * Want to block attackers from even being able to access/scan your port and server at all.
 * Want to block anyone from knowing your home IP address and seeing your traffic to your Home Assistant.

## Hidden Services and Onion Sites

Tor allows clients and relays to offer hidden services. That is, you can offer a web server, SSH server, etc., without revealing your IP address to its users. In fact, because you don't use any public address, you can run a hidden service from behind your firewall. Learn more about Hidden Services on the [Tor Project website](https://www.torproject.org/docs/tor-hidden-service.html.en).

Onion sites are websites that run on a Tor Hidden Service node. "dot onion" sites are an [IETF recognized special use domain name](https://datatracker.ietf.org/doc/rfc7686/).

## Setting up Tor on your Home Assistant

First, install Tor. On a Debian-based system, you can install the package easily:

```bash
$ sudo apt-get install tor
```

You can find more instructions for downloading and installing Tor on other platforms on the [Tor Project Download Page](https://www.torproject.org/download/download.html).

Next, modify Tor's main configuration file `/etc/tor/torrc` to include the following lines:

```bash
############### This section is just for location-hidden services ###

## Once you have configured a hidden service, you can look at the
## contents of the file ".../hidden_service/hostname" for the address
## to tell people.
...
HiddenServiceDir /var/lib/tor/homeassistant/
HiddenServicePort 80 127.0.0.1:8123
HiddenServiceAuthorizeClient stealth haremote1
...
```

The "stealth" entry above ensures traffic to and from your Home Assistant instance over Tor, is hidden even from other nodes on the Tor network. The `haremote1` value is a generic client name entry that you can modify as you please.

Then, restart Tor:

```bash
$ sudo systemctl restart tor
```

Then read the new generated authentication cookie from the Tor-generated hostname file:

```bash
$ sudo more /var/lib/tor/homeassistant/hostname
```

The output of that command should look something like this, but with your own unique "dot onion" domain and authentication cookie:

```bash
abcdef1234567890.onion ABCDEF1122334455667789 # client: haremote1
```

You are now done with the Home Assistant Tor server configuration. Make sure your Home Assistant instance is running, and now you can move to client configuration.

## Tor Client Access Setup

Using this setup, you can access your Home Assistant instance over Tor from your laptop or mobile device, using Tor Browser and other software.

Add the authentication cookie to your `torrc` client configuration on your laptop or mobile device. Using the sample values from above, it would look like this:

```bash
HidServAuth abcdef1234567890.onion ABCDEF1122334455667789
```

For Tor Browser on Windows, Mac or Linux, you can find the torrc file here: `<tor browser install directory>/Browser/TorBrowser/Data/Tor/torrc`

Once you have added the entry, restart the browser, and then browse to the "dot onion" site address to connect to your Home Assistant instance.

For [Orbot: Tor on Android](https://guardianproject.info/apps/orbot), add it in **Orbot** -> **Menu** -> **Settings** to the "Torrc Custom Configuration" entry. Restart Orbot, and then use the [Orfox browser app](https://guardianproject.info/apps/orfox/), and browse to the "dot onion" site name to access your Home Assistant instance. You can also use Orbot's VPN mode, to enable Tor access from any application on your device, such as Tasker or Owntracks.

On iOS, we have not fully tested this yet, but you should be able to add custom torrc entries on [Onion Browser](https://mike.tig.as/onionbrowser/), Red Onion or TOBY browsers, all available in the iTunes App Store.

## Some More Advanced Ideas

With this configuration, only you can access your Home Assistant instance Onion site through Tor, and no one else. You can share the authentication cookie with multiple devices and users, or you can generate a unique one for each - up to you! If you have multiple, say for an industrial, business or corporate configuration, this would provide an easy way to revoke access to a specific user or device.

If you always access your Home Assistant instance via Tor, you can easily run this on an isolated "IoT" network segment at your install site, keeping your internal home network traffic separate from any potentially compromised devices (like cheap "smart" lightbulbs with backdoors!). 

You could also use Tor as a means to connect your Home Assistant instance to a remote device, sensor or other service that you do not want to or connect provide a direct, open IP connection to. Again, Tor provides authenticated and confidential routing (aka "privacy and encryption") by default, without having to setup TLS/SSL or VPN. It is just important to secure IoT nodes within your network, as it is to secure remote access!

As mentioned, with Orbot on Android, you can enable a "full device" VPN mode, that allows any app you have to tunnel through Tor, even if it is not Tor or proxy aware. This means you should be able to enter your "dot onion" Onion site address into any app you want to access to your Home Assistant instance, and it should work.

