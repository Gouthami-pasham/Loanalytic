router.get('/adminhome', function (req, res) {
    res.render('adminhome.ejs', { title: 'Login' });
});