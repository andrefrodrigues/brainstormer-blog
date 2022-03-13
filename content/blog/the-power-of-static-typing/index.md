---
title: The power of static typing
date: "2022-03-13"
description: "Go and Typescript are currently my favorite programming languages to work with. What do they have in common? They're both statically typed."
---

If you studied computer science in university like me or is still studying you might have heard the terms static typing or dynamic typing somewhere in your classes to distinguish programming language types.

## What is static typing and dynamic typing?
A programming language is statically typed if the types of all variables are known just by looking at the code. In these languages, you label the different variables with their types so the code can be verified before running in the build phase. This verification is called a **typecheck**.

A programming language is dynamically typed if it doesn't have any typecheck step, and the types of all variables are only known at runtime.

```js
    const a = 3;
```