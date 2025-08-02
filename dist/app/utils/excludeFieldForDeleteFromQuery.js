"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeFieldForDeleteFromQuery = void 0;
exports.excludeFieldForDeleteFromQuery = ["searchTerm", "sort", "fields", "field", "page", "limit"]; // egulo url e ja dibe, query hisebe seguloi ekane array te newa, varibale name o same dewa hoise, but egulo variable mean kora hoccena, egulo user filter korar somoy url e query hisebe jegulo takbe sei same name e takte hobe jmn :
// 4. searchTerm = http://localhost:5000/api/v1/tour?searchTerm=Tajhat = searchTerm
// 3. sort   = http://localhost:5000/api/v1/tour?sort=-createdAt       = sort
// 2. fields = http://localhost:5000/api/v1/tour?fields=title,location = fields 
// 1. field  = http://localhost:5000/api/v1/tour?field=-slug           = field
// 4. page   = http://localhost:5000/api/v1/tour?page=2                = page
// 4. limit  = http://localhost:5000/api/v1/tour?limit=10              = limit
// 4.       http://localhost:5000/api/v1/tour?location=Rangpur         = (query) exact match query diye find kore pawar jonnoi uporer gulo delete korte hoi
