import path from "path";
import express from 'express';

const PORT = process.env.PORT || '8050';

const app = express();

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

console.log(123);
app.listen(PORT);