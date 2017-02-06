let ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.post('/notes', (req, res) => {
        // Здесь будем создавать заметку.
        console.log(req.body);
        const note = {text: req.body.body, title: req.body.title};

        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({'error': `An error has occurred. error: ${err.Message}`});
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details)
            .then( item => {
                res.send(item);
            })
            .catch(err => {
                res.send({'error': 'An error has occurred'});
            }
        );
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(note);
            }
        });
    });
};