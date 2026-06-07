import React from "react";
import { ASANA_IMAGES } from "@/lib/asanaMapper";
import Image from "next/image";
import Link from "next/link";

export default function LibraryPage() {
  // Helper to format asana name from filename
  const formatName = (filename: string) => {
    return filename
      .replace(/\.(png|jpeg|jpg)$/i, '')
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Sanskrit Mapping
  const getSanskrit = (filename: string) => {
    const key = filename.toLowerCase().replace(/\.(png|jpeg|jpg)$/i, '').replace(/_/g, ' ');
    const mapping: Record<string, string> = {
      'boat pose': 'Navasana',
      'bound angle pose': 'Baddha Konasana',
      'bow pose': 'Dhanurasana',
      'bridge pose': 'Setu Bandhasana',
      'camel pose': 'Ustrasana',
      'cat pose': 'Marjaryasana',
      'chair pose': 'Utkatasana',
      'childs pose': 'Balasana',
      'cobra pose': 'Bhujangasana',
      'corpse pose': 'Savasana',
      'cow face pose': 'Gomukhasana',
      'cow pose': 'Bitilasana',
      'crow pose': 'Bakasana',
      'dancer pose': 'Natarajasana',
      'dancers pose': 'Natarajasana',
      'downward facing dog': 'Adho Mukha Svanasana',
      'easy pose': 'Sukhasana',
      'extended side angle': 'Utthita Parsvakonasana',
      'fish pose': 'Matsyasana',
      'forward fold': 'Uttanasana',
      'half moon pose': 'Ardha Chandrasana',
      'handstand': 'Adho Mukha Vrksasana',
      'happy baby': 'Ananda Balasana',
      'headstand': 'Sirsasana',
      'high lunge': 'Ashta Chandrasana',
      'lotus pose': 'Padmasana',
      'low lunge': 'Anjaneyasana',
      'mountain pose': 'Tadasana',
      'peacock pose': 'Mayurasana',
      'pigeon pose': 'Eka Pada Rajakapotasana',
      'plank pose': 'Phalakasana',
      'plow pose': 'Halasana',
      'side plank': 'Vasisthasana',
      'staff pose': 'Dandasana',
      'tree pose': 'Vrksasana',
      'triangle pose': 'Utthita Trikonasana',
      'upward facing dog': 'Urdhva Mukha Svanasana',
      'warrior i': 'Virabhadrasana I',
      'warrior ii': 'Virabhadrasana II',
      'warrior iii': 'Virabhadrasana III',
      'wheel pose': 'Urdhva Dhanurasana',
      'supine spinal twist pose': 'Supta Matsyendrasana'
    };
    
    for (const [english, sanskrit] of Object.entries(mapping)) {
      if (key.includes(english)) return sanskrit;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4 uppercase">Asana <span className="text-blue-600">Library</span></h1>
          <p className="text-gray-600 font-medium text-lg max-w-2xl mb-6">
            Explore our comprehensive database of yoga poses used in our AI-generated sequences.
          </p>
          <div className="flex items-center gap-3 px-4 py-2 bg-orange-50 text-orange-700 rounded-xl border border-orange-100 w-fit animate-pulse">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="text-[10px] font-black uppercase tracking-widest leading-tight">
              AI Content Notice: Images are AI-generated for illustrative purposes and may not be 100% anatomically precise.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {ASANA_IMAGES.map((image, index) => (
            <div 
              key={index}
              className="group bg-gray-50/50 rounded-[3.5rem] border border-gray-100 p-6 flex flex-col items-center hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-full aspect-square relative mb-6 rounded-[2.5rem] overflow-hidden bg-white shadow-inner">
                <Image
                  src={`/asanas/${image}`}
                  alt={formatName(image)}
                  fill
                  className="object-contain mix-blend-multiply filter contrast-[1.1] brightness-[1.05] transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-center font-black text-gray-900 text-sm tracking-tight uppercase group-hover:text-blue-600 transition-colors">
                {formatName(image)}
              </h3>
              {getSanskrit(image) && (
                <p className="text-[10px] text-blue-500 font-black italic uppercase tracking-widest mt-2">{getSanskrit(image)}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-blue-600 rounded-[3rem] text-center text-white shadow-2xl shadow-blue-200 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-6 tracking-tight uppercase">Ready to see them in action?</h2>
            <Link href="/generate-asanas" className="inline-block px-10 py-5 bg-white text-blue-600 rounded-[2rem] font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-all shadow-xl active:scale-95">
              Build Your Practice
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
