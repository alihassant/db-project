# Database Project

There will be multiple modules and roles in this project. This is list of the modules and roles are as follows:

> Super Admin

> Admin

> Team Leader/Database Owner

> User/Worker

---

## IDEAS:

After registration, when a user logs in, the role of the user should be immediately checked. If the user has any other role than a simple user, they should be asked which role they want to view the site as(something like a modal). What ever role the person chooses, they should be redirected to that view. The views are as follows:

- ### Simple User:
  First and foremost user’s data should be checked. If there is any field in the database missing, users should get a message saying “Complete your profile for better experience”. Simple Users should only be able to see the databases of which they are part of. It can be multiple databases but all databases should be different and should not collide with each other. Users should be able to enter data to the databases they are part of. When the data is entered, users should be able to see the table where the data will be shown. The table should consist of the title, date created/updated, user who created that entry and it should be clickable. When the users click the entry a new page should be generated with all of the information about that entry.
  The following pages must be added for users:
  - Profile Page
  - Setting
  - Home
  - Databases
- ### Team Leader/Database Owner:
  // info here
- ### Website Admin/Moderator:
  // info here
- ### Super Admin:
  // info here

---

## APIs:

All endpoints start with:

`/api/controllerName/endPointName`

Following are the working APIs:

- ### controller/auth.js:

  To access this, use
  `/api/auth/*endPointName`

  Following are the endpoints available in this controller:

  - #### signup()

    `POST '/api/auth/signup'`

    This API accepts name, email, username, password and priceId of the product/subscription. If any of the field is missing it will return an error with a status code of `422`.

    If all the data is correct and email, username is unique, password will be encrypted using `bcrypt` package and a new account will be registered. All the data including hashed password will be stored on a MongoDB cluster and the reponse will be the JSON Web Token(JWT) which should be stored in the cookies and it will be used to authenticate the user for future functionalities.

  - #### login()

    `POST '/api/auth/login'`

    This endpoint accepts email and password to verify a user. If a user is registered, this endpoint will return a JSON Web Token(JWT) which should be stored in the cookies and it will be used to authenticate the user for future functionalities. If the email or password is wrong, an error will be returned with the error respected message.

  - #### getResetPasswordLink()

    `POST '/api/auth/getResetPasswordLink'`

    This endpoint accepts email. If the user with the given email doesn't exist it will return and error with a status code `404`. If the email exists, a random code will be generated and will be stored in the user's info. A link will be sent to the user's registered email and on clicking the link, the user will be able to change the password. That link will expire in 15 minutes and should be used in that time, if the link is expired, it will return an error with the message

    ```json
    {
      "message": "Token invalid, Please reset the password again."
    }
    ```

  - #### resetPassword()

    `POST '/api/auth/resetPassword'`

    This endpoint accepts password and the token available in the link param. If the token is wrong or expired, it will return an error,

    ```json
    {
      "message": "Token invalid, Please reset the password again."
    }
    ```

    If the token is correct and is verified, it will hash the password and change the password. The token will be deleted and will not be accessed again.

  - #### getUser()

    `GET '/api/auth/getUser'`

    This endpoint accepts userId in params of the request and will return the users info. The userId should be extracted from JSON Web Token(JWT).

