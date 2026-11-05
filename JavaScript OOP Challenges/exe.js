class MediaItem {
    constructor(title, year, genre) {
        this.title = title;
        this.year = year;
        this.genre = genre;
    }
    getSummary() {
        return " ";
    }
}

class Book extends MediaItem {
    constructor(title, author, year, genre, pageCount) {
        super(title, year, genre); 
        this.author = author;
        this.pageCount = pageCount;
    }

    getSummary() {
        return `Book: '${this.title}' by ${this.author}, ${this.pageCount} pages`;
    }
}

class Movie extends MediaItem {
    constructor(title, director, year, genre, durationMinutes) {
        super(title, year, genre);
        this.director = director;
        this.durationMinutes = durationMinutes;
    }

    getSummary() {
        return `Movie: '${this.title}' directed by ${this.director}, ${this.durationMinutes} min`;
    }
}

class Library {
    constructor() {
        this.itemList = [];
    }

    addItem(item) {
        this.itemList.push(item);
    }

    search(term) {
        return this.itemList.filter(item => 
            item.title.toLowerCase().includes(term.toLowerCase())
        );
    }

    listByGenre(genre) {
        return this.itemList.filter(item => item.genre === genre);
    }
}