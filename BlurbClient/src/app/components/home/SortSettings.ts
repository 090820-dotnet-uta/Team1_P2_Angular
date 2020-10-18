export class SortSettings {
  sortSetting: number;
  includeSelf: boolean;
  includeFollowers: boolean;
  includeUnfollowed: boolean;
  filterMovies: boolean;
  filterTV: boolean;
  filterBooks: boolean;
  filterGames: boolean;

  constructor(
    sortSetting: number,
    includeSelf: boolean,
    includeFollowers: boolean,
    includeUnfollowed: boolean,
    movies: boolean,
    games: boolean,
    tv: boolean,
    books: boolean
  ) {
    this.sortSetting = sortSetting;
    this.includeFollowers = includeFollowers;
    this.includeSelf = includeSelf;
    this.includeUnfollowed = includeUnfollowed;
    this.filterBooks = books;
    this.filterGames = games;
    this.filterTV = tv;
    this.filterMovies = movies;
  }

  getSortName(): string {
    if (this.sortSetting == 0) {
      return 'Most Recent';
    } else if (this.sortSetting == 1) {
      return 'Least Recent';
    } else if (this.sortSetting == 2) {
      return '10 - 0';
    } else if (this.sortSetting == 3) {
      return '0 - 10';
    }
  }
}
