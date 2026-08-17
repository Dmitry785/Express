
module.exports = function(app){
    const {engine} = require('express-handlebars');

    app.engine("hbs", engine(
        {
            layoutsDir: "src/views/layouts",
            defaultLayout: "layout",
            extname: "hbs",
            helpers: {
                tags: function(array){
                    let str = "";
                    if (!Array.isArray(array)) return "";
                    for(let obj of array){
                        str += `<li>${obj}</li>`;
                    }
                    return `<ol>${str}</ol>`;
                },
                getTime: function(){
                    const date = new Date();
                    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                }
            },
            partialsDir: "src/views/partials",
        }
    ));
    app.set("view engine", "hbs");
    app.set("views", "src/views");
}