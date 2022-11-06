import { IPagination } from "../../../models/utils/pagination";

export interface IPaginationMapper {
  toModel(item: any): IPagination;
}
