# Nicecream FM History SPA

[![Build Status](https://travis-ci.org/altcatalin/nicecream-history-spa.svg?branch=master)](https://travis-ci.org/altcatalin/nicecream-history-spa) [![Coverage Status](https://coveralls.io/repos/github/altcatalin/nicecream-history-spa/badge.svg?branch=master)](https://coveralls.io/github/altcatalin/nicecream-history-spa?branch=master) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/altcatalin/nicecream-history-spa/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/altcatalin/nicecream-history-spa/?branch=master)

If you like [nicecream.fm](https://nicecream.fm) you will understand the need to save all those songs playing each minute :grin:.  

The web app is made of an [API](https://github.com/altcatalin/nicecream-history) and a [SPA](https://github.com/altcatalin/nicecream-history-spa).  

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  

**Features**:

- [x] Channels history
- [x] Social sign in with Google
- [x] Bookmarks
- [ ] ...

## Development

**Requirements**:  

- [Nicecream FM History API](https://github.com/altcatalin/nicecream-history) deployed  :sunglasses:  
- Node.js >= 6  

Install dependencies:  
`npm install`  

Run and open `http://spa.lvh.me:3000` in browser:  
`npm start`  

References:

- ngrok, lvh.me and nip.io: A Trilogy for Local Development and Testing

## Deployment

### AWS

Describe and provision infrastructure with CloudFormation.

**Requirements**:

- Internet domain (i.e example.com) and access to DNS management  
- [Nicecream FM History API](https://github.com/altcatalin/nicecream-history) deployed  
- Node.js >= 6  
- [AWS CLI](https://aws.amazon.com/cli/)  
- AWS certificate for `*.example.com` generated into the `us-east-1`, CloudFront requirement  

*References*:

- [cloudonaut.io templates](https://templates.cloudonaut.io/en/stable/)

#### Static Website

Upload template to CloudFormation bucket:  
`aws s3 sync ./cloudformation/templates s3://[CLOUDFORMATION_BUCKET]`  

```bash
aws cloudformation create-stack \
--stack-name [SPA_STACK_NAME] \
--template-url https://s3.amazonaws.com/[CLOUDFORMATION_STACK_NAME]/static-website.yaml \
--parameters \
    ParameterKey=SubDomainNameWithDot,ParameterValue=spa. \
    ParameterKey=HostedZoneName,ParameterValue=example.com \
    ParameterKey=CertificateType,ParameterValue=AcmCertificateArn \
    ParameterKey=DefaultErrorPagePath,ParameterValue=/index.html \
    ParameterKey=ExistingCertificate,ParameterValue=[ACM_CERTIFICATE_ARN]
```

Add a CNAME record for `spa.example.com`, pointing to CloudFront distribution:  
`spa.example.com.	3600	IN	CNAME	XXX.cloudfront.net.`  

**Code Deployment:**  

Build:  
`REACT_APP_API_URL=https://api.example.com npm run build`  

Upload to S3:  
`aws s3 sync ./build s3://[S3_BUCKET_NAME] --delete`  

Invalidate CloudFront cache if needed:  
`aws cloudfront create-invalidation --distribution-id [CLOUDFRONT_DISTRIBUTION_ID] --paths /index.html`  
