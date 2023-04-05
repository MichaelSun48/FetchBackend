# Fetch Receipt Processor 

This application is an API specified by by the instructions at [this](https://github.com/fetch-rewards/receipt-processor-challenge) repository. 

## Requirements

This program is written using a Node - Typescript stack, but only ___Docker___ is required to run the program and Git is required to clone the repository. Instructions for installing: [Docker](https://docs.docker.com/engine/install/), [Git](https://github.com/git-guides/install-git)

## Usage

First, navigate to a directory for the application to live in. Then clone the repository and navigate into it with the following commands:
```
% git clone https://github.com/MichaelSun48/FetchBackend.git
% cd FetchBackend 
```

Next, build the Docker image of the application using the following command: 
```
% docker build -t fetch-backend . 
```

Finally, run the following Docker command to create the container and start the application:
```
% docker run -it -p 9000:3000 fetch-backend
```

The application should now be running within the Docker container, and endpoints can be reached at localhost:9000/ 

## Authors

Michael Sun

## License

[MIT](https://choosealicense.com/licenses/mit/)