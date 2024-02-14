export interface TitleShow{
  totalResults: string;
  Response: string;
  Search: SearchResult[]
}

export interface SearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  [key: string]: any; // Index signature to make SearchResult iterable
}

export interface Title {
    Title:        string;
    Year:         string;
    Rated:        string;
    Released:     string;
    Runtime:      string;
    Genre:        string;
    Director:     string;
    Writer:       string;
    Actors:       string;
    Plot:         string;
    Language:     string;
    Country:      string;
    Awards:       string;
    Poster:       string;
    Ratings:      Rating[];
    Metascore:    string;
    imdbRating:   string;
    imdbVotes:    string;
    imdbID:       string;
    Type:         string;
    totalSeasons: string;
    Response:     string;
}

export interface Rating {
    Source: string;
    Value:  string;
}
