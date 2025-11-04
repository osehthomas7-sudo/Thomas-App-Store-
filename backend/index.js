const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const DATA_FILE = path.join(__dirname, 'apps.json');
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 4000;
async function loadData(){ try { return await fs.readJson(DATA_FILE); } catch(e){ return []; } }
app.get('/', (req,res)=> res.send('App Store Backend running'));
app.get('/apps', async (req,res)=> { const data = await loadData(); res.json(data); });
app.post('/apps', async (req,res)=> { const data = await loadData(); const appObj = req.body; appObj.id = Date.now(); data.push(appObj); await fs.writeJson(DATA_FILE, data, {spaces:2}); res.json(appObj); });
app.listen(PORT, ()=> console.log('Backend listening on ' + PORT));
