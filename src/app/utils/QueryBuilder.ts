import { Query } from "mongoose";
import { excludeFieldForDeleteFromQuery } from "./excludeFieldForDeleteFromQuery";


// export const searchAbleFieldsConstant = ["name","email", "title", "description", "slug", "location"];
// export const excludeFieldForDeleteFromQuery = ["searchTerm", "sort", "fields", "field", "page", "limit" ];

// -------
export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public readonly query: Record<string, string>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  filter(): this {
    const filter = { ...this.query };
    for (const field of excludeFieldForDeleteFromQuery) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete filter[field];
    }

    this.modelQuery = this.modelQuery.find(filter); // TourModel.find().find(filter)

    return this;
  }

  search(searchAbleFields: string[]): this {

    // const searchTerm = (this.query.searchTerm || "").trim();
    // const searchQuery = {
    //   $or: searchAbleFields.map((field) => ({
    //     [field]: { $regex: searchTerm, $options: "i" },
    //     // 🔸 i flag এর মানে হলো case-insensitive (Tipu, tipu, TIPU—সব মিলে যাবে)।
    //   })),
    // };
    // ----
  const rawTerm = this.query.searchTerm || "";
  const searchTerm = rawTerm.trim();

  if (searchTerm.length < 2) return this;

  const words = searchTerm.split(/\s+/);// ✅ split trim korar pore korte hoi, age korle somossa hoi
//input :  searchTerm = "tipu   sahil  bd" = condition = searchTerm.split(/\s+/); = output: for search  ["tipu", "sahil", "bd"] = words

  const searchQuery = {
    $or: searchAbleFields.flatMap((field) =>
      words.map((word) => ({
        [field]: { $regex: word, $options: "i" },
      }))
    ),
  };

    this.modelQuery = this.modelQuery.find(searchQuery); // TourModel.find().find(searchQuery)
    return this;
  }

  sort(): this {
    const sort = this.query.sort || "-createdAt";

    this.modelQuery = this.modelQuery.sort(sort); // TourModel.sort(sort)

    return this;
  }

  fields(): this {
    const fields = this.query.fields?.split(",").join(" ") || ""; // title,location -> title location

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  paginate(): this {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;
    // skip_formula =  (pageNo -1) * limit;
    //  = (3 - 1) * 10 = 2 * 2

    this.modelQuery = this.modelQuery.skip(skip).limit(limit); // TourModel.skip(page)
    return this;
  }

  build() {
    return this.modelQuery;
  }

  async getMeta() {
  
   // ⛔ ভুল উপায়:
  // const totalDocuments = await this.modelQuery.countDocuments();//❌
  // ব্যাখ্যা: modelQuery ইতোমধ্যে একাধিক .find(), .sort(), .select() ইত্যাদি অপারেশন পেয়েছে,
  // তাই এটি এখন একটি query chain, যার উপরে আবার countDocuments() চালালে ভুল বা অপ্রত্যাশিত ফলাফল আসতে পারে।

  // ✅ সঠিক উপায়:
  const totalDocuments = await this.modelQuery.model.countDocuments();//✅
  // ব্যাখ্যা:
  // modelQuery = Mongoose query object (যেমন: TourModel.find().sort().select() ...)
  // modelQuery.model = আসল Mongoose Model টি (যেমন: TourModel)
  // তাই .model.countDocuments() = সম্পূর্ণ ডাটাবেজ কালেকশনে কতগুলো ডকুমেন্ট আছে তা গণনা করে।
  // এটা শুধুমাত্র count করার জন্য নির্ভরযোগ্য, কারণ এখানে কোনো filter/query অপারেশন প্রভাব ফেলছে না।

    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const totalPage = Math.ceil( totalDocuments / limit );
 
    return {
      page,
      limit,
      totalPage,
      total : totalDocuments,
    }
  }
}
// -------
