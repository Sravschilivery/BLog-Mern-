const express = require ('express');
const app = express();
const {MongoClient} = require("mongodb")
const PORT = process.env.PORT || 3001;



//Initialize middleware
app.use(express.json({ extended: false }));

const withDB = async (operations, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = client.db('mernblog');

        await operations(db); // Await the operations to ensure they complete before closing the client

        client.close();
    } catch (error) {
        res.status(500).json({ message: "Error connecting to database", error });
    }
};

app.get('/api/articles/:name', (req, res) => {
    withDB(async (db) => {
        const articleName = req.params.name;

        const articlesInfo = await db
            .collection('articles')
            .findOne({ name: articleName });
        
        res.status(200).json(articlesInfo);
    }, res);
});

app.post('/api/articles/:name/add-comments',(req, res) => {
    const {username, text} = req.body;
    const articleName = req.params.name;

    withDB(async (db) => {
        const articlesInfo = await db
            .collection("articles")
            .findOne({name: articleName});
        await db.collection("articles").updateOne(
            {name: articleName},
            {
                $set: {
                    comments: articlesInfo.comments.concat({ username, text}),
                },
            }
        );
        const updateArticlesInfo = await db
            .collection("articles")
            .findOne({ name: articleName});
        res.status(200).json(updateArticlesInfo);
    },res);
});
 
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));