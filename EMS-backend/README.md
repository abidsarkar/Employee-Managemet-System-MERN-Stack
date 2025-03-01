# Running the EMS Backend

Follow these instructions to set up and run the EMS backend on your local machine.

## Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (version 6.x or higher)
- [MongoDB](https://www.mongodb.com/) (version 4.x or higher)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/abidsarkar/Employee-Managemet-System-MERN-Stack.git
    cd EMS-backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/ems
    
    ```

## Running the Application

1. Start the MongoDB server:
    ```bash
    connect in mongoDBcompass
    ```

2. Start the backend server:
    ```bash
    npm run dev
    ```

3. The server should now be running at `http://localhost:5000`.

## Uploading Data

To upload the data, use the following command:
```bash
node upload.js
```



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.