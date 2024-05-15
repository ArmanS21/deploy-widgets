// /* This API Gateway was developed with the code from this website: 
// https://www.freecodecamp.org/news/build-a-custom-api-gateway-with-node-js/
// For future developers if this does not make sense, refer to the article above */

// const helmet = require("helmet");
// const morgan = require("morgan");
// const cors = require("cors");
// const { createProxyMiddleware } = require("http-proxy-middleware");
// // Import Express
const express = require("express");
const path = require("path");
const app = express();

// const corsOptions = {
//     origin: ['http://localhost:3001', 'http://localhost:5173', 'http://localhost:3002'],
//     credentials: true,
// }

// app.use(cors(corsOptions));
// app.use(helmet()); //Adds security headers
// app.use(morgan("combined")); // Log HTTP Requests
// app.disable("x-powered-by"); //Hides the details of the express server

// const services = [
//     {
//         route: "/auth",
//         target: "http://localhost:3001"
//     },
//     {
//         route: "/dashboard",
//         target: "http://localhost:3002"
//     },
//     // {
//     //     route: "/ticket",
//     //     target: "http://localhost:3003"
//     // },
//     // {
//     //     route: "/module",
//     //     target: "http://localhost:3004"
//     // },
    
// ]


// // Rate Limit Constants
// const rateLimit = 20; //Max requests per minute
// const interval = 60 * 1000; // Time window in milliseconds

// //Object to store request counts for each IP address
// const requestCounts = {};

// // Reset request count for each IP address every single "interval" milliseconds
// setInterval(() => {
//     Object.keys(requestCounts).forEach((ip) => {
//         requestCounts[ip] = 0;
//     })
// }, interval);

// //Middleware function for rate limiting and timeout handling
// function rateLimitAndTimeout(req, res, next) {
//     const ip = req.ip; //Get the client IP address
//     // Update request count for the current IP
//     requestCounts[ip] = (requestCounts[ip] || 0) + 1;

//     // Check if request count doesn't exceed the rate limit
//     if(requestCounts[ip] > rateLimit) {
//         // Respond with a 429 Too Many Request status code
//         return res.status(429).json({
//             code: 429,
//             status: "Error",
//             message: "Rate limit exceeded.",
//             data: null,
//         });
//     }

//     // Set timeout for each request (example: 10 seconds)
//     req.setTimeout(15000, () => {
//         //Handle timeout error
//         res.status(504).json({
//             code: 504,
//             status: "Error",
//             message: "Gateway timeout.",
//             data: null,
//         });
//         req.abort(); //Abort the request
//     });

//     next(); //Continue to the middleware.
// }

// app.use(rateLimitAndTimeout);

// services.forEach(({route, target}) => {
//     // Proxy options
//     const proxyOptions = {
//         target, 
//         changeOrigin: true,
//         pathRewrite: {
//             [`^${route}`]: "",
//         },
//     };
//     // Apply rate limiting and timeout middleware before proxying
//     app.use(route, rateLimitAndTimeout, createProxyMiddleware(proxyOptions));
// });

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "./dummy-widgets-app/dist")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
    const filePath = path.resolve(__dirname, "./dummy-widgets-app", "dist", "index.html");
    try {
        res.sendFile(filePath);
        console.log('Sent:', filePath); // Log the file path after sending the file
    } catch (err) {
        console.error('Error sending file:', err);
        // Handle the error appropriately, e.g., send a 500 response
        res.status(500).send('Internal Server Error');
    }
});


// // Handler for route-not-found
// app.use((_req, res) => {
//     res.status(404).json({
//       code: 404,
//       status: "Error",
//       message: "Route not here2.",
//       data: null,
//     });
//    });

const port = process.env.PORT || 8080;

// app.get("/", (req, res) => {
//     res.json("Hi there");
// })

app.listen(port, () => {
    console.log("Server started on port 8080");
});
