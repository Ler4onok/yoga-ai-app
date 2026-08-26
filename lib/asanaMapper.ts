export const ASANA_IMAGES = [
    "bee_breath.png", "bird-dog.png", "bird-dog_balancing_tiger.png", "boat_pose.png", "bound_angle_pose.png", "bow_pose.png", "bridge_pose.png", "butterfly_pose.png",
    "camel_pose.png", "cat_cow_pose.png", "cat_pose.png", "chair_pose.png", "chaturanga.png", "chaturanga_pose.jpeg", "childs_pose.png", "cobra_pose.png",
    "cobra_pose_2.png", "compass_pose.png", "corpse_pose.png", "cow_face_pose.png", "cow_pose.png", "crane_pose.png",
    "crescent_lunge_twist.png", "crow_pose.png", "dancers_pose.png", "deep_belly_breathing.png", "dolphin_pose.png", "downward_facing_dog.png",
    "dragon_pose.png", "eagle_pose.png", "easy_pose.png", "easy_twisted_pose.png", "eight-angle_pose.png",
    "extended_hand_to_big_toe_b.png", "extended_side_angle.png", "extended_side_angle_right.png", "fallen_triangle.png", "fire_log_pose.png", "firefly_pose.png",
    "fish_pose.png", "flying_pigeon.png", "forearm_plank.png", "forearm_stand.png", "forward_fold.png", "four-limbed_staff_pose.png",
    "full_monkey_pose.png", "garland_pose.png", "gate_pose.png", "goddess_pose.png", "half_boat_pose.png", "half_lift_pose.png",
    "half_lord_of_the_fishes_pose.png", "half_monkey_pose.png", "half_moon_pose.png", "half_splits_pose.png", "halfway_lift.png", "handstand.png", "happy_baby.png",
    "head-to-knee_pose_left.png", "head_to_knee_pose.png", "headstand.png", "hero_pose.png", "heron_pose.png", "high_lunge.png",
    "knees_to_chest.png", "legs_up_the_wall.png", "lizard_pose.png", "locust_pose.png", "lotus_pose.png", "low_lunge.png",
    "marichis_pose.png", "mountain_pose.png", "Nadi_Shodhana_Pranayama.png", "neck_circles.png", "noose_pose.png", "peacock_pose.png",
    "pigeon_pose.png", "plank_pose.png", "plow_pose.png", "puppy_pose.png", "pyramid_pose.png", "ragdoll_pose.png",
    "reclined_bound_angle.png", "reclined_hand_to_big_toe.png", "reclining_hero.png", "reverse_table_top.png", "reverse_warrior_left.png", "reverse_warrior_right.png",
    "reversed_triangle_pose.png", "revolved_chair.png", "revolved_half_moon.png", "revolved_lunge.png", "revolved_triangle.png", "samasthiti.png", "scale_pose.png",
    "seated_cat-cow.png", "seated_forward_fold.png", "seated_side_stretch.png", "seated_twist.png", "shoulder_pressing_pose.png", "shoulder_rolls.png", "shoulderstand.png",
    "side_crow.png", "side_lunge_pose.png", "side_plank.png", "sleeping_pigeon.png", "sphinx_pose.png", "staff_pose.png",
    "standing_backbend.png", "standing_forward_fold_pose.png", "standing_hand_to_big_toe.png", "standing_split.png",
    "supine_twist.png", "supported_headstand.png", "tabletop_pose.png", "thread_the_needle.png", "thunderbolt_pose.png", "tortoise_pose.png",
    "tree_pose.png", "tree_pose_left.png", "tree_pose_right.png", "triangle_pose.png", "triangle_pose_left.png", "triangle_pose_right.png",
    "twisted_lizard.png", "upward_facing_dog.png", "upward_salute.png", "warrior_i.png",
    "warrior_ii.png", "warrior_iii.png", "wheel_pose.png", "wide-angle_seated_forward_fold.png",
    "wide-legged_forward_fold.png", "wild_thing.png", "wind_relieving_pose.png", "yogi_squat.png", "sun_salutation_a.png", "sun_salutation_b.png"
];

