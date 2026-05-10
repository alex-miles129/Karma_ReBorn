'use client';

import { useState } from 'react';

const ruleCategories = [
  {
    id: 'general',
    title: 'General Rules',
    subtitle: 'Standards to keep roleplay immersive, fair, and enjoyable for everyone in Karma ReBorn.',
    featured: {
      tag: 'BUSINESS POLICY UPDATE',
      title: 'ACTIVE BUSINESS MANAGEMENT AND NO REFUND TERMS',
      description: 'If a business is not managed after two warnings, it may be resold to an active player. All payments and purchases are final with no refunds.'
    },
    rules: [
      { id: '01', title: 'Stay Updated', description: 'Staying updated on any rule modifications on our website or Discord is your responsibility.' },
      { id: '02', title: 'DMCA & Copyright', description: 'Playing content that is protected by copyright (DMCA) is strictly prohibited. This includes copyrighted movies, music, and other protected materials. Maintain a lawful and respectful environment.' },
      { id: '03', title: 'Microphone Requirement', description: 'You must have a working, clear microphone.' },
      { id: '04', title: 'Prohibited Content', description: 'Engaging in Erotic Roleplay (ERP) is strictly prohibited. Real-life events roleplay (suicide, terrorism, pandemics) is also prohibited.' },
      { id: '05', title: 'Zero Tolerance', description: 'Zero-tolerance policy towards racism, trolling, discrimination, homophobia, and sexism. Influencing or encouraging others to break rules is prohibited.' }
    ]
  },
  {
    id: 'roleplay',
    title: 'Roleplay Rules',
    subtitle: 'Core mechanics of interaction, combat, and character knowledge.',
    rules: [
      { id: '01', title: 'Character Breaking', description: "Should any complications arise, we'll immerse ourselves fully in the scenario and handle it accordingly. Players are encouraged to submit reports if necessary, ensuring they remain in character at all times. Remember, you can use the out-of-character chat (/me /OOC) to notify players if they're straying from the rules within the game world. We'll maintain the integrity of the roleplay without resorting to actions that might entice others to break character. Let's keep the experience authentic and enjoyable for everyone involved." },
      { id: '02', title: 'Cop Baiting', description: "Cop baiting involves provoking or antagonising law enforcement officers to initiate a chase or confrontation. This behaviour is deemed non-roleplay (non-RP) as it does not reflect realistic actions one would take in real life. Engaging in cop baiting is strictly prohibited, and individuals found engaging in such behaviour will face disciplinary action, including potential banning from the game. Let's maintain a respectful and immersive roleplay environment by refraining from cop-baiting." },
      { id: '03', title: 'Random Death Match (RDM)', description: "Random Death Match (RDM) refers to eliminating or killing another player without establishing a roleplay scenario or valid interaction beforehand. In our roleplay environment, engaging in meaningful interactions with other players is essential before resorting to such drastic actions. Killing another player without a proper or valid reason disrupts the immersive experience and undermines the integrity of the game. Let's prioritise establishing meaningful interactions and roleplay scenarios before considering any form of conflict or violence. This ensures a more engaging and enjoyable experience for all participants." },
      { id: '04', title: 'Vehicle DeathMatch (VDM)', description: "Engaging in Vehicle DeathMatch (VDM), which involves intentionally running over and killing other players with vehicles or colliding with other players' vehicles without roleplaying the situation, is strictly prohibited in our community. This behaviour disrupts the immersive roleplay experience and threatens all participants' enjoyment and safety. It is important to uphold roleplay standards by engaging in meaningful interactions and scenarios before resorting to any form of vehicular conflict. Violating this rule may result in severe consequences, including the possibility of being banned from the game. Let's prioritise respectful and immersive roleplay to ensure a positive experience for everyone involved." },
      { id: '05', title: 'Meta Gaming', description: "Meta Gaming, which involves using real-life knowledge to influence in-game actions or gain an advantage in roleplay situations, is strictly prohibited and considered a bannable offence. Additionally, engaging in normal roleplay with friends while using third-party communication platforms such as Discord voice channels is also against the rules. Players are not allowed to join any third-party Discord servers while actively playing on the in-game server.\n\nAn example of meta-gaming would be if a player's in-game friends are not present, and the player uses a live stream or other out-of-game communication to gain information or assistance, such as navigating to illegal locations. This behaviour violates the rules as it relies on external knowledge to influence in-game actions.\n\nAnother example is watching a player's stream and then going to the location shown in the stream to create issues in-game. This constitutes meta-gaming and is not allowed.\n\nPlayers must also roleplay injuries realistically, refraining from sprinting or engaging in combat immediately after leaving the hospital. Using a phone or radio while incapacitated or restrained (e.g., handcuffed) is also prohibited.\n\nFurthermore, repeatedly changing a character's appearance or using the /stuck command without first providing evidence of a bug or issue via screenshot in the designated Discord channel is considered power gaming and may result in a ban." },
      { id: '06', title: 'Fail RP', description: "Fail RP, or failing to roleplay realistic scenarios, is strictly prohibited and may result in a ban. This includes actions such as performing unrealistic stunts with vehicles, taking unrealistic ramps, or engaging in actions that defy real-life limitations, such as jumping off a three-story building and running away unharmed. Maintaining a realistic approach to roleplay enhances the immersive experience for all players and ensures a fair and authentic gameplay environment. Let's uphold the standards of realistic roleplay to create a more enjoyable and engaging experience for everyone involved." },
      { id: '07', title: 'Low Effort RP', description: "Low Effort RP, characterized by insufficiently engaging in roleplaying scenarios, is strictly prohibited and may result in disciplinary action, including a ban. An example of low-effort roleplay is resorting to violence, such as shooting, for minor infractions like accidentally bumping into your car. Prioritizing gunplay over meaningful roleplay detracts from the immersive experience and disrupts the integrity of the game environment. Let's strive to uphold the standards of quality roleplay by engaging in meaningful interactions and scenarios, enriching the experience for all participants." },
      { id: '08', title: 'Combat Logging', description: "Combat Logging, the act of quitting or exiting the game during an ongoing roleplay scenario, is strictly prohibited and will result in severe consequences, including a ban. For instance, if your character is downed, in the middle of an RP situation, or facing conviction, you are not allowed to disconnect from the game to avoid the consequences of the roleplay scenario. Doing so disrupts the flow of roleplay, undermines the integrity of the game, and creates an unfair advantage. Let's ensure that all players adhere to the rules regarding combat logging to maintain a fair and immersive roleplay environment for everyone." },
      { id: '09', title: 'Combat Storing', description: "Combat Storing, the act of storing items or vehicles while engaged in an active roleplay situation, is strictly prohibited and will result in severe consequences, including a ban. For example, if law enforcement or a gang is pursuing you, you cannot store your vehicle in a garage to prevent it from being searched or impounded.\n\nFurthermore, repairing vehicles during an active situation is also prohibited. This includes repairing vehicles using any method other than a repair kit. Engaging in combat storing or repairing vehicles during active situations disrupts the flow of roleplay, creates an unfair advantage, and undermines the integrity of the game environment." },
      { id: '10', title: 'New Rule Life (NRL)', description: "If your character is downed and respawns at the hospital, they are considered to have forgotten all events leading up to being downed in the current scenario. As a result, you are not permitted to rejoin the current situation.\n\nIt's important to note that you may not respawn if you've been informed that law enforcement or emergency medical services (EMS) are en route to your location. Similarly, if you're in an active situation, you are not allowed to respawn. The only exception to this rule is if you are entirely alone, and your injuries were not inflicted by another player. In such cases, you should make a local call using /911 to alert others to your situation." },
      { id: '11', title: 'Fear RP', description: "You must always prioritize your character's life as if it were your last. When faced with a clear disadvantage, certain guidelines must be followed to ensure a realistic and immersive roleplay experience:\n\n- Civilians are required to show fear towards gang members wearing bandanas, regardless of whether the gang members are actively threatening them.\n- When held at gunpoint or outnumbered, you must comply with reasonable demands.\n- You cannot pull a weapon if someone already has one pointed at you (No NVL)." },
      { id: '15', title: 'LOOC', description: "Local Out-of-Character (LOOC) chat is designated for use during RP situations when you need to convey information or address an issue that cannot be roleplayed in any other way. An example of appropriate usage is:\n\n- /looc Please wait, my microphone is currently not working." },
      { id: '16', title: 'Character Mixing', description: "Character Mixing, the practice of using information acquired in one character and applying it to another character, is strictly prohibited and not tolerated in our community.\n\n- Utilizing information known by your criminal character while roleplaying as your law enforcement (PD) character.\n\n- Incorporating personal feelings or emotions into in-character behaviour." },
      { id: '17', title: 'No Toxicity', description: "Engaging in toxic behaviour on streams, YouTube chat, Discord, or private messages is strictly prohibited and will not be tolerated within our community.\n\nNo Abuse in Public Spaces: engaging in abusive behaviour, especially in public places, is prohibited." },
      { id: '18', title: 'Extreme Toxicity', description: "If both parties engage in abusive language, both individuals will face consequences. If you encounter abusive language, quietly leave the area, submit a ticket, and provide your POV to moderators." },
      { id: '19', title: 'Four Man Rule', description: "1. Criminal activities are limited to four players maximum at a time.\n\n2. You are not allowed to bring an active situation back to your turf where a larger group is waiting.\n\n3. A larger group does not have to drop numbers to defend themselves if a smaller group knowingly engages them.\n\n4. A maximum of four players, including any backup, can participate in a robbery." },
      { id: '20', title: 'Revenge RP', description: "Seeking revenge on individuals who have shot or killed you after you were completely incapacitated is not tolerated by the New Life Rule (NLR)." },
      { id: '21', title: 'Perma Death', description: "Forcing someone to permanently retire their character is considered a bannable offence. If you choose permadeath, roleplay it properly with EMS or doctors and do not continue roleplaying with that character." },
      { id: '22', title: 'Robbing', description: "Robbing should be well-thought-out and uncommon. Chain robbing and robbing during tsunami warnings are not tolerated. Robbing AFK players and initiating RP solely to rob is not allowed." },
      { id: '23', title: 'Fake Hostage', description: "Using friends as hostages for robbery is prohibited. Kidnapping AFK individuals is also not allowed." },
      { id: '24', title: 'Hostage Scenario', description: "Roleplay must be established before taking hostages, especially in crowded places. Holding workers hostage while on duty is not allowed." },
      { id: '25', title: 'Fake Cop RP', description: "Fake cop RP is prohibited. You cannot break suspects out of police custody or force hostage trades at Pillbox/MRPD." },
      { id: '26', title: 'Smuggling', description: "Smuggling items from PD, EMS, or Mechanic armoury/evidence stashes for resale is strictly prohibited and can result in character wipe and ban." },
      { id: '27', title: 'Item Doubling (Bug Exploits)', description: "Exploiting bugs to duplicate items, money, or valuables is prohibited and can result in full character wipe without refunds." },
      { id: '28', title: 'Safe Zone Violations', description: "Illegal activities in safe zones are prohibited. Safezone camping and unauthorized helicopter landings in safe zones are bannable." },
      { id: '29', title: 'Drive-By', description: "Shooting while in a moving vehicle is not allowed." },
      { id: '30', title: 'Scam RP', description: "Scam RP is allowed up to 80,000 in-game currency. Exceeding this amount can result in a one-week ban." },
      { id: '31', title: 'Gunplay over Roleplay', description: "Prioritising gunplay over meaningful roleplay is prohibited and can result in severe penalties." },
      { id: '32', title: 'Third-Party Interference', description: "Interfering in a roleplay situation between two parties is prohibited and can result in disciplinary action." },
      { id: '33', title: 'Join WFS in between Situation', description: "Joining the WFS channel before a scenario is fully resolved is not permitted and may result in penalties." },
      { id: '34', title: 'Banned Player', description: "Banned players will not receive support in WFS unless requested by support staff. Joining WFS post-ban without request can add a ban penalty." },
      { id: '35', title: 'PD Looting', description: "During code red, only public PD ammo/items can be looted after 30 minutes. Looting restricted PD items is bannable." },
      { id: '36', title: 'Prior Status', description: "No PD-triggering scenarios can be initiated while prior status is active." },
      { id: '37', title: 'OOC Ranting', description: "OOC ranting that disrupts roleplay is not allowed. Use proper support channels and communicate respectfully." }
    ]
  },
  {
    id: 'criminal-activities',
    title: 'Criminal Activities',
    subtitle: 'Plan clean operations, keep scenarios balanced, and follow strict robbery limits.',
    rules: [
      { id: '01', title: 'Fleeca Bank Robbery', description: "- Maximum Participants: A maximum of four individuals are allowed to participate in a single robbery scenario.\n- Escape Vehicles: Only one escape vehicle is permitted for use during the robbery.\n- Hostages: Robbers are allowed to take only one person as a hostage during the robbery.\n- Friendly Hostages: Taking friendly hostages is strictly prohibited.\n- Demands: Robbers are limited to making a maximum of two demands during the robbery." },
      { id: '02', title: 'Pacific Bank Robbery', description: "- Participants: A minimum of four and a maximum of six individuals are permitted to participate in a single robbery scenario.\n- Escape Vehicles: Only two escape vehicles are allowed for use during the robbery.\n- Hostages: Robbers may take one or more individuals as hostages.\n- Friendly Hostages: Taking friendly hostages is strictly prohibited.\n- Demands: Robbers are limited to making a maximum of two demands.\n- Police Response: Law enforcement can deploy up to two helicopter units.\n- N + 2 rule does not apply in Pacific Bank robbery scenarios.\n- PD Class Switching is allowed when external factors impact criminal gameplay.\n- PD Tire Popping is allowed within 15 minutes of the robbery.\n- PD soft PIT manoeuvres on highways are allowed before 15 minutes." },
      { id: '03', title: 'Store Robbery', description: "- Number of Participants: Maximum four participants.\n- Escape Vehicles: Only one escape vehicle is permitted.\n- Hostages: Only one hostage is permitted.\n- Friendly Hostages: Taking friendly hostages is strictly prohibited.\n- Demands: Maximum two demands." },
      { id: '04', title: 'Jewellery Robbery', description: "- Participants: Minimum two and maximum four individuals.\n- Escape Vehicles: Only one escape vehicle is permitted.\n- Hostages: Only one hostage is permitted.\n- Friendly Hostages: Taking friendly hostages is strictly prohibited.\n- Demands: Maximum two demands." },
      { id: '05', title: 'Illegal Drop', description: "- Participants: Minimum two and maximum four individuals.\n- Escape Vehicle: Only one escape vehicle is permitted.\n- Hostage: Only one hostage is allowed.\n- Friendly Hostages: Taking friendly hostages is strictly prohibited.\n- Demands: Maximum two demands." }
    ]
  },
  {
    id: 'gang',
    title: 'Gang Rules',
    subtitle: 'Keep gang dynamics structured, believable, and fair across all city conflicts.',
    rules: [
      { id: '01', section: 'Gang Basics', title: 'Minimum Members', description: 'In a gang, the minimum number of members should be 8 official and 2 unofficial, for a total of 10.' },
      { id: '02', section: 'Gang Basics', title: 'Gang Identity', description: 'Try to make GTA V-based gangs. If you are making non-GTA V gangs, your outfit colors should be clearly different. Non-GTA gangs must have proper storyline and progression.' },
      { id: '03', section: 'Gang Basics', title: 'Taking Business', description: 'To take any illegal business already under another gang, your gang must do proper RP.' },
      { id: '04', section: 'Gang Basics', title: 'Revealing Identity', description: 'You can reveal your identity but not your business to civilians. If identity or turf is exposed, consequences may follow.' },
      { id: '05', section: 'Gang Basics', title: 'Allowed Fights', description: 'Only semi-divers and footfights are allowed.' },
      { id: '06', section: 'Gang Basics', title: 'Clothing Colors', description: 'You cannot kill any person based on the color of the clothes they are wearing.' },
      { id: '07', section: 'Gang Basics', title: 'Respecting Dead Bodies', description: 'No RP with dead body and no disrespect (by words or actions) to dead body.' },
      { id: '08', section: 'Gang Basics', title: 'Whitelisted Jobs', description: 'As a gang, you cannot hold any whitelisted or government job.' },
      { id: '09', section: 'Gang Basics', title: 'Gang Alliances', description: 'Gang alliances cannot be formed. A third gang cannot be part of a gang war between two gangs.' },
      { id: '10', section: 'Gang Basics', title: 'Conflict Build-up', description: 'Conflicts should have solid build-up, proper communication, and logical reason. Keep wars competitive but not toxic.' },
      { id: '11', section: 'Gang Basics', title: 'Bounties', description: 'You cannot give bounty to a particular person. Bounties can only be given to gangs, and your gang must back off afterward.' },
      { id: '12', section: 'Gang Basics', title: 'Leaving a Gang', description: 'If you want to leave your gang and join another, declare your departure first, then complete at least 15 days of civilian RP.' },
      { id: '13', section: 'Gang Basics', title: 'Selling Drugs', description: 'If you hold coke or weed, you cannot directly sell to NPCs. You must make deals with players in the city.' },
      { id: '14', section: 'Gang Basics', title: 'Business Wars', description: 'To claim illegal business already controlled by another group, start a business war with admin permission. No direct grinding at their turf.' },
      { id: '01', section: 'Gang Fight', title: 'Declaring War', description: 'If you are an official gang and want to initiate gang fight with another gang, war must be declared on dark web by a gang leader.' },
      { id: '02', section: 'Gang Fight', title: 'Ending War', description: 'Gang war continues until peace is declared by gang leaders on dark web.' },
      { id: '03', section: 'Gang Fight', title: 'Active War Rules', description: 'During active gang war, warning before shooting is not required. Safe zones are limited to Pillbox and gang hoods during war situations.' },
      { id: '04', section: 'Gang Fight', title: 'Conflict Duration', description: 'If any gang conflict exceeds 15 days, Syndicate may intervene to settle it.' },
      { id: '05', section: 'Gang Fight', title: 'Attacking Hoods', description: 'If you want to attack hood, admin permission is required beforehand.' },
      { id: '06', section: 'Gang Fight', title: 'Retreating to Hood', description: 'If someone in ongoing situation goes to their hood, opposing gang can enter hood and continue conflict.' },
      { id: '07', section: 'Gang Fight', title: 'NLR During War', description: 'During gang/hood/turf war, if you are healed after being shot dead, you must quit server and avoid that character for 1 hour.' }
    ]
  },
  {
    id: 'life',
    title: 'Value of Life',
    subtitle: 'NVL (No Value of Life) guidelines to ensure realistic survival instincts.',
    rules: [
      { id: '01', title: 'Prioritize Survival', description: 'Prioritize your character\'s life in all situations. Comply when at a clear disadvantage (e.g., gun to head, heavily outnumbered).' },
      { id: '02', title: 'Realistic Escapes', description: 'Realistic escape attempts only when the situation permits. No unrealistic heroics or suicide missions.' }
    ]
  },
  {
    id: 'economy',
    title: 'Economy Rules',
    subtitle: 'Guidelines to maintain a fair and balanced server economy.',
    rules: [
      { id: '01', title: 'Asset Transfers', description: 'No transferring starter money between characters. Asset transfers between your own characters are strictly forbidden.' },
      { id: '02', title: 'Fee Bypassing', description: 'No bypassing asset fees through external transfers. LSRS application limitations must be respected.' }
    ]
  },
  {
    id: 'account',
    title: 'Account & Donations',
    subtitle: 'Policies regarding your account security, purchases, and donation refunds.',
    featured: {
      tag: 'DONATION POLICY',
      title: 'STRICT NO-REFUND TERMS',
      description: 'We have a 24-hour window for refund requests on donations. After 24 hours, or if you are banned, purchases and perks (which are permanently linked to characters) are non-refundable. Chargebacks result in irreversible consequences.'
    },
    rules: [
      { id: '01', title: 'Account Responsibility', description: 'You are solely responsible for all activities on your account.' },
      { id: '02', title: 'Account Trading', description: 'Buying or selling accounts outside official channels is prohibited.' },
      { id: '03', title: 'Lost Accounts', description: 'Lost Discord accounts cannot have Allowlist status transferred.' }
    ]
  }
];

