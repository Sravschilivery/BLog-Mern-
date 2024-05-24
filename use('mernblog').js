use('mernblog')
// db.createCollection('articles')

db.articles.insertMany(
    [
        {
            name: 'learn-react',
            comments: []
        },
        {
            name: 'learn-node',
            comments: []
        },
        {
            name: 'my-thoughts-on-learning-react',
            comments: []
        }
    ]
)

use('mernblog')
db.articles.find()