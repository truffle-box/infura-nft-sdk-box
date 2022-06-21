/**
 * Helper to append classnames together for tailwind.
 *
 * @param classes
 * @returns {string}
 */
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