export function RulesContent() {
  const [activeCategory, setActiveCategory] = useState(ruleCategories[0].id);
  const [viewMode, setViewMode] = useState<'main' | 'business_policy'>('main');

  const currentCategory = ruleCategories.find(c => c.id === activeCategory);

  return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto w-full relative z-10">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-72 lg:w-80 shrink-0">
        <div className="sticky top-24 bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl">
          <div className="mb-6">
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 mb-2 uppercase">Karma ReBorn</p>
            <h2 className="text-3xl font-black text-white tracking-tight">Rules Hub</h2>
          </div>
          
          <nav className="space-y-1.5">
            {ruleCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setViewMode('main'); // Always go back to main view when changing tabs
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id 
                    ? 'bg-red-500/10 text-white border border-red-500/20 shadow-[0_0_15px_rgba(220,38,38,0.05)]' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                {cat.title}
                <span className={`text-xs transition-colors ${activeCategory === cat.id ? 'text-red-400' : 'text-gray-600'}`}>/</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl">
          
          {viewMode === 'main' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Header Card */}
              <div className="bg-red-950/20 border border-red-900/30 rounded-2xl p-8 mb-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-[10px] font-bold tracking-[0.2em] text-red-500/80 mb-3 uppercase">Roleplay Policy</p>
                <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-wider mb-4 drop-shadow-md">
                  {currentCategory?.title}
                </h1>
                <p className="text-gray-300 leading-relaxed max-w-2xl text-sm sm:text-base">
                  {currentCategory?.subtitle}
                </p>
              </div>

              {/* Featured Rule / Update (if any) */}
              {currentCategory?.featured && (
                <div className="bg-[#151520]/80 backdrop-blur border border-indigo-900/30 rounded-2xl p-8 mb-8 relative overflow-hidden">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-indigo-400/80 mb-3 uppercase">{currentCategory.featured.tag}</p>
                  <h2 className="text-2xl font-black text-white uppercase tracking-wide mb-4 leading-tight">
                    {currentCategory.featured.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-sm mb-8">
                    {currentCategory.featured.description}
                  </p>
                  <button 
                    onClick={() => setViewMode('business_policy')}
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-semibold text-white transition-colors"
                  >
                    Read Full Policy
                  </button>
                </div>
              )}

              {/* Rules List */}
              <div className="space-y-4">
                {currentCategory?.rules.map((rule, index) => {
                  const hasSection = 'section' in rule;
                  const showSectionHeader = hasSection && (index === 0 || (rule as any).section !== (currentCategory.rules[index - 1] as any).section);
                  
                  return (
                    <div key={hasSection ? `${(rule as any).section}-${rule.id}` : rule.id} className="space-y-4">
                      {showSectionHeader && (
                        <div className={`mb-6 ${index > 0 ? 'mt-12' : ''}`}>
                          <h2 className="text-2xl font-black text-white uppercase tracking-wider border-b border-red-900/30 pb-3 mb-2">{(rule as any).section}</h2>
                        </div>
                      )}
                      <div className="bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 rounded-2xl p-6 sm:p-8 group">
                        <div className="flex items-start sm:items-center gap-5 mb-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-300 font-bold text-sm shrink-0 group-hover:bg-red-500/20 group-hover:text-red-400 group-hover:border-red-500/30 transition-all duration-300">
                            {rule.id}
                          </div>
                          <h3 className="text-xl font-bold text-gray-100">{rule.title}</h3>
                        </div>
                        <p className="text-sm sm:text-base text-gray-400 leading-relaxed sm:pl-15 whitespace-pre-wrap">
                          {rule.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button 
                onClick={() => setViewMode('main')}
                className="mb-8 flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
              >
                ← Back to Rules Hub
              </button>

              {/* Policy Header Card */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 sm:p-10 mb-8">
                <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 mb-4 uppercase">Karma Roleplay Policy</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                  Active Business Management and No Refund Policy
                </h1>
                <p className="text-gray-300 leading-relaxed max-w-3xl text-sm sm:text-base">
                  This page outlines how business ownership is handled and how purchases are treated in Karma ReBorn. The goal is simple: clear expectations, fair action, and smooth operations for everyone.
                </p>
              </div>

              {/* Policy Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 mb-3 uppercase">Policy 01</p>
                  <h3 className="text-xl font-bold text-white mb-4">Active Business Management</h3>
                  <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
                    <p>If a business owner fails to manage their business after two warnings, the business may be resold to another active player.</p>
                    <p>This keeps opportunities open for committed players and helps keep the economy active.</p>
                  </div>
                </div>
                
                <div className="bg-red-950/10 border border-red-900/30 rounded-2xl p-6 sm:p-8">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-red-500/80 mb-3 uppercase">Policy 02</p>
                  <h3 className="text-xl font-bold text-white mb-4">No Refund Policy</h3>
                  <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
                    <p>All payments and purchases are final.</p>
                    <p>No refunds will be issued under any circumstances.</p>
                    <p>To claim your business or purchase, create a ticket with the Karma ReBorn Team.</p>
                  </div>
                </div>
              </div>

              {/* Key Guidelines */}
              <h2 className="text-2xl font-bold text-white mb-6">Key Guidelines</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: '01', title: 'Business Reporting and Communication', desc: 'Report issues promptly to the Karma ReBorn Team for quick resolutions.' },
                  { id: '02', title: 'Flexible Rules and Fair Warnings', desc: 'Rules adapt to community needs, and players receive warnings before serious actions are taken.' },
                  { id: '03', title: 'Karma ReBorn Standards and Fun', desc: 'Follow Karma ReBorn standards to keep roleplay enjoyable and fair for everyone.' },
                  { id: '04', title: 'Clear Rules and Legal Compliance', desc: 'Clear rule enforcement ensures fairness and respect for all players.' },
                  { id: '05', title: 'Continuous Improvement', desc: 'Karma ReBorn evolves with regular updates to keep the experience fresh and fun.' },
                ].map(guide => (
                  <div key={guide.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 mb-3 uppercase">Guideline {guide.id}</p>
                    <h3 className="text-base font-bold text-gray-100 mb-2">{guide.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{guide.desc}</p>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}
