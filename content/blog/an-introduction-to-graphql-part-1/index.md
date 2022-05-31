---
title: Introduction to GraphQL - Part 1
date: "2022-05-31"
description: "This is the first post talking about GraphQL and how to use it. It presents what it is, a bit on how it works, and advantages and disadvantages."
---
### What is GraphQL?

GraphQL is an open-source data query and manipulation language for APIs that allows you to describe the API data as well as what data you wish to obtain, by asking exactly what you want to obtain. This is done by a server runtime that runs your queries. GraphQL is an alternative to  REST.

As an example, let’s consider a simplified version of the twitter API. This information is defined in the server side, by showing what the server provides.

```graphql
type User {
	id: ID!
	name: String!
	createdAt: String!
	email: String!
	followers: [User!]!
	following: [User!]!
	tweets: [Tweet!]!
}

type Tweet {
	id: ID!
	content: String!
	createdAt: String!
	user: User!
}
```

This is the syntax to define the data types GraphQL can handle.

The User type has the id field which works as a unique identifier, the name, a createdAt, email and an array of users that represents the followers, another array that represents the users that we are following and the user’s tweets. 

The fields whose data types contain a ! means that that field is non-nullable. In the collection, placing the ! outside the array means that the collection is non-nullable, while the ! inside means that all the items inside the collection will always be of type User and not null.

The Tweet type also contains a unique identifier, contains the content, at what time was it created and who created it.

With this, we can define the queries like this:

```graphql
type Query {
	me: User
	users: [User!]!
	tweets: [Tweet!]!
}
```

We just defined 3 queries: 

- a **me** query which allows you to query the current user’s information.
- a **users** query which allows you to to query all the users in the platform.
- a **tweets** query which allows you to query all the tweets in the platform.

So, for instance if we want to query my information, we do the following query from the client side:

```graphql
{
	me {
		name,
		email,
	}
}
```

The response for this will be something like this JSON result:

```json
"me": {
    "name": "André Rodrigues",
    "email": "andre.rodrigues@miniclip.com"
}
```

Notice how in the query we didn’t specify all the fields of the user type. This means that we can query only the data we need and nothing else.

Another example, obtaining the current user’s tweets:

```graphql
{
	me {
		name,
		email,
		tweets {
			content
		}
	}
}
```

The JSON response should be something like this:

```json
"me": {
    "name": "André Rodrigues",
    "email": "andre.rodrigues@miniclip.com",
    "tweets": [
        {
            "content": "I've been using GraphQL and it's really awesome!"
        },
        {
            "content": "Hello everyone!"
        }
    ]
}
```

When we fetch a more complex field like “me” or “tweets” we need to specify which fields from that we wish and we will also obtain them.

Queries can also have arguments if they are defined. for example if we change the tweets query to accept a userId parameter:

```graphql
type Query {
	me: User
	users: [User!]!
	tweets(userId: ID): [Tweet!]!
}
```

We can query like this: 

```graphql
{
	tweets(userId: "42") {
		content
	}
}
```

And the response:

```json
"tweets": [
    {
        "content": "Good night everybody"
    },
    {
        "content": "I'm shook!"
    },
]
```

This id was used to filter the tweets by user id. If we wanted the data in another format by fetching a user and then its tweets, we could have defined a user query with an id parameter and query the user and its tweets. 

There are some standards and best practices in GraphQL to handle these cases on fetching data, as well as how to paginate data, which will be talked about in the future.

### Advantages

The main advantage of using GraphQL instead of REST is that we can query all the data we want and how we want it according to the schema. when using REST it’s unavoidable to fetch data that will probably not be used. With graphQL you can specify in the query exactly how you want it. 

If for instance we want to fetch all the tweets of the current user’s followers we could do the following query:

```graphql
{
	me {
		followers {
			id,
			name,
			tweets {
				content
			}
		}
	}
}
```

We would obtain the following data:

```json
"me": {
    "followers": [
        {
            "id": "64",
            "name": "Testy McTestface",
            "tweets": [
                {
                    "content": "Today we are testing!"
                }
            ] 
        },
        {
            "id": "42",
            "name": "Lenny Leonard"
            "tweets": [
                    {
                        "content": "Good night everybody"
                    },
                    {
                        "content": "I'm shook!"
                    },
            ]
        }
    ]
}
```

Another thing that might be considered an advantage is that to fetch related data, we might need to perform multiple API requests, but with GraphQL we can fetch all the related data we need in one request, which can improve performance.

### Disadvantages

Usually GraphQL clients are fairly more complex compared to REST clients, which requires some extra code, especially to handle and synchronize local state with the server. This will be discussed soon.

When doing deeply nested queries, we need to be careful on how nested we go, otherwise this can cause performance issues on the server. For instance the following query…

```graphql
{
	me {
		followers {
			followers {
				followers {
					...	
				}
			}
		}
	}
}
```

Here we could try and fetch our user’s followers’s follower’s followers’s… and so on. 
This will deeply impact performance and it’s best to configure the server to only allow an up to value in nesting. And create a different query to fetch the necessary data accordingly. This value should be defined depending on the data and the queries.

Regarding error handling, in REST, HTTP response codes describe the errors that have ocurred. Possibly with an error message with more specific information. When using GraphQL we usually get a 200, but the response JSON will have an errors field with more information.

GraphQL is best for complex data with lots of relations since it treats your data as a graph. This means that for a fairly simple data model, GraphQL might not be the best solution due to the added complexity.