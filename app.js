import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// define public
app.use(express.static("public"));

app.get('/create-svelte-app/:projectName?', (req, res) => {
    const projectName = req.params.projectName ?? 'svelte-docker';
    const server = req.protocol + '://' + req.get('host');

    res.send(`
        #!/bin/bash

        # Download the Svelte app
        curl -L ${server}/svelte-docker --output svelte-app.tar.gz
        
        # Extract the Svelte app
        tar -xzf svelte-app.tar.gz
        
        # Remove the archive
        rm svelte-app.tar.gz

        # Rename the Svelte app
        mv svelte-app ${projectName}
    `);
});

app.get("/svelte-docker/", (req, res) => {
    res.download(__dirname + "/public/svelte-app.tar.gz");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});