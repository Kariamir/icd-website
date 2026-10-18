/**
 * Whether the header is currently sitting over the homepage film.
 *
 * `HeroFilm` raises this while its section still covers the band under the
 * header, and the header swaps to its glass treatment so the footage is not
 * cut off by a solid white bar. Shared through `useState` rather than
 * provide/inject because the two components are on opposite sides of the
 * layout — the header is mounted by `layouts/default.vue`, the film by the
 * page — so there is no component tree between them to inject through.
 *
 * It is a boolean, not a scroll position: the header should not animate with
 * scroll, it should be in one state or the other.
 */
export function useOverFilm() {
  return useState<boolean>('icd:over-film', () => false)
}