// Semantic aliases: pose names that don't lexically overlap with their target image's filename.
const SEMANTIC_ALIASES: { test: (n: string) => boolean; target: string }[] = [
    { test: (n) => n.includes('centeringbreath') || n.includes('centering'), target: 'easypose' },
    { test: (n) => n.includes('neck'), target: 'neckcircles' },
    { test: (n) => n.includes('savasana'), target: 'corpsepose' },
    { test: (n) => n.includes('ujjayi'), target: 'easypose' },
    { test: (n) => n.includes('gentlereturn') || n.includes('returntositting'), target: 'easypose' },
    { test: (n) => n.includes('seatedforwardbend') || n.includes('paschimottanasana'), target: 'seatedforwardfold' },
    { test: (n) => n === 'vinyasa' || n.includes('planktochaturanga') || n.includes('phalakasanatochaturanga'), target: 'chaturangapose' },
    { test: (n) => n.includes('balancingtiger') || n.includes('vyaghrasana') || n.includes('tigerpose'), target: 'birddogbalancingtiger' },
];

export function getAsanaImage(name: string, sanskritName?: string): string | null {
    const normalize = (str?: string) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    // Generic words that appear as filename suffixes but don't carry distinguishing meaning
    // (e.g. "eagle_pose" -> "eagle" so "Eagle Arms with Strap" still matches on "eagle").
    const stripGeneric = (str: string) => str.replace(/pose$/, '');

    const normName = normalize(name);
    const normSanskrit = normalize(sanskritName);

    const fileEntries = ASANA_IMAGES.map((file) => ({
        file,
        norm: normalize(file.replace(/\.(png|jpe?g)$/i, '')),
    }));

    const findByNorm = (target: string) => fileEntries.find((f) => f.norm === target);

    // 1. Left/Right/Side/Air qualifiers always use the generic/base image when one exists —
    // e.g. "Warrior II (Left)" and "Warrior II (Right)" both show warrior_ii.png, even if a
    // directional variant also exists (e.g. tree_pose_left.png stays unused in favor of tree_pose.png).
    const directionStripped = normName.replace(/left|right|air|side/g, '');
    if (directionStripped !== normName) {
        const baseMatch = findByNorm(directionStripped);
        if (baseMatch) return `/asanas/${baseMatch.file}`;
    }

    // 2. Exact match against name or Sanskrit name (covers poses with no direction word, and
    // directional poses with no generic counterpart, e.g. reverse_warrior_left/right)
    const match = findByNorm(normName) || (normSanskrit && findByNorm(normSanskrit));
    if (match) return `/asanas/${match.file}`;

    // 3. Semantic aliases (pose name doesn't share letters with the image filename)
    for (const alias of SEMANTIC_ALIASES) {
        if (alias.test(normName)) {
            const aliasMatch = findByNorm(alias.target);
            if (aliasMatch) return `/asanas/${aliasMatch.file}`;
        }
    }

    // 4. Chaturanga: prefer a dedicated chaturanga image over the generic staff pose
    if (normName.includes('chaturanga')) {
        const chaturangaMatch = findByNorm('chaturangapose') || findByNorm('chaturanga') || findByNorm('fourlimbedstaffpose');
        if (chaturangaMatch) return `/asanas/${chaturangaMatch.file}`;
    }

    // 5. Pigeon variants
    if (normName.includes('pigeon')) {
        const pigeonMatch = findByNorm('pigeonpose');
        if (pigeonMatch) return `/asanas/${pigeonMatch.file}`;
    }

    // 6. Keyword containment: does the pose name contain the image's core keyword
    // (filename with its trailing "pose" stripped)? Prefer this direction (tier A) and pick
    // the longest keyword, so "Eagle Arms with Strap" matches eagle over a shorter false match.
    // Only fall back to the reverse direction (tier B: the filename is more specific than the
    // pose name, e.g. "Half Moon" vs. revolved_half_moon) when nothing in tier A matched, since
    // tier B risks picking an overly-specific variant.
    const tierA: { file: string; score: number }[] = [];
    const tierB: { file: string; score: number }[] = [];
    for (const { file, norm } of fileEntries) {
        const keyword = stripGeneric(norm);
        for (const target of [normName, normSanskrit]) {
            if (!target || keyword.length < 4) continue;
            if (target.includes(keyword)) {
                tierA.push({ file, score: keyword.length });
            } else if (keyword.includes(target)) {
                tierB.push({ file, score: keyword.length });
            }
        }
    }
    if (tierA.length > 0) {
        tierA.sort((a, b) => b.score - a.score);
        return `/asanas/${tierA[0].file}`;
    }
    if (tierB.length > 0) {
        tierB.sort((a, b) => a.score - b.score);
        return `/asanas/${tierB[0].file}`;
    }

    return null;
}
