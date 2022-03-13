---
title: The power of static typing
date: "2022-03-13"
description: "Go and Typescript are currently my favorite programming languages to work with. What do they have in common? They're both statically typed."
---

If you studied computer science in university like me or is still studying you might have heard the terms static typing or dynamic typing somewhere in your classes to distinguish programming language types.

### What is static typing and dynamic typing?

A programming language is statically typed if the types of all variables are known just by looking at the code. In these languages, you label the different variables with their types so the code can be verified before running in the build phase. This verification is called a **typecheck**.

A programming language is dynamically typed if it doesn't have a typecheck step, and the types of all variables are only known at runtime. These kinds of languages usually have some rules in order to make conversions between different types automatic. This is called **type coercion**. Javascript is a very famous example of being a dynamic typed language with this property is none other than Javascript.

Let's go for some simple examples.

```js
//Example 1
let str = ""

/*
    Implicit conversion between string type to boolean type.
*/
if(!str) {
    console.log("String is empty!")
}

```

From the second example we can see that dynamic typed helps us writing simpler code in some cases, like checking if a string is empty or even if an object hasn't been initialized. 
This is great! Let's see another example.

```js
//Example 2
let num = 3
let str = "4"
/* 
Prints 34 because it will implicitly convert 
num to a string and concatenate both strings with + operator 
*/
console.log(num + str)

```

This is an interesting example. The + operator in Javascript works for both numbers and strings even though they behave differently depending on the types.

This type coercion behavior that dynamic languages have can be the cause of multiple bugs in the code. So to prevent this, you need to always keep good track of the types of the different that you work with.

Another way to prevent having to deal with these kinds of bugs is to... 

**Use a static typed language!**

Static typed languages prevent you from being able to perform these operations with different data types! This is because the typecheck step will throw an error before even running your code.

Here are some examples of what I mean, this time in Go!

```Go

//Example 3
	var str string = ""
    /*
        Will error
    */
	if !str {
		fmt.Println("String is empty")
	}

```

When we try and build code with this example, the typecheck will throw the following error:

`invalid operation: !str (operator ! not defined on string)`

The message is actually very clear, it means we can't use a boolean ! operator on a string.

So how would we check if the string is empty? We would have to compare it directly with an empty string with an != operator. The same would apply for uninitialized objects.

As so we can conclude that in some operations, we can take advantage of type coercion to write some operations in a simpler way! But we need to keep track of the different data types to prevent errors.
While with static typed languages, even though we might have to write more extensive code, the typecheck will be there to protect from some bugs.

### Why I prefer static typed languages
I worked exclusively with Javascript and NodeJS for over 2 years of my career and when developing a new functionality like integrating a new API or a library it would take a bit of time getting to know what are the different parameters to be used. On some instances it would be a trial and error procedure.

Currently I've been working with Typescript and Go where I built a GraphQL API. Some mutations for this API require an object with multiple fields of specific types and having defined types for each mutation and their parameters in the frontend has helped me a lot with the development and reduced the said trial and error procedure.

This is the one example where static typing got really stuck with me as being a very helpful tool for my development.
