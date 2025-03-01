import { Rating } from "./rating";

export type RatingsResponse = {
    overallRating: number;
    comment: string;
    isOutfitIdentifiable: boolean;
    ratings: Rating[];
  };