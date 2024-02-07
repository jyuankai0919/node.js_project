// controllers/aboutController.js
exports.showAbout = (req, res) => {
    res.send('there is no about here :(');
};

exports.showDetail = (req, res) => {
    let name = req.query.name;
    res.send(`there is no ${name} detail here :(`);
};
