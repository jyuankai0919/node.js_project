// controllers/aboutController.js
export function showAbout(req, res) {
    res.send('there is no about here :(');
}

export function showDetail(req, res) {
    let name = req.query.name;
    res.send(`there is no ${name} detail here :(`);
}
