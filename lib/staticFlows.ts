export interface Asana {
  name: string;
  sanskritName?: string;
  clues?: string;
  description: string;
  duration?: string;
  transition?: string;
}

export interface Section {
  title: string;
  asanas: Asana[];
}

export interface YogaFlow {
  title: string;
  slug: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  duration: number;
  style: string;
  focus: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  practiceOpener?: string;
  meditationClosure?: string;
  summary: {
    warmup: string;
    mainFlow: string;
    peak: string;
    coolDown: string;
  };
  sections: Section[];
}

export const BEGINNER_VINYASA_FLOW: YogaFlow = {
  title: "60-Minute Beginner Vinyasa Flow",
  slug: "beginners",
  description: "A gentle and conscious introduction to linking breath with movement. Perfect for beginners to learn foundational postures.",
  metaTitle: "60-Minute Beginner Vinyasa Flow | Yoga Sequence | YoflowAI",
  metaDescription: "Learn foundational yoga postures and transitions with our static 60-minute Beginner Vinyasa Flow. Follow step-by-step visual cues to start your practice today.",
  duration: 60,
  style: "Vinyasa",
  focus: "Beginners",
  difficulty: "Beginner",
  practiceOpener: "Welcome to your mat. Today we will focus on linking breath with movement through a gentle and conscious Vinyasa flow. Let go of any expectations, find a comfortable position, set your intention, and allow yourself to be fully present.",
  meditationClosure: "As you slowly bring awareness back, recognize the space you've created. Thank yourself for showing up today. Roll onto your side, gently push up to a seated position, and close with a deep breath. Namaste.",
  summary: {
    warmup: "Gentle grounding followed by Cat-Cow and Downward Dog.",
    mainFlow: "Sun Salutation A rounds linked with foundational standing postures.",
    peak: "Balancing and core integration with Tree Pose and Warrior III.",
    coolDown: "Grounding stretches finishing with a deep Savasana relaxation."
  },
  sections: [
    {
      title: "Warm-Up (15 Minutes)",
      asanas: [
        {
          name: "Child's Pose",
          sanskritName: "Balasana",
          duration: "3-5 minutes",
          clues: "Sink hips back, breathe into the spine.",
          description: "Sit on your heels with knees wide and big toes touching. Fold forward, walking hands to the top of the mat and resting your forehead down. Breathe deeply.",
          transition: "Inhale and shift forward to a hands-and-knees tabletop position."
        },
        {
          name: "Cat-Cow Pose",
          sanskritName: "Marjaryasana-Bitilasana",
          duration: "2 minutes",
          clues: "Sync motion with breath.",
          description: "Start in a neutral tabletop. Inhale, drop your belly and lift your gaze (Cow). Exhale, round your spine, tucking your chin to your chest (Cat). Repeat.",
          transition: "Find a neutral tabletop, tuck your toes, and prepare to lift your hips."
        },
        {
          name: "Downward-Facing Dog",
          sanskritName: "Adho Mukha Svanasana",
          duration: "5 breaths",
          clues: "Spread fingers wide, bend knees if needed.",
          description: "Press through your hands, lift your knees, and send your hips up and back. Form an inverted V-shape. Keep your neck relaxed and spine long.",
          transition: "Inhale, look forward, and walk your feet up to meet your hands."
        },
        {
          name: "Halfway Lift",
          sanskritName: "Ardha Uttanasana",
          duration: "3 breaths",
          clues: "Pull shoulder blades together, flat back.",
          description: "Inhale and lift your torso halfway up, lengthening your spine of your head forward. Keep flat back. Hands can rest on your shins or thighs.",
          transition: "Exhale, hinge from your hips, and fold completely forward."
        },
        {
          name: "Standing Forward Fold",
          sanskritName: "Uttanasana",
          duration: "5 breaths",
          clues: "Release neck tension completely.",
          description: "Let your upper body hang heavy over your legs. Keep a micro-bend in your knees to protect your lower back and hamstrings. Relax your head and neck.",
          transition: "Inhale, roll up slowly to stand, and prepare for Sun Salutations."
        }
      ]
    },
    {
      title: "Main Flow (25 Minutes)",
      asanas: [
        {
          name: "Sun Salutation A",
          sanskritName: "Surya Namaskar A",
          duration: "3 rounds",
          clues: "Heat the body, move smoothly.",
          description: "Flow through 11 postures linking breath to movement: Mountain Pose, Upward Salute, Forward Fold, Halfway Lift, Chaturanga, Upward Dog, Downward Dog.",
          transition: "From Downward Dog, step your right foot forward between your hands."
        },
        {
          name: "Warrior I",
          sanskritName: "Virabhadrasana I",
          duration: "5 breaths per side",
          clues: "Square hips forward, press outer back foot.",
          description: "Step your front foot forward, spin your back heel down to 45 degrees. Reach your arms overhead, palms facing each other. Keep your front knee bent at 90 degrees.",
          transition: "On your next exhale, open your hips and chest out to the side."
        },
        {
          name: "Warrior II",
          sanskritName: "Virabhadrasana II",
          duration: "5 breaths per side",
          clues: "Front knee over front ankle.",
          description: "Open your hips and torso to the side. Extend your arms parallel to the floor, reaching out through your fingertips. Gaze over your front middle finger.",
          transition: "Inhale, reach forward with your front hand and hinge at your hip."
        },
        {
          name: "Extended Side Angle",
          sanskritName: "Utthita Parsvakonasana",
          duration: "5 breaths per side",
          clues: "Keep back leg strong, open chest.",
          description: "Bring your front elbow to your thigh. Reach your opposite arm up and over, creating a long line from your outer heel to your fingertips. Twist your chest upward.",
          transition: "Exhale, circle your hands down to the mat, step back and lower to your belly."
        },
        {
          name: "Cobra Pose",
          sanskritName: "Bhujangasana",
          duration: "5 breaths",
          clues: "Keep shoulders away from ears.",
          description: "Lie flat on your belly with hands under your shoulders. Pressing tops of feet down, inhale to gently lift your chest using your back muscles. Keep elbows close.",
          transition: "Exhale, push back through tabletop, and lift hips into Downward Dog."
        }
      ]
    },
    {
      title: "Peak Sequence (10 Minutes)",
      asanas: [
        {
          name: "Tree Pose",
          sanskritName: "Vrksasana",
          duration: "5 breaths per side",
          clues: "Find a still point (drishti) to watch.",
          description: "Stand tall on your left leg. Place the sole of your right foot on your ankle, calf, or inner thigh. Avoid the knee. Bring your palms together at your chest.",
          transition: "Release your foot down, step wide, and prepare to shift balance."
        },
        {
          name: "Warrior III",
          sanskritName: "Virabhadrasana III",
          duration: "3 breaths per side",
          clues: "Flex back foot, ground standing leg.",
          description: "Shift your weight to your right foot. Lean your torso forward as you lift your left leg straight back, parallel to the ground. Reach arms forward or alongside your body.",
          transition: "Gently step both feet together, fold forward, and come to sit on the mat."
        }
      ]
    },
    {
      title: "Cool-down & Relaxation (10 Minutes)",
      asanas: [
        {
          name: "Seated Forward Fold",
          sanskritName: "Paschimottanasana",
          duration: "2 minutes",
          clues: "Breathe length into your spine.",
          description: "Sit tall with legs extended straight in front of you. Flex your feet. Inhale your arms high, then exhale to fold forward from your hips, holding feet or shins.",
          transition: "Inhale, rise up, and slowly lower yourself down onto your back."
        },
        {
          name: "Supine Spinal Twist",
          sanskritName: "Supta Matsyendrasana",
          duration: "2 minutes per side",
          clues: "Relax both shoulders onto the floor.",
          description: "Lie on your back, draw your knees to your chest. Lower both knees over to the left side while turning your head and chest to the right. Extend your right arm.",
          transition: "Bring your knees back to center, then drop them to the opposite side."
        },
        {
          name: "Corpse Pose",
          sanskritName: "Savasana",
          duration: "5 minutes",
          clues: "Completely surrender to gravity.",
          description: "Extend your legs and arms wide. Close your eyes, let go of any controlled breathing, and allow your entire body to become completely heavy and relaxed.",
          transition: "Gently blink open your eyes to finish your session."
        }
      ]
    }
  ]
};

