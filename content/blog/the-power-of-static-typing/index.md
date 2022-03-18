---
title: The power of static typing
date: "2022-03-13"
description: "Go and Typescript are currently my favorite programming languages to work with. What do they have in common? They're both statically typed."
---

If you studied computer science in university like me or are still studying you might have heard the terms static typing or dynamic typing somewhere in your classes to distinguish programming languages.

### What is static typing and dynamic typing?

A programming language is statically typed if the types of all variables are known just by looking at the code. In these languages, you label the variables with their types so the code can be verified before it runs. This procedure is done during the build phase and is called a **typecheck**.

Java, C++, C#, and Go are very famous static typed languages.

A programming language is dynamically typed if it doesn't have a typecheck step, and the types of all variables are only known at runtime. These kinds of languages have the advantage that writing complex code is much faster compared to static typed languages. In order to do this, they have some rules in order to make conversions between different types automatic. 

These rules are called **type coercion** rules.

Javascript is a very famous example of being a dynamic typed language with this property, along with Python or even Ruby.

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

From this example we can see that dynamic typing helps writing simpler code, like checking if a string is empty. The same if condition could be used to check if the variable is null or undefined.

This is great! Let's go to another example.

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

This is an interesting one. The + operator in Javascript works for both numbers and strings even though they behave differently depending on the types.

This type coercion behavior that dynamic languages have can be the cause of multiple bugs in our code. So to prevent this, we need to always keep good track of the types of the different variables that we are using, as well as the type coercion rules.

Another way to not deal with these bugs is to... 

**Use a static typed language!**

Static typed languages prevent us from performing these operations with different data types! This is because the typecheck step will throw an error before even running your code.

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

When we try and build code that contains this example, the typecheck will throw the following error:

`invalid operation: !str (operator ! not defined on string)`

The message is clear clear, it means we can't use a boolean ! operator on a string.

So how would we check if the string is empty? 

We would have to compare it directly with an empty string with a != operator. The same would apply for null check.

As so we can conclude that in some operations, we can take advantage of type coercion to write some operations in a simpler way! But we need to keep track of the different data types to prevent errors.
While with static typed languages, even though we might have to write more extensive code, the typecheck will be there to protect from some bugs.

### Why I prefer static typed languages
There is another situation where static typed languages also help you develop code besides preventing type coercion bugs I would like to talk about.

I worked exclusively with Javascript and NodeJS for over 2 years of my career and when developing a new functionality like integrating a new API or a library, it would take a bit of time getting to know what are the different parameters and data types to be used. On some instances it would be a trial and error procedure to test and verify if no data was missing.

Currently I've been working with Typescript and Go where I built a GraphQL API composed of multiple queries and mutations. Some of these mutations require a payload object with multiple required fields of different types. Due to this, when writing the code to perform the mutation, some fields might be missing. 

So, instead of going through the trial and error procedure to test and verify the data, the typecheck always warns if there is a missing field. 


### Conclusion 
Even though dynamic languages have been very popular to write complex software with Frameworks like Django or even Ruby on Rails, since Typescript appeared as an alternative to Javascript it seems there's been a rise in popularity for static typed languages again, even in creating new ones with this characteristic like Kotlin, Go or even Rust.

I feel they bring huge advantages to developers in terms of productivity and security and with modern syntax they also takes some of the pain from writing complex code.
