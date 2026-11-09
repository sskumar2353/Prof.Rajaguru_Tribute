import { useState } from 'react';
import { X } from 'lucide-react';
import styles from './PhotoGrid.module.css';

export default function PhotoGrid({ photos }){
  const [selected,setSelected]=useState(null);
  return <><div className={styles.grid}>{photos.map((photo,index)=><button key={photo.src} className={`${styles.item} ${index===0?styles.featured:''}`} onClick={()=>setSelected(photo)}><img src={photo.src} alt={photo.alt}/><span>{photo.caption}</span></button>)}</div>{selected&&<div className={styles.lightbox} onClick={()=>setSelected(null)}><button className={styles.close} aria-label="Close"><X/></button><img src={selected.src} alt={selected.alt}/><p>{selected.caption}</p></div>}</>;
}
