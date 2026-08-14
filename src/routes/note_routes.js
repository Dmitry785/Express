module.exports = function(app, db){
    app.get('/', (req, res) => {
        res.render("home");
    });
    app.use('/contacts', (req, res) => {
        res.render('contacts', {
            title: "Contacts page",
            showList: true,
            list: ["tag 1", "tag 2", "tag 3"]
        });
    })
}