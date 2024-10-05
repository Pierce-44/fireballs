<div align="center">
  <img src="https://github.com/user-attachments/assets/9b285f78-0b6e-4e1c-8695-6584574cf833" height="100px"/>
</div>

# NASA Fireballs 3D Visual

### Overview
This application is a fireball simulation built with TypeScript, React, and Next.js. It utilizes Tailwind CSS for styling and TanStack Query for efficient asynchronous state management. The backend is powered by Node.js and leverages Redis for caching responses, providing a smooth user experience. The visualizations of the Earth and the impacting fireballs are created using React Three Fiber.
<br/>

### Features
- Data Source: Utilizes the NASA API to fetch fireball data.
- 3D Visualization: Implements React Three Fiber for immersive visualization of Earth and fireball impacts.
- Responsive Design: Tailored using Tailwind CSS for a seamless experience across devices.
- State Management: Employs TanStack Query for robust handling of asynchronous data fetching and caching.
- Caching Layer: Uses Redis on the backend to cache responses for improved performance and reduced API calls.

<br/>

# Live App: [https://fireballs3d.vercel.app](https://fireballs3d.vercel.app/)

# Demo

https://github.com/user-attachments/assets/8dc95907-f557-4e3f-8118-4e9f3322ddca


# Prerequisites
### - Before running the application, ensure you have the following installed on your computer:

### Node.js
1. Check if Node.js is installed:
   ```sh
   node -v
   ```
   If Node.js is installed, this command will return the version number. If not, proceed to install it.

2. Install Node.js:
   - Visit the Node.js official website and download the latest LTS version for your operating system.
   - Follow the installation [instructions](https://nodejs.org/en) for your platform.

### Redis
1. Check if Node.js is installed:
    ```sh
     redis-server --version
    ```
    If Redis is installed, this command will return the version number. If not, proceed to install it.

2. Install Redis:
   - For Windows: You can install Redis using wsl2 please see the following [instructions](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-windows)
   - For macOS: Use Homebrew:
     
     ```sh
     brew install redis
    - For Linux: Use the package manager for your distribution. For example, on Ubuntu:
      
      ```sh
      sudo apt update
      sudo apt install redis-server
      ```
3. Start Redis Server:
   - IMPORTANT, this needs to be running for the frontend and backend applications to work
     
     ```sh
     redis-server
     ```


# Installation
1. Clone the repository:
   
   ```sh
   git clone git@github.com:Pierce-44/fireballs.git
   ```
2. Install Frontend Dependencies:
   - Navigate to the /frontend directory:
     
     ```sh
     cd frontend
     ```
   - Install dependencies:
     
     ```sh
     npm install
     ```
   - Start the frontend development server:
     
     ```sh
     npm run dev
     ```
   - Access the frontend at http://localhost:3000 *please note no data will be visible until the backend is running*
  
  3. Install Backend Dependencies:
     - Navigate to the /backend directory:
       
       ```sh
       cd backend
       ```
     - Install dependencies:
    
       ```sh
       npm install
       ```
     - Ensure Redis is running, then start the backend server:

       ```sh
       npm start
       ```

  4. Redis Setup (if not running already)
     - Ensure the Redis server is up and running:
    
       ```sh
       redis-server
       ```
       
### You should now be able to see your application running locally at [http://localhost:3000](http://localhost:3000)
