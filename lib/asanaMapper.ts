export const ASANA_IMAGES = [
    "boat_pose.png", "bound_angle_pose.png", "bow_pose.png", "bridge_pose.png", "camel_pose.png", "cat_pose.png",
    "chair_pose.png", "childs_pose.png", "cobra_pose.png", "cobra_pose_2.png", "compass_pose.png", "corpse_pose.png",
    "cow_face_pose.png", "cow_pose.png", "crane_pose.png", "crescent_lunge_twist.png", "crow_pose.png", "dancer_pose.png",
    "dolphin_pose.png", "downward_facing_dog.png", "dragon_pose.png", "easy_pose.png", "eight-angle_pose.png",
    "extended_hand_to_big_toe_b.png", "fallen_triangle.png", "fire_log_pose.png", "firefly_pose.png", "fish_pose.png",
    "flying_pigeon.png", "forearm_plank.png", "forearm_stand.png", "forward_fold.png", "four-limbed_staff_pose.png",
    "garland_pose.png", "gate_pose.png", "goddess_pose.png", "half_boat_pose.png", "half_moon_pose.png", "halfway_lift.png",
    "handstand.png", "happy_baby.png", "head_to_knee_pose.png", "headstand.png", "hero_pose.png", "heron_pose.png",
    "high_lunge.png", "knees_to_chest.png", "legs_up_the_wall.png", "lizard_pose.png", "lotus_pose.png", "low_lunge.png",
    "marichis_pose.png", "monkey_pose.png", "mountain_pose.png", "noose_pose.png", "peacock_pose.png", "pigeon_pose.png",
    "plank_pose.png", "plow_pose.png", "puppy_pose.png", "pyramid_pose.png", "ragdoll_pose.png", "reclined_bound_angle.png",
    "reclined_hand_to_big_toe.png", "reclining_hero.png", "reverse_table_top.png", "revolved_chair.png", "revolved_half_moon.png",
    "revolved_triangle.png", "scale_pose.png", "seated_forward_fold.png", "seated_twist.png", "shoulder_pressing_pose.png",
    "shoulderstand.png", "side_crow.png", "side_plank.png", "sleeping_pigeon.png", "sphinx_pose.png", "staff_pose.png",
    "standing_backbend.png", "standing_hand_to_big_toe.png", "standing_split.png", "supine_twist.png", "supported_headstand.png",
    "thread_the_needle.png", "thunderbolt_pose.png", "tortoise_pose.png", "tree_pose.png", "twisted_lizard.png",
    "upward_facing_dog.png", "upward_salute.png", "warrior_i.png", "warrior_ii.png", "warrior_iii.png", "wheel_pose.png",
    "wide-angle_seated_forward_fold.png", "wide-legged_forward_fold.png", "wild_thing.png", "wind_relieving_pose.png"
];

export function getAsanaImage(name: string, sanskritName?: string): string | null {
    const normalize = (str?: string) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');

    const normName = normalize(name);
    const normSanskrit = normalize(sanskritName);

    for (const file of ASANA_IMAGES) {
        const normFile = normalize(file.replace('.png', ''));
        if (normFile === normName || (normSanskrit && normFile === normSanskrit)) {
            return `/asanas/${file}`;
        }
    }

    // Second pass: try partial match
    for (const file of ASANA_IMAGES) {
        const normFile = normalize(file.replace('.png', ''));
        if (normName.length > 5 && normFile.includes(normName)) {
            return `/asanas/${file}`;
        }
        if (normSanskrit.length > 5 && normFile.includes(normSanskrit)) {
            return `/asanas/${file}`;
        }
    }

    return null;
}
