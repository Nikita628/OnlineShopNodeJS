import express from 'express';

const app = express();

app.use((req, res, next) => {
    console.log(' --- request --- ', req.path, req.method);
    next();
    res.end();
});

app.listen(3000);