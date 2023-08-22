---
author: "zcbenz"
title: "What's new in Atom Shell 0.20.x"
---

This is the first article in our new "What's new in Atom Shell" series, which will walk you through the new features from the most recent [Atom Shell](https://github.com/atom/atom-shell) releases.

<!--more-->

## Transparent windows

By setting the `transparent` option in [BrowserWindow](https://github.com/atom/atom-shell/blob/master/docs/api/browser-window.md) to `true`, you can now make the window use a transparent background, which enables you to create a window of arbitrary shape. For more on this check out the [guide on transparent windows](https://github.com/atom/atom-shell/blob/master/docs/api/frameless-window.md#transparent-window).

![Transparent window](/assets/images/blog.atom.io/img/posts/transparent-window.png)

## Registering your own secure scheme

When using a custom protocol in an HTTPS page, you may encounter a warning like
this:

> Mixed Content: The page at 'https://secure.website/messages/general/' was loaded over HTTPS, but requested an insecure font 'custom-resources:fonts/TTF/Lato-Hairline.ttf'. This content should also be served over HTTPS.

With [webFrame.registerUrlSchemeAsSecure](https://github.com/atom/atom-shell/blob/master/docs/api/web-frame.md#webframeregisterurlschemeassecurescheme), you can now register a URL scheme as secure to get rid of this mixed content warning.

## Disabling the HTTP cache

By passing [–disable-http-cache](https://github.com/atom/atom-shell/blob/master/docs/api/chrome-command-line-switches.md#--disable-http-cache) on the command line, you can now disable the HTTP cache when showing a remote page.

## Using template images for icons on dark menu bar

When creating a status item on OS X's menu bar, you may want your icon to adapt to the Yosemite dark menu bar. By simply suffixing the icon's filename with `Template` you can mark the icon as a [template image](https://github.com/atom/atom-shell/blob/master/docs/api/image.md#template-image), then you can use the [Tray](https://github.com/atom/atom-shell/blob/master/docs/api/tray.md) API to create an status item that can adapt to both light and dark menu bars.

## Disabling web security in `<webview>`

The [disablewebsecurity](https://github.com/atom/atom-shell/blob/master/docs/api/web-view-tag.md#disablewebsecurity) attribute is the same as the `web-security` option of [BrowserWindow](https://github.com/atom/atom-shell/blob/master/docs/api/browser-window.md), allowing you to disable the web security mechanism entirely and let the web page in a `<webview>` tag do whatever it wants.

## Spell check in text areas and input fields

If you want to enable Chrome's native spell-checking in your web app, you can now use the [webFrame.setSpellCheckProvider](https://github.com/atom/atom-shell/blob/master/docs/api/web-frame.md#webframesetspellcheckproviderlanguage-autocorrectword-provider) API with any spell checking library you'd like to highlight spelling errors.

![Spell check](/assets/images/blog.atom.io/img/posts/spell-check.png)

## Sending messages from webview to the host page

If you are providing some custom APIs for pages in `<webview>`, you may want to try the new [ipc.sendToHost](https://github.com/atom/atom-shell/blob/master/docs/api/ipc-renderer.md#ipcsendtohostchannel-args) API, which can send a message to the host page directly. The messages sent from `<webview>` will be fired as an [ipc-message](https://github.com/atom/atom-shell/blob/master/docs/api/web-view-tag.md#ipc message) event in host page.

## Removing size limit of `localStorage`

The `localStorage` object in Atom Shell no longer has the size limit, so you can store as much data there as you want. Previously the `localStorage` size limit was a meager 5MB.

## Upgrade to Chrome 39

Atom Shell is now using the latest Chrome 39 stable release to render web content.
