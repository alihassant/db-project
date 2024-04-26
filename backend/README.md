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
