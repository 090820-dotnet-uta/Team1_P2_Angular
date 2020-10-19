export class Settings {
  sortSetting: number = 0;
  includeBooks: boolean;
  includeMovies: boolean;
  includeGames: boolean;
  includeTV: boolean;
  includeSelf: boolean;
  includeFollowing: boolean;
  includeUnfollowed: boolean;

  constructor(
    sortSetting: number,
    includeBooks: boolean,
    includeMovies: boolean,
    includeGames: boolean,
    includeTV: boolean,
    includeSelf: boolean,
    includeFollowing: boolean,
    includeUnfollowed: boolean
  ) {
    this.sortSetting = sortSetting;
    this.includeFollowing = includeFollowing;
    this.includeSelf = includeSelf;
    this.includeUnfollowed = includeUnfollowed;
    this.includeBooks = includeBooks;
    this.includeGames = includeGames;
    this.includeTV = includeTV;
    this.includeMovies = includeMovies;
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
