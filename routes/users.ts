import { Router, json } from 'express';
import * as dataBase from '../db/database';

const router = Router();
router.get('/allCountry', async (req, res, next) => {
  const allCountry = await dataBase.getAllCountry();
  if (allCountry) {
    res.json(allCountry);
  } else {
    res.status(404).json({message: "DataBase is free"});
  }
});

router.get('/api/:nameOfCountry', async (req, res, next) => {
  const country = await dataBase.getCountry(req.params.nameOfCountry);
  if (country) {
    res.json(country.data);
  } else {
    res.json({message: 'Country not found in database'});
  }
});

router.post('/:nameOfCountry', async (req, res, next) => {
  const country = await dataBase.createStatistics(req.params.nameOfCountry);
  if (country) {
    res.json(country);
  } else {
    res.json({message: 'Country not found in database'});
  }
});

router.post('/info/:nameOfCountry', async (req, res, next) => {
  const country = await dataBase.updateStatistics(req.params.nameOfCountry, req.body);
  res
    .status(country ? 200 : 400)
    .json(country ?? {
      statusCode: 404
    });
});

router.get('/stats/:nameOfCountry', async (req, res, next) => {
  const country = await dataBase.getStatsCountry(req.params.nameOfCountry);
  if (country) {
    res.json(country.rating);
  } else {
    res.json({message: 'Country not found in database'});
  }
});

export default router;
