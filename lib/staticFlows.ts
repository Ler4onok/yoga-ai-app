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
  meditationClosure: "Allow your body to settle completely. You have nowhere to go and nothing to do. Begin to notice the natural rhythm of your breath — you don't need to change it, simply observe it. With each inhale, feel a gentle expansion. With each exhale, feel the mat rise up to hold you even more fully.\n\nNow bring your awareness to the soles of your feet. Let them soften and release. Move that softness slowly upward — through the calves, the knees, the thighs. Feel the hips grow heavy. Let the lower back melt. The belly, the chest, the shoulders — all releasing. The hands open like petals. The jaw unclenches. The space between your eyebrows smooths.\n\nRest here. You are whole. You are enough. This moment of stillness is a gift you have given yourself.\n\nSilently, offer yourself one word of gratitude. It can be anything — peace, strength, presence. Breathe it in.\n\nWhen you are ready, deepen your breath. Allow gentle movement to return — a wiggle of the fingers, a stretch of the arms overhead. Roll slowly onto your right side, into a fetal position, and rest for a moment. Then, with no hurry, press yourself up to a comfortable seat.\n\nBring the palms together at your heart. Bow your head toward your hands. The light in me honours the light in you. Namaste.",
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
          clues: "Sink hips back. Breathe into back ribs. Soften belly with each exhale.",
          description: "Sit on your heels with knees wide and big toes touching. Fold forward, walking hands to the top of the mat and resting your forehead down. Breathe deeply.",
          transition: "Inhale and shift forward to a hands-and-knees tabletop position."
        },

        {
          name: "Neck Circles",
          duration: "4 slow circles each direction",
          clues: "Roll slowly, pause at tension. Drop shoulders away from ears. Breathe — don't force.",
          description: "From a comfortable seated or tabletop position, gently drop your right ear toward your right shoulder, then roll your chin to your chest and over to the left in a slow circle. Pause wherever you feel tension and breathe.",
          transition: "Lift the crown of your head back to centre and sit tall."
        },
        {
          name: "Seated Side Stretch",
          duration: "5 breaths per side",
          clues: "Root opposite sit bone down. Lengthen arm up first, then arc over. Lift ribs away from hips.",
          description: "Sit cross-legged. Plant your left hand on the mat beside your hip. Inhale your right arm up, then arc it to the left, creating a long lateral stretch through your right side body. Keep your chest open.",
          transition: "Return to centre, switch sides, then move to hands-and-knees tabletop."
        },
        {
          name: "Cat-Cow Pose",
          sanskritName: "Marjaryasana-Bitilasana",
          duration: "2 minutes",
          clues: "Lead Cow from tailbone up. Round Cat from tailbone down. One breath, one movement.",
          description: "Start in a neutral tabletop. Inhale, drop your belly and lift your gaze (Cow). Exhale, round your spine, tucking your chin to your chest (Cat). Repeat.",
          transition: "Come back to neutral tabletop, keep wrists stacked under shoulders."
        },
        {
          name: "Bird-Dog",
          duration: "5 breaths per side",
          clues: "Level pelvis — no hip rotation. Draw navel to spine. Extend only as high as back stays neutral.",
          description: "From tabletop, inhale and simultaneously extend your right arm forward and your left leg back, keeping both parallel to the floor. Hold, then exhale to bring them back in. Repeat on the opposite side.",
          transition: "Return to tabletop, tuck your toes, and lift your hips into Downward Dog."
        },
        {
          name: "Downward-Facing Dog",
          sanskritName: "Adho Mukha Svanasana",
          duration: "5 breaths",
          clues: "Spread fingers wide, index fingers forward. Pedal heels to warm calves. Release neck completely.",
          description: "Press through your hands, lift your knees, and send your hips up and back. Form an inverted V-shape. Keep your neck relaxed and spine long.",
          transition: "Inhale, look forward, and walk your feet up to meet your hands."
        },
        {
          name: "Halfway Lift",
          sanskritName: "Ardha Uttanasana",
          duration: "3 breaths",
          clues: "Squeeze shoulder blades together. Keep spine flat, parallel to floor. Touch shins lightly — no weight.",
          description: "Inhale and lift your torso halfway up, lengthening your spine and pressing your head forward. Keep a flat back. Hands can rest on your shins or thighs.",
          transition: "Exhale, hinge from your hips, and fold completely forward."
        },
        {
          name: "Standing Forward Fold",
          sanskritName: "Uttanasana",
          duration: "5 breaths",
          clues: "Nod head yes/no to release neck. Micro-bend knees. Let gravity fold you deeper each exhale.",
          description: "Let your upper body hang heavy over your legs. Keep a micro-bend in your knees to protect your lower back and hamstrings. Relax your head and neck.",
          transition: "Inhale, roll up slowly to stand vertebra by vertebra, and prepare for Sun Salutations."
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
          clues: "Round 1: slow & explore. Round 2: match Ujjayi breath to movement. Round 3: flow.",
          description: "Flow through 11 postures linking breath to movement: Mountain Pose, Upward Salute, Forward Fold, Halfway Lift, Chaturanga, Upward Dog, Downward Dog.",
          transition: "From Downward Dog, step your right foot forward between your hands."
        },
        {
          name: "Warrior I",
          sanskritName: "Virabhadrasana I",
          duration: "5 breaths per side",
          clues: "Draw back hip forward to square hips. Press outer back foot into mat. Lift from the heart up.",
          description: "Step your front foot forward, spin your back heel down to 45 degrees. Reach your arms overhead, palms facing each other. Keep your front knee bent at 90 degrees.",
          transition: "On your next exhale, open your hips and chest out to the side."
        },
        {
          name: "Warrior II",
          sanskritName: "Virabhadrasana II",
          duration: "5 breaths per side",
          clues: "Stack front knee over ankle — don't collapse in. Reach both arms in opposite directions. Stack torso upright.",
          description: "Open your hips and torso to the side. Extend your arms parallel to the floor, reaching out through your fingertips. Gaze over your front middle finger.",
          transition: "Inhale, reach forward with your front hand and hinge at your hip."
        },
        {
          name: "Extended Side Angle",
          sanskritName: "Utthita Parsvakonasana",
          duration: "5 breaths per side",
          clues: "Push through outer back heel. Rotate top shoulder open toward ceiling. One line: heel to fingertip.",
          description: "Bring your front elbow to your thigh. Reach your opposite arm up and over, creating a long line from your outer heel to your fingertips. Twist your chest upward.",
          transition: "From here, inhale and reverse: sweep your top arm back to enter Reverse Warrior."
        },
        {
          name: "Reverse Warrior",
          sanskritName: "Viparita Virabhadrasana",
          duration: "5 breaths per side",
          clues: "Hold front knee at 90° as you arch back. Back hand rests lightly on thigh. Open chest toward ceiling.",
          description: "From Warrior II, flip your front palm up and sweep your arm back overhead, arching gently through your side body. Your back hand glides down the back leg. Gaze up toward the raised fingertips.",
          transition: "Exhale, bring both hands down to frame your front foot, step back, and lower through Chaturanga."
        },
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
          clues: "Hinge from hips, not waist. Inhale: lengthen spine. Exhale: deepen fold. Unclench jaw.",
          description: "Sit tall with legs extended straight in front of you. Flex your feet. Inhale your arms high, then exhale to fold forward from your hips, holding feet or shins.",
          transition: "Inhale, lengthen the spine, then walk your hands back to sit upright."
        },
        {
          name: "Head-to-Knee Pose",
          sanskritName: "Janu Sirsasana",
          duration: "90 seconds per side",
          clues: "Rotate torso toward straight leg. Fold over extended leg — not bent knee. Breathe into the fold, don't force.",
          description: "From seated, bend your left knee and place the sole of your left foot against your inner right thigh. Inhale to lengthen your spine, then exhale and fold forward over your extended right leg, holding your foot, ankle, or shin.",
          transition: "Inhale to rise, straighten both legs, then slowly lower onto your back."
        },
        {
          name: "Supine Spinal Twist",
          sanskritName: "Supta Matsyendrasana",
          duration: "2 minutes per side",
          clues: "Press both shoulders to floor. Lower knees if top shoulder lifts. Soften belly — gravity twists, you don't.",
          description: "Lie on your back, draw your knees to your chest. Lower both knees over to the left side while turning your head and chest to the right. Extend your right arm.",
          transition: "Bring your knees back to center, then drop them to the opposite side."
        },
        {
          name: "Corpse Pose",
          sanskritName: "Savasana",
          duration: "5 minutes",
          clues: "Let feet fall open. Release all effort. Return to breath when mind wanders.",
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
  meditationClosure: "There is nothing left to do.\n\nFeel the floor beneath you — solid, patient, unchanging. Notice how the body has opened. There may be a warmth in the hips, a softness in the spine, a quiet in the jaw you didn't know was clenched.\n\nBring your attention to the breath — not to control it, but simply to witness it. Each inhale is an arrival. Each exhale, a letting go. You don't have to do anything with this moment except be inside it.\n\nNow allow the body to become heavy. Not tired — heavy like the earth itself. Let your limbs dissolve into the floor. Let the floor hold every part of you that you have been holding on your own.\n\nStay here. Breathe.\n\nNotice what arises when you stop doing — a thought, a sensation, a sound in the room. Don't follow it. Simply notice, and return to the breath. Again and again. This is the practice.\n\nWhen you feel ready, begin to deepen your breath. Let it fill the belly, the ribcage, the chest — all the spaces that have opened today.\n\nSlowly wiggle your fingers and toes. Roll your wrists and ankles. Stretch your arms overhead. Roll slowly to one side and rest, curled, like a seed.\n\nTake your time. When you are ready, press gently to a comfortable seat. Let your eyes open softly, without rush.\n\nBow your head toward your heart. You were here. That is enough. Namaste.",
  summary: {
    warmup: "Seated grounding: Easy Pose, Neck Circles, Side Stretch, Easy Twist, Cow Face, Bound Angle, Butterfly, and a forward bend.",
    mainFlow: "Progressive hip and hamstring opening: Dragon, Half Monkey, Half Splits, Full Monkey (if accessible).",
    peak: "Supine deep release — Reclined Hand-to-Big-Toe, Reclined Bound Angle, and Happy Baby.",
    coolDown: "Full dissolution in Supine Twist, then extended Savasana with guided meditation."
  },
  sections: [
    {
      title: "Warm-Up (20 Minutes)",
      asanas: [
        {
          name: "Easy Pose",
          sanskritName: "Sukhasana",
          duration: "2 minutes",
          clues: "Root sit bones down. Lengthen crown toward ceiling. Let hands rest heavy in lap.",
          description: "Sit cross-legged on your mat. If the hips are tight, sit on a folded blanket. Close your eyes, feel the earth beneath you, and begin to settle your breath. This is your arrival.",
          transition: "Remain seated. Begin to slowly drop the right ear toward the right shoulder."
        },
        {
          name: "Neck Circles",
          duration: "4 slow circles each direction",
          clues: "Roll through the front of the throat — never strain. Drop shoulders away from ears. Pause wherever the neck feels sticky.",
          description: "From Easy Pose, slowly roll your head in full circles — ear to shoulder, chin to chest, ear to the other shoulder, head back. Breathe continuously. Pause anywhere that feels dense.",
          transition: "Lift the crown back to center. Inhale your right arm up."
        },
        {
          name: "Seated Side Stretch",
          duration: "5 breaths per side",
          clues: "Root opposite sit bone — don't let it lift. Reach arm up first, then arc sideways. Breathe into the space between the ribs.",
          description: "Plant your left hand beside your hip. Inhale and reach your right arm up, then arc it to the left, creating a long stretch through the right side body. Keep the chest open.",
          transition: "Return to center. Bring hands to knees. Gently twist to the right."
        },
        {
          name: "Easy Twisted Pose",
          sanskritName: "Parivrtta Sukhasana",
          duration: "3 breaths per side",
          clues: "Inhale to lengthen spine first. Exhale to twist from the mid-back. Place back hand behind — don't lean on it.",
          description: "From Easy Pose, place your left hand on your right knee and your right hand behind you. Inhale to lengthen, exhale to rotate. Gaze over your right shoulder. Keep both sit bones grounded.",
          transition: "Return to center. Uncross legs, extend them wide, and bring soles of feet together."
        },
        {
          name: "Cow Face Pose",
          sanskritName: "Gomukhasana",
          duration: "3 minutes per side",
          clues: "Stack knees directly — use a blanket if they don't meet. Sit tall, don't collapse. Fold forward only if the back stays long.",
          description: "Stack your right knee on top of your left. Flex both feet. Option to fold gently forward over stacked legs. Feel the deep external hip rotation.",
          transition: "Slowly uncross legs. Bring soles of feet together for Bound Angle."
        },
        {
          name: "Bound Angle Pose",
          sanskritName: "Baddha Konasana",
          duration: "3 minutes",
          clues: "Press outer edges of feet together — not the soles. Let thighs fall open passively. Spine long before any forward fold.",
          description: "Bring the soles of your feet together and let your knees fall open. Hold the feet or ankles. Sit tall, breathing into the inner groin and hips.",
          transition: "Keep feet connected. Let the spine round forward — Butterfly."
        },
        {
          name: "Butterfly Pose",
          sanskritName: "Baddha Konasana — forward fold",
          duration: "4 minutes",
          clues: "Round through the entire spine — this is a Yin fold, not a flat-back stretch. Let the head hang heavy. Gravity does the work.",
          description: "From Bound Angle, let your spine round forward — head dropping toward feet. Arms reach forward or rest on the floor. Allow the upper back, neck, and hips to release completely.",
          transition: "Walk hands back in. Sit up. Cross legs back into Easy Pose, then fold forward."
        },
        {
          name: "Forward Bend in Easy Pose",
          duration: "3 minutes",
          clues: "Hinge from the hips, not the waist. Walk hands forward until forearms can rest. Breathe into the lower back and sacrum.",
          description: "From Easy Pose, inhale to lengthen the spine, then exhale and walk your hands forward, folding over your crossed legs. Rest your forehead on the mat or hands. Completely passive hold.",
          transition: "Walk hands back. Uncross legs and slowly come to hands and knees — tabletop."
        }
      ]
    },
    {
      title: "Main Flow (25 Minutes)",
      asanas: [
        {
          name: "Cat Cow Pose",
          sanskritName: "Marjaryasana Bitilasana",
          duration: "3 minutes",
          clues: "Inhale, arch spine, gaze up. Exhale, round back, chin to chest. Flow with breath.",
          description: "Start in Tabletop. On an inhale, arch your spine and lift your chest. On an exhale, round your back and tuck your chin toward your chest.",
          transition: "Return to a neutral tabletop with a flat back."
        },
        {
          name: "Bird-Dog",
          sanskritName: "Dandayamana Bharmanasana",
          duration: "2 minutes per side",
          clues: "Reach arm forward. Extend opposite leg back. Pull navel to spine.",
          description: "From tabletop, extend your right arm forward and left leg straight back. Maintain a straight line from fingertips to heel. Switch sides.",
          transition: "Return to hands and knees, prepare for Balancing Tiger."
        },
        {
          name: "Balancing Tiger",
          sanskritName: "Vyaghrasana",
          duration: "2 minutes per side",
          clues: "Kick foot to ceiling. Reach hand to ankle. Open chest forward.",
          description: "From tabletop, extend your right arm forward and left leg back. Bend the left knee, reach the right hand back to bind with the left ankle. Kick upward.",
          transition: "Gently release the bind. Return to tabletop, then walk hands forward — Puppy Pose."
        },
        {
          name: "Puppy Pose",
          sanskritName: "Uttana Shishosana",
          duration: "4 minutes",
          clues: "Keep hips stacked over knees. Press chest toward floor. Reach arms forward.",
          description: "From tabletop, walk your hands forward and melt your heart down toward the mat. Keep your hips stacked directly above your knees.",
          transition: "Inhale, lift chest and walk hands back under shoulders. Step right foot forward outside hands — enter Dragon Pose."
        },
        {
          name: "Dragon Pose",
          sanskritName: "Anjaneyasana variant",
          duration: "5 minutes per side",
          clues: "Gravity opens the hips — don't force. Let the pelvis sink toward the floor with each exhale. Keep the back knee soft on the mat.",
          description: "From tabletop, step your right foot outside your right hand. Slide your left knee back as far as comfortable. Let your hips melt forward and down. Option: hands on blocks.",
          transition: "Stay in Dragon. Walk front foot slightly to the right, then plant the back hand and spiral the chest open — enter Twisted Lizard."
        },
        {
          name: "Twisted Lizard",
          sanskritName: "Parivrtta Utthan Pristhasana",
          duration: "3 minutes per side",
          clues: "Keep front knee stacked over ankle — don't let it collapse in. Reach top arm to ceiling and rotate from the mid-thoracic, not the neck. Let the twist deepen with each exhale.",
          description: "From Dragon Pose, plant your back hand on the mat and spiral your top arm open toward the ceiling, rotating through the chest. Keep the front knee bent at 90°. Option to lower the back knee for more stability.",
          transition: "Unwind the arm. Return both hands to the mat. Slide the front foot back, and heel-toe the opposite leg forward — repeat Dragon then Twisted Lizard on the left side."
        },
        {
          name: "Half Monkey Pose",
          sanskritName: "Ardha Hanumanasana",
          duration: "5 minutes per side",
          clues: "Square hips — both pointing forward. Flex the front foot to protect the hamstring. Fold from the hip crease, not the waist.",
          description: "Shift hips back over the back knee. Straighten the front leg and flex the foot. Hinge from the hips and fold forward over the extended leg. Remain completely passive.",
          transition: "Walk hands back. Bend front knee to a low lunge — slide into Half Splits."
        },
        {
          name: "Half Splits Pose",
          sanskritName: "Ardha Hanumanasana — deep",
          duration: "4 minutes per side",
          clues: "Level the hips — don't let one drop. Breathe into the belly of the hamstring. Use blocks under hands if needed.",
          description: "From low lunge, straighten the front leg completely and flex the foot. Walk hands back alongside the hips. Stay upright or fold forward. Pure passive hamstring release.",
          transition: "If Full Monkey is accessible, slowly walk front foot forward. Otherwise, stay here and breathe 5 more counts."
        },
        {
          name: "Full Monkey Pose",
          sanskritName: "Hanumanasana",
          duration: "3 minutes per side (if accessible)",
          clues: "Use as many blocks as needed — no prize for touching the floor. Square hips — alignment before depth. Breathe through resistance, not past it.",
          description: "From Half Splits, slide the front foot forward and back foot backward into a full front split. Support with blocks. Keep hips squared. Only go as deep as your body allows without pain.",
          transition: "Walk hands back. Bend front knee. Return to tabletop. Rest in Child's Pose 3 breaths, then lie on your back."
        }
      ]
    },

    {
      title: "Cool-Down & Relaxation (15 Minutes)",
      asanas: [
        {
          name: "Reclined Hand-to-Big-Toe Pose",
          sanskritName: "Supta Padangusthasana",
          duration: "3 minutes per side",
          clues: "Press the grounded thigh into the mat — keep it heavy. Flex the raised foot. Hold ankle, shin, or a strap — no gripping.",
          description: "Lie on your back. Extend your right leg to the ceiling, holding your big toe, shin, or using a strap. Keep the left leg active and flat on the mat. Allow the hamstring to release completely.",
          transition: "Lower the leg slowly. Open it wide to the right (3 breaths, inner groin), then return to center. Switch sides."
        },
        {
          name: "Supine Spinal Twist",
          sanskritName: "Supta Matsyendrasana",
          duration: "3 minutes per side",
          clues: "Both shoulders press into the floor. Lower knees if one shoulder lifts. Exhale to soften deeper — gravity twists, you don't.",
          description: "With legs bent, lower both knees to the left. Extend your right arm out at shoulder height. Look right. Breathe deeply into the side ribcage. Completely surrender.",
          transition: "Bring knees back to center. Drop to the opposite side. After both sides, extend legs long."
        },
        {
          name: "Reclined Bound Angle",
          sanskritName: "Supta Baddha Konasana",
          duration: "5 minutes",
          clues: "Support thighs with blocks if inner groin is tight. Arms fall open, palms up. Soften the belly — no bracing.",
          description: "Lie on your back. Bring soles of feet together, knees falling wide. Arms rest slightly away from the body, palms up. Completely passive — breathe and melt.",
          transition: "Bring knees together with your hands. Draw them gently to your chest — enter Happy Baby."
        },
        {
          name: "Happy Baby Pose",
          sanskritName: "Ananda Balasana",
          duration: "3 minutes",
          clues: "Stack ankles over knees. Draw knees toward armpits — not shoulders. Release the lower back to the floor with each exhale.",
          description: "On your back, draw knees to chest. Reach for the outer edges of your feet or ankles. Gently pull knees toward the mat. Option to rock side to side for a sacrum massage.",
          transition: "Release feet. Hug knees briefly, then let them fall to one side — Supine Twist."
        },
        {
          name: "Corpse Pose",
          sanskritName: "Savasana",
          duration: "8 minutes",
          clues: "Let feet fall open. Soften the backs of the hands. Make no adjustments — stay.",
          description: "Extend legs and arms wide. Close your eyes, let go of all physical and mental weight, and allow your body to absorb the shifts from the practice. Enjoy the silence.",
          transition: "Slowly bring gentle movement back into your fingers and toes."
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
  meditationClosure: "Let the heat settle. Feel the weight of your body against the earth — the muscles you challenged, the edges you met.\n\nBring your attention to the physical sensations moving through you: the pulse in your palms, the faint tremor of worked muscles, warmth radiating from your core. Don't push these sensations away. They are proof of presence.\n\nNow scan slowly downward. Crown of the head. Jaw — release any remaining grip. Neck and throat. Shoulders — let them fall wide. Forearms, wrists, fingers. Notice where heat lingers. Honour it.\n\nChest. Belly. The slow rise and fall. Hips, heavy and open. Quads and hamstrings, long and releasing. Knees. Calves. Ankles. Soles of the feet — soften every tiny muscle.\n\nYou have done something difficult today. Feel the difference between the body that stepped onto this mat and the body resting now. That gap — that is your work.\n\nSilently name one quality you brought to this practice: discipline, courage, persistence. Breathe it in. Own it.\n\nWhen you are ready, deepen the breath. Roll your fingers and toes. Stretch your arms long overhead. Roll to your right side. Rest a moment in the fetal position — strength and softness at once. When you are ready, press slowly to a seat.\n\nPalms together at the heart. The effort was yours. The stillness is your reward. Namaste.",
  summary: {
    warmup: "Building deep core heat with Sun Salutation A & B, Dolphin, and shoulder conditioning.",
    mainFlow: "High-intensity standing sequence: Triangle, Reversed Triangle, Warrior I → II → III → Standing Split, Extended Side Angle, Reverse Warrior.",
    peak: "Arm balances and inversions: Boat Pose, Crow Pose, Handstand prep and Handstand hold.",
    coolDown: "Backbend peak with Wheel, then inversions — Bridge, Shoulderstand, Plow — closing with Fish and Savasana."
  },
  sections: [
    {
      title: "Warm-Up (15 Minutes)",
      asanas: [
        {
          name: "Sun Salutation A",
          sanskritName: "Surya Namaskar A",
          duration: "4 rounds",
          clues: "First round: slow and deliberate. Rounds 2–4: Ujjayi breath leads every movement. Lower through Chaturanga with control — no collapse.",
          description: "Perform four full rounds linking breath to movement: Inhale reach up, exhale fold, lift halfway, step back to Chaturanga, press to Upward Dog, exhale to Downward Dog. Each round builds tempo.",
          transition: "From Downward Dog, hold for 3 breaths, then lower knees for Dolphin."
        },
        {
          name: "Sun Salutation B",
          sanskritName: "Surya Namaskar B",
          duration: "3 rounds",
          clues: "Sink deep into Chair — thighs toward parallel. Lock Warrior I hips square. Jump-back from Chair without touching knees.",
          description: "Three rounds adding Chair Pose and Warrior I on both sides. Builds core warmth and targets quads and shoulders. The jump-back is full and controlled.",
          transition: "Exhale, step back to Downward Dog and hold 5 breaths."
        },
        {
          name: "Downward-Facing Dog",
          sanskritName: "Adho Mukha Svanasana",
          duration: "5 breaths",
          clues: "Draw navel to spine. Press index knuckles into mat. Lift sit bones toward ceiling.",
          description: "Stabilize palms shoulder-width, shift weight back, and lift hips high. Spread fingers wide and press through heels. Lengthen the entire spine.",
          transition: "Lower knees, walk hands forward slightly, tuck toes under, lift knees — enter Dolphin."
        },
        {
          name: "Dolphin Pose",
          sanskritName: "Ardha Pincha Mayurasana",
          duration: "8 breaths",
          clues: "Press forearms actively into mat — don't let elbows splay. Lift shoulders away from ears. Walk feet in closer until hips stack over shoulders.",
          description: "From Downward Dog, lower onto forearms shoulder-width apart. Interlace fingers or keep them flat. Lift hips to an inverted V on the forearms. Press chest toward thighs.",
          transition: "Walk feet as close as possible, then lift one leg and hold for 3 breaths each side — Dolphin Single-Leg prep."
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
          clues: "Stack hips vertically — don't tilt forward. Reach the top arm actively toward ceiling. Keep both sides of waist long.",
          description: "Wide step stance, right foot out. Reach right arm forward and fold over right leg, placing hand on shin or floor. Lift left arm straight up, gazing at top hand.",
          transition: "Inhale, lift torso, square hips, rotate torso for Reversed Triangle."
        },
        {
          name: "Reversed Triangle",
          sanskritName: "Parivrtta Trikonasana",
          duration: "5 breaths per side",
          clues: "Square both hips fully — don't cheat the rotation. Press outer edges of both feet into mat. Gaze up only if neck allows.",
          description: "Rotate torso, place left hand outside right foot. Lift right arm straight to the sky. Gaze up at fingertips, maintaining strong straight legs and active core.",
          transition: "Exhale, rotate back to center. Step feet together, then step right foot back. Vinyasa — Chaturanga, Up Dog, Down Dog."
        },
        {
          name: "Warrior I",
          sanskritName: "Virabhadrasana I",
          duration: "5 breaths per side",
          clues: "Draw back hip forward — square both hips to front. Press outer back heel firmly down. Lift arms from the shoulder blades, not the traps.",
          description: "Front knee over heel. Spin back heel down to 45°. Connect palms overhead and gaze up, pressing shoulders down while lifting chest. Hold with intensity.",
          transition: "On exhale, open hips to side for Warrior II — keep front knee bent throughout."
        },
        {
          name: "Warrior II",
          sanskritName: "Virabhadrasana II",
          duration: "5 breaths per side",
          clues: "Front knee over ankle — resist caving in. Reach both arms in opposite directions with equal force. Torso perfectly upright — don't lean forward.",
          description: "Extend arms horizontally. Draw shoulder blades back and down. Front thigh parallel to floor, gazing over front hand. Breathe fire.",
          transition: "Shift weight to front foot, hinge forward at the hip — enter Warrior III."
        },

        {
          name: "Extended Side Angle",
          sanskritName: "Utthita Parsvakonasana",
          duration: "5 breaths per side",
          clues: "Push through outer back heel. Rotate top shoulder open toward ceiling. One diagonal line: outer heel to fingertip.",
          description: "Deep lunge — front elbow to thigh or hand to floor. Reach top arm over the ear. Entire body forms one long, charged diagonal line.",
          transition: "Inhale, reverse — sweep top arm back overhead to enter Reverse Warrior."
        },
        {
          name: "Reverse Warrior",
          sanskritName: "Viparita Virabhadrasana",
          duration: "5 breaths per side",
          clues: "Hold front knee at 90° — resist straightening it as you arch. Back hand on thigh — no weight. Lift ribs up and away from hips.",
          description: "From Warrior II, flip front palm and sweep arm overhead. Back hand glides down back leg. Arch gently through the side body. Gaze up to raised fingertips.",
          transition: "Exhale, both hands frame front foot. Step back, full Vinyasa — Chaturanga, Up Dog, Down Dog. Repeat left side."
        },
        {
          name: "Warrior III",
          sanskritName: "Virabhadrasana III",
          duration: "5 breaths per side",
          clues: "Square both hips toward floor — lifted hip must not open. Flex back foot, spread toes. Reach arms forward to create one horizontal line.",
          description: "From Warrior II, hinge forward from the hip, lifting the back leg to hip height. Arms extend forward, body forms a T-shape parallel to the floor. Engage glutes and core fiercely.",
          transition: "Exhale, slowly lower back foot. Bring hands to hip, square hips forward — enter Standing Split."
        },
        {
          name: "Standing Split",
          sanskritName: "Urdhva Prasarita Eka Padasana",
          duration: "5 breaths per side",
          clues: "Fold torso close to standing leg. Lift the raised leg from the inner thigh, not the outer hip. Keep standing knee micro-bent.",
          description: "Stand on one leg, fold torso toward standing leg, raise the other leg as high as possible. Hands on the floor or ankle. Stack hips squarely.",
          transition: "Bring raised foot down, step back into a full Vinyasa — Chaturanga, Up Dog, Down Dog."
        },
      ]
    },
    {
      title: "Peak Sequence (10 Minutes)",
      asanas: [
        {
          name: "Boat Pose",
          sanskritName: "Navasana",
          duration: "5 breaths, 3 rounds",
          clues: "Hinge from hips — spine long, not rounded. Flex feet, spread toes. Lower to Low Boat between rounds without touching the floor.",
          description: "Balance on sitting bones, lift legs straight to 45°. Extend arms forward parallel to floor. Between rounds, lower to Low Boat (legs hovering 6 inches) and hold 3 breaths.",
          transition: "Cross shins, plant hands shoulder-width, lean forward — prepare to lift into Crow."
        },
        {
          name: "Crow Pose",
          sanskritName: "Bakasana",
          duration: "5–10 breaths, 3 attempts",
          clues: "Look forward — not down. Squeeze knees against triceps. Engage core to lift the hips, not just shift weight forward.",
          description: "Squat, plant hands shoulder-width. Lift hips high, place knees high on triceps. Round the back. Lean forward until feet lift. Aim for a slow, controlled hold.",
          transition: "From Crow, extend both legs back simultaneously — jump-back to Chaturanga."
        },
        {
          name: "Handstand Prep",
          sanskritName: "Adho Mukha Vrksasana Prep",
          duration: "5 attempts, 3 breaths each",
          clues: "Press index knuckles into mat — avoid sinking into wrists. Kick from the hip, not the knee. Stack hips over shoulders before legs.",
          description: "From Downward Dog, walk feet close to hands. Kick one leg up toward the wall or into a free balance, using Dolphin-trained shoulder strength. Focus on stacking — wrists under shoulders, hips over wrists, feet over hips.",
          transition: "Lower down with control. Rest in Child's Pose for 5 breaths, then return to Down Dog."
        },
        {
          name: "Handstand",
          sanskritName: "Adho Mukha Vrksasana",
          duration: "5–10 breaths (use wall if needed)",
          clues: "Spread fingers — grip the mat with fingertips. Zip inner thighs together at the top. Press the floor away actively — don't just hang.",
          description: "From prep, kick or press both feet up. Engage entire body — pointed toes, zipped thighs, braced core, active shoulders pressing mat away. Use the wall for support. Build from 3 to 10 breaths.",
          transition: "Lower slowly. Child's Pose, 10 breaths. Then roll onto your back."
        }
      ]
    },
    {
      title: "Cool-Down & Backbends & Inversions (10 Minutes)",
      asanas: [
        {
          name: "Bridge Pose",
          sanskritName: "Setu Bandhasana",
          duration: "5 breaths, 2 rounds",
          clues: "Press inner thighs toward each other — don't let knees splay. Drive through heels, not toes. Interlace fingers under back to open chest fully.",
          description: "Lie on back, knees bent, feet hip-width. Lift hips high. Interlace fingers under lower back, rolling shoulders under. Hold with strength.",
          transition: "Lower slowly. On second round, pause at the top and prepare to push into Wheel."
        },
        {
          name: "Wheel Pose",
          sanskritName: "Urdhva Dhanurasana",
          duration: "5 breaths, 2 rounds",
          clues: "Press through all four limbs equally. Roll weight onto inner hands — index fingers point forward. Straighten arms fully to open the chest.",
          description: "From Bridge, place hands by ears, fingers pointing toward shoulders. Press into hands and feet simultaneously, lifting hips and crown off the floor. Straighten arms. Open the chest toward the ceiling.",
          transition: "Tuck chin, lower slowly with control. Hug knees to chest, then roll back overhead — enter Shoulderstand."
        },
        {
          name: "Shoulderstand",
          sanskritName: "Salamba Sarvangasana",
          duration: "10 breaths",
          clues: "Weight on upper arms and shoulders — never on neck. Walk elbows closer together. Press feet actively toward ceiling.",
          description: "Roll hips and legs overhead. Support lower back with hands, elbows walking in. Lift feet toward the sky, body vertical. Breathe calmly into the chest.",
          transition: "From Shoulderstand, slowly lower legs overhead into Plow."
        },
        {
          name: "Plow Pose",
          sanskritName: "Halasana",
          duration: "8 breaths",
          clues: "Keep toes active — flex or press them into mat. Maintain weight on shoulders, off cervical spine. Interlace hands on mat for additional traction.",
          description: "From Shoulderstand, slowly lower straight legs over the head until toes touch (or hover above) the floor behind you. Interlace fingers on the mat. Breathe deeply into the back body.",
          transition: "Roll out slowly, vertebra by vertebra, until spine is flat on the mat."
        },
        {
          name: "Fish Pose",
          sanskritName: "Matsyasana",
          duration: "5 breaths",
          clues: "Arch chest, not lower back. Elbows press floor actively. Soften the throat — this is a counter to Shoulderstand, not a backbend competition.",
          description: "Slide hands under hips. Press into elbows and arch chest upward. Rest crown lightly on floor. Take deep chest breaths as a cervical counter-stretch.",
          transition: "Release spine down, relax arms wide, close eyes."
        },
        {
          name: "Corpse Pose",
          sanskritName: "Savasana",
          duration: "5 minutes",
          clues: "Surrender completely — no micro-adjustments. Let feet fall open. Return to breath the moment mind wanders.",
          description: "Lie completely flat. Separate arms and legs from your trunk. Let your breath return to its natural rhythm. Rest in passive, earned stillness.",
          transition: "Gently blink eyes open, roll to right side, and push slowly to seated."
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
