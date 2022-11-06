import { IPagination } from "../../models/utils/pagination";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { isNullish } from "../../utils/type-checks";
import { IPaginationMapper } from "../contracts/mappers/pagination-mapper";

export class PaginationMapper implements IPaginationMapper {
  toModel(item: any): IPagination {
    if (isNullish(item)) {
      throw new Error("item is required");
    }

    return {
      page: Number(item.page ?? DEFAULT_PAGE),
      pageSize: Number(item.pageSize ?? DEFAULT_PAGE_SIZE),
    };
  }
}
