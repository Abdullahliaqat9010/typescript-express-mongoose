import { DataNodeInterface } from "interfaces";
import { DataNode } from "models";

const createDataNode = (dataNodes: DataNodeInterface[]): Promise<void> => {
  return new Promise(async (res, rej) => {
    try {
      await DataNode.insertMany(dataNodes, { ordered: false });
      res();
    } catch (error) {
      console.log(error);
      rej(error);
    }
  });
};

export const DataNodeRepository = {
  createDataNode,
};
