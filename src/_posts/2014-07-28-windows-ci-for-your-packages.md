---
author: "kevinsawicki"
title: "Windows CI For Your Packages"
---

Now that the [Windows Alpha](/blog/2014/07/09/hello-windows) is out, it is a great time to start building and testing your Atom packages on Windows.

<!--more-->

Good news! The [atom/ci](https://github.com/atom/ci) repository now contains [instructions](https://github.com/atom/ci/blob/master/README.md) and a [template](https://github.com/atom/ci/blob/master/appveyor.yml) for building and testing Atom packages on [AppVeyor](http://www.appveyor.com/). AppVeyor offers free Windows CI for open source repositories and ships with [chocolatey](http://chocolatey.org/) for easy Atom installation.

All you need to do is add the following `appveyor.yml` file to the root of your repository and [configure your project on AppVeyor](https://github.com/atom/ci#appveyor).

```yaml
version: "{build}"
os: Windows Server 2012 R2

test: off
deploy: off

init:
  - cmd: rd /s /q %CHOCOLATEYINSTALL%
  - ps: iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))

install:
  - cinst atom
  - cd %APPVEYOR_BUILD_FOLDER%
  - apm install

build_script:
  - cd %APPVEYOR_BUILD_FOLDER%
  - apm test
```

This will run your package's [Jasmine](http://jasmine.github.io/) specs against the latest
[Atom release](/releases) using the [apm](https://github.com/atom/apm) `test` command.

You can see it in action for the [wrap-guide](https://github.com/atom/wrap-guide) package [here](https://ci.appveyor.com/project/kevinsawicki/wrap-guide/build/2).

Thanks to [@joefitzgerald](https://github.com/joefitzgerald) for adding this template and testing it out on his great [go-plus](https://github.com/joefitzgerald/go-plus/) package.

Happy Windows testing!
