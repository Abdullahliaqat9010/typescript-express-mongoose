import { DataPoint, MapData } from "interfaces";
import { DataNode, Region } from "models";

const getMapData = (regionId: string): Promise<MapData | null> => {
  return new Promise(async (res, rej) => {
    try {
      const region = await Region.findById(regionId);
      if (region) {
        const allDataNodes = await DataNode.find({
          location: {
            $geoWithin: {
              $geometry: region.location,
            },
          },
        });
        const dataPoints: DataPoint[] = allDataNodes.map((node) => {
          return {
            latitude: node.location.coordinates[1],
            longitude: node.location.coordinates[0],
            aqi: Math.max(...node.pollutants.map(({ aqi }) => aqi)),
          };
        });
        res({
          region: {
            name: region.name,
            bounds: region.location.coordinates[0],
            center: region.center,
          },
          pollutants: [],
          dataPoints,
        });
      } else {
        res(null);
      }
      // let regionBounds: string[][] = [];
      // const result = await Region.findOne({ _id: regionId });
      // if (result) {
      //   regionBounds = [...result.bounds];
      // }
      // const rawDataPoints = await DataNode.find({
      //   "geoLocation.region_key": result?.keys[0],
      // }).exec();
      // const averageAQI: number = rawDataPoints
      //   .map(({ pollutants }) => {
      //     return (
      //       pollutants.find(
      //         ({ chemical_formula }) => chemical_formula === "PM2.5"
      //       )?.aqi || 0
      //     );
      //   })
      //   .reduce((prev, current) => {
      //     return prev + current;
      //   });
      // const dataPoints: DataPoint[] = rawDataPoints.map(
      //   ({ geoLocation, pollutants }) => {
      //     const PM2_5 = pollutants.find(
      //       ({ chemical_formula }) => chemical_formula === "PM2.5"
      //     );
      //     return {
      //       latitude: geoLocation.latitude,
      //       longitude: geoLocation.longitude,
      //       aqi: PM2_5?.aqi || 0,
      //     };
      //   }
      // );
    } catch (error) {
      console.log(error);
      rej(error);
    }
  });
};

export const MapDataRepository = {
  getMapData,
};
