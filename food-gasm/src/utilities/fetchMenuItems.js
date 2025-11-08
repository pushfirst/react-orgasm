// extractMenu.js
// import menuItems from '../feed/swiggy-restaurant-menu.json';

function extractMenu(json) {
  const cards = json?.cards ?? [];

  // ---- Restaurant info (robust search) ----
  // Look for a card whose inner @type is "Restaurant" and has an "info" object.
  const restaurantInfo =
    cards
      .map(c => c?.card?.card ?? c?.card) // normalize nesting
      .find(cc => cc?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant" && cc?.info)
      ?.info
    // Some payloads tuck info one level deeper — try a second pass:
    ?? cards
      .map(c => c?.card?.card?.card ?? c?.card?.card)
      .find(cc => cc?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant" && cc?.info)
      ?.info
    // Fallback: first thing that has an "info" with id/name
    ?? cards
      .map(c => c?.card?.card ?? c?.card)
      .find(cc => cc?.info?.id && cc?.info?.name)
      ?.info
    ?? null;

  // ---- Menu categories / items (REGULAR → ItemCategory) ----
  const groupedCard = cards.find(c => c?.groupedCard)?.groupedCard;
  const regularCards = groupedCard?.cardGroupMap?.REGULAR?.cards ?? [];

  const categories = [];
  for (const c of regularCards) {
    const card = c?.card?.card ?? c?.card;
    if (card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory") {
      const category = card.title;
      const dishes = (card.itemCards ?? [])
        .map(i => i?.card?.info)
        .filter(Boolean);
      categories.push({ category, dishes });
    }
    // Some menus use NestedItemCategory (sections inside sections)
    if (card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory") {
      const parent = card.title;
      for (const sc of card?.categories ?? []) {
        const category = sc.title ?? parent;
        const dishes = (sc.itemCards ?? [])
          .map(i => i?.card?.info)
          .filter(Boolean);
        categories.push({ category, dishes });
      }
    }
  }
  
  return { info: restaurantInfo, categories };
}

export default extractMenu;
