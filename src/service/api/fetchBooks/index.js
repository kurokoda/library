import axios from "axios";
import shortId from "short-uuid";

const cache = {};

async function fetchBooks(query, page = 1) {
  const normalizedQuery = query.toLowerCase().split(" ").join("+");

  const queryKey = normalizedQuery.concat(`+page+${page}`);

  if (!cache[queryKey]) {
    console.log(`Requesting ${queryKey} from api`);
    cache[queryKey] = { isLoading: true };
    const url = `http://openlibrary.org/search.json?q=${normalizedQuery}&page=${page}`;
    const result = await axios.get(url);
    const booksWithIds = result.data.docs.map((doc) => {
      doc.uuid = shortId.generate();
      return doc;
    });
    result.books = booksWithIds;
    result.count = result.data.numFound;
    result.isLoading = false;
    cache[queryKey] = result;
    return cache[queryKey];
  } else if (cache[queryKey] && !cache[queryKey].isLoading) {
    console.log(`Returning ${queryKey} from cache`);
    return cache[queryKey];
  } else {
    console.log(`Url request is in process`);
    return undefined;
  }
}

export default fetchBooks;
