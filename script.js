// Log a message to the console with personal information  
console.log("I'm Susan.my IP is 172.30.192.54 Mac address is E0-0A-F6-83-98-FD. Ncc student ID is:223190739")

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./book.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
    db.run('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title739 TEXT, author739 TEXT, ISBN739 TEXT, context739 TEXT)', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Table created successfully');

        insertBook();
    });
});

// Function to list all books in the 'books' table 
function listBooks() {
    db.all('SELECT * FROM books', [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        // Log the rows in a table format to the console 
        console.table(rows);
    });

    console.log('Exiting the program...');
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

// Main logic to insert a new book into the 'books' table 
function insertBook() {
    const readline = require('readline');
    // Create a readline interface for user input
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter book title (title739): ', (title) => {
        rl.question('Enter book author (author739): ', (author) => {
            rl.question('Enter book ISBN (ISBN739): ', (ISBN) => {
                rl.question('Enter book context (context739): ', (context) => {
                    db.run('INSERT INTO books (title739, author739, ISBN739, context739) VALUES (?, ?, ?, ?)', [title, author, ISBN, context], (err) => {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log(`Book added successfully`);
                        askForAnotherBook();
                    });
                    rl.close();
                });
            });
        });
    });
}

function askForAnotherBook() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Do you want to enter details for another book? (yes/no): ', (answer) => {
        rl.close();
        if (answer.toLowerCase() === 'yes') {
            insertBook();
        } else {
            listBooks();
        }
    });
} 