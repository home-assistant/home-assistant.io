---
title: "Privacy, rate limiting and security"
description: "Notes about important topics relating to push notifications"
redirect_from: /ecosystem/ios/notifications/privacy_security_rate_limits/
---

## Privacy

No notification content is stored on remote servers. Only the required push registration data and a simple counter of the total number of push notifications sent per day per device (for rate limiting purposes) is kept.

## Rate limiting

Currently, you are allowed to send a maximum of 150 push notifications per day per device. This is to ensure that the service remains cheap to maintain. In the future we may add support for upgrading to allow more notifications. The rate limit resets at midnight UTC daily. When a notification is sent your current rate limits (including sent notifications and notifications remaining for the day) will be output to your Home Assistant logs. If an error occurs while sending a notification your rate limit will not be affected.

## Security

All traffic between your Home Assistant instance, the push infrastructure, and Apple, is encrypted with SSL.
