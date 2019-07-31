const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');


// @route  GET api/articles
// @desc   GET articles
router.get('/', async (req, res) => {
    try {
        const articles = await Articles.find({})
        res.json(articles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET api/articles/:id
// @desc   GET article by ID
router.get('/:id', async (req, res) => {
    try {
        const article = await Articles.findById(req.params.id)

        if (!article) {
            return res.status(404).json({ msg: 'Article not found' });
        }

        res.json(article);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Sever Error');
    }
});

// @route  POST api/articles
// @desc   CREATE article
router.post('/', [
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content must be 6 - 300 characters').isLength({
        min: 6,
        max: 300
    })
], async (req, res) => {

    const error = validationResult(req);

    if (!error.isEmpty()) return res.status(400).res.json({ errors: error.array() });

    try {
        const articles = await Articles.find({})

        const newArticle = new Articles({
            title: req.body.title,
            content: req.body.content
        })

        const article = await newArticle.save();

        res.json(article);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

})

// @route  DELETE api/articles/:id
// @desc   DELETE article by ID
router.delete('/:id', async (req, res) => {
    try {
        const findArticle = await Articles.findById({ _id: req.params.id })

        await findArticle.delete();

        res.json({ msg: 'Article removed' });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// @route  DELETE api/articles
// @desc   DELETE articles
router.delete('/', async (req, res) => {
    try {
        await Articles.deleteMany();

        res.json({ msg: 'Articles successfully deleted' });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// @route  PUT api/articles/:id
// @desc   PUT article by ID
router.put('/:id', [
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content must be 6 - 300 characters').isLength({
        min: 6,
        max: 300
    })
], async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) return res.status(400).res.json({ errors: error.array() });

    try {
        const article = await Articles.findOneAndUpdate(req.params.id, {
            title: req.body.title,
            content: req.body.content
        });

        await article.save();

        res.json(article);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})


// @route  PATCH api/articles/:id
// @desc   PATCH article by request
router.patch('/:id', async (req, res) => {
    try {
        const article = await Articles.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });

        await article.save();

        res.json(article);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})



module.exports = router;


