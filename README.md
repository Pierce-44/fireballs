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

## How to Install and Run the Project Locally:
#### - Please follow the following steps if you would like to install and run the porject locally on http://localhost:3000/:

1. Clone the repository to your local folder of choice
   ```sh
   git clone git@github.com:Pierce-44/netflix-clone.git
   ```
   
<br/>

2. Go to Firebase and follow the instructions for creating a project
   ```sh
   https://firebase.google.com/
   ```
   
<br/>   

3. Within your Firebase cloud storage create three folders named "posts", "profilePhotos" and "stories" (seen below):

   ![firebaseCloud](https://user-images.githubusercontent.com/96740762/191279127-bace5d47-a316-4636-88bc-9bc25b114bd6.png)
   
<br/>

4. Within your Firestore Database create two collections one named "userList" and the other "users" (seen below):

   ![firebaseDB](https://user-images.githubusercontent.com/96740762/191280085-712860a4-b81b-4a63-b684-8b32beada745.png)

<br/>

5. Within your Firebase project allow email and password sign-in method.

<br/>

6. Within `util/firbaseConfig.ts` replace the empty Firebase configuration with your Firebase configuration, which was assigned to your project when you created it and    can be found under your project settings on Firebase. It should resemble the following example:
    ```js
    // Your web app's Firebase configuration should resemble the following EXAMPLE:
    
    const firebaseConfig = {
      apiKey: "AIzaSyA97-R5P4bEwjV0efHt3hLs3bc32ns4shs",
      authDomain: "instagram-clone-ph.firebaseapp.com",
      projectId: "instagram-clone-ph",
      storageBucket: "instagram-clone-ph.appspot.com",
      messagingSenderId: "554003582327",
      appId: "1:554003582327:web:97667da84152c9ff7aa572"
    };
    ```
    
    <br/>

7. Install NPM packages
   ```sh
   npm install
   ```
   
    <br/>

8. Start the app on your localhost
   ```js
   npm run dev
   ```



