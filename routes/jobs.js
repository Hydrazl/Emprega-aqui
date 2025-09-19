import express from 'express';
import Job from '../models/Job.js';
const router = express.Router();

router.post ('/add', (req, res) => {
    let {title, description, salary, company, email, new_job} = req.body;

    Job.create ({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

export default router;