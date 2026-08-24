"use client";

import React, { useState, useMemo } from "react";
import { ASANA_IMAGES } from "@/lib/asanaMapper";
import Image from "next/image";
import Link from "next/link";

// ─── Category definitions ────────────────────────────────────────────────────
type Category = "all" | "standing" | "seated" | "supine" | "prone" | "inversion" | "balance" | "twist";

const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: "all", label: "All", emoji: "✦" },
  { id: "standing", label: "Standing", emoji: "🧍" },
  { id: "seated", label: "Seated", emoji: "🪷" },
  { id: "supine", label: "Supine", emoji: "🛌" },
  { id: "prone", label: "Prone", emoji: "🫃" },
  { id: "inversion", label: "Inversions", emoji: "🙃" },
  { id: "balance", label: "Balance", emoji: "⚖️" },
  { id: "twist", label: "Twists", emoji: "🌀" },
];

// Map each image filename to its categories (can belong to multiple)
const CATEGORY_MAP: Record<string, Category[]> = {
  // Standing
  "mountain_pose.png": ["standing"],
  "chair_pose.png": ["standing"],
  "warrior_i_left.png": ["standing"],
  "warrior_ii_left.png": ["standing"],
  "warrior_iii.png": ["standing", "balance"],
  "triangle_pose.png": ["standing"],
  "reversed_triangle_pose.png": ["standing", "twist"],
  "extended_side_angle.png": ["standing"],
  "extended_side_angle_right.png": ["standing"],
  "reverse_warrior_right.png": ["standing"],
  "high_lunge.png": ["standing"],
  "low_lunge.png": ["standing"],
  "crescent_lunge_twist.png": ["standing", "twist"],
  "revolved_lunge.png": ["standing", "twist"],
  "half_moon_pose.png": ["standing", "balance"],
  "revolved_half_moon.png": ["standing", "balance", "twist"],
  "pyramid_pose.png": ["standing"],
  "standing_forward_fold_pose.png": ["standing"],
  "ragdoll_pose.png": ["standing"],
  "forward_fold.png": ["standing"],
  "halfway_lift.png": ["standing"],
  "half_lift_pose.png": ["standing"],
  "standing_backbend.png": ["standing"],
  "goddess_pose.png": ["standing"],
  "wide-legged_forward_fold.png": ["standing"],
  "side_lunge_pose.png": ["standing"],
  "revolved_chair.png": ["standing", "twist"],
  "revolved_triangle.png": ["standing", "twist"],
  "standing_split.png": ["standing", "balance"],
  "standing_hand_to_big_toe.png": ["standing", "balance"],
  "dancers_pose.png": ["standing", "balance"],
  "tree_pose.png": ["standing", "balance"],
  "eagle_pose.png": ["standing", "balance"],
  "upward_salute.png": ["standing"],
  "garland_pose.png": ["standing"],
  "yogi_squat.png": ["standing"],
  "fallen_triangle.png": ["standing", "balance"],
  "gate_pose.png": ["seated"],
  // Seated
  "easy_pose.png": ["seated"],
  "easy_twisted_pose.png": ["seated", "twist"],
  "staff_pose.png": ["seated"],
  "seated_forward_fold.png": ["seated"],
  "bound_angle_pose.png": ["seated"],
  "butterfly_pose.png": ["seated"],
  "fire_log_pose.png": ["seated"],
  "cow_face_pose.png": ["seated"],
  "seated_twist.png": ["seated", "twist"],
  "seated_cat-cow.png": ["seated"],
  "seated_side_stretch.png": ["seated"],
  "half_lord_of_the_fishes_pose.png": ["seated", "twist"],
  "wide-angle_seated_forward_fold.png": ["seated"],
  "lotus_pose.png": ["seated"],
  "hero_pose.png": ["seated"],
  "thunderbolt_pose.png": ["seated"],
  "heron_pose.png": ["seated"],
  "half_splits_pose.png": ["seated"],
  "full_monkey_pose.png": ["seated"],
  "monkey_pose.png": ["seated"],
  "half_boat_pose.png": ["seated", "balance"],
  "boat_pose.png": ["seated", "balance"],
  "scale_pose.png": ["seated", "balance"],
  "tortoise_pose.png": ["seated"],
  "reclining_hero.png": ["seated", "supine"],
  // Supine
  "corpse_pose.png": ["supine"],
  "supine_spinal_twist_pose.png": ["supine", "twist"],
  "happy_baby.png": ["supine"],
  "bridge_pose.png": ["supine"],
  "reclined_bound_angle.png": ["supine"],
  "reclined_hand_to_big_toe.png": ["supine"],
  "knees_to_chest.png": ["supine"],
  "wind_relieving_pose.png": ["supine"],
  "legs_up_the_wall.png": ["supine", "inversion"],
  "wheel_pose.png": ["supine"],
  // Prone
  "cobra_pose.png": ["prone"],
  "cobra_pose_2.png": ["prone"],
  "bow_pose.png": ["prone"],
  "locust_pose.png": ["prone"],
  "sphinx_pose.png": ["prone"],
  "upward_facing_dog.png": ["prone"],
  "bird-dog.png": ["prone", "balance"],
  "bird-dog_balancing_tiger.png": ["balance", "prone"],
  "cat_cow_pose.png": ["prone"],
  "tabletop_pose.png": ["prone"],
  "childs_pose.png": ["prone"],
  "puppy_pose.png": ["prone"],
  "wild_thing.png": ["prone"],
  "reverse_table_top.png": ["prone"],
  "camel_pose.png": ["prone"],
  // Inversions
  "downward_facing_dog.png": ["inversion"],
  "dolphin_pose.png": ["inversion"],
  "forearm_stand.png": ["inversion"],
  "handstand.png": ["inversion"],
  "headstand.png": ["inversion"],
  "supported_headstand.png": ["inversion"],
  "shoulderstand.png": ["inversion"],
  "plow_pose.png": ["inversion"],
  "fish_pose.png": ["supine"],
  "dragon_pose.png": ["prone"],
  "sleeping_pigeon.png": ["prone"],
  "lizard_pose.png": ["prone"],
  "twisted_lizard.png": ["prone", "twist"],
  "pigeon_pose.png": ["prone"],
  // Balance / Arm balance
  "crow_pose.png": ["balance", "inversion"],
  "crane_pose.png": ["balance", "inversion"],
  "side_plank.png": ["balance"],
  "plank_pose.png": ["balance"],
  "forearm_plank.png": ["balance"],
  "four-limbed_staff_pose.png": ["balance"],
  "peacock_pose.png": ["balance", "inversion"],
  "firefly_pose.png": ["balance"],
  "compass_pose.png": ["seated", "balance"],
  "eight-angle_pose.png": ["balance"],
  "flying_pigeon.png": ["balance"],
  "noose_pose.png": ["seated", "twist"],
  "shoulder_pressing_pose.png": ["balance"],
  "extended_hand_to_big_toe_b.png": ["standing", "balance"],
  "neck_circles.png": ["seated"],
  "sun_salutation_a.png": ["standing"],
  "sun_salutation_b.png": ["standing"],
  "head-to-knee_pose_left.png": ["seated"],
  "head_to_knee_pose.png": ["seated"],
};

