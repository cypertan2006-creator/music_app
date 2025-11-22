'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Page() {
  const [route, setRoute] = useState('home')
  const [playing, setPlaying] = useState(null)
  const [liked, setLiked] = useState({})

  function playTrack(track){
    setPlaying(track)
    setRoute('player')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-[390px] h-[844px] rounded-3xl shadow-2xl backdrop-glass border border-white/8 overflow-hidden text-white">
        <TopBar route={route} onNavigate={setRoute} />
        <main className="p-4 h-[680px] overflow-auto">
          <AnimatePresence exitBeforeEnter>
            {route === 'home' && (
              <motion.div key="home" initial={{opacity:0, y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                <HomeScreen onPlay={playTrack} onLike={(id)=> setLiked(s=> ({...s, [id]: !s[id]}))} liked={liked} />
              </motion.div>
            )}
            {route === 'search' && (
              <motion.div key="search" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                <SearchScreen onPlay={playTrack} />
              </motion.div>
            )}
            {route === 'playlist' && (
              <motion.div key="playlist" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                <PlaylistScreen onPlay={playTrack} />
              </motion.div>
            )}
            {route === 'player' && (
              <motion.div key="player" initial={{opacity:0, scale:.98}} animate={{opacity:1, scale:1}} exit={{opacity:0}}>
                <PlayerScreen track={playing} onBack={()=> setRoute('home')} onLike={(id)=> setLiked(s=> ({...s, [id]: !s[id]}))} liked={liked} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        <BottomBar route={route} onNavigate={setRoute} playing={playing} />
      </div>
    </div>
  )
}

function TopBar({ route, onNavigate }){
  return (
    <div className="flex items-center justify-between px-5 pt-5">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-white/20 to-white/6 flex items-center justify-center border border-white/8">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="opacity-95"><path d="M3 9l9-6 9 6v6l-9 6L3 15V9z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div>
          <div className="text-sm opacity-90">Now</div>
          <div className="text-xs opacity-70">V0 — PurpleWave</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={()=> onNavigate('search')} className="p-2 rounded-lg bg-white/6 border border-white/6">🔎</button>
        <button onClick={()=> onNavigate('playlist')} className="p-2 rounded-lg bg-white/6 border border-white/6">☰</button>
      </div>
    </div>
  )
}

function BottomBar({ route, onNavigate, playing }){
  return (
    <div className="p-4 border-t border-white/6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-white/8 flex items-center justify-center"> 
          {playing ? <img src={playing.cover} alt="cover" className="w-full h-full object-cover rounded-lg" /> : <div className="w-full h-full bg-white/4 rounded-lg" />}
        </div>
        <div className="text-sm">
          <div className="font-semibold">{playing ? playing.title : 'Not Playing'}</div>
          <div className="text-xs opacity-70">{playing ? playing.artist : ''}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={()=> onNavigate('home')} className="text-xs px-3 py-1 rounded-lg bg-white/6">Home</button>
        <button onClick={()=> onNavigate('player')} className="text-xs px-3 py-1 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] shadow-lg">Open</button>
      </div>
    </div>
  )
}

const sampleTracks = [
  { id: 't1', title: 'Night Bloom', artist: 'Luma', cover: placeholderCover('#7c3aed') },
  { id: 't2', title: 'Echoes', artist: 'Aria Pulse', cover: placeholderCover('#4f46e5') },
  { id: 't3', title: 'Ocean Neon', artist: 'Skyline', cover: placeholderCover('#06b6d4') },
  { id: 't4', title: 'Velvet Road', artist: 'Nova', cover: placeholderCover('#8b5cf6') },
  { id: 't5', title: 'Midnight Drive', artist: 'Hollow', cover: placeholderCover('#0ea5a4') },
];

function HomeScreen({ onPlay, onLike, liked }){
  return (
    <div className="space-y-6">
      <SectionTitle title="Good Evening" subtitle="Discover new music" />
      <div className="grid grid-cols-2 gap-3">
        {sampleTracks.slice(0,4).map((c,i)=> (
          <div key={i} className="relative rounded-xl overflow-hidden p-3 cursor-pointer bg-gradient-to-br from-white/6 to-white/4 border border-white/6" onClick={()=> onPlay(c)}>
            <div className="absolute -right-6 -top-6 opacity-30 transform rotate-12 scale-125">🎵</div>
            <div className="font-semibold">{c.title}</div>
            <div className="text-xs opacity-70">{c.artist}</div>
            <div className="mt-4">
              <img src={c.cover} alt="cover" className="w-full h-28 rounded-lg object-cover shadow-inner" />
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold">Trending</div>
          <div className="text-xs opacity-60">See all</div>
        </div>
        <div className="space-y-3">
          {sampleTracks.map(t=> (
            <div key={t.id} className="flex items-center justify-between p-2 rounded-lg bg-white/4" >
              <div className="flex items-center gap-3" onClick={()=> onPlay(t)}>
                <img src={t.cover} className="w-12 h-12 rounded-md object-cover" />
                <div>
                  <div className="font-medium">{t.title}</div>
                  <div className="text-xs opacity-70">{t.artist}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={()=> onLike(t.id)} className="p-2 rounded-md bg-white/6">♡</button>
                <button onClick={()=> onPlay(t)} className="p-2 rounded-md bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4]">▶</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ title, subtitle }){
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-lg font-bold">{title}</div>
        <div className="text-xs opacity-70">{subtitle}</div>
      </div>
      <div className="text-xs opacity-60">✦</div>
    </div>
  )
}

function SearchScreen({ onPlay }){
  return (
    <div className="space-y-4">
      <div className="p-3 rounded-xl bg-white/6 flex items-center gap-3">
        <input className="bg-transparent outline-none w-full" placeholder="Search songs, artists..." />
        <div className="text-xs opacity-70">F</div>
      </div>

      <div className="text-sm font-semibold">Popular</div>
      <div className="grid grid-cols-3 gap-3">
        {sampleTracks.slice(0,6).map(t=> (
          <div key={t.id} className="rounded-lg overflow-hidden cursor-pointer" onClick={()=> onPlay(t)}>
            <img src={t.cover} className="w-full h-20 object-cover rounded-lg" />
            <div className="text-xs mt-1">{t.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PlaylistScreen({ onPlay }){
  return (
    <div className="space-y-4">
      <div className="rounded-xl p-4 bg-gradient-to-r from-[#8b5cf6]/20 to-[#06b6d4]/20 border border-white/6">
        <div className="text-sm opacity-80">My Playlist</div>
        <div className="text-2xl font-bold mt-2">PurpleWave Mix</div>
        <div className="text-xs opacity-60 mt-1">Curated for your vibe</div>
      </div>

      <div className="space-y-2">
        {sampleTracks.map(t=> (
          <div key={t.id} className="flex items-center justify-between p-2 rounded-lg bg-white/4" onClick={()=> onPlay(t)}>
            <div className="flex items-center gap-3">
              <img src={t.cover} className="w-12 h-12 rounded-md object-cover" />
              <div>
                <div className="font-medium">{t.title}</div>
                <div className="text-xs opacity-70">{t.artist}</div>
              </div>
            </div>
            <div className="text-xs opacity-70">3:42</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PlayerScreen({ track, onBack, onLike, liked }){
  if(!track) return null;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-lg bg-white/6">←</button>
        <div className="flex-1 text-center">
          <div className="text-sm opacity-80">Playing</div>
          <div className="text-xs opacity-60">{track.artist}</div>
        </div>
        <div className="w-8" />
      </div>

      <div className="rounded-2xl overflow-hidden p-4 bg-gradient-to-br from-white/6 to-white/4 border border-white/8">
        <img src={track.cover} className="w-full h-60 object-cover rounded-xl shadow-2xl" />
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold">{track.title}</div>
            <div className="text-xs opacity-70">{track.artist}</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=> onLike(track.id)} className="p-2 rounded-md bg-white/6">♡</button>
            <button className="p-2 rounded-md bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4]">▶</button>
          </div>
        </div>

        <div className="mt-4">
          <Waveform />
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="text-xs opacity-60">0:00</div>
        <div className="text-xs opacity-60">3:42</div>
      </div>
    </div>
  )
}

function Waveform(){
  return (
    <svg viewBox="0 0 100 20" className="w-full h-10">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100" height="20" fill="transparent" />
      <g stroke="url(#g1)" strokeWidth="0.8" strokeLinecap="round">
        {Array.from({length:40}).map((_,i)=> {
          const h = 4 + Math.abs(Math.sin(i*0.6))*12;
          const x = 2 + i*2.3;
          const y = 10 - h/2;
          return <rect key={i} x={x} y={y} width={1.4} height={h} rx={0.4} />
        })}
      </g>
    </svg>
  )
}

function placeholderCover(hex){
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='${hex}'/><stop offset='1' stop-color='#0ea5a4'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/><g fill='rgba(255,255,255,0.18)'><circle cx='480' cy='80' r='60'/><rect x='40' y='420' width='260' height='40' rx='8'/></g></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
