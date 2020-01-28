import RepositoryFirestore from "./repositoryFirestore";

const repositories = {
  firestore: RepositoryFirestore
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