export const FLEXIBILITY_YIN_FLOW: YogaFlow = {
  title: "60-Minute Yin Flexibility Flow",
  slug: "flexibility",
  description: "A calming Yin yoga practice targeting connective tissues, hips, and hamstrings. Features long passive holds to cultivate flexibility and inner stillness.",
  metaTitle: "60-Minute Yin Flexibility Flow | Yoga Sequence | YoflowAI",
  metaDescription: "Release deep tension and restore elasticity to your hips and connective tissues with this static 60-minute Yin Flexibility Flow. Perfect for post-workout or recovery.",
  duration: 60,
  style: "Yin",
  focus: "Flexibility",
  difficulty: "Beginner",
  practiceOpener: "Welcome to this Yin yoga class. Today, our focus is on deep release, targeting the connective tissues, ligaments, and fascia. Every pose will be held for several minutes. Emphasize yielding over effort, breathing deep, and surrendering to gravity.",
  meditationClosure: "Slowly bring movement back. Feel the renewed flow of energy and open space throughout your body. Carry this peace, patience, and ease with you today. Namaste.",
  summary: {
    warmup: "Passive hip openers starting with Butterfly pose and Sphinx.",
    mainFlow: "Deep hamstring and hip flexor stretches with Dragon and Half Splits.",
    peak: "Deep hip release using Sleeping Pigeon pose with long active holds.",
    coolDown: "Release of spine and limbs through Happy Baby, Supine Twist, and Savasana."
  },
  sections: [
    {
      title: "Warm-Up (15 Minutes)",
      asanas: [
        {
          name: "Butterfly Pose",
          sanskritName: "Baddha Konasana",
          duration: "5 minutes",
          clues: "Soften hips, round the spine.",
          description: "Sit on your mat, bend your knees, and press the soles of your feet together. Let your knees fall open. Hinge forward from your hips, rounding your back and relaxing your head.",
          transition: "Inhale, slowly walk your hands back to your hips, and extend your legs."
        },
        {
          name: "Sphinx Pose",
          sanskritName: "Salamba Bhujangasana",
          duration: "5 minutes",
          clues: "Soften buttocks, let neck relax.",
          description: "Lie flat on your belly. Place your elbows directly under your shoulders, forearms flat on the floor. Melt your shoulders down and lift your chest softly. Remain passive.",
          transition: "Press your palms down, glide back onto your heels, and rest."
        },
        {
          name: "Child's Pose",
          sanskritName: "Balasana",
          duration: "5 minutes",
          clues: "Inhale deep into back ribs.",
          description: "Separate your knees wide, draw your big toes to touch, and sink your hips back onto your heels. Rest your forehead on the mat and relax your arms forward.",
          transition: "Inhale, rise up to tabletop, and prepare for Dragon pose."
        }
      ]
    },
    {
      title: "Main Flow (25 Minutes)",
      asanas: [
        {
          name: "Dragon Pose",
          sanskritName: "Anjaneyasana variant",
          duration: "5 minutes per side",
          clues: "Do not push; gravity opens the hips.",
          description: "From tabletop, step your right foot outside your hands. Slide your left knee back as far as possible, resting it on the floor. Let your hips sink forward and down.",
          transition: "Slowly press your hips back to center, sliding your front leg straight."
        },
        {
          name: "Half Monkey Pose",
          sanskritName: "Ardha Hanumanasana",
          duration: "5 minutes per side",
          clues: "Keep hips squared, target hamstrings.",
          description: "Slide your hips back so they align above your back knee. Straighten your front leg, flexing your foot. Hinge at your hips and fold passenger-style over your leg.",
          transition: "Inhale, bend the front knee to step back to tabletop, then repeat on opposite side."
        },
        {
          name: "Sphinx Pose",
          sanskritName: "Salamba Bhujangasana",
          duration: "5 minutes",
          clues: "Relax pubic bone on the mat.",
          description: "Return to your belly, placing elbows under shoulders to gently arch your back. Allow all tension in your glutes, legs, and spine to dissolve as you hold.",
          transition: "Exhale, rest your forehead on your hands for a few breaths."
        }
      ]
    },
    {
      title: "Peak Sequence (10 Minutes)",
      asanas: [
        {
          name: "Pigeon Pose",
          sanskritName: "Eka Pada Rajakapotasana",
          duration: "5 minutes per side",
          clues: "Support hip with prop if elevated.",
          description: "Bring your right knee forward behind your right wrist and angle your shin. Extend your left leg straight back. Slowly lower your chest forward, resting on elbows or hands.",
          transition: "Inhale, lift your chest, press back into Downward Dog, then switch sides."
        }
      ]
    },
    {
      title: "Cool-down & Relaxation (10 Minutes)",
      asanas: [
        {
          name: "Happy Baby Pose",
          sanskritName: "Ananda Balasana",
          duration: "3 minutes",
          clues: "Keep shoulders relaxed, flex feet.",
          description: "Lay on your back and pull your knees toward your chest. Reach for the outer edges of your feet. Draw your knees down toward your shoulders keeping tailbone long.",
          transition: "Gently release your feet, hug your knees close for a brief moment."
        },
        {
          name: "Supine Spinal Twist",
          sanskritName: "Supta Matsyendrasana",
          duration: "3 minutes per side",
          clues: "Let gravity hold the twist.",
          description: "With legs bent, lower both knees to the left. Extend your right arm out to the side and look over your right shoulder. Breathe deeply into the side ribcage.",
          transition: "Bring your knees back to center, then drop them to the opposite side."
        },
        {
          name: "Corpse Pose",
          sanskritName: "Savasana",
          duration: "8 minutes",
          clues: "Enjoy this deep, passive rest.",
          description: "Extend your legs and arms wide. Close your eyes, let go of all physical and mental weight, and allow your body to absorb the shifts. Enjoy the silence.",
          transition: "Slowly bring gentle movements into your fingers and toes."
        }
      ]
    }
  ]
};

