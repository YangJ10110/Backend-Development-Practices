# Node.js Mini Project Documentation

This documentation provides an overview and explanation of a Node.js mini project that serves as an API to request data. The project utilizes Node.js modules for handling HTTP requests, parsing URL information, and reading/writing files. The data used in this project is stored in a JSON file located at `./api-creation/data.json`.

## Getting Started

To run this project, ensure that you have Node.js installed on your machine. Follow the steps below to set up and run the project:

1. Clone the project repository to your local machine.
2. Open a terminal or command prompt and navigate to the project directory.
3. Install project dependencies by running the following command:
   ```
   npm install
   ```
4. Start the server by running the following command:
   ```
   node very-simple.js
   ```
5. The server will start listening for requests on `http://localhost:3000`.

## Project Structure

The project consists of the following files and directories:

- `index.js`: The main entry point of the application, which creates the server and handles HTTP requests.
- `data.json`: A JSON file containing the data that the client can request.
- `templates/`: A directory containing HTML templates used for rendering the server responses.

## API Endpoints

The project provides the following API endpoints:

### Overview Endpoint

- URL: `/overview` or `/`
- Method: GET
- Description: Returns an HTML page containing an overview of the available products.
- Response: HTML

### Product Endpoint

- URL: `/product?id=<product_id>`
- Method: GET
- Description: Returns an HTML page containing details about a specific product.
- Query Parameter:
  - `id`: The ID of the product to retrieve.
- Response: HTML

### API Endpoint

- URL: `/api`
- Method: GET
- Description: Returns the raw JSON data containing all the available products.
- Response: JSON

## Implementation Details

The project utilizes the following modules from Node.js:

- `http`: Allows the creation of a server and handling of HTTP requests.
- `url`: Helps in parsing URL information.
- `fs`: Enables reading and writing to files.

The server is created using the `http.createServer()` method, which listens for incoming requests. The server routes the requests based on the URL pathname to the appropriate endpoint handler.

The `data.json` file is read and parsed into a JavaScript object to access the product data. HTML templates stored in the `templates/` directory are loaded and used for rendering the server responses. The `replaceTemplate()` function replaces placeholders in the templates with product-specific information.

For the overview endpoint, the server iterates over the product data, generates HTML cards using the `replaceTemplate()` function, and merges them into the overview template.

For the product endpoint, the server extracts the `id` parameter from the query string and retrieves the corresponding product from the data. The product details are then used to replace placeholders in the product template.

The API endpoint simply returns the raw JSON data as the server response.

If a request is made to an unrecognized endpoint, a 404 response is sent.

## Conclusion

This Node.js mini project demonstrates the implementation of a basic API for requesting data. By following the instructions provided in the "Getting Started" section, you can run the project and test the API endpoints. Feel free to explore the code and modify it according to your requirements.
