---
layout: default
title: Performance Between Set Map and Object
permalink: /notes/performance-between-set-map-obj
tags: web-dev.jpg
category: web-tech
excerpt_separator: <!--break-->
---
测试Set, Map和Object键值对的读写速度。   
写入速度：可以看到Set和Map基本在一个级别，Object慢得多  
随机读：Map非常快，Object次之，Set较慢 

<!--break-->

### 1M长度数组提重：

|   | Set     | Map     | Obj    |
| - |:-------:|:-------:|:------:|
| 1 | 276     | 263     | 757    |
| 2 | 251     | 287     | 738    |
| 3 | 270     | 290     | 754    |

### Code  

```javascript
let mockArr = []
let len = 1000000
for(let i=0; i<len; i++) {
  mockArr.push(Math.random().toFixed(8))
}

//Set
let t1 = new Date().getTime()
let found1 = new Set()
let uniq1 = new Set()
for(let x=0; x<len; x++){
  let cur = mockArr[x]
  if(uniq1.has(cur)){
    found1.add(cur)
  }
  else{
    uniq1.add(cur)
  }
}
console.log(new Date().getTime() - t1)

//Map
let t2 = new Date().getTime()
let found2 = new Set()
let uniq2 = new Map()
for(let x=0; x<len; x++){
  let cur = mockArr[x]
  if(uniq2.has(cur)){
    found2.add(cur)
  }
  else{
    uniq2.set(cur, 1)
  }
}
console.log(new Date().getTime() - t2)

//Obj
let t3 = new Date().getTime()
let found3 = new Set()
let uniq3 = {}
for(let x=0; x<len; x++){
  let cur = mockArr[x]
  if(uniq3[cur]){
    found3.add(cur)
  }
  else{
    uniq3[cur] = true
  }
}
console.log(new Date().getTime() - t3)

```

### 随机读：

|   | Set     | Map     | Obj    |
| - |:-------:|:-------:|:------:|
| 1 | 111     | 11      | 46     |
| 2 | 105     | 9       | 63     |
| 3 | 117     | 11      | 47     |

#### code

```javascript
let mockArr = []
let len = 1000000
for(let i=0; i<len; i++) {
  mockArr.push(Math.random().toFixed(8))
}

//Set
let uniq1 = new Set(mockArr)
let t1 = new Date().getTime()
for(let x=0; x<len; x++){
  let cur = mockArr[x]
  uniq1.has(cur)
}
console.log(new Date().getTime() - t1)

//Map
let uniq2 = new Map()
for(let x=0; x<len; x++){
  uniq2.set(mockArr[x], 1)
}
let t2 = new Date().getTime()
for(let x=0; x<len; x++){
  let cur = mockArr[x]
  uniq2.has(cur)
  uniq2.get(cur) // the same
}
console.log(new Date().getTime() - t2)

//Obj
let uniq3 = {}
for(let x=0; x<len; x++){
  uniq3[mockArr[x]] = 1
}
let t3 = new Date().getTime()
for(let x=0; x<len; x++){
  let cur = mockArr[x]
  uniq3[cur]
}
console.log(new Date().getTime() - t3)

```

### 带重复插入：

|   | Set     | Map     | Obj    |
| - |:-------:|:-------:|:------:|
| 1 | 244     | 258     | 797    |
| 2 | 242     | 237     | 643    |
| 3 | 233     | 248     | 833    |

#### code 

```javascript
let mockArr = []
let len = 1000000
for(let i=0; i<len; i++) {
  mockArr.push(Math.random().toFixed(8))
}

//Set
let uniq1 = new Set()
let t1 = new Date().getTime()
for(let x=0; x<len; x++){
  uniq1.add(mockArr[x])
}
console.log(new Date().getTime() - t1)

//Map
let uniq2 = new Map()
let t2 = new Date().getTime()
for(let x=len-1; x>=0; x--){
  uniq2.set(mockArr[x], 1)
}
console.log(new Date().getTime() - t2)

//Obj
let uniq3 = {}
let t3 = new Date().getTime()
for(let x=0; x<len; x++){
  uniq3[mockArr[x]] = 1
}
console.log(new Date().getTime() - t3)

```   

