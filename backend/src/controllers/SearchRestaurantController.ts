import { Request, Response } from "express";
import RestaurantModel from "../models/restaurantModel";

export const searchRestaurants = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;

    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.cuisines as string) || "";
    const page = parseInt(req.query.page as string) || 1;
    const sortOption = (req.query.sortOption as string) || "lustUpdated";

    let query: any = {};

    query["city"] = new RegExp(city, "i");
    const cityCheck = await RestaurantModel.countDocuments(query);

    if (cityCheck === 0) {
      return res.status(404).json([]);
    }

    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));
      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["restaurantName"] = searchRegex;
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const total = await RestaurantModel.countDocuments(query);

    const restaurant = await RestaurantModel.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const response = {
      data: restaurant,
      pagination: {
        total,
        page,
        pageSize: Math.ceil(total / pageSize),
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error searching restaurants:", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
