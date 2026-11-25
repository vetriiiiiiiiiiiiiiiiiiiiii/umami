/**
 * Photography library. All images are served from the Unsplash CDN
 * (free to use under the Unsplash License). Replace with commissioned
 * photography of real Umami Labz work when available.
 */
export type Img = { id: string; alt: string; tone?: "dark" | "light" };

const u = (id: string, alt: string, tone?: Img["tone"]): Img => ({ id, alt, tone });

export const images = {
  labGlass: u("1576671081837-49000212a370", "Laboratory glassware in monochrome: flasks, vials and a measuring bottle", "dark"),
  labPipette: u("1532187863486-abf9dbad1b69", "A pipette dispensing a magenta sample into a tray of test tubes", "light"),
  labPipetteHand: u("1614935151651-0bea6508db6b", "A technician in gloves pipetting samples at a laboratory bench", "light"),
  labCorridor: u("1579154204601-01588f351e67", "A long, bright laboratory with analytical instruments along both benches", "light"),
  labEquip: u("1581091226825-a6a2a5aee158", "An engineer working beside process equipment and control panels", "light"),
  spicesDark: u("1606914501449-5a96b6ce24ca", "Ground spices in wooden spoons scattered on a dark surface", "dark"),
  spicesFlat: u("1596040033229-a9821ebd058d", "Whole and ground spices arranged on pale wooden boards", "light"),
  wheat: u("1574323347407-f5e1ad6d020b", "Macro view of whole wheat grains", "light"),
  rice: u("1586201375761-83865001e31c", "Macro texture of long-grain rice", "light"),
  flour: u("1610725664285-7c57e6eeac3f", "A cloth sack of flour with a sieve on a grey surface", "light"),
  dough: u("1517686469429-8bdb88b9f907", "Hands kneading dough on a floured worktop", "light"),
  bread: u("1509440159596-0249088772ff", "Seeded rustic loaves with ears of wheat", "dark"),
  processPlant: u("1513828583688-c52646db42da", "Stainless steel process piping, pumps and valves in a processing plant", "light"),
  sparks: u("1504917595217-d4dc5ebe6122", "Sparks from metal fabrication in an industrial workshop", "dark"),
  blueprint: u("1581092160562-40aa08e78837", "An engineer drafting technical drawings on a work table", "light"),
  warehouse: u("1586528116311-ad8dd3c8310d", "A large warehouse with palletised goods and racking", "light"),
  logistics: u("1565793298595-6a879b1d9492", "Aerial view of freight trucks lined up at a distribution centre", "light"),
  capsules: u("1584308666744-24d5c474f2ae", "Blister packs of capsules on a blue surface", "light"),
  honey: u("1558642452-9d2a7deb7f62", "Honey dripping from a wooden dipper into a glass jar", "dark"),
  lemonade: u("1621263764928-df1444c5e859", "A glass of sparkling lemon drink with mint", "light"),
  juice: u("1600271886742-f049cd451bba", "A glass of orange juice with a citrus slice", "dark"),
  water: u("1548839140-29a749e1cf4d", "Water pouring into a clear glass against a dark background", "dark"),
  petfood: u("1589924691995-400dc9ecc119", "A bowl of dry pet food on a wooden floor", "light"),
  chocolates: u("1599599810769-bcde5a160d32", "Rows of handmade chocolates and truffles", "light"),
  chocolateBar: u("1622484212850-eb596d769edc", "Broken pieces of chocolate with cocoa powder", "light"),
  chipsPack: u("1621447504864-d8686e12698c", "An open snack pack of crisps on a dark surface", "dark"),
  chips: u("1599490659213-e2b9527bd087", "Crisps arranged on a saturated yellow background", "light"),
  sauce: u("1472476443507-c7a5948772fc", "A jar of tomato sauce with fresh tomatoes and chilli flakes", "dark"),
  milk: u("1550583724-b2692b85b150", "Milk being poured into a tall glass", "dark"),
  grainBowl: u("1623428187969-5da2dcea5ebf", "A plant-based bowl with chickpeas, greens and avocado", "dark"),
  granola: u("1614961233913-a5113a4a34ed", "A bowl of toasted grain cereal with a spoon", "light"),
  coldShelf: u("1566454825481-4e48f80aa4d7", "A refrigerated retail shelf stocked with packaged foods", "light"),
  restaurant: u("1600093463592-8e36ae95ef56", "A restaurant interior with plants and warm lighting", "dark"),
  samosa: u("1601050690597-df0568f70950", "Freshly fried samosas with green chutney", "light"),
  nuts: u("1563865436874-9aef32095fad", "Walnuts, figs and dried ingredients on a dark table", "dark"),
  leaf: u("1587334274328-64186a80aeee", "A single green seedling with two leaves on white", "light"),
  greens: u("1543362906-acfc16c67564", "Sliced green vegetables arranged on a pale green background", "light"),
  market: u("1550989460-0adf9ea622e2", "Fresh produce stacked at a market stall", "light"),
  riceBowl: u("1516684732162-798a0062be99", "A bowl of steamed rice with chopsticks", "dark"),
} satisfies Record<string, Img>;

export type ImageKey = keyof typeof images;
