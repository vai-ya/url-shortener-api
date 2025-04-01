const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const url = require('../models/url');

router.post('/shorten', async (req, res) => {
    
    const {longUrl} = req.body;
    
    const baseUrl = config.get('baseUrl');

    if (!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid Base URL.')
    }

    const urlCode = shortid.generate();

    if(validUrl.isUri(longUrl)){
        try{
            let Url = await url.findOne({longUrl});

            if(Url){
                res.json(Url);
            } else{
                const shortUrl = baseUrl+'/'+ urlCode;

                Url = new url({
                    longUrl, shortUrl, urlCode, date: new Date()
                });

                await Url.save();

                res.json(Url);
            }
        } catch(err){
            console.error(err);
            res.status(500).json('Server Error')
        }
    } else{
        res.status(401).json('Invalid Long URL.');
    }
});

module.exports = router;