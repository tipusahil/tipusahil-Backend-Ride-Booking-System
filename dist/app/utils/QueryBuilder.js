"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
const excludeFieldForDeleteFromQuery_1 = require("./excludeFieldForDeleteFromQuery");
// export const searchAbleFieldsConstant = ["name","email", "title", "description", "slug", "location"];
// export const excludeFieldForDeleteFromQuery = ["searchTerm", "sort", "fields", "field", "page", "limit" ];
// -------
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    filter() {
        const filter = Object.assign({}, this.query);
        for (const field of excludeFieldForDeleteFromQuery_1.excludeFieldForDeleteFromQuery) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete filter[field];
        }
        this.modelQuery = this.modelQuery.find(filter); // TourModel.find().find(filter)
        return this;
    }
    search(searchAbleFields) {
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
        if (searchTerm.length < 2)
            return this;
        const words = searchTerm.split(/\s+/); // ✅ split trim korar pore korte hoi, age korle somossa hoi
        //input :  searchTerm = "tipu   sahil  bd" = condition = searchTerm.split(/\s+/); = output: for search  ["tipu", "sahil", "bd"] = words
        const searchQuery = {
            $or: searchAbleFields.flatMap((field) => words.map((word) => ({
                [field]: { $regex: word, $options: "i" },
            }))),
        };
        this.modelQuery = this.modelQuery.find(searchQuery); // TourModel.find().find(searchQuery)
        return this;
    }
    sort() {
        const sort = this.query.sort || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort); // TourModel.sort(sort)
        return this;
    }
    fields() {
        var _a;
        const fields = ((_a = this.query.fields) === null || _a === void 0 ? void 0 : _a.split(",").join(" ")) || ""; // title,location -> title location
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    paginate() {
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
    getMeta() {
        return __awaiter(this, void 0, void 0, function* () {
            // ⛔ ভুল উপায়:
            // const totalDocuments = await this.modelQuery.countDocuments();//❌
            // ব্যাখ্যা: modelQuery ইতোমধ্যে একাধিক .find(), .sort(), .select() ইত্যাদি অপারেশন পেয়েছে,
            // তাই এটি এখন একটি query chain, যার উপরে আবার countDocuments() চালালে ভুল বা অপ্রত্যাশিত ফলাফল আসতে পারে।
            // ✅ সঠিক উপায়:
            const totalDocuments = yield this.modelQuery.model.countDocuments(); //✅
            // ব্যাখ্যা:
            // modelQuery = Mongoose query object (যেমন: TourModel.find().sort().select() ...)
            // modelQuery.model = আসল Mongoose Model টি (যেমন: TourModel)
            // তাই .model.countDocuments() = সম্পূর্ণ ডাটাবেজ কালেকশনে কতগুলো ডকুমেন্ট আছে তা গণনা করে।
            // এটা শুধুমাত্র count করার জন্য নির্ভরযোগ্য, কারণ এখানে কোনো filter/query অপারেশন প্রভাব ফেলছে না।
            const page = Number(this.query.page) || 1;
            const limit = Number(this.query.limit) || 10;
            const totalPage = Math.ceil(totalDocuments / limit);
            return {
                page,
                limit,
                totalPage,
                total: totalDocuments,
            };
        });
    }
}
exports.QueryBuilder = QueryBuilder;
// -------