export const STRENGTH_ASHTANGA_FLOW: YogaFlow = {
  title: "60-Minute Ashtanga Strength Flow",
  slug: "strength",
  description: "A powerful, dynamic sequence modifying the Ashtanga Primary Series. Built to cultivate core strength, balance, and focus.",
  metaTitle: "60-Minute Ashtanga Strength Flow | Yoga Sequence | YoflowAI",
  metaDescription: "Build deep core fire, full-body power, and focus with this static 60-minute modified Ashtanga primary sequence. Ideal for experienced practitioners.",
  duration: 60,
  style: "Ashtanga",
  focus: "Strength",
  difficulty: "Advanced",
  practiceOpener: "Welcome to this dynamic strength practice. Drawing from the Ashtanga tradition, we will build fire, discipline, and core stability. Rely on your steady Ujjayi breath to maintain focus and lift throughout the practice.",
  meditationClosure: "Quiet your mind. Observe the heat and stillness combined. Savor the physical resonance of your hard work. Carry this strength and stability with you off the mat. Namaste.",
  summary: {
    warmup: "Building deep core heat with multiple rounds of Sun Salutation A & B.",
    mainFlow: "High-intensity standing postures including Triangle and Extended Side Angle.",
    peak: "Core and arm balances with Boat Pose and Crow Pose challenges.",
    coolDown: "Inversions, spinal traction, and restorative recovery."
  },
  sections: [
    {
      title: "Warm-Up (15 Minutes)",
      asanas: [
        {
          name: "Sun Salutation A",
          sanskritName: "Surya Namaskar A",
          duration: "3 rounds",
          clues: "Deepen the Ujjayi breath.",
          description: "Perform three full rounds linking breath to movement: Inhale reach up, exhale fold, lift halfway, step back to Chaturanga, lift to Upward Dog, exhale to Downward Dog.",
          transition: "Step or hop forward into a standing posture."
        },
        {
          name: "Sun Salutation B",
          sanskritName: "Surya Namaskar B",
          duration: "2 rounds",
          clues: "Coordinate movement with breath.",
          description: "Perform two rounds adding Chair Pose (Utkatasana) and Warrior I (Virabhadrasana I) on both sides. Builds core warmth and targets quads and shoulders.",
          transition: "Exhale, step back to plank and push up into Downward Dog."
        },
        {
          name: "Downward-Facing Dog",
          sanskritName: "Adho Mukha Svanasana",
          duration: "5 breaths",
          clues: "Pull belly button to spine.",
          description: "Stabilize your palms on the mat, shift your weight back, and lift your hips high. Spread your fingers wide and press through your heels to find hamstring extension.",
          transition: "Inhale, step your right foot forward, extending your legs straight."
        }
      ]
    },
    {
      title: "Main Flow (25 Minutes)",
      asanas: [
        {
          name: "Triangle Pose",
          sanskritName: "Utthita Trikonasana",
          duration: "5 breaths per side",
          clues: "Keep both sides of waist long.",
          description: "In step stance, turn right foot out. Reach right arm forward and fold over right leg, placing hand on shin or floor. Lift left arm straight up, looking at left hand.",
          transition: "Inhale, lift your torso, square your hips, and reverse your arms."
        },
        {
          name: "Revolved Triangle",
          sanskritName: "Parivrtta Trikonasana",
          duration: "5 breaths per side",
          clues: "Square hips, press feet firm.",
          description: "Rotate your torso, place your left hand outside your right foot. Lift your right arm straight up toward the sky. Gaze up at your fingertips, maintaining strong legs.",
          transition: "Exhale, rotate back to center, bend front knee and reach up."
        },
        {
          name: "Extended Side Angle",
          sanskritName: "Utthita Parsvakonasana",
          duration: "5 breaths per side",
          clues: "Solid line from heel to fingertip.",
          description: "Deeply bend your front knee at 90 degrees. Place your front hand on the floor outside the foot, and sweep your opposite arm overhead alongside your ear.",
          transition: "Inhale, press through your feet to stand, and square hips forward."
        },
        {
          name: "Warrior I",
          sanskritName: "Virabhadrasana I",
          duration: "5 breaths per side",
          clues: "Ground outer edge of back foot.",
          description: "Bring your front knee directly over your heel. Connect your palms together overhead and gaze up, pressing your shoulders down while lifting your chest.",
          transition: "Exhale, open your hips and adjust your foot spacing."
        },
        {
          name: "Warrior II",
          sanskritName: "Virabhadrasana II",
          duration: "5 breaths per side",
          clues: "Engage quads, tuck pelvis slightly.",
          description: "Extend your arms out horizontally. Draw your shoulder blades back and down. Keep your front thigh parallel to the floor, gazing forward over your right hand.",
          transition: "Exhale, wind-wheel your hands down, step back, and sit down."
        }
      ]
    },
    {
      title: "Peak Sequence (10 Minutes)",
      asanas: [
        {
          name: "Boat Pose",
          sanskritName: "Navasana",
          duration: "5 breaths, 3 attempts",
          clues: "Keep back flat, use core.",
          description: "Balance on your sitting bones, lifting your legs straight to 45 degrees. Extend your arms forward, keeping them parallel to the floor. Engage your core, keep chest lifted.",
          transition: "Exhale, cross your shins, plant your hands, and prepare to lift your hips."
        },
        {
          name: "Crow Pose",
          sanskritName: "Bakasana",
          duration: "3-5 breaths, 3 attempts",
          clues: "Look forward, squeeze knees in.",
          description: "Squat down, planting your hands shoulder-width apart. Lift your hips and place your knees high up on your triceps. Lean forward, lifting your feet off the mat.",
          transition: "Step or jump back to Chaturanga, flow to Downward Dog, and lie down on back."
        }
      ]
    },
    {
      title: "Cool-down & Relaxation (10 Minutes)",
      asanas: [
        {
          name: "Bridge Pose",
          sanskritName: "Setu Bandhasana",
          duration: "5 breaths, 2 rounds",
          clues: "Press inner thighs down.",
          description: "Lie on your back, knees bent, feet hip-width. Lift your hips toward the ceiling. Interlace your fingers underneath your lower back, rolling your shoulders under.",
          transition: "Slowly release your spine down vertebral segment by segment."
        },
        {
          name: "Shoulderstand",
          sanskritName: "Salamba Sarvangasana",
          duration: "10 breaths",
          clues: "Keep weight on shoulders, not neck.",
          description: "Roll your hips and legs overhead in one motion. Support your lower back with your hands. Walk your elbows in, and lift your feet up toward the sky.",
          transition: "Slowly lower your legs overhead, then roll out flat on your back."
        },
        {
          name: "Fish Pose",
          sanskritName: "Matsyasana",
          duration: "5 breaths",
          clues: "Open throat, arch spine.",
          description: "Lie on your back, slide hands under hips. Press into your elbows and arch your chest up. Gently rest the crown of your head on the floor. Take deep chest breaths.",
          transition: "Release your spine down, relax your legs and arms, and close eyes."
        },
        {
          name: "Corpse Pose",
          sanskritName: "Savasana",
          duration: "5 minutes",
          clues: "Let all effort melt away.",
          description: "Lay completely flat. Separate your arms and legs away from your trunk. Allow your breath to return to its natural rhythm. Rest fully in passive awareness.",
          transition: "Blink eyes open, roll onto your right side, and push to a seated position."
        }
      ]
    }
  ]
};

export const STATIC_FLOWS = {
  beginners: BEGINNER_VINYASA_FLOW,
  flexibility: FLEXIBILITY_YIN_FLOW,
  strength: STRENGTH_ASHTANGA_FLOW
};
