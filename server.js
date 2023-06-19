const express = require('express');
const app = express();
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
// Enable CORS
app.use(cors());
app.use(express.static('public'));

// Database configuration
const config = {
  user: 'sa',
  password: 'To0lagen@5',
  server: 'TG-LAP-33',
  database: 'SampleDB',
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true // Add this line
  }
};

// Define the route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!'); // Replace this with your desired content for the root URL
});

// Define the route for fetching users
app.get('/api/users', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Execute the query
    const result = await sql.query('SELECT * FROM Users');

    // Send the response
    res.json(result.recordset);
  } catch (error) {
    console.error(error);

    if (error instanceof sql.ConnectionError) {
      res.status(500).send('Error connecting to the database');
    } else if (error instanceof sql.RequestError) {
      res.status(500).send('Error executing the query');
    } else {
      res.status(500).send('An unknown error occurred');
    }
  } finally {
    // Close the database connection
    sql.close();
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