- ### controller/user.js

  To access this, use
  `/api/user/*endPointName`

  Following are the endpoints available in this controller:

  - #### editUser()

    `PUT '/api/user/editUser'`
    
    This endpoint is responsible for editing user information such as name, email, and password.

    Syntax:

    ```javascript
        fetch("/api/user/editUser", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId, name, email, oldPassword, newPassword }),
          }
        )
    ```

    **Request Body:**
    
    - `userId`: ID of the user to be updated.
    - `name`: New name for the user.
    - `email`: New email for the user.
    - `oldPassword`: Old password for authentication.
    - `newPassword`: New password for the user.

    **Response:**
    
    - Status Code: `200 OK`
    - Body: 
        ```json
        {
            "message": "User Updated Successfully!!!",
            "result": { updatedUserObject }
        }
        ```

    **Error Responses:**
    
    - Status Code: `500 Internal Server Error`
    - Status Code: `404 Not Found`
    - Status Code: `403 Forbidden`
    - Status Code: `401 Unauthorized`
    - Status Code: `422 Unprocessable Entity`

    **Notes:**
    
    - Requires authentication token to be sent in the headers as `Authorization`.
    - Validates the presence of required fields in the request body, returning a `422` status code if missing.
    - Checks if the user exists, returns a `404` status code if not found.
    - Verifies old password for authentication, returns a `401` status code if incorrect.
    - If successful, updates the user's information and returns a `200` status code.
    - In case of any server error, it returns a `500` status code.

  - #### userPosts()

    `GET '/api/user/userPosts'`
    
    This endpoint retrieves posts created by a specific user.

    Syntax:

    ```javascript
        fetch("/api/user/userPosts", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
    ```

    **Request Body:**
    
    - `userId`: ID of the user whose posts are to be retrieved.

    **Response:**
    
    - Status Code: `200 OK`
    - Body: 
        ```json
        {
            "message": "User's Posts Found Successfully!!!",
            "posts": [ post1, post2, ... ]
        }
        ```

    **Error Responses:**
    
    - Status Code: `500 Internal Server Error`
    - Status Code: `404 Not Found`

    **Notes:**
    
    - Requires authentication token to be sent in the headers as `Authorization`.
    - If no posts are found for the user, it returns a `404` status code.
    - In case of any server error, it returns a `500` status code.

  - #### getDatabases()

    `GET '/api/user/getDatabases/:userId'`
    
    This endpoint retrieves databases associated with a specific user.

    Syntax:

    ```javascript
        fetch(`/api/user/getDatabases/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
    ```

    **Request Parameters:**
    
    - `userId`: ID of the user whose databases are to be retrieved.

    **Response:**
    
    - Status Code: `200 OK`
    - Body: 
        ```json
        {
            "message": "Databases Fetched Successfully!!!",
            "dbs": [ db1, db2, ... ]
        }
        ```

    **Error Responses:**
    
    - Status Code: `500 Internal Server Error`
    - Status Code: `404 Not Found`

    **Notes:**
    
    - Requires authentication token to be sent in the headers as `Authorization`.
    - If no databases are found for the user, it returns a `404` status code.
    - In case of any server error, it returns a `500` status code.

  - #### getDatabase()

    `GET '/api/user/getDatabase/:dbId'`
    
    This endpoint retrieves a database based on the provided database ID.

    Syntax:

    ```javascript
        fetch(`/api/user/getDatabase/${dbId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
    ```

    **Request Parameters:**
    
    - `dbId`: ID of the database to be retrieved.

    **Response:**
    
    - Status Code: `200 OK`
    - Body: 
        ```json
        {
            "message": "Database Fetched Successfully!!!",
            "db": { databaseObject }
        }
        ```

    **Error Responses:**
    
    - Status Code: `500 Internal Server Error`
    - Status Code: `404 Not Found`

    **Notes:**
    
    - Requires authentication token to be sent in the headers as `Authorization`.
    - Retrieves the database identified by `dbId`.
    - If no database is found, it returns a `404` status code.
    - In case of any server error, it returns a `500` status code.

  - #### editUserDetails()

    `POST '/api/user/editUserDetails'`
    
    This endpoint is responsible for updating user details such as name, email, and username.

    Syntax:

    ```javascript
        fetch("/api/user/editUserDetails", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId, name, email, username }),
          }
        )
    ```

    **Request Body:**
    
    - `userId`: ID of the user to be updated.
    - `name`: New name for the user.
    - `email`: New email for the user.
    - `username`: New username for the user.

    **Response:**
    
    - Status Code: `200 OK`
    - Body: 
        ```json
        {
            "message": "User Updated Successfully!!!",
        }
        ```

    **Error Responses:**
    
    - Status Code: `500 Internal Server Error`
    - Status Code: `404 Not Found`
    - Status Code: `403 Forbidden`
    - Status Code: `422 Unprocessable Entity`

    **Notes:**
    
    - Requires authentication token to be sent in the headers as `Authorization`.
    - Validates the presence of required fields in the request body, returning a `422` status code if missing.
    - Checks if the user exists, returns a `404` status code if not found.
    - If successful, updates the user's details and returns a `200` status code.
    - In case of any server error, it returns a `500` status code.

  - #### editUserPassword()

    `POST '/api/user/editUserPassword'`
    
    This endpoint is responsible for updating a user's password.

    Syntax:

    ```javascript
        fetch("/api/user/editUserPassword", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId, oldPassword, newPassword }),
          }
        )
    ```

    **Request Body:**
    
    - `userId`: ID of the user to be updated.
    - `oldPassword`: Old password for verification.
    - `newPassword`: New password for the user.

    **Response:**
    
    - Status Code: `200 OK`
    - Body: 
        ```json
        {
            "message": "User Password Updated Successfully!!!",
        }
        ```

    **Error Responses:**
    
    - Status Code: `500 Internal Server Error`
    - Status Code: `404 Not Found`
    - Status Code: `401 Unauthorized`

    **Notes:**
    
    - Requires authentication token to be sent in the headers as `Authorization`.
    - Validates the presence of required fields in the request body, returning a `422` status code if missing.
    - Checks if the user exists, returns a `404` status code if not found.
    - Verifies old password for authentication, returns a `401` status code if incorrect.
    - If successful, updates the user's password and returns a `200` status code.
    - In case of any server error, it returns a `500` status code.

  - #### editAbout()

    `POST '/api/user/editAbout'`
    
    This endpoint is responsible for updating a user's "about" information.

    Syntax:

    ```javascript
        fetch("/api/user/editAbout", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId, about }),
          }
        )
    ```

    **Request Body:**
    
    - `userId`: ID of the user to be updated.
    - `about`: New "about" information for the user.

    **Response:**
    
    - Status Code: `200 OK`
    - Body: 
        ```json
        {
            "message": "About Updated Successfully!!!",
        }
        ```

    **Error Responses:**
    
    - Status Code: `500 Internal Server Error`
    - Status Code: `404 Not Found`

    **Notes:**
    
    - Requires authentication token to be sent in the headers as `Authorization`.
    - Validates the presence of required fields in the request body, returning a `422` status code if missing.
    - Checks if the user exists, returns a `404` status code if not found.
    - If successful, updates the user's "about" information and returns a `200` status code.
    - In case of any server error, it returns a `500` status code.

  - #### changeProfilePic()

    `POST '/api/user/changeProfilePic'`
    
    This endpoint is responsible for updating a user's profile picture.

    Syntax:

    ```javascript
        fetch("/api/user/changeProfilePic", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId, profilePic }),
          }
        )
    ```

    **Request Body:**
    
    - `userId`: ID of the user to be updated.
    - `profilePic`: New profile picture for the user.

    **Response:**
    
    - Status Code: `200 OK`
    - Body: 
        ```json
        {
            "message": "Profile Picture Updated Successfully!!!",
        }
        ```

    **Error Responses:**
    
    - Status Code: `500 Internal Server Error`
    - Status Code: `404 Not Found`

    **Notes:**
    
    - This endpoint only stores the URL.
    - Requires authentication token to be sent in the headers as `Authorization`.
    - Validates the presence of required fields in the request body, returning a `422` status code if missing.
    - Checks if the user exists, returns a `404` status code if not found.
    - If successful, updates the user's profile picture and returns a `200` status code.
    - In case of any server error, it returns a `500` status code.

  - #### getNotifications()

    `GET '/api/user/getNotifications/:userId'`
    
    This endpoint retrieves notifications for a specific user.

    Syntax:

    ```javascript
        fetch(`/api/user/getNotifications/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
    ```

    **Request Parameters:**
    
    - `userId`: ID of the user whose notifications are to be retrieved.

    **Response:**
    
    - Status Code: `200 OK`
    - Body: 
        ```json
        {
            "message": "Notifications Fetched Successfully!!!",
            "notifications": [ notification1, notification2, ... ]
        }
        ```

    **Error Responses:**
    
    - Status Code: `500 Internal Server Error`
    - Status Code: `404 Not Found`

    **Notes:**
    
    - Requires authentication token to be sent in the headers as `Authorization`.
    - If no notifications are found for the user, it returns a `404` status code.
    - In case of any server error, it returns a `500` status code.

  - #### postToDo()

    `POST '/api/user/postToDo'`
    
    This endpoint is responsible for creating a new to-do item for a user.

    Syntax:

    ```javascript
        fetch("/api/user/postToDo", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ todo, description, status, priority, dueDate, userId }),
          }
        )
    ```

    **Request Body:**
    
    - `todo`: Title of the to-do item.
    - `description`: Description of the to-do item.
    - `status`: Status of the to-do item.
    - `priority`: Priority of the to-do item.
    - `dueDate`: Due date of the to-do item.
    - `userId`: ID of the user to whom the to-do item belongs.

    **Response:**
    
    - Status Code: `201 Created`
    - Body: 
        ```json
        {
            "message": "To Do Created Successfully!!!",
            "result": { newToDoObject }
        }
        ```

    **Error Responses:**
    
    - Status Code: `500 Internal Server Error`
    - Status Code: `422 Unprocessable Entity`

    **Notes:**
    
    - Requires authentication token to be sent in the headers as `Authorization`.
    - Validates the presence of required fields in the request body, returning a `422` status code if missing.
    - If successful, creates a new to-do item and returns a `201` status code.
    - In case of any server error, it returns a `500` status code.

  - #### changeToDoStatus()

    `PUT '/api/user/changeToDoStatus'`
    
    This endpoint is responsible for updating the status of a to-do item.

    Syntax:

    ```javascript
        fetch("/api/user/changeToDoStatus", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ toDoId, status }),
          }
        )
    ```

    **Request Body:**
    
    - `toDoId`: ID of the to-do item to be updated.
    - `status`: New status for the to-do item.

    **Response:**
    
    - Status Code: `200 OK`
    - Body: 
        ```json
        {
            "message": "To Do Status Updated Successfully!!!",
            "result": { updatedToDoObject }
        }
        ```

    **Error Responses:**
    
    - Status Code: `500 Internal Server Error`
    - Status Code: `404 Not Found`

    **Notes:**
    
    - Requires authentication token to be sent in the headers as `Authorization`.
    - If no to-do item is found, it returns a `404` status code.
    - If successful, updates the status of the to-do item and returns a `200` status code.
    - In case of any server error, it returns a `500` status code.

  - #### getTodos()

    `GET '/api/user/getTodos/:userId'`
    
    This endpoint retrieves all to-do items associated with a specific user.

    Syntax:

    ```javascript
        fetch(`/api/user/getTodos/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
    ```

    **Request Parameters:**
    
    - `userId`: ID of the user whose to-do items are to be retrieved.

    **Response:**
    
    - Status Code: `200 OK`
    - Body: 
        ```json
        {
            "message": "To Dos Fetched Successfully!!!",
            "todos": [ todo1, todo2, ... ]
        }
        ```

    **Error Responses:**
    
    - Status Code: `500 Internal Server Error`
    - Status Code: `404 Not Found`

    **Notes:**
    
    - Requires authentication token to be sent in the headers as `Authorization`.
    - If no to-do items are found for the user, it returns a `404` status code.
    - In case of any server error, it returns a `500` status code.

  - #### deleteTodo()

    `POST '/api/user/deleteTodo'`
    
    This endpoint is responsible for deleting a to-do item.

    Syntax:

    ```javascript
        fetch("/api/user/deleteTodo", {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ todoId, userId }),
          }
        )
    ```

    **Request Body:**
    
    - `todoId`: ID of the to-do item to be deleted.
    - `userId`: ID of the user associated with the to-do item.

    **Response:**
    
    - Status Code: `200 OK`
    - Body: 
        ```json
        {
            "message": "To Do Deleted Successfully!!!",
        }
        ```

    **Error Responses:**
    
    - Status Code: `500 Internal Server Error`
    - Status Code: `404 Not Found`

    **Notes:**
    
    - Requires authentication token to be sent in the headers as `Authorization`.
    - If no to-do item is found, it returns a `404` status code.
    - If successful, deletes the to-do item and returns a `200` status code.
    - In case of any server error, it returns a `500` status code.

  - #### markNotificationsRead()

    `PATCH '/api/user/markNotificationsRead'`
    
    This endpoint is responsible for marking all notifications of a user as read.

    Syntax:

    ```javascript
        fetch("/api/user/markNotificationsRead", {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
    ```

    **Response:**
    
    - Status Code: `200 OK`
    - Body: 
        ```json
        {
            "message": "Notifications Marked Read Successfully!!!",
        }
        ```

    **Error Responses:**
    
    - Status Code: `500 Internal Server Error`
    - Status Code: `404 Not Found`

    **Notes:**
    
    - Requires authentication token to be sent in the headers as `Authorization`.
    - If no notifications are found for the user, it returns a `404` status code.
    - If successful, marks all notifications as read and returns a `200` status code.
    - In case of any server error, it returns a `500` status code.


- ### controller/adminController.js:

  - #### setRole()

    This API allows an admin to update the role of the user.

  - #### findUser()
    This API allows an admin to find user by their email.

- ### controller/post-data.js:

  - #### postData()

    This API allows the users to upload a post/entry.

  - #### getData()

    This API find a post by it's ID.

  - #### updateData()

    This API allows the users to update the data.

  - #### deletePost()

    This API allows the users to delete a post/entry.

  - #### allPosts()
    This API returns all the posts made in the database.

- ### controller/superAdmin.js:

  - #### deleteUser()
    This API allows the Super Admins to delete a user.

- ### controller/user.js:

  - #### editUser()

    This API allows the users to update their profile data.

  - #### userPosts()

    This API returns all the posts created by the logged in user.

- ### controller/databaseControllers/dbAdmin.js:

  - #### createDatabase()

    This API allows the users to a new database.

  - #### addNewMember()

    This API allows the admins to add new members to the database.

  - #### removeUsers()

    This API allows the admins to remove members from the database.

  - ### controller/databaseControllers/dbUser.js:

  - #### getUsers()

    This API allows the users to a get members of the current database.

  - #### getPosts()

    This API returns all the posts in the database.
