# NoCode-Neural-Nets PROTOTYPE
A no-code development platform (NCDP) for rapid prototyping and visualization of neural networks behaviour on custom data.

For the moment the platform is only a prototype, only working with .csv files and fully connected networks.

![alt text](https://i.ibb.co/sHPH14G/Screenshot-2020-07-15-at-16-21-19.png)

To use:
1. Download repo
2. Go to the main 'NoCode-Neural-Nets' directory
3. Create a '.env' file and fill it following '.env.example'
To obtain a Sendgrid token you will need a Sendgrid free account with a registered email address (gmail ideally if personal).
4. Run ``` npm install && npm run start:prod ```

To develop:
1. Follow steps 1-3 from 'To use'
2. Install dependecies with ``` npm install ```
3. To develop the front end run ``` npm run start:client-dev ```
or ``` npm run start:server-dev ``` to develop the back end
