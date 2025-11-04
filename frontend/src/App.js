import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './App.css';
function App(){
  const [apps,setApps]=useState([]);
  const [q,setQ]=useState('');
  const [category,setCategory]=useState('All');
  const [topOnly,setTopOnly]=useState(false);
  const [dark,setDark]=useState(false);
  useEffect(()=>{ axios.get('http://localhost:4000/apps').then(r=>setApps(r.data)).catch(e=>console.error(e)); },[]);
  const cats=['All',...Array.from(new Set(apps.map(a=>a.category)))];
  const filtered=apps.filter(a=> (a.name.toLowerCase().includes(q.toLowerCase())||a.category.toLowerCase().includes(q.toLowerCase())) && (category==='All'||a.category===category) && (!topOnly||a.rating>=4.5));
  const featured=apps.filter(a=>a.rating>=4.7).slice(0,6);
  const settings={dots:true,infinite:true,autoplay:true,speed:700,autoplaySpeed:3000,slidesToShow:1,slidesToScroll:1,arrows:false};
  return (<div className={dark?'dark bg-gray-900 text-white min-h-screen':'bg-gray-50 min-h-screen'}>
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">Advanced App Store</h1>
        <div className="flex gap-3">
          <button onClick={()=>setDark(!dark)} className="bg-indigo-500 text-white px-3 py-2 rounded">{dark?'Light':'Dark'}</button>
        </div>
      </div>
      <div className="mb-6 max-w-2xl">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search apps or categories..." className="w-full p-3 rounded border"/>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Featured</h2>
        {featured.length>0? <Slider {...settings}>{featured.map((f,i)=>(
          <div key={i} className="p-2"><div className="rounded overflow-hidden shadow bg-white dark:bg-gray-800"><img src={f.image} alt={f.name} className="w-full h-56 object-cover"/><div className="p-4"><h3 className="font-semibold">{f.name}</h3><p className="text-sm text-gray-600 dark:text-gray-300">{f.category}</p></div></div></div>
        ))}</Slider>:<p>No featured apps</p>}
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {cats.map((c,i)=>(<button key={i} onClick={()=>setCategory(c)} className={'px-3 py-1 rounded-full '+(category===c?'bg-indigo-500 text-white':'bg-white dark:bg-gray-800')}>{c}</button>))}
        <button onClick={()=>setTopOnly(!topOnly)} className={'px-3 py-1 rounded-full '+(topOnly?'bg-yellow-400':'bg-white')}>Top Rated</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((a,idx)=>(<div key={idx} className="bg-white dark:bg-gray-800 rounded p-4 shadow"><img src={a.image} alt={a.name} className="w-full h-40 object-cover rounded mb-3"/><h3 className="font-semibold">{a.name}</h3><p className="text-sm text-gray-500 dark:text-gray-300">{a.category} • ⭐ {a.rating}</p><p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{a.description}</p><div className="mt-3"><button className="w-full bg-indigo-600 text-white py-2 rounded">Install</button></div></div>))}
      </div>
    </div>
  </div>);
}
export default App;
