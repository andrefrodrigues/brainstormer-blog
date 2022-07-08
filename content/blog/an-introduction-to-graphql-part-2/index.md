---
title: Introduction to GraphQL - Part 2
date: "2022-06-11"
description: "The second part of the introduction. Here I will talk about how to modify data in the server and how to organise the data fields we want to query."
---

Besides querying data, we also want to be able to modify it. To do this, GraphQL supports a kind of operation named **mutation.**

# What are mutations?

A mutation is an operation to modify data. Typically a mutation will do either 1 of these things (And it’s probably best to have each mutation doing only one):

- Update data
- Create data
- Delete data

In the server-side, we can define mutations in a similar way like queries are. 

Using the previous example of a simplified Twitter-like API, we can define the following mutations:

```graphql
type Mutation {
	createTweet(content: String!): Tweet!
	deleteTweet(tweetId: ID!): ID!
	RegisterUser(userData: RegisterUserPayload!): User!
	updateUser(userData: UpdateUserPayload!): User!
}
```

These mutations are related to the current user (except the register user), which we can assume that it is identified by a [JWT](https://jwt.io/).

A mutation will also return a data type as a response. This is used to update the client cache since a GraphQL client will usually keep a local state of the data. This will be discussed in depth soon!

This way, in order to send a mutation, for instance to create a tweet, we can send the data like this:

```graphql
mutation {
	createTweet(content: "I'm still learning GraphQL and it's cool") {
		id
		content
		createdAt
	}
}
```

If you notice, in here we define the fields that we wish to get from the response, which should be something like:

```json
{
	"createTweet": {
		"id": "44",
		"content": "I'm still learning GraphQL and it's cool",
		"createdAt": "2022-06-06"
	}
}
```

And we also get the desired fields.

This is great, but while our API changes during time, we sometimes may need to have a way to organise the used fields in different queries and mutations so we don’t have to keep track on every change.

For this we can use Fragments!

# Fragments

A fragment is a reusable unit that lets you construct sets of fields where you can include them in queries or mutations. This allows us to just call the configured fragment wherever we want.

Fragments are usually defined on the client-side. So when we perform a query we need to always send the fragment definition of all the fragments used.

We can define a fragment like this: 

```graphql
fragment TweetParts on Tweet {
	content
}
```

By having this, we can change the createTweet mutation like this:

```graphql
fragment TweetParts on Tweet {
	content
}
mutation {
	createTweet(content: "I'm still learning GraphQL and it's cool") {
		id
		...TweetParts
	}
}
```
Notice how we send the fragment together.


And for the current user information including the tweets:

```graphql
fragment TweetParts on Tweet {
	content
}
{
	me {
		name
		email
		tweets {
			id
			...TweetParts
		}
	}
}
```

This way, if we add more fields to the Tweet data type, like the number of likes, numer of shares, retweet information, we only need to change inside the TweetParts fragment.