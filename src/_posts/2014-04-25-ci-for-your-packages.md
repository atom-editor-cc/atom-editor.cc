---
author: "kevinsawicki"
title: "CI For Your Packages"
---

Looking to get your Atom package building on CI so that pull requests are updated automatically when tests pass or fail?

<!--more-->

Look no further, we just published a new [ci](https://github.com/atom/ci) repository with [instructions](https://github.com/atom/ci/blob/master/README.md) for building and testing your Atom packages on [Travis CI](https://travis-ci.org/).

All you need to do is add the following `.travis.yml` file to the root of your repository and [configure your project on Travis](http://docs.travis-ci.com/user/getting-started/#Step-two%3A-Activate-GitHub-Webhook).

```yaml
language: objective-c

notifications:
  email:
    on_success: never
    on_failure: change

script: 'curl -s https://raw.githubusercontent.com/atom/ci/master/build-package.sh | sh'
```

This will run your package's [Jasmine](http://jasmine.github.io/) specs against the latest [Atom release](/releases) using the [apm](https://github.com/atom/apm) `test` command.

You can see it in action for the [wrap-guide](https://github.com/atom/wrap-guide) package [here](https://travis-ci.org/atom/wrap-guide/builds/23774579).

Happy testing!
