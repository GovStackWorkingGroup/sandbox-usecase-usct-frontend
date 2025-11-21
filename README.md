# GovStack Unconditional Social Cash Transfer Front-End Demo

USCT front-end demo is used to showcase a possible use-case's flow and explain what could the Building Blocks used be and how they are interconnected for a variety of use-cases.

## Installation

Use `npm` to install dependencies.

```bash
npm install
```

## Short description

Project is bootstrapped with [React](https://react.dev/), [Vite](https://vitejs.dev/), [Chakra-UI](https://chakra-ui.com/)

For an explanation on why these tools were chosen, read about the [Component Library Evaluation](https://govstack-global.atlassian.net/wiki/spaces/DEMO/pages/96043009/Component+Library+Evaluation) and [Front-end framework](https://govstack-global.atlassian.net/wiki/spaces/DEMO/pages/95912054/Frontend+Framework)

## Deployment
simulation.govstack.global

### Amplify 

1. sign in to AWS Amplify 
2. run npm run build 
3. cd dist 
4. zip -r ../landingpage.zip . 
5. upload to AWS Amplify

### VM

1. sudo apt update
2. sudo apt install nginx 
3. sudo apt-get remove certbot 
4. sudo snap install --classic certbot 
5. sudo ln -s /snap/bin/certbot /usr/bin/certbot
6. sudo certbot --nginx
7. copy web pages sources to the vm 

For more info please visit [Certbot webpage](https://certbot.eff.org/instructions?ws=nginx&os=snap).