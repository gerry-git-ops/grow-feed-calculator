/**
 * Find one week of a schedule by phase and week number.
 * Returns undefined if the week does not exist.
 */
export function findWeek(schedule, phase, week) {
  return schedule.weeks.find((w) => w.phase === phase && w.week === week);
}

/**
 * Calculate the amount of each product for a given amount of water.
 *
 * @param {object} schedule    One entry of "schedules" from a brand file
 * @param {string} phase       "clone", "growth" or "bloom"
 * @param {number} week        Week number within the phase
 * @param {number} waterLiters Amount of water in liters
 * @param {string[]} enabledOptional IDs of optional products to include
 * @returns {{productId: string, amount: number, unit: string}[]}
 */
export function calculateDoses(schedule, phase, week, waterLiters, enabledOptional = []) {
  const entry = findWeek(schedule, phase, week);
  if (!entry) {
    throw new Error(`Unknown week: ${phase} ${week}`);
  }

  const result = [];
  for (const product of schedule.products) {
    const dose = entry.doses[product.id];
    if (dose === undefined) continue;
    if (product.optional && !enabledOptional.includes(product.id)) continue;

    result.push({
      productId: product.id,
      amount: (dose * waterLiters) / product.baseVolumeLiters,
      unit: product.unit,
    });
  }
  return result;
}
