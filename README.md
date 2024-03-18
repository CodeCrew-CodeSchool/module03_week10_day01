# Hosting and Deployment

## Assignment: Worldview (Client + API)

#### Overview
You will deploy a web application called WorldView to the public internet. This web application is split into two seperate pieces; A client/User Interface and a Rest API. Youll be deploying both of them independently of each other.

<div style="display: flex; flex-direction: column; justify-content: center;  align-items: center;
">  <div>
    <h1 style="margin-right: 1%; margin-top: 1%; text-align: center; margin-bottom: 0px;" >Part 1: Client</h1>
    

   <img src="./Example/Part1.gif" style="margin-right: 1%; margin-top: 1%;" /> 
   <h1 style="margin-right: 1%; margin-top: 5%; text-align:center" >Part 2: Api</h1>
   <img src="./Example/Part2.png"  style="margin-left: 1%; margin-top: 1%;" />
  </div>
</div>


### Instructions



### **Part 1: Deploy Worldview Client**
1. Deploy the Worldview client to [render](https://render.com/)
   
   <br>
   
2. <details>
    <summary>Place the url to the deployed client in the description section of the github repo for this assignment</summary>
    <br>
      <img src="./Example/Part1.png" width=400/>
    </details>

   <br>

3. <details>
        <summary>Ensure the Client is configured to re-deploy automatically when a new commit is made to the repo for this assignment</summary>
        <br>
          <img src="./Example/Part1-2.png"/>
      </details>



### **Part 2: Deploy WorldView API**

1. Configure the WorldView API to use a personal api-key to the [unsplash API](https://unsplash.com/documentation#get-a-random-photo)

      <br>

     - Sign up for a developer account on [unsplash.com](https://unsplash.com/developers)
      
      <br>

     - <details>
        <summary>Generate an api-key for this application and assign it as a string to the variable declared on line 6 in server.js</summary>
        <br>
          <img src="./Example/Part2-1.png" width=400/>
      </details>
      
      <br>


2. Deploy the WorldView API to [render](https://render.com/)

<br>


3. <details>
        <summary>Ensure the API is configured to re-deploy automatically when a new commit is made to the repo for this assignment</summary>
        <br>
          <img src="./Example/Part1-2.png"/>
      </details>

<br>

### **Part 3: WorldView API (Filter the nulls)**

1.  <details>
        <summary>Some of the image objects returned from the unsplashed api do not contain latitude/longitude values. Configure the route in server.js to only return image objects with both a latitude and longitude value </summary>
        <br>
          <img src="./Example/Part3.png"/>
      </details>
      <br>
      
      - **if** an image is missing either latitude value **or** a longitude value, ensure it is not included in the response data

<br>

### **Part 4: User Stories**
