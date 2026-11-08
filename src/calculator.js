/**
 * Find one entry of a schedule by phase and week number.
 * Returns undefined if it does not exist.
 */
export function findWeek(schedule, phase, week) {
    return schedule.weeks.find((w) => w.phase === phase && w.week === week);
}

/**
 * Products that have a dose in the given week.
 */
export function productsInWeek(schedule, phase, week) {
    const entry = findWeek(schedule, phase, week);
    if (!entry) return [];
    return schedule.products.filter((p) => entry.doses[p.id] !== undefined);
}

/**
 * Calculate the amount of each product for a given amount of water.
 * A dose is a number or a range [min, max] – the amount has the same form.
 * Optional products and products of a choice group are only included
 * when their ID is in `selected`.
 *
 * @param {object} schedule    One entry of "schedules" from a brand file
 * @param {string} phase       "start", "growth" or "bloom"
 * @param {number} week        Week number within the phase
 * @param {number} waterLiters Amount of water in liters
 * @param {string[]} selected  IDs of chosen optional and group products
 * @returns {{productId: string, amount: number|number[], unit: string}[]}
 */
export function calculateDoses(schedule, phase, week, waterLiters, selected = []) {
    const entry = findWeek(schedule, phase, week);
    if (!entry) {
        throw new Error(`Unknown week: ${phase} ${week}`);
    }

    const result = [];
    for (const product of schedule.products) {
        const dose = entry.doses[product.id];
        if (dose === undefined) continue;
        if ((product.optional || product.group) && !selected.includes(product.id)) continue;

        const scale = (value) => (value * waterLiters) / product.baseVolumeLiters;
        result.push({
            productId: product.id,
            amount: Array.isArray(dose) ? dose.map(scale) : scale(dose),
            unit: product.unit,
        });
    }
    return result;
}
