export const ASANA_IMAGES = [
    "bird-dog_right.png", "boat_pose.png", "bound_angle_pose.png", "bow_pose.png", "bridge_pose.png", "butterfly_pose.png",
    "camel_pose.png", "cat_cow_pose.png", "cat_pose.png", "chair_pose.png", "childs_pose.png", "cobra_pose.png",
    "cobra_pose_2.png", "compass_pose.png", "corpse_pose.png", "cow_face_pose.png", "cow_pose.png", "crane_pose.png",
    "crescent_lunge_twist.png", "crow_pose.png", "dancers_pose.jpeg", "dancers_pose.png", "dolphin_pose.png", "downward_facing_dog.png",
    "dragon_pose.png", "eagle_pose.jpeg", "eagle_pose.png", "easy_pose.png", "easy_twisted_pose.png", "eight-angle_pose.png",
    "extended_hand_to_big_toe_b.png", "extended_side_angle.png", "extended_side_angle_right.png", "fallen_triangle.png", "fire_log_pose.png", "firefly_pose.png",
    "fish_pose.jpeg", "flying_pigeon.png", "forearm_plank.png", "forearm_stand.png", "forward_fold.png", "four-limbed_staff_pose.png",
    "full_monkey_pose.jpeg", "garland_pose.png", "gate_pose.png", "goddess_pose.png", "half_boat_pose.png", "half_lift_pose.jpeg",
    "half_lord_of_the_fishes_pose.jpeg", "half_moon_pose.png", "half_splits_pose.jpeg", "halfway_lift.png", "handstand.png", "happy_baby.png",
    "head-to-knee_pose_left.png", "head_to_knee_pose.png", "headstand.png", "hero_pose.png", "heron_pose.png", "high_lunge.png",
    "knees_to_chest.png", "legs_up_the_wall.png", "lizard_pose.png", "locust_pose.png", "lotus_pose.png", "low_lunge.png",
    "marichis_pose.png", "monkey_pose.png", "mountain_pose.png", "neck_circles.png", "noose_pose.png", "peacock_pose.png",
    "pigeon_pose.png", "plank_pose.png", "plow_pose.png", "puppy_pose.png", "pyramid_pose.png", "ragdoll_pose.png",
    "reclined_bound_angle.png", "reclined_hand_to_big_toe.png", "reclining_hero.png", "reverse_table_top.png", "reverse_warrior_left.png", "reverse_warrior_right.png",
    "reversed_triangle.png", "revolved_chair.png", "revolved_half_moon.png", "revolved_lunge.jpeg", "revolved_triangle.png", "scale_pose.png",
    "seated_cat-cow.png", "seated_forward_fold.png", "seated_side_stretch.png", "seated_twist.png", "shoulder_pressing_pose.png", "shoulderstand.png",
    "side_crow.png", "side_lunge_pose.jpeg", "side_plank.png", "sleeping_pigeon.png", "sphinx_pose.png", "staff_pose.png",
    "standing_backbend.png", "standing_forward_fold_pose.png", "standing_hand_to_big_toe.png", "standing_split.png", "supine_spinal_twist_pose.jpeg", "supine_twist.png",
    "supine_twist_left.png", "supported_headstand.png", "tabletop_pose.png", "thread_the_needle.png", "thunderbolt_pose.png", "tortoise_pose.png",
    "tree_pose.png", "tree_pose_left.png", "tree_pose_right.png", "triangle_pose.png", "triangle_pose_left.png", "triangle_pose_right.png",
    "twisted_lizard.png", "upward_facing_dog.png", "upward_salute.png", "warrior_i.png", "warrior_i_left.png", "warrior_i_right.png",
    "warrior_ii.png", "warrior_ii_left.png", "warrior_ii_right.png", "warrior_iii.png", "wheel_pose.png", "wide-angle_seated_forward_fold.png",
    "wide-legged_forward_fold.png", "wild_thing.png", "wind_relieving_pose.png", "yogi_squat.png"
];

export function getAsanaImage(name: string, sanskritName?: string): string | null {
    const normalize = (str?: string) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');

    let normName = normalize(name);
    const normSanskrit = normalize(sanskritName);

    // Manual Aliases
    if (normName.includes('seatedforwardbend') || normName.includes('paschimottanasana')) {
        normName = 'seatedforwardfold';
    }
    if (normName === 'vinyasa' || normName.includes('planktochaturanga') || normName.includes('phalakasanatochaturanga')) {
        normName = 'chaturangapose';
    }

    const checkMatch = (targetName: string, targetSanskrit?: string) => {
        for (const file of ASANA_IMAGES) {
            const normFile = normalize(file.replace(/\.(png|jpeg|jpg)$/i, ''));
            if (normFile === targetName || (targetSanskrit && normFile === targetSanskrit)) {
                return `/asanas/${file}`;
            }
        }
        return null;
    };

    // 1. Exact match
    let result = checkMatch(normName, normSanskrit);
    if (result) return result;

    // 2. Handle specific cases like Pigeon or Chaturanga
    if (normName.includes('pigeon')) {
        const pigeonMatch = checkMatch('pigeonpose');
        if (pigeonMatch) return pigeonMatch;
    }
    if (normName.includes('chaturanga')) {
        const chaturangaMatch = checkMatch('chaturangapose');
        if (chaturangaMatch) return chaturangaMatch;
    }

    // 3. Handle Right/Left/Air/etc by stripping them
    const strippedName = normName.replace(/right|left|air|side/g, '');
    if (strippedName !== normName) {
        result = checkMatch(strippedName);
        if (result) return result;
    }

    // 4. Try partial match
    for (const file of ASANA_IMAGES) {
        const normFile = normalize(file.replace(/\.(png|jpeg|jpg)$/i, ''));
        if (normFile.length > 5 && (normName.includes(normFile) || normFile.includes(normName))) {
            return `/asanas/${file}`;
        }
        if (normSanskrit.length > 5 && (normSanskrit.includes(normFile) || normFile.includes(normSanskrit))) {
            return `/asanas/${file}`;
        }
    }

    // 5. Hardcoded fallbacks
    if (normName.includes('supinetwist')) {
        const twistMatch = checkMatch('supinespinaltwistpose') || checkMatch('supinetwist');
        if (twistMatch) return twistMatch;
    }

    return null;
}
