# Understand & visualize you data with AI! 🤖📊

## About The Project
Use this tool to ask general questions about statistics, visualize your own provided data and ask specific follow up questions!

The prompts used to explore data successfully could for instance be the following:

* Can you render a graph for me? I need it to be a doughnut chart displaying how many 'workplace_address' => 'municipality' are equal to 'Linköping' in the month of august
* I want a chart displaying all job ads where 'workplace_address' => 'municipality' equals to Markaryd
* Show me a graph that visualizes the change in amount of "occupation" => "label" equal to "Inköpare" in 2023
* Change the graph to a bar chart instead

### Installing and running the client & server

- Download the repo to your local machine
- Open up a terminal in the project folder
```
cd server
```
```
npm i
```

- Add a .env file and add your OPENAI_API_KEY as a variable

```
npm run server
```

In another terminal:

```
cd client
```

```
npm i
```

```
npm run dev
```

Happy experimenting! 🤖🫶
