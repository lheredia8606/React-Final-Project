interface HasId {
  id: string;
}

export const getAllItems = <T>(endPoint: string): Promise<T[]> => {
  return fetch(endPoint).then((response) => response.json());
};

export const createItem = <T>(
  endPoint: string,
  item: Omit<T, "id">
): Promise<T> => {
  return fetch(endPoint, {
    method: "post",
    headers: {
      ["Content-Type"]: "application/json",
    },
    body: JSON.stringify(item),
  }).then((response) => response.json());
};

export const patchItem = <T extends HasId>(
  url: string,
  item: Partial<T>
): Promise<T> => {
  return fetch(`${url}/${item.id}`, {
    body: JSON.stringify(item),
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((respo) => respo.json());
};
