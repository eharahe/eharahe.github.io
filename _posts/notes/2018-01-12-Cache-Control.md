---
layout: default
title: Http1.1 Cache Control
permalink: /notes/http-cache-control
tags: web-dev.jpg
category: web-tech
excerpt_separator: <!--break-->
---

Http 1.1 的缓存机制

<!--break-->

## 缓存机制

### Expire, Pragma, Cache-Control, Age

1. Expires (http/1.0)   
The Expires header contains the date/time after which the response is considered stale.   
```
Expires: Wed, 21 Oct 2015 07:28:00 GMT
```   
<!--break-->
2. Pragma:no-cache (http/1.0)   
与 Cache-Control: no-cache 效果一致。

3. Cache-Control (http/1.1)   
客户端可以在HTTP请求中使用的标准 Cache-Control 指令。   
```
Cache-Control: max-age=<seconds>
Cache-Control: max-stale[=<seconds>] stale时，容许接收proxy缓存的最大过期时间
Cache-Control: min-fresh=<seconds>
Cache-control: no-cache 
Cache-control: no-store
Cache-control: no-transform
Cache-control: only-if-cached
```
服务器可以在响应中使用的标准 Cache-Control 指令。   
```
Cache-control: no-cache             每次加载资源需要条件请求是否过期
Cache-control: no-store             完全不缓存，每次都去服务器拉取
Cache-control: no-transform
Cache-control: public
Cache-control: private
Cache-control: must-revalidate      stale的资源必须revalidate
Cache-control: proxy-revalidate     proxy的stale资源必须revalidate
Cache-Control: max-age=<seconds>
Cache-control: s-maxage=<seconds>   proxy的max-age
```   

4. Age (http/1.1)   
The Age header contains the time in seconds the object has been in a proxy cache.   
```
Age: 160859
```

* **Expires** vs. **Cache-control**   
> If there is a Cache-Control header with the "max-age" or "s-maxage" directive in the response, the Expires header is ignored.  --[MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expires)   

* **Private** vs. **Public**  
> As a rule of thumb, if it's something everybody can access (for example, the logo in this page) cache-control: public might be better, because the more people that cache it, the less bandwidth you'll need. If it's something that is related to the connected user (for example, the HTML in this page includes my username, so it won't be useful to anyone else) cache-control: private will be better, as the proxies would be caching data that won't be requested by other users, and they might also be keeping data that you don't want to be kept in servers that you don't trust.  --[Stack Overflow](https://stackoverflow.com/questions/3492319/private-vs-public-in-cache-control)

* **Pragma**
> Use Pragma only for backwards compatibility with HTTP/1.0 clients.   
   

### Last-Modified / If-Modified-Since & ETag / If-None-Match (条件查询)
* 都是http/1.1 的header
* 在缓存失效的时候发生作用
* ETag / If-None-Match的优先级高于Last-Modified / If-Modified-Since