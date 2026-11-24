const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const STUDENT_OWNER = process.env.STUDENT_OWNER || 'Unconfigured Student';
const APP_ENV = process.env.APP_ENV || 'development';


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let tasks = [
    { id: 1, title: 'Initialize GitHub Repository', status: 'Completed' },
    { id: 2, title: 'Deploy Web Service to Render PaaS', status: 'In Progress' }
];


app.get('/', (req, res) => {
    const taskItems = tasks
        .map(t => <li><strong>#${t.id}</strong> ${t.title} <em>[${t.status}]</em></li>)
        .join("");

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>TaskFlow Cloud System</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f8fafc;
                    padding: 40px;
                    color: #1e293b;
                }

                .container {
                    max-width: 650px;
                    margin: auto;
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }

                .badge {
                    background: #0284c7;
                    color: white;
                    padding: 4px 10px;
                    border-radius: 4px;
                    font-size: 12px;
                    text-transform: uppercase;
                }

                input[type="text"] {
                    width: 70%;
                    padding: 8px;
                    margin-right: 8px;
                }

                button {
                    padding: 8px 14px;
                    background: #16a34a;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>TaskFlow Cloud System <span class="badge">${APP_ENV}</span></h1>

                <p><strong>System Administrator:</strong> ${STUDENT_OWNER}</p>

                <p><strong>Server Timestamp:</strong> ${new Date().toISOString()}</p>

                <hr>

                <h3>Add New Deployment Task</h3>

                <form method="POST" action="/tasks">
                    <input type="text" name="title"
                    placeholder="Enter task description..." required />

                    <button type="submit">Add Task</button>
                </form>

                <h3>Active System Tasks</h3>
                <ul>${taskItems}</ul>

                <p><small>API Endpoint:
                    <a href="/api/tasks">/api/tasks</a>
                </small></p>
            </div>
        </body>
        </html>
    `);
});


app.post('/tasks', (req, res) => {
    const { title } = req.body;

    if (title && title.trim() !== '') {
        tasks.push({
            id: tasks.length + 1,
            title: title.trim(),
            status: 'Pending'
        });
    }

    res.redirect('/');
});


app.get('/api/tasks', (req, res) => {
    res.json({
        owner: STUDENT_OWNER,
        environment: APP_ENV,
        totalTasks: tasks.length,
        tasks: tasks
    });
});


app.listen(PORT, () => {
    console.log(`TaskFlow server running on port $ {PORT}`);
});