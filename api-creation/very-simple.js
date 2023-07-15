// API is a service to request a data

// The data we are using here is ./final/dev-data
// it contains data that the client will request

// Importing required modules
const http = require('http'); // Allows us to create a server and handle HTTP requests
const url = require('url'); // Helps in parsing URL information
const fs = require('fs'); // Enables reading and writing to files

// Files

// Server creation

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output = output.replace(/{%IMAGE%}/g,product.image);
    output = output.replace(/{%PRICE%}/g,product.price);
    output = output.replace(/{%FROM%}/g,product.from);
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
    output = output.replace(/{%QUANTITY%}/g,product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g,product.description);
    output = output.replace(/{%ID%}/g,product.id);
    
    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')   
    return output;
}
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {

    // Extracting the pathname from the request URL
    
    const{ query, pathname } =url.parse(req.url,true);

    // Checking if the pathname is '/overview' or '/'
    if (pathname === '/overview' || pathname === '/') {
        // Sending a response with the overview page using the overview html page
        res.writeHead(200, {'Content-type': 'text/html'});

        //looping thru the json data and placing it on the html that has templates

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join(''); //this uses a loop to iterate what is inside the template-card html and turns it into a single string 

        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);  // this replaces the {%PRODUCT_CARDS%} inside the template-overview html with the cards from template-cards html basically merging two html file together 


       // res.end(tempOverview); // this only present what is inside the template-overview html
        res.end(output); //this now presents what is inside the template-overview if the cards is on it done by the replace in the const output
    }
    // Checking if the pathname is '/product'
    else if (pathname === '/product'){
        // Sending a response with a product message and a link back to the 'overview' page

        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id]; //what this basically does is extract what the http link request is and its parts
                                                // example: http://127.0.0.1:3000/product?id=0
                                                /* example of that request:
                                                Url {
                                                    protocol: null,
                                                    slashes: null,
                                                    auth: null,
                                                    host: null,
                                                    port: null,
                                                    hostname: null,
                                                    hash: null,
                                                    search: '?id=0',
                                                    query: [Object: null prototype] { id: '0' },
                                                    pathname: '/product',
                                                    path: '/product?id=0',
                                                    href: '/product?id=0' */


                                                // as we can see here in the query there is an "id" that is listed to 0
                                                // that is due to the html file from template-card <a class="card__link" href="/product?id={%ID%}">
                                                

                                                // basically what [query.id] do is extract the id number from the dataObj as the json file contains an object array
                                                        //example: id = 0 from http://127.0.0.1:3000/product?id=0 that will: query: [Object: null prototype] { id: '0' },
                                                        /* {
                                                            "id": 0,
                                                            "productName": "Fresh Avocados",
                                                            "image": "🥑",
                                                            "from": "Spain",
                                                            "nutrients": "Vitamin B, Vitamin K",
                                                            "quantity": "4 🥑",
                                                            "price": "6.50",
                                                            "organic": true,
                                                            "description": "A ripe avocado yields to gentle pressure when held in the palm of the hand and squeezed. The fruit is not sweet, but distinctly and subtly flavored, with smooth texture. The avocado is popular in vegetarian cuisine as a substitute for meats in sandwiches and salads because of its high fat content. Generally, avocado is served raw, though some cultivars, including the common 'Hass', can be cooked for a short time without becoming bitter. It is used as the base for the Mexican dip known as guacamole, as well as a spread on corn tortillas or toast, served with spices."
                                                        }, */

        const output = replaceTemplate(tempProduct,product);

        
        res.end(output);
    }

            // THIS IS THE START OF THE API CREATION
            

    else if (pathname === '/api'){

        // THIS WAS TRANSFORMED INTO A COMMENT DUE TO INEFFICIENCY, SEE LINE 15
        /* fs.readFile(`${__dirname}/data.json`, 'utf-8', (err,data)=>{
            const productData = JSON.parse(data);
            res.writeHead(200, { // this basically tells the browser that we are sending back a json file
                'Content-type': 'application/json'
            })
            // A MORE EFFICIENT WAY OF DOING IS THIS IS BY DECLARING IT AT THE BEGINNING OF THE CODE AS A BLOCKING ONE (SYNCH) IN LINE 15 
            //    WHY DO WE NEED THIS IF WE CAN JUST DIRECTLY res.end(data)??
            
            /* without res.writeHead line, the browser might assume that the response is 
            in plain text or another format, leading to potential issues when
             trying to parse the data on the client-side.   */
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(data)   // THIS REFERENCE THE DATA FROM LINE 15
    }
    else {
        // If the pathname does not match any of the above conditions, send a 404 response
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world',
        });
        res.end('<h1>PAGE NOT FOUND</h1>');
    }
});

// Starting the server and listening for requests on port 8000
server.listen(3000, '127.0.0.1', () => {
    console.log("Listening to requests on port 3000");
});

