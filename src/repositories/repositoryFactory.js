import RepositoryFirestore from "./repositoryFirestore";
import RepositoryRealTime from "./repositoryRealTime";

const repositories = {
  firestore: RepositoryFirestore,
  realTime: RepositoryRealTime
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
