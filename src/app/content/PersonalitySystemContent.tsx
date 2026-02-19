import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Personality System (OCEAN)

Every ClawdBlox NPC has a unique personality grounded in the **Big Five** model of psychology — the most widely validated framework for describing human personality. Instead of scripting personality through dialogue trees, MemoryWeave computes personality mathematically and lets the AI generate behavior that naturally emerges from trait scores.

---

## The OCEAN Model

OCEAN stands for the five core personality dimensions. Each trait is scored on a **0-100 scale**:

\`\`\`
  O ████████████████████░░░░░░░░░░  72  Openness
  C ██████████░░░░░░░░░░░░░░░░░░░░  35  Conscientiousness
  E ████████████████████████░░░░░░  82  Extraversion
  A ██████████████████░░░░░░░░░░░░  60  Agreeableness
  N ████████░░░░░░░░░░░░░░░░░░░░░░  28  Neuroticism
\`\`\`

---

## Trait Breakdown

### Openness (0-100)

Measures curiosity, creativity, and willingness to explore new ideas.

| Score Range | Behavioral Impact |
|---|---|
| **0-25** (Low) | Practical, conventional, prefers routine. Sticks to known topics. Uses simple, direct language. |
| **25-50** (Below Average) | Somewhat traditional but open to new ideas when presented convincingly. |
| **50-75** (Above Average) | Curious and imaginative. Asks questions, explores tangents, uses metaphors. |
| **75-100** (High) | Highly creative, philosophical, artistic. Prone to abstract thinking. May go on tangents about ideas. |

### Conscientiousness (0-100)

Measures organization, discipline, and attention to detail.

| Score Range | Behavioral Impact |
|---|---|
| **0-25** (Low) | Disorganized, spontaneous, easily distracted. May forget promises or lose track of conversations. |
| **25-50** (Below Average) | Somewhat relaxed about structure. Keeps main commitments but misses details. |
| **50-75** (Above Average) | Organized and reliable. Follows through on promises. Gives structured, clear answers. |
| **75-100** (High) | Meticulous, perfectionist. Corrects details, offers step-by-step plans, remembers everything precisely. |

### Extraversion (0-100)

Measures sociability, energy, and assertiveness.

| Score Range | Behavioral Impact |
|---|---|
| **0-25** (Low) | Reserved, quiet, prefers one-on-one. Short responses, needs warming up. Avoids small talk. |
| **25-50** (Below Average) | Comfortable in conversation but does not initiate. Measured responses. |
| **50-75** (Above Average) | Friendly and talkative. Initiates topics, asks about the player's life, shares stories. |
| **75-100** (High) | Enthusiastic, loud, dominant in conversation. Exclaims, jokes, interrupts with excitement. |

### Agreeableness (0-100)

Measures cooperation, empathy, and warmth.

| Score Range | Behavioral Impact |
|---|---|
| **0-25** (Low) | Blunt, confrontational, skeptical. May insult or challenge the player. Does not sugarcoat. |
| **25-50** (Below Average) | Direct and honest. Will disagree openly but without hostility. |
| **50-75** (Above Average) | Warm and helpful. Tries to find common ground. Offers assistance proactively. |
| **75-100** (High) | Extremely kind, self-sacrificing. Avoids conflict at all costs. Compliments frequently. |

### Neuroticism (0-100)

Measures emotional instability, anxiety, and mood variability.

| Score Range | Behavioral Impact |
|---|---|
| **0-25** (Low) | Calm, stable, unflappable. Rarely expresses worry or stress. Steady tone. |
| **25-50** (Below Average) | Generally composed. May show concern in serious situations but recovers quickly. |
| **50-75** (Above Average) | Prone to worry and mood shifts. May express anxiety, second-guess decisions. |
| **75-100** (High) | Highly emotional, volatile. Frequent mood swings, overreacts to small events, catastrophizes. |

---

## Speaking Style

Beyond the OCEAN scores, each NPC has a configurable **speaking style** that defines how they express their personality through language:

\`\`\`typescript
interface SpeakingStyle {
  vocabulary: string;     // "simple" | "moderate" | "sophisticated" | "archaic"
  formality: string;      // "very_casual" | "casual" | "neutral" | "formal" | "very_formal"
  humor: string;          // "none" | "dry" | "witty" | "slapstick" | "dark" | "sarcastic"
  quirks: string[];       // ["stutters when nervous", "uses nautical terms", ...]
  catchphrases: string[]; // ["By the stars!", "Well now...", ...]
}
\`\`\`

### Vocabulary

| Level | Example |
|---|---|
| Simple | "That's bad. We should go." |
| Moderate | "That's concerning. We should leave soon." |
| Sophisticated | "The situation has deteriorated considerably. I suggest we make our departure." |
| Archaic | "A grievous turn of fate befalls us. Let us take our leave, posthaste." |

### Formality

| Level | Example Greeting |
|---|---|
| Very Casual | "yo, what's up" |
| Casual | "hey there, good to see you" |
| Neutral | "Hello, welcome back." |
| Formal | "Good day. It is a pleasure to see you again." |
| Very Formal | "Greetings, esteemed visitor. Your presence honors this establishment." |

### Humor

| Type | Example Response to "Nice weather today" |
|---|---|
| None | "Yes, the weather is clear today." |
| Dry | "Stunning observation. Truly groundbreaking meteorology." |
| Witty | "The sun came out just for you, I'm sure of it." |
| Slapstick | "Last time it rained, I slipped and fell into my own soup pot!" |
| Dark | "Enjoy it while it lasts. Nothing good stays." |
| Sarcastic | "Oh wow, did you figure that out all by yourself?" |

### Quirks and Catchphrases

Quirks are behavioral patterns that add texture to the NPC's speech:

- *"Always ends sentences with a nautical reference"*
- *"Stutters when talking to authority figures"*
- *"Randomly inserts cooking metaphors"*
- *"Whispers when sharing secrets"*

Catchphrases are signature lines the NPC uses naturally:

- *"By the twin moons!"*
- *"That's the way the cookie crumbles, friend."*
- *"Mark my words..."*

---

## AI Generation from Descriptions

Developers do not need to manually set every OCEAN score and speaking style parameter. MemoryWeave can **generate a complete personality** from a plain text description:

\`\`\`
Input:  "A grumpy old blacksmith who secretly has a heart of gold.
         He's been working the forge for 40 years and has seen everything.
         Speaks in short, blunt sentences but will go out of his way
         to help anyone in genuine need."

Output:
  OCEAN Scores:
    Openness:           35  (set in his ways, practical)
    Conscientiousness:  78  (master craftsman, disciplined)
    Extraversion:       28  (grumpy, not talkative)
    Agreeableness:      62  (secretly kind, helpful when it matters)
    Neuroticism:        22  (stable, unflappable after 40 years)

  Speaking Style:
    Vocabulary:    "simple"
    Formality:     "casual"
    Humor:         "dry"
    Quirks:        ["speaks in short, blunt sentences",
                    "grumbles about his aching back",
                    "references forge metaphors"]
    Catchphrases:  ["Hmph.", "Back in my day...",
                    "The steel doesn't lie."]
\`\`\`

The generation uses an LLM prompt that:

1. Analyzes the description for personality cues
2. Maps those cues to OCEAN trait scores
3. Infers appropriate speaking style parameters
4. Generates quirks and catchphrases that fit the character

---

## How Personality Affects Conversations

During every conversation, the NPC's personality is injected into the system prompt:

\`\`\`
[PERSONALITY]
Your OCEAN personality scores (0-100):
- Openness: 35 (practical, conventional, prefers routine)
- Conscientiousness: 78 (disciplined, detail-oriented, reliable)
- Extraversion: 28 (reserved, prefers brief exchanges)
- Agreeableness: 62 (kind-hearted but not openly warm)
- Neuroticism: 22 (calm, emotionally stable)

Your speaking style:
- Vocabulary: simple, working-class
- Formality: casual
- Humor: dry, understated
- Quirks: speaks in short blunt sentences, grumbles about aching back,
  uses forge metaphors
- Catchphrases: "Hmph.", "Back in my day...", "The steel doesn't lie."

Stay in character at all times. Your personality should naturally
influence your word choice, sentence length, emotional reactions,
and willingness to engage.
[/PERSONALITY]
\`\`\`

The AI then generates responses that consistently reflect these traits without the developer scripting individual dialogue lines.

---

## Personality + Memory Interaction

Personality does not exist in isolation — it interacts with the memory system:

- A **high Conscientiousness** NPC recalls past promises with precision: *"You said you'd bring the ore three days ago."*
- A **high Neuroticism** NPC dwells on negative memories: *"Last time someone said that, it ended badly..."*
- A **high Openness** NPC connects unrelated memories creatively: *"Your story about the mountain reminds me of something the old traveler once said..."*
- A **low Agreeableness** NPC recalls slights more readily: *"I haven't forgotten what you did to my shop."*

---

## What's Next?

- [Life Simulation](/docs/memoryweave/life-simulation) — How routines, goals, and relationships add depth
- [Conversation Pipeline](/docs/memoryweave/conversation-pipeline) — How personality is assembled into prompts
- [Semantic Memory](/docs/memoryweave/semantic-memory) — How memories are stored and retrieved
`;

export function PersonalitySystemContent() {
  return <MarkdownContent content={content} />;
}
