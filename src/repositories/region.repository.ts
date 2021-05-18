import { RegionInterface } from "interfaces";
import { Region } from "models";

const getRegions = (): Promise<RegionInterface[]> => {
  return new Promise(async (res, rej) => {
    try {
      const regions = await Region.find({});
      res(regions);
    } catch (error) {
      console.log(error);
      rej(error);
    }
  });
};

const addRegions = (regions: RegionInterface[]): Promise<void> => {
  return new Promise(async (res, rej) => {
    try {
      for (const region of regions) {
        await Region.create(region);
      }
      await Region.ensureIndexes();
      res();
    } catch (error) {
      console.log(error);
      rej(error);
    }
  });
};

const searchRegions = (searchQuery: string): Promise<RegionInterface[]> => {
  return new Promise(async (res, rej) => {
    try {
      const regions = await Region.find(
        {
          name: { $regex: searchQuery, $options: "i" },
        },
        {
          location: 0,
        }
      );
      res(regions);
    } catch (error) {
      console.log(error);
      rej(error);
    }
  });
};

const getNearestRegion = (
  latitude: number,
  longitude: number
): Promise<RegionInterface | null> => {
  return new Promise(async (res, rej) => {
    try {
      const region = await Region.findOne(
        {
          location: {
            $near: {
              $maxDistance: 5000,
              $geometry: {
                type: "Point",
                coordinates: [longitude, latitude],
              },
            },
          },
        },
        {
          location: 0,
        }
      );
      res(region);
    } catch (error) {
      console.log(error);
      rej(error);
    }
  });
};

export const RegionRepository = {
  getRegions,
  addRegions,
  searchRegions,
  getNearestRegion,
};
