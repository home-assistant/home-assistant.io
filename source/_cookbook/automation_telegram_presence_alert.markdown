This will send an alert when someone in your known devices list connects to the networt via wifi. In other words, when someone arrives home.
It will only work if you are using nmap or similar component. 
I am using the ddwrt component to get a list of connected devices on my network.

follow these isntructions to get api_key and chat_id
https://home-assistant.io/components/notify.telegram/

// Add the telegram component
notify:
  - name: Telegram
    platform: telegram
    api_key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    chat_id: xxxxxxxxx
    
//add the automation component
//Note: device_name_here should be whatever the device is named in known devices file. 

automation:
  trigger:
    platform: state
    entity_id: device_tracker.device_name_here
    from: 'not_home'
    to: 'home'
  action:
    service: notify.Telegram
    data:
      message:  "Person is now home"
