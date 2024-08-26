import axios from "axios";

type TPaginatedJsonResponse<T> = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
};

export class ApiCrud<T> {
  constructor(private url: string) {}

  getUrl() {
    return this.url;
  }

  getAll() {
    return axios.get<T[]>(this.url);
  }

  getAllPaginated(pageNumber: number, pageLimit: number = 10) {
    return axios.get<TPaginatedJsonResponse<T>>(
      `${this.url}?_per_page=${pageLimit}&_page=${pageNumber}`
    );
  }

  getById(id: string) {
    return axios.get<T>(`${this.url}/${id}`);
  }

  create(data: Omit<T, "id">) {
    console.log("the url is: " + this.url);
    return axios.post<T>(this.url, data);
  }

  update(id: string, data: Partial<T>) {
    return axios.patch<T>(`${this.url}/${id}`, data);
  }

  delete(id: string) {
    return axios.delete<void>(`${this.url}/${id}`);
  }
}