function getCategories(filename: string): Category[] {
  return CATEGORY_MAP[filename] ?? ["standing"];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const formatName = (filename: string) =>
  filename
    .replace(/\.(png|jpeg|jpg)$/i, "")
    .split(/[_-]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const SANSKRIT: Record<string, string> = {
  "boat pose": "Navasana",
  "bound angle pose": "Baddha Konasana",
  "bow pose": "Dhanurasana",
  "bridge pose": "Setu Bandhasana",
  "camel pose": "Ustrasana",
  "cat pose": "Marjaryasana",
  "chair pose": "Utkatasana",
  "childs pose": "Balasana",
  "cobra pose": "Bhujangasana",
  "corpse pose": "Savasana",
  "cow face pose": "Gomukhasana",
  "cow pose": "Bitilasana",
  "crow pose": "Bakasana",
  "eagle pose": "Garudasana",
  "dancers pose": "Natarajasana",
  "dolphin pose": "Ardha Pincha Mayurasana",
  "downward facing dog": "Adho Mukha Svanasana",
  "easy pose": "Sukhasana",
  "extended side angle": "Utthita Parsvakonasana",
  "fish pose": "Matsyasana",
  "forward fold": "Uttanasana",
  "half moon pose": "Ardha Chandrasana",
  "handstand": "Adho Mukha Vrksasana",
  "happy baby": "Ananda Balasana",
  "headstand": "Sirsasana",
  "high lunge": "Ashta Chandrasana",
  "lotus pose": "Padmasana",
  "low lunge": "Anjaneyasana",
  "mountain pose": "Tadasana",
  "peacock pose": "Mayurasana",
  "pigeon pose": "Eka Pada Rajakapotasana",
  "plank pose": "Phalakasana",
  "plow pose": "Halasana",
  "side plank": "Vasisthasana",
  "staff pose": "Dandasana",
  "tree pose": "Vrksasana",
  "triangle pose": "Utthita Trikonasana",
  "upward facing dog": "Urdhva Mukha Svanasana",
  "warrior i left": "Virabhadrasana I",
  "warrior ii left": "Virabhadrasana II",
  "warrior iii": "Virabhadrasana III",
  "wheel pose": "Urdhva Dhanurasana",
  "supine spinal twist pose": "Supta Matsyendrasana",
  "shoulderstand": "Salamba Sarvangasana",
  "bridge pose left": "Setu Bandhasana",
  "hero pose": "Virasana",
  "bird dog balancing tiger": "Vyaghrasana",
  "cat cow pose": "Marjaryasana Bitilasana",
  "puppy pose": "Uttana Shishosana",
};

function getSanskrit(filename: string): string | null {
  const key = filename.toLowerCase().replace(/\.(png|jpeg|jpg)$/i, "").replace(/[_-]/g, " ");
  for (const [en, sk] of Object.entries(SANSKRIT)) {
    if (key.includes(en)) return sk;
  }
  return null;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function LibraryPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return ASANA_IMAGES.filter((img) => {
      const matchesCategory =
        activeFilter === "all" || getCategories(img).includes(activeFilter);
      const matchesSearch =
        search.trim() === "" ||
        formatName(img).toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, search]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4 uppercase">
            Asana <span className="text-blue-600">Library</span>
          </h1>
          <p className="text-gray-600 font-medium text-lg max-w-2xl mb-6">
            Explore our comprehensive database of yoga poses used in our AI-generated sequences.
          </p>
          <div className="flex items-center gap-3 px-4 py-2 bg-orange-50 text-orange-700 rounded-xl border border-orange-100 w-fit animate-pulse">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-[10px] font-black uppercase tracking-widest leading-tight">
              AI Content Notice: Images are AI-generated for illustrative purposes and may not be 100% anatomically precise.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-sm">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search poses…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(({ id, label, emoji }) => (
            <button
              key={id}
              onClick={() => setActiveFilter(id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-200
                ${activeFilter === id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                }
              `}
            >
              <span>{emoji}</span>
              {label}
              {activeFilter === id && (
                <span className="ml-1 bg-white/25 rounded-full px-1.5 py-0.5 text-[10px]">
                  {filtered.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">
          {filtered.length} pose{filtered.length !== 1 ? "s" : ""}
          {activeFilter !== "all" && ` · ${CATEGORIES.find(c => c.id === activeFilter)?.label}`}
          {search && ` · "${search}"`}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <span className="text-5xl mb-4">🔍</span>
            <p className="font-black uppercase tracking-widest text-sm">No poses found</p>
            <button onClick={() => { setActiveFilter("all"); setSearch(""); }} className="mt-4 text-blue-500 text-xs font-bold hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map((image, index) => (
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

                {/* Category pills */}
                <div className="flex flex-wrap gap-1 justify-center mb-3">
                  {getCategories(image).map((cat) => (
                    <span
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-50 text-blue-400 cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition-colors"
                    >
                      {CATEGORIES.find((c) => c.id === cat)?.label}
                    </span>
                  ))}
                </div>

                <h3 className="text-center font-black text-gray-900 text-sm tracking-tight uppercase group-hover:text-blue-600 transition-colors">
                  {formatName(image)}
                </h3>
                {getSanskrit(image) && (
                  <p className="text-[10px] text-blue-500 font-black italic uppercase tracking-widest mt-2">
                    {getSanskrit(image)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 p-12 bg-blue-600 rounded-[3rem] text-center text-white shadow-2xl shadow-blue-200 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-6 tracking-tight uppercase">Ready to see them in action?</h2>
            <Link
              href="/generate-asanas"
              className="inline-block px-10 py-5 bg-white text-blue-600 rounded-[2rem] font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-all shadow-xl active:scale-95"
            >
              Build Your Practice
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
