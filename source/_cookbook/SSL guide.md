---
layout: page
title: "Remote Access with SSL via LetsEncrypt"
description: "A guide to remotely accessing HA and securing the connection with an SSL certificate from LetsEncrypt"
date: 2017-03-16 17:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Infrastructure
---

This guide was added by mf_social on 16/03/2017 and was valid at the time of writing.  This guide makes the following assumptions:

 * You can access your HA instance across your local network, and access the device that it is on via SSH from your local network.
 * You know the internal IP address of your router and can access your router's configuration pages.
 * You have already set up a password for your HA instance, following the advice on this page: [http](https://home-assistant.io/docs/configuration/basic/)
 * You want to access your HA instance when you are away from home (ie, not connected to your local network) and secure it with an SSL certificate.
 * You have a basic understanding of the phrases I have used so far.
 * You are not currently running anything on port 80 on your network (you'd know if you were).
 * If you are not using HA on a debian/raspian/hassbian system you will be able to convert any of the terminology I use in to the correct syntax for your system.
 * You understand that this is a 'guide' covering the general application of these things to the general masses and there are things outside of the scope of it, and it does not cover every eventuality (although I have made some notes where people may stumble).  Also, I have used some turns of phrase to make it easier to understand for the novice reader which people of advanced knowledge may say is innacurate.  My goal here is to get you through this guide with a satisfactory outcome and have a decent understanding of what you are doing and why, not to teach you advanced internet communication protocols.
 * Each step presumes you have fully completed the previous step succesfully, so if you did an earlier step following a different guide, please ensure that you have not missed anything out that may affect the step you have jumped to, and ensure that you adapt any commands to take in to account different file placements from other guides.
 
Steps we will take:
 
0 - Gain a basic level of understanding around IP addresses, port numbers and port forwarding
1 - Set your device to have a static IP address
2 - Set up port forwarding without SSL and test connection
3 - Set up a DuckDNS account
4 - Obtain an ssl certificate from LetsEncrypt
5 - Check the incoming conection
6 - Clean up port forwards
7 - Set up a sensor to monitor the expiry date of the certificate
8 - Set up an automatic renewal of the SSL certificate.
9 - Set up an alert to warn us if something went wrong.
 
#### {% linkable_title 0 - Gain a basic level of understanding around IP addresses, port numbers and port forwarding %}
 
An IP address is a bit like a phone number.  When you access your HA instance you type something similar to 192.168.0.200:8123 in to your address bar of your browser.  The bit before the colon is the IP address (in this case 192.168.0.200) and the bit after is the port number (in this case 8123).  When you SSH in to the device running HA you will use the same IP address, and you will use port 22.  You may not be aware that you are using port 22, but if you are using Putty look in the box next to where you type the IP address, you will see that it has already selected port 22 for you.
 
So, if an IP address is like a phone number, a port number is like an extension number.  An analogy would be if you phone your local doctors on 192-1680-200 and the receptionist answers, you ask to speak to Dr Smith and she will put you through to extension 8123, which is the phone Dr Smith is sitting at. The doctors surgery is the device your HA is running on, Dr Smith is your HA.  Thusly, your HA instance is 'waiting for your call' on port 8123, at the device IP 192.168.0.200 .
 
Now, to speak to the outside world your connection goes through a router.  Your router will have two IP addresses.  One is the internal network number, most likely 192.168.0.1 in my example, and an external IP address that incoming traffic is sent to.  In the example of calling the doctors, the external IP is your telephone number's area code.
 
So, when we want to connect to our HA instance from outside our network we will need to call the correct extension number, at the correct phone number, in the correct area code.
 
We will be looking for a system to run like this (in this example I will pretend our exernal IP is 12.12.12.12):
 
```text
Outside world -> 12.12.12.12:8123 -> your router -> 192.168.0.200:8123
```
Sounds simple?  It really is except for two small, but easy to overcome, complications:
 
 * IP addresses are often dynamically allocated, so they can change.
 * Because of the way the internet works you cannot chain IP addresses together to get from where you are, to where you want to go.
 
To get around the issue of changing IP addresses we must remember that there are two IP addresses affected.  Your external one (which we will 'call' to get on to your network from the internet) and your internal one (192.168.0.200 in the example I am currently using).
 
So, we can use a static IP to ensure that whenever our device running HA connects to our router it always uses the same address.  This way our internal IP never changes.  This is covered in step 1 below.
 
We then have no control over our external IP, as our Service Provider will give us a new one at random intervals.  To fix this we will use a service called DuckDNS which will give us a name for our connection (something like examplehome.duckdns.org) and behind the scenes will continue to update your external IP.  So no matter how many times the IP address changes, typing examplehome.duckdns.org in to our browser will convert to the correct, up-to-date, IP address.  This is covered in step 3 below.
 
To get around the issue of not being able to chain the IP addresses together (I can't say I want to call 12:12:12:12 and be put through to 192.168.0.200, and then be put through to extension 8123) we use port forwarding.  Port forwarding is the process of telling your router which device to allow the outside connection to speak to.  In the doctors surgery example, port forwarding is the receptionist.  This takes a call from outside, and forwards it to the correct extension number inside.  It is important to note that port forwarding can forward an incoming request for one port to a different port on your internal network if you so choose, and we wil be doing this later on.  The end result being that when we have our SSL certificate our incoming call will be requesting port 443 (because that is the SSL port, like the SSH port is always 22), but our port forwarding rule will forward this to our HA instance on port 8123.  When this guide is completed we will run something like this:
 
```text
Outside world -> https://examplehome.duckdns.org -> 12.12.12.12:443 -> your router -> 192.168.0.200:8123
```
So, let's make it happen...
 
#### {% linkable_title 1 - set your device to have a static IP address %}
 
Whenever a device is connected to a network it has an IP address.  This IP address is often dynamically assigned to the device on connection.  This means there are occasions where the IP address you use to access HA, or SSH in to the device running HA, may change.  Setting a static IP address means that the device will always be on the same address.
 
SSH in to your system running HA and login.
 
Type the following command to list your network interfaces:
 
```bash
$ ifconfig
```

You will receive an ouput similar to the image here...

![alt tag](https://github.com/home-assistant/home-assistant.github.io/tree/current/source/images/screenshots/ssl_chuide_pic_1.jpg)
 
Make a note of the interface name and the IP address you are currently on.  (In the picture it is the wireless connection that is highlighted, but with your setup it may be the wired one (eth0 or similar), make sure you get the correct information.
 
Then type the following command to open the text file that controls your network connection:

```bash 
$ sudo nano /etc/dhcpcd.conf
```

At the bottom of the file add the following lines:
 
```text
interface wlan0 <----- or the interface you just wrote down.

static ip_address=192.168.0.200/24  <---- the IP address you just wrote down with a '/24' at the end
static routers=192.168.0.1      <---- Your router's IP address
static domain_name_servers=192.168.0.1 <---- Your router's IP address
```

It is important to note that the first three bits of your static IP address and your router's IP address should be the same, eg:

```text
Router: 192.168.0.1

Yes
HA IP: 192.168.0.200

No
HA IP: 192.175.96.200
```

Press Ctrl + x to close the editor, pressing Y to save the changes when prompted

Reboot your pi:

```bash
$ sudo reboot
```

When it comes back up check that you can SSH in to it again on the IP address you wrote down.

Make sure HA is running and access it via the local network by typing the IP address and port number in to the browser:

```text
http://192.168.0.200:8123.
```

All working?  Hooray!  You now have a static IP.  This will now always be your internal IP address for your HA device.  This will be known as YOUR-HA-IP for the rest of this guide.



#### {% linkable_title 2 - set up port forwarding without SSL and test connection %}

Log in to your router's configuration pages and find the port forwarding options.  This bit is hard to write a guide for because each router has a different way of presenting these options.  Searching google for "port forwarding" and the name of your router may help.  When you find it you will likely have options similar to:

Service name - Port Range -  Local IP -  Local Port - Protocol

You may also have other options (like 'source IP'), these can usually be left blank or in their default state.

Set the port forwarding to:

```text
Service name - ha_test
Port Range - 8123
Local IP - YOUR-HA-IP
Local Port - 8123
Protocol - Both
```

Then save the change.  On my router you have to fill these values in, then press an 'add' button to add the new rule to the list, then save the changes.  All routers have a different interface, but you must ensure that these rules are saved at this point.  If you are unsure, you can reboot the router and log back in, if the rule is present it was saved, if not, it wasn't!

Once you have saved this rule, go to your browser, and go to:

```text
https://whatismyipaddress.com/
```

This will tell you your current external IP address

Type the external IP address in to the url bar with http:// in front and :8123 after like so (12.12.12.12 is my example!):

```text
http://12.12.12.12:8123
```

Can you see your HA instance?  Awesome! If not, your router may not support ' loopback' - try the next step anyway and if that works, and this one still doesn't, just remember that you cannot use loopback, so will have to use internal addresses when you're on your home network.  More on this later on if it's relevant to you.

Just to verify this isn't some kind of witchcraft that is actualy using your internal network, pick up your phone, disconnect it from your wifi so that you are on your mobile data and not connected to the home network, put the same url in the browser on your phone.

Can you see it now, from a device that is definitely not connected to your local network?  Excellent!  You now have a remotely accesible HA instance.  

But what if your external IP changes?  Plus, remembering all those numbers is pretty hard, isn't it?  Read on to get yourself set up with a word-based URL at DuckDNS that will track any changes to your IP address so you don't have to stress anymore...

#### {% linkable_title 3 - Set up a DuckDNS account %}

Open your browser and go to duckdns.org.

Sign in and create an account using one of the id validation options in the top right corner.

In the domains section pick a name for your subdomain, this can be anything you like, and click add domain.

The URL you will be using later to access your HA instance from outside will be the subdomain you picked, followed by duckdns.org .  For our example we will say our URL is examplehome.duckdns.org

On the top left of duckdns.org select the install option.  Then pick your operating system from the list.  In our example we will use a raspberry pi.  In the dropdown box select the url you just created.

Duckdns.org will now generate personalised instructions for you to follow so that your device can update their website every time your IP address changes.  Carefully follow the instructions given on duckdns.org to set up your device.

At the end of the instructions DuckDNS will suggest you set up port forwarding.  No need, we have already done this in step 2.

What you have now done is set up DuckDNS so that whenever you type examplehome.duckdns.org in to your browser it will convert that to your router's external IP address.  Your external IP address will always be up to date because your device running HA will update DuckDNS every time it changes.

Now type your new URL in to your address bar on your browser with port 8123 on the end:

```text
http://examplehome.duckdns.org:8123
```

What now happens behind the scenes is this:

*DuckDNS receives the request and forwards the request to your router's external IP address (which has been kept up to date by your device running HA)
*Your router receives the request on port 8123 and checks the port forwarding rules
*It finds the rule you created in step 2 and forwards the request to your HA instance
*Your browser displays your HA instance frontend.

Did it work? Super!

You now have a remotely accesible HA instance that has a text-based URL and will not drop out if your service provider changes your IP.  But, it is only as secure as the password you set, which can be snooped during your session by a malicious hacker with relative ease.  So we need to set up some encryption with SSL, read on to find out how.

#### {% linkable_title 4 - Obtain an ssl certificate from LetsEncrypt %}

First we need to set up another port forward like we did in step 2.  Set your new rule to:  

```text
Service name - ha_letsencrypt
Port Range - 80
Local IP - YOUR-HA-IP
Local Port - 80
Protocol - Both
```

Remember to save the new rule.

<p class='note'>
In cases where your ISP blocks port 80 you will need to change the port forward options to forward port 443 from outside to port 443 on your HA device.  Please note that this will limit your options for automatically renewing the certificate, but this is a limitation because of your ISP setup and there is not a lot we can do about it!
</p>

now SSH in to the device your HA is running on.


<p class='note'>
If you're running the 'standard' setup on a raspberry pi the chances are you just logged in as the 'pi' user.  If not, you may have logged in as the HA user.  There are commands below that require the HA user to be on the sudoers list.  If you are not using the 'standard' pi setup it is presumed you will know how to get your HA user on the sudoers list before continuing.  If you are running the 'standard' pi setup, from your 'pi' user issue the following command (where <hass> is the HA user):

```bash
$ sudo adduser <hass> sudo
```

</p>

If you did not already log in as the user that currently runs HA, change to that user (usually hass or homeassistant - you may have used a command similar to this in the past):

```bash
$ su -s /bin/bash hass 
```

Make sure you are in the home directory for the HA user:

```bash
$ cd
```

We will now make a directory for the certbot software, download it and give it the correct permissions:

```text
$ mkdir certbot
$ cd certbot/
$ wget https://dl.eff.org/certbot-auto
$ chmod a+x certbot-auto
```

Now we will run the certbot program to get our ssl certificate.  You will need to include your email address and your duckDNS url in the appropriate places:

```text
$ ./certbot-auto certonly --standalone --preferred-challenges http-01 --email your@email.address -d examplehome.duckdns.org
```

Once the program has run it will generate a certificate and other files and place them in a folder `/etc/letsencrypt/` .

Confirm this file has been populated:

```bash
$ ls /etc/letsencrypt/live/
```

This should show a folder named exactly after your DuckDNS url.

Our HA user needs access to files within the letsencrypt folder, so issue the following commands to change the permissions.

```bash
$ sudo chmod 755 /etc/letsencrypt/live/
$ sudo chmod 755 /etc/letsencrypt/archive/
```

Did all of that go without a hitch?  Wahoo! Your LetsEncrypt certificate is now ready to be used with home assistant.  Move to step 5 to put it all together...

#### {% linkable_title 5 - check the incoming conection %}

<p class='note'>
Following on from Step 4 your SSH will still be in the certbot folder.  If you edit your configuration files over SSH you will need to change to your homeassistant folder:

```bash
$ cd ~/.homeassistant
```

If you use samba shares to edit your files you can exit your SSH now.
</p>

Go to your router's configuration pages and set up a new port forwarding rule, thus:

```text
Service name - ha_ssl
Port Range - 443
Local IP - YOUR-HA-IP
Local Port - 8123
Protocol - Both
```

If during step 4 you had to use port 443 instead of port 80 to generate your certificate, you should delete that rule now.

Remember to save the rule changes.

Now edit your configuration.yaml file to reflect the SSL entries and your base URL (changing the examplehome subdomain to yours):

```yaml
http:
  api_password: YOUR_PASSWORD
  ssl_certificate: /etc/letsencrypt/live/examplehome.duckdns.org/fullchain.pem
  ssl_key: /etc/letsencrypt/live/examplehome.duckdns.org/privkey.pem
  base_url: examplehome.duckdns.org
```
  
You may wish to set up other options for the http component at this point, these extra options are beyond the scope of this guide but can be found on the http component page here: [http](https://home-assistant.io/components/http/)

Save the changes to configuration.yaml.  Restart HA.

In step 3 we accessed our HA from the outside world with our DuckDNS URL and our port number.  We are going to use a slightly different URL this time.

```text
https://examplehome.duckdns.org
```

Note the S after http, and that no port number is added.  This is because https will use port 443 automatically, and we have already set up our port forward to redirect this request to our HA instance on port 8123.

You should now be able to see your HA instance via your DuckDNS URL, and importantly note that your browser shows the connection as secure.

You will now NO LONGER be able to access your HA via your old internal IP address in the way you previously have.  Your default way to access your HA instance, even from inside your house, is to use your DuckDNS URL.

In cases where you need to access via the local network only (which should be few and far between) you can access it with the following URL (note the added S after http):

```text
https://YOUR-HA-IP:8123
```

...and accepting the browsers warning that you are connecting to an insecure site.  This warning occurs because your certificate expects your incoming connection to come via your DuckDNS URL.  It does not mean that your device has suddenly become insecure.

Some cases such as this are where your router does not allow 'loopback' or where there is a problem with incoming connections due to technical failure.  In these cases you can still use your internal connection and ignore the warnings.

If you were previously using a webapp on your phone/tablet to access your HA you should delete the old one and create a new one with the new address.  The old one will no longer work as it is not keyed to your new, secure URL.  Instructions for creating your new webapp can be found here: 

```text
https://home-assistant.io/docs/frontend/mobile/
```

All done?  Accessing your HA from across the world with your DuckDNS URL and a lovely secure logo on your browser?  Ace!  Now lets clean up our port forwards so that we are only exposing the parts of our network that are absolutely neccesary to the outside world....

#### {% linkable_title 6 - Clean up port forwards %}

In step 2 we created a port forwarding rule called ha_test.  This opens port 8123 to the world, and is no longer neccessary.

Go to your router's configuration pages and delete the ha_test rule.

You chould now have two rules in relation to HA for your port forwards, named:

```text
ha_ssl and ha_letsencrypt
```

If you have any more for HA you should delete them now.  If you only have ha_ssl this is probably because during step 4 you had to use port 443 instead of port 80, so we deleted the rule during step 5.

You are now part of one of two groups:

 * If you have BOTH rules you are able to set up auto renewals of you certificates.
 * If you only have one, you will have to manually change the rule when you want to update your certificate, and then change it back afterwards.
 
Please remember whether you are a ONE-RULE person or a BOTH-RULE person for step 8!
 
LetsEncrypt certificates only last for 90 days.  When they have less than 30 days left they can be renewed.  Renewal is a simple process.
 
Move on to step 7 to see how to monitor your certificates expiry date, and be ready to renew your certificate when the time comes...

#### {% linkable_title 7 - Set up a sensor to monitor the expiry date of the certificate %}

Setting a sensor to read the number of days left on your SSL certificate before it expires is not required, but it has the following advantages:

 * You can physically see how long you have left, pleasing your inner control freak
 * You can set automations based on the number of days left
 * You can set alerts to notify you if your certificate has not been renewed and is coming close to expiry.
 * If you cannot set up automatic renewals due to your ISP blocking port 80, you will have timely reminders to complete the process manually.
 
If you do not wish to set up a sensor you can skip straight to step 8 to learn how to update your certificates.
 
The sensor will rely on a command line program that needs to be installed on your device running HA.  SSH in to the device and run the following commands:

```bash
$ sudo apt-get update
$ sudo apt-get install ssl-cert-check
```

<p class='note'>
In cases where, for whatever reason, apt-get installing is not appropriate for your installation you can fetch the ssl-cert-check script from `http://prefetch.net/code/ssl-cert-check`  bearing in mind that you will have to modify the command in the sensor code below to run the script from wherever you put it, modify permission if neccessary and so on.
</p>

To set up a senor add the following to your configuration.yaml (remembering to correct the URL for your DuckDNS):

```yaml
sensor:
  - platform: command_line
    name: SSL cert expiry
    unit_of_measurement: days
    scan_interval: 10800
    command: "ssl-cert-check -b -c /etc/letsencrypt/live/examplehome.duckdns.org/cert.pem | awk '{ print $NF }'"
```

Save the configuration.yaml.  Restart HA.

On your default_view you should now see a sensor badge containing your number of days until expiry.  If you've been following this guide from the start and have not taken any breaks in between, this should be 89 or 90.  The sensor will update every 3 hours.  You can place this reading on a card using groups, or hide it using customize.  These topics are outside of the scope of this guide, but information can be found on their respective components pages: [Group](https://home-assistant.io/components/group/) and [Customize](https://home-assistant.io/docs/configuration/customizing-devices/)

Got your sensor up and running and where you want it?  Top drawer!  Nearly there, now move on to the final steps to ensure that you're never without a secure connection in the future.

#### {% linkable_title 8 - Set up an automatic renewal of the SSL certificate. %}

The certbot program we downloaded in step 4 contains a script that will renew your certificate.  The script will only obtain a new certificate if the current one has less than 30 days left on it, so running the script more often than is actually needed will not cause any harm.

If you are a ONE-RULE person (from step 6) you cannot 'automatically' renew your certificates because you will need to change your port forwarding rules before the renewal takes place, and change it back again afterwards.

When you are within 30 days of your certificate's expiry date (you can use the sensor reading from step 7 to tell you this) you will need to complete the following steps:

 * Go to your router's configuration pages and edit your port forwarding rule to
 
```text
Service name - ha_ssl
Port Range - 443
Local IP - YOUR-HA-IP
Local Port - 443
Protocol - Both
```

 * Save the rule
 * SSH in to your device running HA.
 * Change to your HA user (command similar to):

```bash 
$ su - s /bin/bash hass
```

 * Change to your certbot folder

```bash 
$ cd ~/certbot/
```

 * Run the renewal command
 
```bash
$ ./certbot-auto renew --quiet --no-self-upgrade --standalone --preferred-challenges http-01
``` 

 * Once succesfully completed, change your port forwarding rule back to 
 
```text
Service name - ha_ssl
Port Range - 443
Local IP - YOUR-HA-IP
Local Port - 8123
Protocol - Both
```

 * Save the rule
 
 
 
If you are a BOTH-RULE person, you have a number of options at this point.
 
#######Option 1:
Your certificate can be renewed as a 'cron job' - cron jobs are background tasks run by the computer at specified intervals (and are totally independant of HA).  Defining cron is outside of the scope of this guide but you will have had dealings with crontab when setting up DuckDNS in step 3
 
To set a cron job to run the script at regular intervals:
 
 * SSH in to your device running HA.
 * Change to your HA user (command similar to_:
 
```bash
$ su - s /bin/bash hass
```
 
 * Open the crontab:
 
```bash
$ crontab -e
```
 
 * Scroll to the bottom of the file and paste in the following line
 
```text
30 2 * * 1 /usr/bin/letsencrypt renew >> /var/log/le-renew.log
```
 * Save the file and exit
 
 
#######Option 2:
You can set an automation in HA to run the certbot renewal script.
 
Add the following sections to your configuration.yaml

```yaml 
shell_command: 
  renew_ssl: ./certbot/certbot-auto renew --quiet --no-self-upgrade --standalone --preferred-challenges http-01
  
automation
  - alias: 'Auto Renew SSL Cert'
    trigger:
      platform: numeric_state
      entity_id: sensor.ssl_cert_expiry
      below: 29
    action:
      service: shell_command.renew_ssl
```

#######Option 3:
You can manually update the certificate when your certificate is less than 30 days to expiry.
 
To manually update: 
 
 * SSH in to your device running HA.
 * Change to your HA user (command similar to_:
 
```bash
$ su - s /bin/bash hass
```
 
 * Change to your certbot folder
 
```bash
$ cd ~/certbot/
```

 * Run the renewal command
 
```bash
$ ./certbot-auto renew --quiet --no-self-upgrade --standalone --preferred-challenges http-01
```
 
So, now were all set up.  We have our secured, remotely accesible HA instance and we're on track for keeping our certificates up to date.  But what if something goes wrong?  What if the automation didn't fire?  What if the cron job forgot to run?  What if the dog ate my homework?  Read on to set up an alert so you can be notified in plenty of time if you need to step in and sort out any failures...
 
#### {% linkable_title 9 - Set up an alert to warn us if something went wrong. %}
 
We set up our automatic renewal of our certificates and whatever method we used the certificate should be renewed on or around 30 days before it expires.  But what if a week later it still hasn't been?  This alert will go off if the expiry time on the certificate gets down to 21 days.  This will give you 3 weeks to fix the problem, get your new certificate installed and get another 90 days of secure HA connections in play.

In your configuration.yaml add the following automation, adding your preferred notification platform where appropriate:

```yaml
automation:
  - alias: 'SSL expiry notification'
    trigger:
    platform: numeric_state
    entity_id: sensor.ssl_cert_expiry
    below: 21
  action:
    service: notify.[your_notification_preference]
    data:
      message: 'Warning - SSL certificate expires in 21 days and has not been automatically renewed'
```
	  
If you receive this warning notification, follow the steps for a manual update from step 8.  Any error messages received at that point can be googled and resolved.  If the manual update goes without a hitch there may be something wrong with your chosen method for automatic updates, and you can start troubleshooting from there.

So, that's it.  We've taken a HA instance that was only reachable on the local network, made it accessible from the internet, secured it, and set up a system to ensure that it always stays secure.  Well done, go and treat yourself to a cookie!