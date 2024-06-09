import { getDataStorageByKey } from "./nativeStorage";

export const token = async () => {
  return await getDataStorageByKey("scToken");
};
