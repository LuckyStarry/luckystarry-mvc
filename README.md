# LuckyStarry-MVC

一个轻量的 WebApi 服务

[![Build Status](https://www.travis-ci.org/LuckyStarry/luckystarry-mvc.svg?branch=master)](https://www.travis-ci.org/LuckyStarry/luckystarry-mvc?branch=master)
[![Build Test](https://github.com/LuckyStarry/luckystarry-mvc/workflows/Build%20Test/badge.svg?branch=master)](https://github.com/LuckyStarry/luckystarry-mvc/actions?query=workflow%3A%22Build+Test%22+branch%3Amaster)
[![Coverage Status](https://coveralls.io/repos/github/LuckyStarry/luckystarry-mvc/badge.svg?branch=master)](https://coveralls.io/github/LuckyStarry/luckystarry-mvc?branch=master)
[![Npm Status](https://img.shields.io/npm/v/luckystarry-mvc.svg)](https://www.npmjs.com/package/luckystarry-mvc)
[![install size](https://packagephobia.now.sh/badge?p=luckystarry-mvc)](https://packagephobia.now.sh/result?p=luckystarry-mvc)
[![codebeat badge](https://codebeat.co/badges/3265bab9-f87a-4e77-8d2a-d4bf75b5592b)](https://codebeat.co/projects/github-com-luckystarry-luckystarry-mvc-master)
[![Known Vulnerabilities](https://snyk.io/test/github/LuckyStarry/luckystarry-mvc/badge.svg?targetFile=package.json)](https://snyk.io/test/github/LuckyStarry/luckystarry-mvc?targetFile=package.json)
[![License Status](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://raw.githubusercontent.com/LuckyStarry/luckystarry-mvc/master/LICENSE)

## Warning

使用须知：**本框架仍处于设计开发阶段，很多接口可能会随时调整，建议现阶段慎重使用**

## Install

```bash
npm i -S luckystarry-mvc
```

## Usage

一个简单的启动用例如下所示：

```javascript
#!/usr/bin/env node

import * as mvc from 'luckystarry-mvc'

mvc.ApplicationBuider.Create().Build().Start()
```

为了使用 _注解_ 的特性，请在项目运行目录添加 _tsconfig.json_

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

然后您就可以使用如下命令启动站点

```bash
ts-node/register index.ts
```

## LICENSE

MIT License

Copyright (c) 2018 SUN BO <starry@vip.qq.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
