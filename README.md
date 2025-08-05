<img src="https://cdn.prod.website-files.com/677c400686e724409a5a7409/6790ad949cf622dc8dcd9fe4_nextwork-logo-leather.svg" alt="NextWork" width="300" />

# Fetch Data with AWS Lambda

**Project Link:** [View Project](http://learn.nextwork.org/projects/aws-compute-lambda)

**Author:** Kemisola Adelakun | MisolaInTheCloud  
**Email:** misolakhemmy@gmail.com

---

## Fetch Data with AWS Lambda

![Image](http://learn.nextwork.org/curious_olive_fierce_frog/uploads/aws-compute-lambda_p9thryj2)

---

## Introducing Today's Project!

In this project, I will demonstrate how to set up and interact with the data tier of a three-tier architecture using Amazon DynamoDB.
I'm doing this project to learn how to securely store, manage, and retrieve data in a scalable way for serverless applications. 

### Tools and concepts

Services I used were AWS Lambda, Amazon API Gateway, and Amazon DynamoDB. Key concepts I learnt include Lambda functions for running backend code without managing servers, API Gateway for exposing my Lambda function via HTTP endpoints, and DynamoDB as a serverless NoSQL database. 

I also explored IAM roles and policies to securely manage permissions between services, and practised writing JSON-based inline policies for tighter security. This project brought all three tiers of a serverless application together, presentation, logic, and data, in a hands-on and practical way.

### Project reflection

This project took me approximately 1 hour.
The most challenging part was resolving the handler configuration error. Initially, I received a Runtime.ImportModuleError because the Lambda function was trying to invoke lambda_function.handler, but my actual file was named index.js and the function was called handler. To fix it, I updated the handler setting in Lambda to index.handler, which correctly mapped to my function.

It was most rewarding to see my function successfully retrieve data from DynamoDB after correcting the permissions and tightening the security with a custom inline policy. I also enjoyed practicing real-world troubleshooting, it gave me more confidence using Lambda, API Gateway, and DynamoDB together.

I did this project today to strengthen my hands-on skills with serverless architecture using AWS. My goal was to understand how Lambda, API Gateway, and DynamoDB work together to build scalable, cost-effective web applications without managing servers.

Yes, this project met my goals. It gave me practical experience setting up a complete serverless API, handling permissions through IAM roles and inline policies, and debugging issues like handler misconfigurations. It also pushed me to write clear documentation and test my functions like a real-world developer. I feel more confident now in applying this to real use cases. 

---

## Project Setup

To set up my project, I created a database using Amazon DynamoDB, a fully managed NoSQL database service designed for high performance at any scale.
The table I created is called UserData. The partition key is userId, which means each item in the table is uniquely identified by a user's ID. 

This setup allows the application to quickly retrieve user-specific data, making it efficient and scalable for serverless backends.

In my DynamoDB table, I added a sample user with the attributes userId, name, and email. DynamoDB is schemaless, which means I only need to define the primary key (userId in this case), and I can freely add any other attributes without a fixed schema. This flexibility makes it easy to adjust the data structure as my application evolves

![Image](http://learn.nextwork.org/curious_olive_fierce_frog/uploads/aws-compute-lambda_a112c3d5)

### AWS Lambda

AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers. I'm using Lambda in this project to retrieve user data from my DynamoDB table whenever it's triggered by an API request, helping me build the logic layer of my three-tier web application without worrying about backend infrastructure

---

## AWS Lambda Function

My Lambda function has an execution role, which is a special IAM role that gives the function permission to interact with other AWS services on my behalf. By default, the role grants basic permissions like writing logs to Amazon CloudWatch. Later, I can attach additional permissions so the function can access DynamoDB and retrieve user data as needed.

My Lambda function will retrieve a specific user's data from the UserData DynamoDB table based on the provided userId. It uses the AWS SDK to query the database and returns the user's details, such as name and email, in a structured JSON response. If the data can't be retrieved (e.g. the user doesn't exist), it responds with a clear error message explaining what went wrong.


The code utilises the AWS SDK, which is the Amazon Web Services Software Development Kit, a collection of tools and libraries that enable developers to easily interact with AWS services using familiar programming languages. My code uses the SDK to communicate with DynamoDB, allowing it to perform database operations like retrieving user data without needing to manually write complex low-level API requests.

![Image](http://learn.nextwork.org/curious_olive_fierce_frog/uploads/aws-compute-lambda_a1b2c3d5)

---

## Function Testing

To test whether my Lambda function works, I created a test event using the AWS Lambda console, inputting the following JSON:
{
  "userId": "1"
}.

The test is written in JSON format, which is how data is commonly passed to Lambda functions. If the test is successful, I'd see the retrieved user data returned in the response payload, including values like the user's name and email. This confirms that the function is correctly querying the DynamoDB table and returning the expected output.

The test displayed a "success" because AWS Lambda was able to run the function without syntax or runtime errors, but the function’s response was an "AccessDeniedException" because the Lambda execution role didn’t have permission to access the DynamoDB table.

Even though the code was correct, DynamoDB blocked the request due to missing IAM permissions, so the function couldn’t retrieve the data as expected.

![Image](http://learn.nextwork.org/curious_olive_fierce_frog/uploads/aws-compute-lambda_u1v2w3x4)

---

## Function Permissions

To resolve the AccessDenied error, I attached the AmazonDynamoDBReadOnlyAccess policy to my Lambda function’s execution role because this grants the function permission to read data from my DynamoDB table. Without this, the function is blocked from accessing the table, even if the code is correct. This permission update allows my Lambda to successfully retrieve items using the GetCommand.

There were four DynamoDB permission policies I could choose from, but I didn't pick AmazonDynamoDBFullAccess or AmazonDynamoDBAdministrator because they grant too many permissions, including the ability to modify or delete tables and data. For this project, my Lambda function only needs to read data, so it's safer and more secure to use AmazonDynamoDBReadOnlyAccess, which follows the principle of least privilege.

I also didn't pick AmazonDynamoDBFullAccess or AmazonDynamoDBAdministrator because they provide more permissions than my Lambda function needs, like creating, updating, or deleting tables. AmazonDynamoDBReadOnlyAccess was the right choice because it grants just enough access to read data from the table without risking accidental changes.

![Image](http://learn.nextwork.org/curious_olive_fierce_frog/uploads/aws-compute-lambda_3ethryj2)

---

## Final Testing and Reflection

To validate my new permission settings, I re-ran the Lambda function test using the same input. The results were successful and returned the expected user data because the Lambda function now has the correct permissions (AmazonDynamoDBReadOnlyAccess) to access the DynamoDB table and retrieve the item without being blocked.

Web apps are a popular use case of using Lambda and DynamoDB. For example, I could build a user profile feature that fetches personalized data from DynamoDB every time someone logs in, or create a product search function that queries items based on keywords. I could also use it to track user activity or preferences in real-time, or even build lightweight serverless APIs for mobile apps, all without needing to manage servers manually.

![Image](http://learn.nextwork.org/curious_olive_fierce_frog/uploads/aws-compute-lambda_p9thryj2)

---

## Enahancing Security

For my project extension, I challenged myself to replace the broad AmazonDynamoDBReadOnlyAccess managed policy with a custom inline policy that grants access only to the UserData table. This will reduce unnecessary permissions, follow the principle of least privilege, and make my function more secure,  just like a real-world production setup should be.

To create the permission policy, I used JSON because it gave me full control over the specific actions and resources I wanted to allow. Using JSON ensured I could precisely define access to only the UserData table and avoid granting broader permissions that come with visual or managed policy editors.


When updating a Lambda function's permission policies, you could risk accidentally restricting access too much and breaking functionality. I validated that my Lambda function still works by re-running the test event with a valid userId and confirming that it successfully retrieved the correct data from the UserData DynamoDB table. This showed that my new, tighter inline policy was correctly configured without disrupting the function's ability to perform its job. 

![Image](http://learn.nextwork.org/curious_olive_fierce_frog/uploads/aws-compute-lambda_1qthryj2)

---

---
