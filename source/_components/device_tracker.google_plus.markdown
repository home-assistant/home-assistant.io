---
layout: page
title: "Google Plus"
description: "Instructions how to use Google Plus to track mobile devices in Home Assistant."
date: 2016-11-1 19:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Presence Detection
ha_version: TBD
---
If you share your Android's location with Google, this component fetches those locations from Google's servers to your Home Assistant. This component does NOT directly communicate with your phone, thus using this component does not cause any additional battery drain.
Suppose your Android phone is linked to your Google Account, say main@gmail.com.
This component can be used in 2 modes: 
- Self Mode: It visits "aboutme.google.com" while appearing (to Google) to be logged in as main@gmail.com. Using this mode requires putting your Google cookies into the home assistant config file. If anyone gets access to these cookies, they may be able to do anything with your google account, e.g. delete the account.
- Safe Mode: In this safer mode, the component visits the Google Plus profile page of main@gmail.com, while appearing (to Google) to be logged in as a dummy Google account, say dummy@gmail.com. In this case, (only) the cookies of dummy@gmail.com are needed. Just for the initial setup, you need to install the Google Plus Android App on Android, and log into the app as main@gmail.com, and in its location settings, share the location with dummy@gmail.com. After that, you can uninstall the Google Plus app on Android.


```yaml
# Example configuration.yaml entry. See below for instructions for obtaining the values of fields.
device_tracker 3:
  platform: gplus
  id: 'phone'
  url: 'POST requests for location are sent to this URL'
  cookie_sid: 'POST requests send this cookie for authenticating the google account'
  cookie_hsid: 'POST requests send this cookie for authenticating the google account'
  cookie_ssid: 'POST requests send this cookie for authenticating the google account'
  data_freq: 'POST data payload for requesting location'
  data_at: 'POST data payload for requesting location'
```

###How to obtain the values shown as '...':


- If using this component in Self Mode, open Firefox and log into Google as main@google.com 
and visit aboutme.google.com.
If instead, you wish to use this component in Safe Mode, log into dummy@google.com, 
and visit the Google Plus profile page of main@google.com. 
- Open the Instruments pane (Ctrl + Shift + C)
- Click the network tab
- If in Self Mode, click the three bar menu on the top left. If in Safe Mode, skip this step.
- If in Self Mode, click Preview. If in Safe Mode, click on the profile name of main@google.com. 
In either mode, a popup will appear. This popup will contain many cards, 
one of which is the location card.
- In the network tab of the instrumentation pane, look for a JSON request that 
looks like data?ds.extension
- Right click on it, select "Copy with cURL".
- Paste the result on http://curl.trillworks.com/#python to get your command formatted 
for python requests. If you don't trust that website, note that they provide sources of the tool. So run the tool on your local machine.
- The python code contains dictionaries with keys that have names similar to the above 
fields in the config file. Copy the corresponding values to the config file.
- The URL field is the first argument of `requests.post` in the last line of the python code.
