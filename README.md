## Serverless Portfolio + Contact-Form Static Site (AWS + Terraform + GitHub Actions)

![Architecture diagram](architecture.svg)

A fully serverless web application that serves a static React site from **Amazon S3/CloudFront** and processes contact-form submissions through **API Gateway → AWS Lambda → Amazon SES**.  
All infrastructure is defined in **Terraform** and deployed via **GitHub Actions** CI/CD pipelines
